import React, {useEffect, useState} from 'react'
import * as MUI from '../../import';
import Layout from '../../component/Layout/SidebarNavbar/Layout';
import { Link } from 'react-router-dom';
import useSubmissionStore from '../../store/SubmissionStore';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import StatusProgress from '../Components/StatusProgress';
import classNames from 'classnames';
import axios from '../../api/axios';
import useAuthStore from '../../store/AuthStore';
import useLoginStore from '../../store/LoginStore';


//React Hook Form
import {useForm, Controller } from 'react-hook-form';
import { DevTool } from "@hookform/devtools";



export default function ViewSubmission() {

  //React Hook form 
  const form  = useForm();
  const { register, control, handleSubmit, formState, reset, watch, validate, setValue} = form
  const { errors } = formState;
  
  const {selectedSubmission, setSelectedSubmission, passYear, setPassYear, setModalStatus, modalStatus, disapprovalRemarks, setDisapprovalRemarks, handleCloseStatusModal} = useSubmissionStore();
  const {getAuthToken, alertOpen, alertMessage, setAlertOpen, setAlertMessage, errorOpen, setErrorOpen, setErrorMessage, errorMessage} = useAuthStore();
  const { showPassword, handleTogglePassword, setLoading, setLoadingMessage } = useLoginStore();

  const [approvalAction, setApprovalAction] = useState('');

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

      let remarksMessage = '';
      if (status === 'Approved') {
          remarksMessage = "Congratulations! You're approved. You can now wait for the next submission.";
      } else {
          remarksMessage = disapprovalRemarks;
      }

      const response = await axios.put(`/api/graduating-submission/${selectedSubmission.id}`, {
        submission_status: status,
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

  const handleOpenStatusModal = (action) => {
    // Set the approval action state based on the button clicked
    setApprovalAction(action);
    // Set the modal status to true
    setModalStatus(true);
    // Reset disapproval remarks state
    setDisapprovalRemarks('');
  };


  return (
    <Layout>
      <MUI.Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <MUI.Grid container spacing={3}>

        <MUI.Grid container alignItems="center" justifyContent="space-between" sx={{ padding: '20px', backgroundColor: '#f0f0f0', borderRadius: '8px', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)' }}>
          <MUI.Grid item>
              <MUI.Button variant='contained' component={Link} to="/submitted-graduating" sx={{ color: '#fff', backgroundColor: '#1976d2', '&:hover': { backgroundColor: '#1565c0' } }}>
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
                  Graduating Form: {selectedSubmission.graduating[passYear]?.[0]?.submission_status || 'No Submission'}
              </MUI.Typography>
          </MUI.Grid>

          <MUI.Grid item>
              <MUI.Typography>
                SY : {
                  selectedSubmission.graduating && Object.keys(selectedSubmission.graduating).length > 0 ? 
                    Object.keys(selectedSubmission.graduating)[0] : 'N/A Year'
                }
              </MUI.Typography>
          </MUI.Grid>


          <MUI.Grid item>
              <MUI.Button 
              variant='contained' 
              disabled={selectedSubmission.graduating[passYear]?.[0]?.submission_status === 'Approved'}
              onClick={() => handleOpenStatusModal('Approved')}
              sx={{ backgroundColor: '#4caf50', color: '#fff', '&:hover': { backgroundColor: '#388e3c' } }}
              >Approve
              </MUI.Button>

              <MUI.Button 
              variant='contained' 
              disabled={selectedSubmission.graduating[passYear]?.[0]?.submission_status === 'Approved'}
              onClick={() => handleOpenStatusModal('Disapproved')}
              sx={{ marginLeft: '10px', backgroundColor: '#f44336', color: '#fff', '&:hover': { backgroundColor: '#d32f2f' } }}
              >
                Disapprove
              </MUI.Button>
          </MUI.Grid>
      </MUI.Grid>

      <MUI.Grid  container spacing={3} sx={{ mt: 2, ml: 2, display: 'flex' }}> 
           
           <MUI.Grid item xs={12} md={12} mt={5}>

             <MUI.Grid container spacing={3}>

             {/* Left Column */}
             <MUI.Grid item xs={12} sm={6}>
               <MUI.Grid item xs={12}>
                 <MUI.InputLabel htmlFor="graduateName" id="graduateNameLabel">1. Graduate Name</MUI.InputLabel>
                 
                 <MUI.Box
                   sx={{
                    width: '100%',
                    height: '50px',
                    backgroundColor: '#f5f5f5',
                    borderRadius: '4px',
                    border: '1px solid #ccc',
                    marginLeft: 2,
                    marginTop: 2,
                    marginBottom: 2,
                    display: 'flex',
                    alignItems: 'center',
                    padding: '1rem',
                    fontSize: '1rem',
                    color: '#333', // Adjust text color as needed
                  }}
                >

                    {selectedSubmission.user_first_name} {selectedSubmission.user_middle_name || ""} {selectedSubmission.user_last_name}
                </MUI.Box>
                
               </MUI.Grid>

               <MUI.Grid item xs={12}>
                 <MUI.InputLabel htmlFor="schoolGraduated" id="schoolGraduatedLabel">2. School Graduating</MUI.InputLabel>
                 
                 <MUI.Box
                   sx={{
                    width: '100%',
                    height: '50px',
                    backgroundColor: '#f5f5f5',
                    borderRadius: '4px',
                    border: '1px solid #ccc',
                    marginLeft: 2,
                    marginTop: 2,
                    marginBottom: 2,
                    display: 'flex',
                    alignItems: 'center',
                    padding: '1rem',
                    fontSize: '1rem',
                    color: '#333', // Adjust text color as needed
                  }}
                >
                  {selectedSubmission.graduating[passYear]?.[0]?.schoolGraduated || "No School Input"}
                </MUI.Box>

               </MUI.Grid>

               <MUI.Grid item xs={12}>
                 <MUI.InputLabel htmlFor="addressSchool" id="addressSchoolLabel">3. School Address</MUI.InputLabel>
                 
                 <MUI.Box
                   sx={{
                    width: '100%',
                    height: '50px',
                    backgroundColor: '#f5f5f5',
                    borderRadius: '4px',
                    border: '1px solid #ccc',
                    marginLeft: 2,
                    marginTop: 2,
                    marginBottom: 2,
                    display: 'flex',
                    alignItems: 'center',
                    padding: '1rem',
                    fontSize: '1rem',
                    color: '#333', // Adjust text color as needed
                  }}
                >
                  {selectedSubmission.graduating[passYear]?.[0]?.addressSchool || "No Address Input"}
                </MUI.Box>

               </MUI.Grid>

               <MUI.Grid item xs={12}>
                 <MUI.InputLabel htmlFor="yearEnteredGraduated" id="yearEnteredGraduatedLabel">4. Year Entered & Graduated</MUI.InputLabel>
                 
                 <MUI.Box
                   sx={{
                    width: '100%',
                    height: '50px',
                    backgroundColor: '#f5f5f5',
                    borderRadius: '4px',
                    border: '1px solid #ccc',
                    marginLeft: 2,
                    marginTop: 2,
                    marginBottom: 2,
                    display: 'flex',
                    alignItems: 'center',
                    padding: '1rem',
                    fontSize: '1rem',
                    color: '#333', // Adjust text color as needed
                  }}
                >
                  {selectedSubmission.graduating[passYear]?.[0]?.yearEnteredGraduated || "No Year Input"}
                </MUI.Box>

               </MUI.Grid>


               <MUI.Grid item xs={12}>
                 <MUI.InputLabel htmlFor="program" id="programLabel">5. College Course</MUI.InputLabel>
                 
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
                  {selectedSubmission.graduating[passYear]?.[0]?.program || "No Program Input"}
                </MUI.Box>

               </MUI.Grid>

             </MUI.Grid>

             {/* Right Column */}

             <MUI.Grid item xs={12} sm={6}>

               <MUI.Grid item xs={12}>
                 <MUI.InputLabel htmlFor="street" id="streetGraduateLabel">6. Mailing Address</MUI.InputLabel>
                 
                 <MUI.Box
                   sx={{
                    width: '100%',
                    height: '50px',
                    backgroundColor: '#f5f5f5',
                    borderRadius: '4px',
                    border: '1px solid #ccc',
                    marginLeft: 2,
                    marginTop: 2,
                    marginBottom: 2,
                    display: 'flex',
                    alignItems: 'center',
                    padding: '1rem',
                    fontSize: '1rem',
                    color: '#333', // Adjust text color as needed
                  }}
                >
                  {selectedSubmission.graduating[passYear]?.[0]?.street || "No Street Input"}
                </MUI.Box>

               </MUI.Grid>

               <MUI.Grid item xs={12}>
                 <MUI.InputLabel htmlFor="user_email_address" id="userEmailAddressLabel">7. Email Address</MUI.InputLabel>
                 
                 <MUI.Box
                   sx={{
                    width: '100%',
                    height: '50px',
                    backgroundColor: '#f5f5f5',
                    borderRadius: '4px',
                    border: '1px solid #ccc',
                    marginLeft: 2,
                    marginTop: 2,
                    marginBottom: 2,
                    display: 'flex',
                    alignItems: 'center',
                    padding: '1rem',
                    fontSize: '1rem',
                    color: '#333', // Adjust text color as needed
                  }}
                >
                  {selectedSubmission.user_email_address || "No Email Input"}
                </MUI.Box>

               </MUI.Grid>

               <MUI.Grid item xs={12}>
                 <MUI.InputLabel htmlFor="user_mobile_num" id="userMobileNumLabel">8. Contact Number </MUI.InputLabel>
                 <MUI.Box
                   sx={{
                    width: '100%',
                    height: '50px',
                    backgroundColor: '#f5f5f5',
                    borderRadius: '4px',
                    border: '1px solid #ccc',
                    marginLeft: 2,
                    marginTop: 2,
                    marginBottom: 2,
                    display: 'flex',
                    alignItems: 'center',
                    padding: '1rem',
                    fontSize: '1rem',
                    color: '#333', // Adjust text color as needed
                  }}
                >
                  {selectedSubmission.user_mobile_num || "No Contact Number Input"}
                </MUI.Box>

               </MUI.Grid>

               <MUI.Grid item xs={12}>
                 <MUI.InputLabel htmlFor="futurePlan" id="futurePlanLabel">9. Future Plan (Optional) </MUI.InputLabel>
                 
                 <MUI.Box
                   sx={{
                    width: '100%',
                    height: '50px',
                    backgroundColor: '#f5f5f5',
                    borderRadius: '4px',
                    border: '1px solid #ccc',
                    marginLeft: 2,
                    marginTop: 2,
                    marginBottom: 2,
                    display: 'flex',
                    alignItems: 'center',
                    padding: '1rem',
                    fontSize: '1rem',
                    color: '#333', // Adjust text color as needed
                  }}
                >
                  {selectedSubmission.graduating[passYear]?.[0]?.futurePlan || "No Future Plan Input"}
                </MUI.Box>

               </MUI.Grid>

               </MUI.Grid>

             </MUI.Grid>

           </MUI.Grid>


       </MUI.Grid>

            <MUI.Grid item xs={12}>
                <MUI.Typography variant='h6' sx={{fontWeight: 'bold'}}>
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
                        {selectedSubmission.graduating[passYear]?.[0]?.copyOfReportCard ? (
                          <a href={selectedSubmission.graduating[passYear][0].copyOfReportCard} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px', color: '#1976d2', cursor: 'pointer', }}>
                            <InsertDriveFileIcon style={{ fontSize: '1.2rem' }} />
                            <MUI.Typography variant='body1' style={{ color: '#1976d2', textDecoration: 'none', }}>
                              {extractFileName(selectedSubmission.graduating[passYear][0].copyOfReportCard)}
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
                          {selectedSubmission.graduating[passYear]?.[0]?.copyOfRegistrationForm ? (
                            <a href={selectedSubmission.graduating[passYear][0].copyOfRegistrationForm} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px', color: '#1976d2', cursor: 'pointer', }}>
                              <InsertDriveFileIcon style={{ fontSize: '1.2rem' }} />
                              <MUI.Typography variant='body1' style={{ color: '#1976d2', textDecoration: 'none', }}>
                                {extractFileName(selectedSubmission.graduating[passYear][0].copyOfRegistrationForm)}
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
                        <MUI.Typography variant='body1'>Scanned Written Essay</MUI.Typography>
                      </MUI.TableCell>
                      <MUI.TableCell sx={{border: 'none'}}>
                        
                      <MUI.Grid sx={{ display: 'flex', alignItems: 'center' }}>
                        {selectedSubmission.graduating[passYear]?.[0]?.scannedWrittenEssay ? (
                          <a href={selectedSubmission.graduating[passYear][0].scannedWrittenEssay} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px', color: '#1976d2', cursor: 'pointer', }}>
                            <InsertDriveFileIcon style={{ fontSize: '1.2rem' }} />
                            <MUI.Typography variant='body1' style={{ color: '#1976d2', textDecoration: 'none', }}>
                              {extractFileName(selectedSubmission.graduating[passYear][0].scannedWrittenEssay)}
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
                        <MUI.Typography variant='body1'> Letter of gratitude to benefactor</MUI.Typography>
                      </MUI.TableCell>
                      <MUI.TableCell sx={{border: 'none'}}>

                      <MUI.Grid sx={{ display: 'flex', alignItems: 'center' }}>
                          
                        {selectedSubmission.graduating[passYear]?.[0]?.letterOfGratitude ? (
                          <a href={selectedSubmission.graduating[passYear][0].letterOfGratitude} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px', color: '#1976d2', cursor: 'pointer', }}>
                            <InsertDriveFileIcon style={{ fontSize: '1.2rem' }} />
                            <MUI.Typography variant='body1' style={{ color: '#1976d2', textDecoration: 'none', }}>
                              {extractFileName(selectedSubmission.graduating[passYear][0].letterOfGratitude)}
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
                        <MUI.Typography variant='body1'>Statement of account issued by the school</MUI.Typography> 
                      </MUI.TableCell>
                      <MUI.TableCell sx={{border: 'none'}}>

                      <MUI.Grid sx={{ display: 'flex', alignItems: 'center' }}>
                      {selectedSubmission.graduating[passYear]?.[0]?.statementOfAccount ? (
                          <a href={selectedSubmission.graduating[passYear][0].statementOfAccount} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px', color: '#1976d2', cursor: 'pointer', }}>
                            <InsertDriveFileIcon style={{ fontSize: '1.2rem' }} />
                            <MUI.Typography variant='body1' style={{ color: '#1976d2', textDecoration: 'none', }}>
                              {extractFileName(selectedSubmission.graduating[passYear][0].statementOfAccount)}
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
                        <MUI.Typography variant='body1'> Graduation Picture</MUI.Typography> 
                      </MUI.TableCell>
                      <MUI.TableCell sx={{border: 'none'}}>

                      <MUI.Grid sx={{ display: 'flex', alignItems: 'center' }}>
                      {selectedSubmission.graduating[passYear]?.[0]?.graduationPicture ? (
                          <a href={selectedSubmission.graduating[passYear][0].graduationPicture} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px', color: '#1976d2', cursor: 'pointer', }}>
                            <InsertDriveFileIcon style={{ fontSize: '1.2rem' }} />
                            <MUI.Typography variant='body1' style={{ color: '#1976d2', textDecoration: 'none', }}>
                              {extractFileName(selectedSubmission.graduating[passYear][0].graduationPicture)}
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
                        <MUI.Typography variant='body1'>Transcript of records</MUI.Typography>
                      </MUI.TableCell>
                      <MUI.TableCell sx={{border: 'none'}}>

                      <MUI.Grid sx={{ display: 'flex', alignItems: 'center' }}>
                      {selectedSubmission.graduating[passYear]?.[0]?.transcriptOfRecords ? (
                          <a href={selectedSubmission.graduating[passYear][0].transcriptOfRecords} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px', color: '#1976d2', cursor: 'pointer', }}>
                            <InsertDriveFileIcon style={{ fontSize: '1.2rem' }} />
                            <MUI.Typography variant='body1' style={{ color: '#1976d2', textDecoration: 'none', }}>
                              {extractFileName(selectedSubmission.graduating[passYear][0].transcriptOfRecords)}
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

                  </MUI.TableBody>
                </MUI.Table>
                <MUI.Divider sx={{width:'100%'}}/>
              </MUI.TableContainer>

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
      </MUI.Container>
    </Layout>
  )
}
