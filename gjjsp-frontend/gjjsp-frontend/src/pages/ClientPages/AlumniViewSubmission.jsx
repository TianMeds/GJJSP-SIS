import React, {useEffect, useState} from 'react'
import * as MUI from '../../import';
import Layout from '../../component/Layout/SidebarNavbar/Layout';
import { Link } from 'react-router-dom';
import useSubmissionStore from '../../store/SubmissionStore';
import useAuthStore from '../../store/AuthStore';
import useLoginStore from '../../store/LoginStore';
import StatusProgress from '../Components/StatusProgress';
import classNames from 'classnames';
import axios from '../../api/axios';

//React Hook Form
import {useForm, Controller } from 'react-hook-form';
import { DevTool } from "@hookform/devtools";

export default function ViewSubmission() {

  //React Hook form 
  const form  = useForm();
  const { register, control, handleSubmit, formState, reset, watch, validate, setValue} = form
  const { errors } = formState;
  
  const {passYear, setPassYear, selectedSubmission, setSelectedSubmission, modalStatus, setModalStatus, handleCloseStatusModal,disapprovalRemarks, setDisapprovalRemarks  } = useSubmissionStore();
  const {getAuthToken, alertOpen, alertMessage, setAlertOpen, setAlertMessage, errorOpen, setErrorOpen, setErrorMessage, errorMessage} = useAuthStore();
  const { showPassword, handleTogglePassword, setLoading, setLoadingMessage } = useLoginStore();

  const [approvalAction, setApprovalAction] = useState('');
  
  const updateSubmissionStatus = async (status) => {
    setLoading(true);
    setLoadingMessage('Updating submission...');
    try {
      const authToken = getAuthToken();

      let remarksMessage = '';
      if (status === 'Approved') {
          remarksMessage = "Congratulations! You're approved. You can now submit your next term documents.";
      } else {
          remarksMessage = disapprovalRemarks;
      }


      const response = await axios.put(`/api/alumni-submission/${selectedSubmission.id}`, {
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
              <MUI.Button variant='contained' component={Link} to="/submitted-alumni" sx={{ color: '#fff', backgroundColor: '#1976d2', '&:hover': { backgroundColor: '#1565c0' } }}>
                  Close
              </MUI.Button>
          </MUI.Grid>

          <MUI.Grid item>
              <MUI.Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                Scholar Name:
                {selectedSubmission.user_first_name} {selectedSubmission.user_last_name}
              </MUI.Typography>
          </MUI.Grid>

          <MUI.Grid item>
            <MUI.Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                Renewal Form: {selectedSubmission.alumni[passYear]?.[0]?.submission_status}
              </MUI.Typography>
          </MUI.Grid>

          <MUI.Grid item>
          <MUI.Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                Year: {
                  selectedSubmission.alumni && Object.keys(selectedSubmission.alumni).length > 0 ?
                  Object.keys(selectedSubmission.alumni)[0] : 'N/A Year'
                }

              </MUI.Typography>
          </MUI.Grid>


          <MUI.Grid item>
              <MUI.Button 
              variant='contained' 
              disabled={selectedSubmission.alumni[passYear]?.[0]?.submission_status === 'Approved'}
              onClick={() => handleOpenStatusModal('Approved')}
              sx={{ backgroundColor: '#4caf50', color: '#fff', '&:hover': { backgroundColor: '#388e3c' } }}>
                Approve
              </MUI.Button>

              <MUI.Button 
              variant="contained" 
              disabled={selectedSubmission.alumni[passYear]?.[0]?.submission_status === 'Approved'}
              onClick={() => handleOpenStatusModal('Disapproved')}
              sx={{ marginLeft: '10px', backgroundColor: '#f44336', color: '#fff', '&:hover': { backgroundColor: '#d32f2f' } }}>
                Disapprove
              </MUI.Button>
          </MUI.Grid>
      </MUI.Grid>

        <MUI.Grid component="form"  method='post' noValidate container spacing={3} sx={{ mt: 2, ml: 2, display: 'flex' }}> 
           
           <MUI.Grid item xs={12} md={4} mt={5}>

             <MUI.Grid container spacing={3}>

               <MUI.Grid item xs={12}>
                 <MUI.InputLabel htmlFor="company_name" id="currentCompanyLabel">1. Current Company Name</MUI.InputLabel>
                 
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
                  {selectedSubmission.alumni[passYear]?.[0]?.company_name}
                </MUI.Box>
               </MUI.Grid>

               <MUI.Grid item xs={12}>
                 <MUI.InputLabel htmlFor="company_location" id="currentCompanyLocationLabel">2. Current Company Location</MUI.InputLabel>
                 
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
                  {selectedSubmission.alumni[passYear]?.[0]?.company_location}
                </MUI.Box>
               </MUI.Grid>

               <MUI.Grid item xs={12}>
                 <MUI.InputLabel htmlFor="position_in_company" id="currentJobLabel">3. Current Job Position</MUI.InputLabel>
                 
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
                  {selectedSubmission.alumni[passYear]?.[0]?.position_in_company}
                </MUI.Box>
               </MUI.Grid>

               <MUI.Grid item xs={12}>
                 <MUI.InputLabel htmlFor="licensure_exam_type" id="licensureExamLabel">4. Licensure Exam Type</MUI.InputLabel>
                 
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
                  {selectedSubmission.alumni[passYear]?.[0]?.licensure_exam_type}
                </MUI.Box>
               </MUI.Grid>

             </MUI.Grid>

           </MUI.Grid>

         <MUI.Grid item xs={12} md={4}>

         <MUI.Grid container spacing={3} mt={2}>
           <MUI.Grid item xs={12}>
             <MUI.InputLabel htmlFor="exam_passed_date" id="examDateLabel">5. Exam  Passed Date</MUI.InputLabel>
             
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
                  {selectedSubmission.alumni[passYear]?.[0]?.exam_passed_date}
                </MUI.Box>
           </MUI.Grid>

           <MUI.Grid item xs={12}>
             <MUI.InputLabel htmlFor="volunteer_group_name" id="volunteerGroupLabel">6. Volunteer Group Name (Optional)</MUI.InputLabel>
             
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
                  {selectedSubmission.alumni[passYear]?.[0]?.volunteer_group_name}
                </MUI.Box>
           </MUI.Grid>

           <MUI.Grid item xs={12}>
             <MUI.InputLabel htmlFor="yr_volunteered" id="yearVolunteerLabel">7. Year Volunteered (Optional)</MUI.InputLabel>
             
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
                  {selectedSubmission.alumni[passYear]?.[0]?.yr_volunteered}
                </MUI.Box>
           </MUI.Grid>

           </MUI.Grid>

         </MUI.Grid>

        </MUI.Grid>

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
      </MUI.Container>
    </Layout>
  )
}
