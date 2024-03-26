import React, { useState, useEffect } from 'react';
import * as MUI from '../../../import';
import Layout from '../../../component/Layout/SidebarNavbar/Layout';
import { Link, useNavigate } from 'react-router-dom';
import theme from '../../../context/theme';
import HistoryIcon from '@mui/icons-material/History';
import axios from '../../../api/axios';

import useLoginStore from '../../../store/LoginStore';
import useAuthStore from '../../../store/AuthStore';
import useDashboardStore from '../../../store/DashboardStore';
import useSubmissionStore from '../../../store/SubmissionStore';

//React Hook Form
import { useForm, Controller } from 'react-hook-form';
import { DevTool } from "@hookform/devtools";

const FormValues = {
  company_name: '',
  company_location: '',
  position_in_company: '',
  licensure_exam_type: '',
  exam_passed_date: '',
  volunteer_group_name: '',
  yr_volunteered: ''
};

export default function AlumniSubmission() {

  // Zustand Store
  const { getAuthToken, alertOpen, alertMessage, setAlertOpen, setAlertMessage, errorOpen, setErrorOpen, setErrorMessage, errorMessage } = useAuthStore();
  const { setLoading, setLoadingMessage } = useLoginStore();
  const { modalConfirmation, setModalConfirmation, modalHistory, setModalHistory, handleOpenHistoryModal, handleCloseHistoryModal, handleOpenConfirmationModal, handleCloseConfirmationModal, userData, setUserData, editAlumni, setEditAlumni, updateData, setUpdateData } = useSubmissionStore();

  const [userMap, setUserMap] = useState({});

  //React Hook form 
  const form = useForm();
  const { register, control, handleSubmit, formState, reset, watch, validate, setValue } = form;
  const { errors } = formState;

  const getCurrentYear = () => {
    return new Date().getFullYear(); // Get current year
  };
  const currentYear = getCurrentYear();

  const navigate = useNavigate();
  
  const formatDate = (timestamp) => {
    // Parse the timestamp string into a Date object
    const date = new Date(timestamp);
  
    // Get month name
    const monthNames = [
      "January", "February", "March", "April", "May", "June", 
      "July", "August", "September", "October", "November", "December"
    ];
    const month = monthNames[date.getMonth()];
  
    // Get day and year
    const day = date.getDate();
    const year = date.getFullYear();
  
    // Get hours and minutes
    let hours = date.getHours();
    const minutes = date.getMinutes();
  
    // Convert hours to 12-hour format and determine AM/PM
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // Handle midnight (0 hours)
  
    // Pad minutes with leading zero if needed
    const paddedMinutes = minutes < 10 ? '0' + minutes : minutes;
  
    // Construct the formatted date string
    const formattedDate = `${month} ${day}, ${year} - ${hours}:${paddedMinutes} ${ampm}`;
  
    return formattedDate;
  };

  useEffect(() => {
    const fetchAlumniData = async () => {
      const authToken = getAuthToken();
      const config = {
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      };

      try {
        const response = await axios.get('/api/scholar-alumni-documents', config);

        if (response.status === 200) {
          setUpdateData(response.data.data);
        }
        else {
          setErrorOpen(true);
          setErrorMessage('Failed to fetch alumni data');
        }

        setLoading(false);
      
      }
      catch (error) {
        if (error.response?.status === 401) {
          navigate('/login');
        }
        else {
          setErrorOpen(true);
          setErrorMessage('Failed to fetch alumni data');
        }
      }
    };

    fetchAlumniData();
  }, []);



  useEffect(() => {
    const fetchScholarData = async () => {
      setLoading(true);
      setLoadingMessage('Fetching Alumni Submission...');
      const authToken = getAuthToken();
      const config = {
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      };

      try {
        const response = await axios.get('/api/scholarsProfile', config);

        if (response.status === 200) {
          setUserData(response.data.data);
        } else {
          setErrorOpen(true);
          setErrorMessage('Failed to fetch scholar data');
        }

        setLoading(false);


      } catch (error) {
        if (error.response?.status === 401) {
          navigate('/login');
        } else {
          setErrorOpen(true);
          setErrorMessage('Failed to fetch scholar data');
        }

        setLoading(false);
        setErrorOpen(true);
        setErrorMessage('Failed to fetch scholar data');
      }
    };

    fetchScholarData();

  }, []);

  useEffect(() => {
    const fetchUserMap = async () => {
      const authToken = getAuthToken(); // Assuming you have a function to get the authentication token
      const config = {
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      };

      try {
        const response = await axios.get('/api/users', config);
        const usersData = response.data.data;

        // Create a user map from user IDs to user names
        const newUserMap = {};
        usersData.forEach(user => {
          newUserMap[user.id] = `${user.first_name} ${user.last_name}`;
        });

        setUserMap(newUserMap);
      } catch (error) {
        setErrorOpen(true);
        setErrorMessage('Failed to fetch user data');
      }
    };

    fetchUserMap();
  }, []);
  
  const onSubmitAlumniForm = async (data, event) => {
    event.preventDefault();
    setLoading(true);
    setLoadingMessage('Submitting Alumni Form...');
    const authToken = getAuthToken();
  
    const config = {
      headers: {
        "Content-type": "application/json",
        "Authorization": `Bearer ${authToken}`
      }
    };
  
    console.log("userData:", updateData);
    console.log("currentYear:", currentYear);
  
    try {
      const submissionStatus = updateData[0].submission_status;

      console.log("submissionStatus:", submissionStatus);
  
      const alumniEdit = submissionStatus === "For Resubmission";
  
      if (alumniEdit) {
        console.log("Submitting as resubmission...");
        const response = await axios.put(`/api/alumni-form/${userData.alumni[currentYear].id}`, { ...data }, config);
      } else {
        console.log("Submitting as new submission...");
        const alumniFormData = {
          year_submitted: data.year_submitted,
          company_name: data.company_name,
          company_location: data.company_location,
          position_in_company: data.position_in_company,
          licensure_exam_type: data.licensure_exam_type,
          exam_passed_date: data.exam_passed_date,
          volunteer_group_name: data.volunteer_group_name,
          yr_volunteered: data.yr_volunteered
        };
  
        const alumniResponse = await axios.post(
          '/api/alumni-form',
          JSON.stringify(alumniFormData),
          config
        );
  
      }
  
      setLoading(false);
      form.reset(FormValues);
  
      const scholarProfile = await axios.get('/api/scholarsProfile', config);
      setUserData(scholarProfile.data.data);
      setLoading(false);
      handleCloseConfirmationModal();
      setAlertOpen(true);
      setAlertMessage('Alumni Submission submitted successfully');
  
    } catch (error) {
      setLoading(false);
      setErrorOpen(true);
      setErrorMessage('Failed to submit Alumni Form');
    }
  };
  
  
  

  // const onSubmitAlumniForm = async (data, event) => {
  //   event.preventDefault();
  //   setLoading(true);
  //   setLoadingMessage('Submitting Alumni Form...');
  //   const authToken = getAuthToken();

  //   try {
  //     const config = {
  //       headers: {
  //         "Content-type": "application/json",
  //         "Authorization": `Bearer ${authToken}`
  //       }
  //     };

  //     const alumniFormData = {
  //       year_submitted: data.year_submitted,
  //       company_name: data.company_name,
  //       company_location: data.company_location,
  //       position_in_company: data.position_in_company,
  //       licensure_exam_type: data.licensure_exam_type,
  //       exam_passed_date: data.exam_passed_date,
  //       volunteer_group_name: data.volunteer_group_name,
  //       yr_volunteered: data.yr_volunteered
  //     };


  //     const alumniResponse = await axios.post(
  //       '/api/alumni-form',
  //       JSON.stringify(alumniFormData),
  //       config
  //     );

  //     setLoading(false);
  //     form.reset(FormValues);

  //     const scholarProfile = await axios.get('/api/scholarsProfile', config);
  //     setUserData(scholarProfile.data.data);
  //     setLoading(false);
  //     handleCloseConfirmationModal();
  //     setAlertOpen(true);
  //     setAlertMessage('Alumni Submission submitted successfully');

  //   } catch (error) {
  //     setLoading(false);
  //     setErrorOpen(true);
  //     setErrorMessage('Failed to submit Alumni Form');
  //   }

  // };




  const hasAlumniSubmission = () => { 
    const alumniData = userData.alumni[currentYear];
    if (alumniData && alumniData.length > 0) {
      for (const entry of alumniData) {
        if (entry.submission_status === 'For Approval' || entry.submission_status === 'Approved') {
          return true;
        }
      }
      return false;

    }
    return false;
  }


  const isDisabled = userData.scholar_status_id !== 7 ;
  

  return (
    <Layout>
      <MUI.ThemeProvider theme={theme}>
        <MUI.Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <MUI.Grid container spacing={3}>

            <MUI.Grid component="form" method='post' noValidate container spacing={3} sx={{ mt: 2, ml: 2, display: 'flex' }}
              onSubmit={handleSubmit(onSubmitAlumniForm)} >

              {isDisabled ? (
                <MUI.Grid item xs={12}>
                    <MUI.Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} alignItems={{ xs: 'left', md: 'center' }} margin={2} justifyContent="space-between">
                      <MUI.Typography variant="h1" id="tabsTitle" sx={{ color: 'black' }}>
                        Alumni Submission
                      </MUI.Typography>

                      <MUI.Grid sx={{ display: 'flex', alignItems: 'center' }} gap={4} xs={6}>
                        <MUI.Grid id="schoolYearGrid">
                          <MUI.InputLabel htmlFor="year_submitted" id="schoolYearLabel"></MUI.InputLabel>
                          <Controller
                            name="year_submitted"
                            id="year_submitted"
                            control={control}
                            defaultValue={currentYear}
                            render={({ field }) => (
                              <MUI.Select
                                native
                                {...field}
                                disabled
                                sx={{
                                  border: '1px solid rgba(0,0,0,0.2)',
                                  boxShadow: '11px 7px 15px -3px rgba(0,0,0,0.1)',
                                  borderRadius: '15px',
                                  height: '50px'
                                }}
                              >
                                <option value={currentYear}>{` Year ${currentYear}`}</option>
                              </MUI.Select>
                            )}
                          />
                        </MUI.Grid>
                      </MUI.Grid>

                      {/* Submission History button */}
                      <MUI.Button variant="contained" component={Link} to="" id="addButton" onClick={handleOpenHistoryModal}>
                        <HistoryIcon sx={{ mr: 1 }} />
                        <MUI.Typography variant="body2">Submission history</MUI.Typography>
                      </MUI.Button>

                    </MUI.Box>
                  <MUI.Grid item xs={12}>

                    <MUI.Typography variant='h1' sx={{
                      color: '#565369',
                      fontWeight: 'bold',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      textAlign: 'center',
                      height: '70vh' // Optional: You can adjust the height of the Typography component
                    }}>
                      You are still not allowed to submit an alumni submission based on your Scholar Status. 😊
                    </MUI.Typography>
                  </MUI.Grid>
                </MUI.Grid>
              ) : (

                <>
                   {hasAlumniSubmission() ? (
                  <MUI.Grid item xs={12}>
                    <MUI.Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} alignItems={{ xs: 'left', md: 'center' }} margin={2} justifyContent="space-between">
                      <MUI.Typography variant="h1" id="tabsTitle" sx={{ color: 'black' }}>
                        Alumni Submission
                      </MUI.Typography>

                      <MUI.Grid sx={{ display: 'flex', alignItems: 'center' }} gap={4} xs={6}>
                        <MUI.Grid id="schoolYearGrid">
                          <MUI.InputLabel htmlFor="year_submitted" id="schoolYearLabel"></MUI.InputLabel>
                          <Controller
                            name="year_submitted"
                            id="year_submitted"
                            control={control}
                            defaultValue={currentYear}
                            render={({ field }) => (
                              <MUI.Select
                                native
                                {...field}
                                disabled
                                sx={{
                                  border: '1px solid rgba(0,0,0,0.2)',
                                  boxShadow: '11px 7px 15px -3px rgba(0,0,0,0.1)',
                                  borderRadius: '15px',
                                  height: '50px'
                                }}
                              >
                                <option value={currentYear}>{` Year ${currentYear}`}</option>
                              </MUI.Select>
                            )}
                          />
                        </MUI.Grid>
                      </MUI.Grid>

                      {/* Submission History button */}
                      <MUI.Button variant="contained" component={Link} to="" id="addButton" onClick={handleOpenHistoryModal}>
                        <HistoryIcon sx={{ mr: 1 }} />
                        <MUI.Typography variant="body2">Submission history</MUI.Typography>
                      </MUI.Button>

                    </MUI.Box>
                    <MUI.Grid item xs={12}>
                      <MUI.Typography variant='h1' sx={{
                        color: '#565369',
                        fontWeight: 'bold',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textAlign: 'center',
                        height: '70vh' // Optional: You can adjust the height of the Typography component
                      }}>
                        Thanks for submitting the Alumni Form. 😊
                      </MUI.Typography>
                    </MUI.Grid>
                  </MUI.Grid>
                ) : (
                <>

                  <MUI.Grid container spacing={3} sx={{ mt: 2, ml: 2, display: 'flex' }}>


                  <MUI.Grid item xs={12}>
                    <MUI.Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} alignItems={{ xs: 'left', md: 'center' }} margin={2} justifyContent="space-between">
                      <MUI.Typography variant="h1" id="tabsTitle" sx={{ color: 'black' }}>
                        Alumni Submission
                      </MUI.Typography>

                      <MUI.Grid sx={{ display: 'flex', alignItems: 'center' }} gap={4} xs={6}>
                        <MUI.Grid id="schoolYearGrid">
                          <MUI.InputLabel htmlFor="year_submitted" id="schoolYearLabel"></MUI.InputLabel>
                          <Controller
                            name="year_submitted"
                            id="year_submitted"
                            control={control}
                            defaultValue={currentYear}
                            render={({ field }) => (
                              <MUI.Select
                                native
                                {...field}
                                disabled
                                sx={{
                                  border: '1px solid rgba(0,0,0,0.2)',
                                  boxShadow: '11px 7px 15px -3px rgba(0,0,0,0.1)',
                                  borderRadius: '15px',
                                  height: '50px'
                                }}
                              >
                                <option value={currentYear}>{` Year ${currentYear}`}</option>
                              </MUI.Select>
                            )}
                          />
                        </MUI.Grid>
                      </MUI.Grid>

                      {/* Submission History button */}
                      <MUI.Button variant="contained" component={Link} to="" id="addButton" onClick={handleOpenHistoryModal}>
                        <HistoryIcon sx={{ mr: 1 }} />
                        <MUI.Typography variant="body2">Submission history</MUI.Typography>
                      </MUI.Button>

                    </MUI.Box>
                    </MUI.Grid>
                    <MUI.Grid item xs={12} md={4} mt={5}>

                      <MUI.Grid container spacing={3}>

                        <MUI.Grid item xs={12}>
                          <MUI.InputLabel htmlFor="company_name" id="currentCompanyLabel">1. Current Company Name</MUI.InputLabel>

                          <MUI.TextField
                            id='company_name'
                            placeholder="Company Name"
                            fullWidth
                            margin="normal"
                            sx={{
                              background: '#f5f5f5',
                              color: '#00000',
                              marginLeft: 2,
                              height: 'auto',
                              marginBottom: 2,
                            }}
                            {...register("company_name", {
                              required: {
                                value: true,
                                message: 'Company Name is required',
                              }
                            })}
                          />
                          {errors.company_name && (
                            <p id='errMsg'>
                              <MUI.InfoIcon className='infoErr' />
                              {errors.company_name?.message}
                            </p>
                          )}
                        </MUI.Grid>

                        <MUI.Grid item xs={12}>
                          <MUI.InputLabel htmlFor="company_location" id="currentCompanyLocationLabel">2. Current Company Address</MUI.InputLabel>

                          <MUI.TextField
                            id='company_location'
                            placeholder="Company Full Address"
                            fullWidth
                            margin="normal"
                            sx={{
                              background: '#f5f5f5',
                              color: '#00000',
                              marginLeft: 2,
                              height: 'auto',
                              marginBottom: 2,
                            }}
                            {...register("company_location", {
                              required: {
                                value: true,
                                message: 'Company Location is required',
                              }
                            })}
                          />

                          {errors.company_location && (
                            <p id='errMsg'>
                              <MUI.InfoIcon className='infoErr' />
                              {errors.company_location?.message}
                            </p>
                          )}
                        </MUI.Grid>

                        <MUI.Grid item xs={12}>
                          <MUI.InputLabel htmlFor="position_in_company" id="currentJobLabel">3. Current Job Position</MUI.InputLabel>

                          <MUI.TextField
                            id='position_in_company'
                            placeholder="Job Position"
                            fullWidth
                            margin="normal"
                            sx={{
                              background: '#f5f5f5',
                              color: '#00000',
                              marginLeft: 2,
                              height: 'auto',
                              marginBottom: 2,
                            }}
                            {...register("position_in_company", {
                              required: {
                                value: true,
                                message: 'Job Position is required',
                              }
                            })}
                          />

                          {errors.position_in_company && (
                            <p id='errMsg'>
                              <MUI.InfoIcon className='infoErr' />
                              {errors.position_in_company?.message}
                            </p>
                          )}
                        </MUI.Grid>

                        <MUI.Grid item xs={12}>
                          <MUI.InputLabel htmlFor="licensure_exam_type" id="licensureExamLabel">4. Licensure Exam Type (If you take it)</MUI.InputLabel>

                          <MUI.TextField
                            id='licensure_exam_type'
                            placeholder="BAR, CPA, Board, and etc."
                            fullWidth
                            margin="normal"
                            sx={{
                              background: '#f5f5f5',
                              color: '#00000',
                              marginLeft: 2,
                              height: 'auto',
                              marginBottom: 2,
                            }}
                            {...register("licensure_exam_type", {
                              required: {
                                value: false,
                                message: 'Licensure Exam Type is required',
                              }
                            })}
                          />

                          {errors.licensure_exam_type && (
                            <p id='errMsg'>
                              <MUI.InfoIcon className='infoErr' />
                              {errors.licensure_exam_type?.message}
                            </p>
                          )}
                        </MUI.Grid>

                      </MUI.Grid>

                    </MUI.Grid>

                    <MUI.Grid item xs={12} md={4}>

                      <MUI.Grid container spacing={3} mt={2}>
                        <MUI.Grid item xs={12}>
                          <MUI.InputLabel htmlFor="exam_passed_date" id="examDateLabel">5. Exam Passed Date </MUI.InputLabel>

                          <MUI.TextField
                            id='exam_passed_date'
                            type='date'
                            fullWidth
                            margin="normal"
                            sx={{
                              background: '#f5f5f5',
                              color: '#00000',
                              marginLeft: 2,
                              height: 'auto',
                              marginBottom: 2,
                            }}
                            {...register("exam_passed_date", {
                              required: {
                                value: watch("licensure_exam_type") !== "" ? true : false,
                                message: 'Exam Passed Date is required when Licensure Exam Type is filled',
                              }
                            })}
                            disabled={watch("licensure_exam_type") === ""} // Disable the field if licensure_exam_type is empty
                          />

                          {errors.exam_passed_date && (
                            <p id='errMsg'>
                              <MUI.InfoIcon className='infoErr' />
                              {errors.exam_passed_date?.message}
                            </p>
                          )}
                        </MUI.Grid>

                        <MUI.Grid item xs={12}>
                          <MUI.InputLabel htmlFor="volunteer_group_name" id="volunteerGroupLabel">6. Volunteer Group Name (If you volunteered)</MUI.InputLabel>

                          <MUI.TextField
                            id='volunteer_group_name'
                            placeholder="GJJSP Volunteer Group"
                            fullWidth // Make the text field take up the full width
                            margin="normal" // Adjust spacing as needed
                            sx={{
                              background: '#f5f5f5',
                              color: '#00000',
                              marginLeft: 2,
                              height: 'auto',
                              marginBottom: 2,
                            }}

                            {...register("volunteer_group_name", {
                              required: {
                                value: false,
                              }
                            })}
                          />

                          {errors.volunteer_group_name && (
                            <p id='errMsg'>
                              <MUI.InfoIcon className='infoErr' />
                              {errors.volunteer_group_name?.message}
                            </p>
                          )}
                        </MUI.Grid>

                        <MUI.Grid item xs={12}>
                          <MUI.InputLabel htmlFor="yr_volunteered" id="yearVolunteerLabel">7. Year Volunteered (Optional)</MUI.InputLabel>

                          <MUI.TextField
                            id='yr_volunteered'
                            placeholder="2024"
                            fullWidth // Make the text field take up the full width
                            margin="normal" // Adjust spacing as needed
                            sx={{
                              background: '#f5f5f5',
                              color: '#00000',
                              marginLeft: 2,
                              height: 'auto',
                              marginTop: 2,
                            }}
                            {...register("yr_volunteered", {
                              required: {
                                value: watch("volunteer_group_name") !== "" ? true : false,
                                message: 'Year Volunteered is required when Volunteer Group Name is filled',
                              }
                            })}
                            disabled={watch("volunteer_group_name") === ""}
                          />
                        </MUI.Grid>

                      </MUI.Grid>

                    </MUI.Grid>

                    <MUI.Grid item xs={12} sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>

                      <MUI.Box sx={{ ml: 1 }}>

                        <MUI.Button variant='contained' sx={{ mb: { xs: 1, sm: 0 } }}
                        onClick={handleOpenConfirmationModal}
                        >
                          Submit
                        </MUI.Button>

                      </MUI.Box>

                    </MUI.Grid>

                  </MUI.Grid>
                  </>
                )}
            </>
        )}

          {/* Confirmation Modal */}
          <MUI.Dialog open={modalConfirmation} onClose={handleCloseConfirmationModal}>
            <MUI.DialogTitle id="dialogTitle" mt={2}>
            Confirmation Heads Up
            </MUI.DialogTitle>
            <MUI.DialogContent>
              <MUI.Typography variant='h5' ml={1} sx={{color: '#44546F'}}>
                You're about to submit your Alumni form. Are you sure you want to proceed?
              </MUI.Typography>
            </MUI.DialogContent>
            
            <MUI.DialogActions>
              <MUI.Button onClick={handleCloseConfirmationModal}>Cancel</MUI.Button>
              <MUI.Button onClick={handleSubmit(onSubmitAlumniForm)} variant='contained'>
                Submit
              </MUI.Button>
            </MUI.DialogActions>
          </MUI.Dialog>

          {/* History Modal */}

          <MUI.Dialog open={modalHistory} onClose={handleCloseHistoryModal} maxWidth='md'>
            <MUI.DialogTitle id="dialogTitle" mt={2}>
              Submission History
            </MUI.DialogTitle>

            <MUI.DialogContent>
            <MUI.TableContainer>
              <MUI.Table>
                <MUI.TableHead>
                  <MUI.TableRow>
                    <MUI.TableCell>Submission</MUI.TableCell>
                    <MUI.TableCell>Submitted Date</MUI.TableCell>
                    <MUI.TableCell>Status</MUI.TableCell>
                    <MUI.TableCell>Updated By</MUI.TableCell>
                  </MUI.TableRow>
                </MUI.TableHead>
                <MUI.TableBody>
                {userData.alumni && Object.entries(userData.alumni).map(([schoolYear, submissions]) => (
                    submissions
                      .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
                      .map((submission, index) => (
                        <MUI.TableRow key={index}>
                          <MUI.TableCell>Alumni Submission</MUI.TableCell>
                          <MUI.TableCell>{formatDate(submission.updated_at)}</MUI.TableCell>
                          <MUI.TableCell>{submission.submission_status}</MUI.TableCell>
                          <MUI.TableCell>{userMap[submission.updated_by] || 'Not yet updated'}</MUI.TableCell>
                        </MUI.TableRow>
                      ))
                  ))
                }
              </MUI.TableBody>
              </MUI.Table>
            </MUI.TableContainer>
            
            </MUI.DialogContent>

            <MUI.DialogActions>
              <MUI.Button onClick={handleCloseHistoryModal} variant='contained'>Close</MUI.Button>
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



              <DevTool control={control} />
            </MUI.Grid>

          </MUI.Grid>

        </MUI.Container>
      </MUI.ThemeProvider>
    </Layout>
  );
}
