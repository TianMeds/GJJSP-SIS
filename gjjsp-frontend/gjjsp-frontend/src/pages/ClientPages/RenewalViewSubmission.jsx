import React, {useEffect, useState} from 'react'
import * as MUI from '../../import';
import Layout from '../../component/Layout/SidebarNavbar/Layout';
import { Link } from 'react-router-dom';
import StatusProgress from '../Components/StatusProgress';
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
    const { renewalScholarData, setRenewalScholarData, renewalSubmissionStatus, setRenewalSubmissionStatus, renewalValues, setRenewalValues, selectedSubmission, setSelectedSubmission  } = useSubmissionStore();

  //React Hook form 
  const form  = useForm();
  const { register, control, handleSubmit, formState, reset, watch, validate, setValue} = form
  const { errors } = formState;


  
  useEffect(() => {
    const fetchScholars= async () => {
        try {
            const authToken = getAuthToken();
        
            const response = await axios.get('/api/scholars', {
                headers: {
                    'Authorization': `Bearer ${authToken}`
                }
            });
        
            if (response.status === 200) {
                console.log(response.data.data);
                setRenewalScholarData(response.data.data);
            }
            else{
                console.log(response);
            }
        }
        catch(error){
            console.log(error);
        }
    }
    fetchScholars();
}, []);

  

  return (
    <Layout>
      <MUI.Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>

        <MUI.Grid container spacing={3}>

        <MUI.Grid container alignItems="center" sx={{display: 'flex', justifyContent: 'space-between'}}>
          <MUI.Grid item>
              <MUI.Button variant='contained' component={Link} to="/submitted-renewal">
                  Close 
              </MUI.Button>
          </MUI.Grid>

          <MUI.Grid item>
              <MUI.Typography>Scholar Name: {selectedSubmission.user_first_name}</MUI.Typography>
          </MUI.Grid>

          <MUI.Grid item>
          <MUI.Typography>Renewal Form: {selectedSubmission.submission_status && selectedSubmission.submission_status.length > 0 ? selectedSubmission.submission_status : 'No Submission'}</MUI.Typography>
          </MUI.Grid>

          <MUI.Grid item>
          <MUI.Typography>
        SY: {selectedSubmission.school_yr_submitted && Array.isArray(selectedSubmission.school_yr_submitted) && selectedSubmission.school_yr_submitted.length > 0 ? selectedSubmission.school_yr_submitted[0] : 'N/A Year'}
    </MUI.Typography>

          </MUI.Grid>


          <MUI.Grid item>
              <MUI.Button variant='contained'>Approve</MUI.Button>

              <MUI.Button>Disapprove</MUI.Button>
          </MUI.Grid>
        </MUI.Grid>


            <MUI.Grid container item xs={12} sx={{ mt: 5, ml: 2, display: 'flex' }} >
              <MUI.Grid item xs={12}>
                <MUI.InputLabel htmlFor="gwa_value" id="gwaLabel">1. General Weighted Average</MUI.InputLabel>


                <MUI.Box
                  sx={{
                    width: '100%', // Adjust width as needed
                    height: '50px', // Adjust height as needed
                    backgroundColor: '#f5f5f5',
                    borderRadius: '4px',
                    border: '1px solid #ccc',
                    marginLeft: 2,
                    marginTop: 2,
                  }}
                >
                  {selectedSubmission.gwa_value}
                </MUI.Box>


              </MUI.Grid>

              <MUI.Grid item xs={12}>
                <MUI.InputLabel htmlFor="gwa_remarks" id="remarksLabel">2. Add remarks about GWA</MUI.InputLabel>

                <MUI.Box
                  sx={{
                    width: '100%', // Adjust width as needed
                    height: '50px', // Adjust height as needed
                    backgroundColor: '#f5f5f5',
                    borderRadius: '4px',
                    border: '1px solid #ccc',
                    marginLeft: 2,
                    marginTop: 2,
                  }}
                >
                  {selectedSubmission.gwa_remarks}
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
                            <MUI.Typography variant='body1'>{selectedSubmission.copyOfReportCard && selectedSubmission.copyOfReportCard.length > 0 ? selectedSubmission.copyOfReportCard : 'No Submission'} </MUI.Typography>
                          </MUI.Grid>

                        </MUI.TableCell>
                      </MUI.TableRow>

                      <MUI.TableRow >
                        <MUI.TableCell sx={{ border: 'none', display: 'flex', alignItems: 'flex-start', marginLeft: '-8px' }}>
                          <MUI.Typography variant='body1'>Copy of School Registration Form (RF)</MUI.Typography> 
                        </MUI.TableCell>
                        <MUI.TableCell sx={{border: 'none'}}>

                          <MUI.Grid sx={{ display: 'flex', alignItems: 'center' }}>
                            <MUI.Typography variant='body1'>{selectedSubmission.copyOfRegistrationForm && selectedSubmission.copyOfRegistrationForm.length > 0 ? selectedSubmission.copyOfRegistrationForm : 'No Submission'} </MUI.Typography>
                          </MUI.Grid>

                        </MUI.TableCell>  
                      </MUI.TableRow>

                      <MUI.TableRow >
                        <MUI.TableCell sx={{ border: 'none', display: 'flex', alignItems: 'flex-start', marginLeft: '-8px' }}>
                          <MUI.Typography variant='body1'>Scanned Written Essay</MUI.Typography> <MUI.ErrorOutlineOutlinedIcon sx={{ml: 9}}/>
                        </MUI.TableCell>
                        <MUI.TableCell sx={{border: 'none'}}>
                          
                        <MUI.Grid sx={{ display: 'flex', alignItems: 'center' }}>
                        <MUI.Typography variant='body1'>{selectedSubmission.scannedWrittenEssay && selectedSubmission.scannedWrittenEssay.length > 0 ? selectedSubmission.scannedWrittenEssay : 'No Submission'} </MUI.Typography>
                        </MUI.Grid>

                        </MUI.TableCell>
                      </MUI.TableRow>

                      <MUI.TableRow >
                      <MUI.TableCell sx={{ border: 'none', display: 'flex', alignItems: 'flex-start', marginLeft: '-8px' }}>
                          <MUI.Typography variant='body1'> Letter of gratitude to benefactor</MUI.Typography> <MUI.ErrorOutlineOutlinedIcon />
                        </MUI.TableCell>
                        <MUI.TableCell sx={{border: 'none'}}>

                        <MUI.Grid sx={{ display: 'flex', alignItems: 'center' }}>
                        <MUI.Typography variant='body1'>{selectedSubmission.letterOfGratitude && selectedSubmission.letterOfGratitude.length > 0 ? selectedSubmission.letterOfGratitude : 'No Submission'} </MUI.Typography>
                        </MUI.Grid>

                        </MUI.TableCell>
                      </MUI.TableRow>


                    </MUI.TableBody>
                  </MUI.Table>
                  <MUI.Divider sx={{ width: '100%' }} />
                </MUI.TableContainer>
              </MUI.Grid>

            </MUI.Grid>
            </MUI.Grid>
      </MUI.Container>
    </Layout>
  )
}
