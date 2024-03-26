import React, {useEffect, useState} from 'react'
import * as MUI from '../../import';
import Layout from '../../component/Layout/SidebarNavbar/Layout';
import { Link, useLocation } from 'react-router-dom';
import StatusProgress from '../Components/StatusProgress';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import classNames from 'classnames';
import axios from '../../api/axios';

//Zustand Store
import useLoginStore from '../../store/LoginStore';
import useAuthStore from '../../store/AuthStore';
import useSubmissionStore from '../../store/SubmissionStore';


//React Hook Form
import {useForm, Controller } from 'react-hook-form';
import { DevTool } from "@hookform/devtools";

export default function ViewSubmission() {

  //Zustand Store
    const {getAuthToken, alertOpen, alertMessage, setAlertOpen, setAlertMessage, errorOpen, setErrorOpen, setErrorMessage, errorMessage} = useAuthStore();
    const { showPassword, handleTogglePassword, setLoading, setLoadingMessage } = useLoginStore();
    const { renewalScholarData, setRenewalScholarData, renewalSubmissionStatus, setRenewalSubmissionStatus, renewalValues, setRenewalValues, selectedSubmission, setSelectedSubmission, passYear, passTerm, setPassYear, setPassTerm, modalStatus, setModalStatus, handleCloseStatusModal, disapprovalRemarks, setDisapprovalRemarks  } = useSubmissionStore();

    const [submissions , setSubmissions] = useState([]);
    const [approvalAction, setApprovalAction] = useState('');

  //React Hook form 
  const form  = useForm();
  const { register, control, handleSubmit, formState, reset, watch, validate, setValue} = form
  const { errors } = formState;

  const handleOpenStatusModal = (action) => {
    // Set the approval action state based on the button clicked
    setApprovalAction(action);
    // Set the modal status to true
    setModalStatus(true);
    // Reset disapproval remarks state
    setDisapprovalRemarks('');
  };
  
  useEffect(() => {
    const fetchRenewalData = async () => {
      try {
        // Enhanced error handling:
        const authToken = getAuthToken(); // Replace with your logic
  
        if (!authToken) {
          console.error('Missing or invalid auth token');
          return; // Early exit to prevent unnecessary requests
        }
  
        const response = await axios.get('/api/scholars', {
          headers: {
            'Authorization': `Bearer ${authToken}`
          }
        });
  
        if (response.status === 200) {
          setRenewalScholarData(response.data.data);
        } else {
          console.error(`API request failed: ${response.status}`);
        }
      } catch (error) {
        console.error('Error fetching renewal data:', error);
      }
    };
  
    fetchRenewalData();
  }, [selectedSubmission]);
  
  
  const extractFileName = (url, maxLength = 50) => {
    // Split the URL string by '/'
    const parts = url.split('/');
    // Get the last part which represents the file name
    const fileNameWithExtension = parts[parts.length - 1];
    // Split the file name by '.' to separate the name and extension
    const fileNameParts = fileNameWithExtension.split('.');
    // Remove the last part which is the file extension
    fileNameParts.pop();
    // Join the remaining parts to get the file name without extension
    let fileName = fileNameParts.join('.');
    // Limit the length of the file name and add ellipsis if it exceeds maxLength
    if (fileName.length > maxLength) {
      fileName = fileName.substring(0, maxLength) + '...';
    }
    return fileName;
  };


  const updateSubmissionStatus = async (status) => {
    setLoading(true);
    setLoadingMessage('Updating submission...');
    try {
        const authToken = getAuthToken();
        // Find the selected term based on passYear and passTerm
        const selectedTerm = selectedSubmission.renewing[passYear]?.find(termData => termData.term === passTerm);
        if (!selectedTerm) {
            setErrorMessage('Selected term not found');
            setErrorOpen(true);
            setLoading(false);
            return;
        }
        let remarksMessage = '';
        if (status === 'Approved') {
            remarksMessage = "Congratulations! You're approved. You can now submit your next term documents.";
        } else {
            remarksMessage = disapprovalRemarks;
        }
        const response = await axios.put(`/api/renewal-submission/${selectedTerm.id}`, {
            submission_status: status,
            term_submitted: selectedTerm,
            remarks_message: remarksMessage
        }, {
            headers: {
                'Authorization': `Bearer ${authToken}` // Include the bearer token in the header
            }
        });

        if (response.status === 200) {
            setAlertMessage('Submission status updated successfully');
            setAlertOpen(true);
            handleCloseStatusModal();
        } else {
            setErrorMessage('Failed to update submission status');
            setErrorOpen(true);
            handleCloseStatusModal();
        }

        setLoading(false);
    } catch (error) {
        setLoading(false);
        console.error('Error updating submission status:', error);
        setErrorMessage('Failed to update submission status');
        setErrorOpen(true);
    }
};





  return (
    <Layout>
      <MUI.Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>

        <MUI.Grid container spacing={3}>

        <MUI.Grid container alignItems="center" justifyContent="space-between" sx={{ padding: '20px', backgroundColor: '#f0f0f0', borderRadius: '8px', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)' }}>
          <MUI.Grid item>
              <MUI.Button variant='contained' component={Link} to="/submitted-renewal" sx={{ color: '#fff', backgroundColor: '#1976d2', '&:hover': { backgroundColor: '#1565c0' } }}>
                  Close
              </MUI.Button>
          </MUI.Grid>

          <MUI.Grid item>
              <MUI.Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                  Scholar Name: {selectedSubmission.user_first_name} {selectedSubmission.user_middle_name || ""} {selectedSubmission.user_last_name}
              </MUI.Typography>
          </MUI.Grid>

          <MUI.Grid item>
              <MUI.Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                  Renewal Form: {selectedSubmission.renewing[passYear]?.find(termData => termData.term === passTerm)?.submission_status || 'No Submission'}
              </MUI.Typography>
          </MUI.Grid>


          <MUI.Grid item>
              <MUI.Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                  SY: {
                      selectedSubmission.renewing && Object.keys(selectedSubmission.renewing).length > 0 ?
                      Object.keys(selectedSubmission.renewing)[0] :
                      'N/A Year'
                  }
              </MUI.Typography>
          </MUI.Grid>

          <MUI.Grid item>
          <MUI.Button 
              variant='contained' 
              disabled={
                  !selectedSubmission ||
                  !selectedSubmission.renewing[passYear]?.find(termData => termData.term === passTerm) ||
                  selectedSubmission.renewing[passYear]?.find(termData => termData.term === passTerm)?.submission_status === 'Approved' || 
                  selectedSubmission.renewing[passYear]?.find(termData => termData.term === passTerm)?.submission_status === 'For Resubmission'
              }
              onClick={() => handleOpenStatusModal('Approved')}
              sx={{ backgroundColor: '#4caf50', color: '#fff', '&:hover': { backgroundColor: '#388e3c' } }}
          >
              Approve
          </MUI.Button>

            <MUI.Button 
              variant='contained' 
              disabled={
                !selectedSubmission || 
                !selectedSubmission.renewing[passYear]?.find(termData => termData.term === passTerm) || 
                selectedSubmission.renewing[passYear]?.find(termData => termData.term === passTerm)?.submission_status === 'Approved' ||
                selectedSubmission.renewing[passYear]?.find(termData => termData.term === passTerm)?.submission_status === 'For Resubmission'
              }
                
              onClick={() => handleOpenStatusModal('Disapproved')}
              sx={{ marginLeft: '10px', backgroundColor: '#f44336', color: '#fff', '&:hover': { backgroundColor: '#f44336' } }}
            >
              Disapprove
            </MUI.Button>
          </MUI.Grid>

      </MUI.Grid>


            <MUI.Grid container item xs={12} sx={{ mt: 5, ml: 2, display: 'flex' }} >
              <MUI.Grid item xs={12}>
                <MUI.InputLabel htmlFor="gwa_value" id="gwaLabel">1. General Weighted Average</MUI.InputLabel>


                <MUI.Box
                   sx={{
                    width: '100%',
                    height: '50px',
                    backgroundColor: '#f5f5f5',
                    borderRadius: '4px',
                    border: '1px solid #ccc',
                    marginLeft: 2,
                    marginTop: 2,
                    display: 'flex',
                    alignItems: 'center',
                    padding: '1rem',
                    fontSize: '1rem',
                    color: '#333', // Adjust text color as needed
                  }}
                >
                  {selectedSubmission.renewing[passYear]?.find(termData => termData.term === passTerm)?.gwa_value || 'No Gwa yet'}
                </MUI.Box>


              </MUI.Grid>

              <MUI.Grid item xs={12} mt={2}>
                <MUI.InputLabel htmlFor="gwa_remarks" id="remarksLabel">2. Add remarks about GWA</MUI.InputLabel>

                <MUI.Box
                  sx={{
                    width: '100%',
                    height: '50px',
                    backgroundColor: '#f5f5f5',
                    borderRadius: '4px',
                    border: '1px solid #ccc',
                    marginLeft: 2,
                    marginTop: 2,
                    display: 'flex',
                    alignItems: 'center',
                    padding: '1rem',
                    fontSize: '1rem',
                    color: '#333', // Adjust text color as needed
                  }}
                >
                  {selectedSubmission.renewing[passYear]?.find(termData => termData.term === passTerm)?.gwa_remarks || 'No Remarks yet'}
                </MUI.Box>

              </MUI.Grid>

              <MUI.Grid item xs={12}>
                <MUI.Typography variant='h5' sx={{ fontWeight: 'bold', mt: 5 }}>
                  Documentary Requirements
                </MUI.Typography>
              </MUI.Grid>

              <MUI.Grid item xs={12} sm={12}>
                <MUI.TableContainer sx={{ backgroundColor: '#fbf3f2', margin: '2rem 0 0 1rem' }}>
                  <MUI.Table>
                    <MUI.TableHead>
                      <MUI.TableRow>
                        <MUI.TableCell>Description</MUI.TableCell>
                        <MUI.TableCell>File</MUI.TableCell>
                      </MUI.TableRow>
                    </MUI.TableHead>
                    <MUI.TableBody>

                    <MUI.TableRow>
                        <MUI.TableCell sx={{ border: 'none', display: 'flex', alignItems: 'flex-start', marginLeft: '-8px' }}>
                          <MUI.Typography variant='body1'>Copy of Report Card of the previous semester</MUI.Typography> 
                        </MUI.TableCell>
                        <MUI.TableCell sx={{ border: 'none' }}>

                        <MUI.Grid sx={{ display: 'flex', alignItems: 'center' }}>
                            {selectedSubmission.renewing[passYear]?.find(termData => termData.term === passTerm)?.copyOfReportCard ? (
                                <a href={selectedSubmission.renewing[passYear].find(termData => termData.term === passTerm).copyOfReportCard} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px', color: '#1976d2', cursor: 'pointer', }}>
                                    <InsertDriveFileIcon style={{ fontSize: '1.2rem' }} />
                                    <MUI.Typography variant='body1' style={{ color: '#1976d2', textDecoration: 'none', }}>
                                        {extractFileName(selectedSubmission.renewing[passYear].find(termData => termData.term === passTerm).copyOfReportCard)}
                                    </MUI.Typography>
                                </a>
                            ) : (
                                <MUI.Typography variant='body1' style={{ color: '#1976d2', textDecoration: 'none', }}>
                                    No submission
                                </MUI.Typography>
                            )}
                        </MUI.Grid>


                        </MUI.TableCell>
                      </MUI.TableRow>

                      <MUI.TableRow >
                        <MUI.TableCell sx={{ border: 'none', display: 'flex', alignItems: 'flex-start', marginLeft: '-8px' }}>
                          <MUI.Typography variant='body1'>Copy of School Registration Form (RF)</MUI.Typography> 
                        </MUI.TableCell>
                        <MUI.TableCell sx={{border: 'none'}}>

                        <MUI.Grid sx={{ display: 'flex', alignItems: 'center' }}>
                          {selectedSubmission.renewing[passYear]?.find(termData => termData.term === passTerm)?.copyOfRegistrationForm ? (
                            <a href={selectedSubmission.renewing[passYear].find(termData => termData.term === passTerm).copyOfRegistrationForm} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px', color: '#1976d2', cursor: 'pointer' }}>
                              <InsertDriveFileIcon style={{ fontSize: '1.2rem' }} />
                              <MUI.Typography variant='body1' style={{ color: '#1976d2', textDecoration: 'none' }}>
                                {extractFileName(selectedSubmission.renewing[passYear].find(termData => termData.term === passTerm).copyOfRegistrationForm)}
                              </MUI.Typography>
                            </a>
                          ) : (
                            <MUI.Typography variant='body1' style={{ color: '#1976d2', textDecoration: 'none' }}>
                              No submission
                            </MUI.Typography>
                          )}
                        </MUI.Grid>

                        </MUI.TableCell>  
                      </MUI.TableRow>

                      <MUI.TableRow >
                        <MUI.TableCell sx={{ border: 'none', display: 'flex', alignItems: 'flex-start', marginLeft: '-8px' }}>
                          <MUI.Typography variant='body1'>Scanned Written Essay</MUI.Typography>
                        </MUI.TableCell>
                        <MUI.TableCell sx={{border: 'none'}}>
                          
                        <MUI.Grid sx={{ display: 'flex', alignItems: 'center' }}>
                            {selectedSubmission.renewing[passYear]?.find(termData => termData.term === passTerm)?.scannedWrittenEssay ? (
                                <a href={selectedSubmission.renewing[passYear].find(termData => termData.term === passTerm).scannedWrittenEssay} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px', color: '#1976d2', cursor: 'pointer' }}>
                                    <InsertDriveFileIcon style={{ fontSize: '1.2rem' }} />
                                    <MUI.Typography variant='body1' style={{ color: '#1976d2', textDecoration: 'none' }}>
                                        {extractFileName(selectedSubmission.renewing[passYear].find(termData => termData.term === passTerm).scannedWrittenEssay)}
                                    </MUI.Typography>
                                </a>
                            ) : (
                                <MUI.Typography variant='body1' style={{ color: '#1976d2', textDecoration: 'none' }}>
                                    No submission
                                </MUI.Typography>
                            )}
                        </MUI.Grid>


                        </MUI.TableCell>
                      </MUI.TableRow>

                      <MUI.TableRow >
                      <MUI.TableCell sx={{ border: 'none', display: 'flex', alignItems: 'flex-start', marginLeft: '-8px' }}>
                          <MUI.Typography variant='body1'> Letter of gratitude to benefactor</MUI.Typography>
                        </MUI.TableCell>
                        <MUI.TableCell sx={{border: 'none'}}>

                        <MUI.Grid sx={{ display: 'flex', alignItems: 'center' }}>
                            {selectedSubmission.renewing[passYear]?.find(termData => termData.term === passTerm)?.letterOfGratitude ? (
                                <a href={selectedSubmission.renewing[passYear].find(termData => termData.term === passTerm).letterOfGratitude} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px', color: '#1976d2', cursor: 'pointer' }}>
                                    <InsertDriveFileIcon style={{ fontSize: '1.2rem' }} />
                                    <MUI.Typography variant='body1' style={{ color: '#1976d2', textDecoration: 'none' }}>
                                        {extractFileName(selectedSubmission.renewing[passYear].find(termData => termData.term === passTerm).letterOfGratitude)}
                                    </MUI.Typography>
                                </a>
                            ) : (
                                <MUI.Typography variant='body1' style={{ color: '#1976d2', textDecoration: 'none' }}>
                                    No submission
                                </MUI.Typography>
                            )}
                        </MUI.Grid>


                        </MUI.TableCell>
                      </MUI.TableRow>


                    </MUI.TableBody>
                  </MUI.Table>
                  <MUI.Divider sx={{ width: '100%' }} />
                </MUI.TableContainer>


                {/* Approval Status Progress */}
                <MUI.Dialog open={modalStatus} onClose={handleCloseStatusModal}>
                  <MUI.DialogTitle id="dialogTitle" mt={2}>
                    Update Submission Status
                  </MUI.DialogTitle>

                  <MUI.DialogContent>
                    {approvalAction === 'Approved' ? (
                      <MUI.Typography variant='body1' ml={1} sx={{color: '#44546F'}}>
                        Are you sure you want to approve this submission? 
                      </MUI.Typography>
                    ) : (
                      <>
                        <MUI.Typography variant='body1' ml={1} sx={{color: '#44546F'}}>
                          Please select a reason for disapproval:
                        </MUI.Typography>

                        <MUI.FormControl fullWidth sx={{mt: 2}}>
                          <MUI.InputLabel id="disapprovalRemarksLabel">Disapproval Remarks</MUI.InputLabel>

                          <MUI.Select
                            id="disapprovalRemarks"
                            value={disapprovalRemarks}
                            onChange={(e) => setDisapprovalRemarks(e.target.value)}
                            fullWidth
                            label="Disapproval Remarks"
                          >
                            <MUI.MenuItem value="">Select a Reason</MUI.MenuItem>
                            <MUI.MenuItem value="Outdated Documents">Outdated Documents</MUI.MenuItem>
                            <MUI.MenuItem value="GWA Doesn't Match">GWA Doesn't Match in the Documentary</MUI.MenuItem>
                            <MUI.MenuItem value="Missing Required Information">Missing Required Information</MUI.MenuItem>
                            <MUI.MenuItem value="Incomplete Application">Incomplete Renewal Document</MUI.MenuItem>
                            <MUI.MenuItem value="Incorrect Format">Incorrect Format</MUI.MenuItem>
                            <MUI.MenuItem value="Other">Other</MUI.MenuItem>
                          </MUI.Select>

                        </MUI.FormControl>
                      </>
                    )}
                  </MUI.DialogContent>

                  <MUI.DialogActions>
                    <MUI.Button onClick={handleCloseStatusModal} variant='contained' sx={{ backgroundColor: '#f44336', color: '#fff', '&:hover': { backgroundColor: '#d32f2f' } }}>
                      Cancel
                    </MUI.Button>

                    {approvalAction === 'Approved' ? (
                      <MUI.Button onClick={() => updateSubmissionStatus('Approved')} variant='contained' sx={{ backgroundColor: '#4caf50', color: '#fff', '&:hover': { backgroundColor: '#388e3c' }, mb: 2, mt: 2,mr: 1 }}>
                        Approve
                      </MUI.Button>
                    ) : (
                      <MUI.Button onClick={() => updateSubmissionStatus('For Resubmission')} variant='contained' sx={{ marginLeft: '10px', backgroundColor: '#f44336', color: '#fff', '&:hover': { backgroundColor: '#f44336' } }}>
                        Disapprove
                      </MUI.Button>
                    )}
                  </MUI.DialogActions>
                </MUI.Dialog>


                
          {/* Snackbar for Success */}
          <MUI.Snackbar
            open={alertOpen}
            autoHideDuration={5000}
            onClose={() => setAlertOpen(false)}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            <MUI.MuiAlert onClose={() => setAlertOpen(false)} variant="filled" severity="success" sx={{ width: '100%' }}>
              {alertMessage}
            </MUI.MuiAlert>
          </MUI.Snackbar>

          {/* Snackbar for Error */}
          <MUI.Snackbar
            open={errorOpen}
            autoHideDuration={5000}
            onClose={() => setErrorOpen(false)}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            <MUI.MuiAlert onClose={() => setErrorOpen(false)} variant='filled' severity='error' sx={{width: '100%'}}>
              {errorMessage}
            </MUI.MuiAlert>
          </MUI.Snackbar>

          
              </MUI.Grid>

            </MUI.Grid>
            </MUI.Grid>
      </MUI.Container>
    </Layout>
  )
}
