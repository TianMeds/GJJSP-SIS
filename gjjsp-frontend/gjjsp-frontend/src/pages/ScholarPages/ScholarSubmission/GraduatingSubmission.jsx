import React, {useState, useEffect} from 'react';
import * as MUI from '../../../import';
import Layout from '../../../component/Layout/SidebarNavbar/Layout';
import { Link, useNavigate } from 'react-router-dom';
import theme from '../../../context/theme';
import HistoryIcon from '@mui/icons-material/History';
import axios from '../../../api/axios';

import useLoginStore from '../../../store/LoginStore';
import useAuthStore from '../../../store/AuthStore';
import useSubmissionStore from '../../../store/SubmissionStore';

import {useForm, Controller } from 'react-hook-form';
import { DevTool } from "@hookform/devtools";

const FormValues = {
  schoolGraduated: '',
  addressSchool: '',
  futurePlan: '',
  copyOfReportCard: null,
  copyOfRegistrationForm: null,
  scannedWrittenEssay: null,
  letterOfGratitude: null,
  statementOfAccount: null,
  graduationPicture: null,
  transcriptOfRecords: null,
}

const CONTACT_REGEX = /^\d{10}$/;

export default function GraduatingSubmission() {

  // Zustand Store
  const {setCopyOfReportCardGraduating,  setCopyOfRegistrationFormGraduating,  setScannedWrittenEssayGraduating,  setLetterOfGratitudeGraduating,setStatementOfAccount,  setGraduationPicture,  setTranscriptOfRecords, userData, setUserData, modalConfirmation, setModalConfirmation, handleOpenConfirmationModal, handleCloseConfirmationModal, modalHistory, setModalHistory, handleOpenHistoryModal, handleCloseHistoryModal} = useSubmissionStore();

  const {getAuthToken, alertOpen, alertMessage, setAlertOpen, setAlertMessage, errorOpen, setErrorOpen, setErrorMessage, errorMessage} = useAuthStore();

  const {setLoading, setLoadingMessage} = useLoginStore();

  const [schoolYear, setSchoolYear] = useState('');
  const [userMap, setUserMap] = useState({});
  
  //React Hook form 
  const form  = useForm();
  const { register, control, handleSubmit, formState, reset, watch, validate, setValue} = form
  const { errors } = formState;

  const navigate = useNavigate();

  const handleFileChange = (e, fileType) => {
    const files = e.target.files;
    const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];

    if (!files || files.length === 0) {
      return;
    }

    const file = files[0];

    if (!allowedTypes.includes(file.type)) {
      console.log('Invalid file type');
      return;
    }

    setError(null);

    if (fileType === 'copyOfReportCard') {
      setCopyOfReportCardGraduating(file);
    } else if (fileType === 'copyOfRegistrationForm') {
      setCopyOfRegistrationFormGraduating(file);
    } else if (fileType === 'scannedWrittenEssay') {
      setScannedWrittenEssayGraduating(file);
    } else if (fileType === 'letterOfGratitude') {
      setLetterOfGratitudeGraduating(file);
    } else if (fileType === 'statementOfAccount') {
      setStatementOfAccount(file);
    }
    else if (fileType === 'graduationPicture') {
      setGraduationPicture(file);
    }
    else if (fileType === 'transcriptOfRecords') {
      setTranscriptOfRecords(file);
    }
    
  };

  const onSubmitGraduatingForm = async (data, event ) => {
    event.preventDefault();
    setLoading(true);
    setLoadingMessage('Submitting Graduating Form...');

    const formData = new FormData();
    formData.append('graduateName', data.graduateName);
    formData.append('schoolGraduated', data.schoolGraduated);
    formData.append('addressSchool', data.addressSchool);
    formData.append('yearEnteredGraduated', data.yearEnteredGraduated);
    formData.append('program', data.program);
    formData.append('street', data.street);
    formData.append('user_email_address', data.user_email_address);
    formData.append('user_mobile_num', data.user_mobile_num);
    formData.append('futurePlan', data.futurePlan);
    formData.append('school_yr_submitted', data.school_yr_submitted);
    formData.append('copyOfReportCard', data.copyOfReportCard[0]);
    formData.append('copyOfRegistrationForm', data.copyOfRegistrationForm[0]);
    formData.append('scannedWrittenEssay', data.scannedWrittenEssay[0]);
    formData.append('letterOfGratitude', data.letterOfGratitude[0]);
    formData.append('statementOfAccount', data.statementOfAccount[0]);
    formData.append('graduationPicture', data.graduationPicture[0]);
    formData.append('transcriptOfRecords', data.transcriptOfRecords[0]);

    const authToken = getAuthToken();
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${authToken}`
      }
    }

    try{
      const response = await axios.post('/api/graduating-documents', formData, config);
      setCopyOfRegistrationFormGraduating(null);
      setCopyOfReportCardGraduating(null);
      setScannedWrittenEssayGraduating(null);
      setLetterOfGratitudeGraduating(null);
      setStatementOfAccount(null);
      setGraduationPicture(null);
      setTranscriptOfRecords(null);
      form.reset(FormValues);

      const scholarProfile = await axios.get('/api/scholarsProfile', config);
      setUserData(scholarProfile.data.data);
      setLoading(false);
      handleCloseConfirmationModal();
      setAlertOpen(true);
      setAlertMessage('Graduating Submission submitted successfully');
    }
    catch(error){
      setErrorOpen(true);
      
      setLoading(false);
      setErrorMessage('Failed to submit renewal form');
      setErrorOpen(true);
    }
  };

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
    const fetchScholarData = async () => {
      setLoading(true);
      setLoadingMessage('Fetching Scholar Data...');
      const authToken = getAuthToken();
      const config = {
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      }

      try {
        const response = await axios.get('/api/scholarsProfile', config);  

        if (response.status === 200) {
          setUserData(response.data.data);
        }
        else {
          setErrorOpen(true);
          setErrorMessage('Failed to fetch scholar data');
        }

        setLoading(false);

        
      } catch (error) {
        if (error.response?.status === 401) {
          navigate('/login');
        }
        else {
          setErrorOpen(true);
          setErrorMessage('Failed to fetch scholar data');
        }
        
        setLoading(false);
        setErrorOpen(true);
        setErrorMessage('Failed to fetch scholar data');
      }
    }

    fetchScholarData();
  
  }, []);

    
  const getCurrentSchoolYear = () => {
    const currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();

    const startYear = currentMonth < 4 ? currentYear - 1 : currentYear;
    const endYear = startYear + 1;

    return `${startYear}-${endYear}`;
  }

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

  const currentSchoolYear = getCurrentSchoolYear();
   
  const hasGraduatingSubmission = () => {
    const graduatingData = userData.graduating[currentSchoolYear];
    if (graduatingData && graduatingData.length > 0) {
        for (const entry of graduatingData) {
            if (entry.submission_status === 'For Approval' || entry.submission_status === 'Approved') {
                return true; // Disable the form if there is a submission for approval
            }
        }
        return false; // No submission for approval found, enable the form
    }
    return false; // No data found, disable the form
};








  const isDisabled = userData.scholar_status_id !== 5; 


  return (
    <Layout>
    <MUI.ThemeProvider theme={theme}>
      <MUI.Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <MUI.Grid container spacing={3}>
          <MUI.Grid component="form"  method='post' noValidate container spacing={3} sx={{ mt: 2, ml: 2, display: 'flex' }} 
              onSubmit={handleSubmit(onSubmitGraduatingForm)} encType="multipart/form-data">

        {isDisabled ?  (
          <MUI.Grid item xs={12}>
            <MUI.Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} alignItems={{xs: 'left', md: 'center'}} margin={2} justifyContent="space-between">
              <MUI.Typography variant="h1" id="tabsTitle" sx={{ color: 'black' }}>
                Graduating Submission
              </MUI.Typography>
              
              <MUI.Grid sx={{display: 'flex', alignItems: 'center'}} gap={4} xs={6}>
                
              <MUI.Grid id="schoolYearGrid">
                <MUI.InputLabel htmlFor="school_yr_submitted" id="schoolYearLabel"></MUI.InputLabel>
                  <Controller
                    name="school_yr_submitted"
                    id="school_yr_submitted"
                    control={control}
                    defaultValue={currentSchoolYear}
                    render={({ field }) => (
                      <MUI.Select
                        native
                        {...field}
                        sx={{border: '1px solid rgba(0,0,0,0.2)',
                        boxShadow: '11px 7px 15px -3px rgba(0,0,0,0.1)', borderRadius: '15px', height: '50px'}}
                        disabled // Disable the select field
                      >
                        <option value={currentSchoolYear}>{`SY ${currentSchoolYear}`}</option>
                      </MUI.Select>
                    )}
                  />
              </MUI.Grid>

              </MUI.Grid>

              {/* Submission History button */}
              <MUI.Button variant="contained" component={Link} to="" id="addButton">
                <HistoryIcon sx={{ mr: 1 }} />
                <MUI.Typography variant="body2" onClick={handleOpenHistoryModal}>Submission history</MUI.Typography>
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
                  You are still not allowed to submit a graduating submission based on your Scholar Status. 😊
              </MUI.Typography>
            </MUI.Grid>
          </MUI.Grid>
        ) : (

          <>
          {hasGraduatingSubmission() ? (
            <MUI.Grid item xs={12}>
              <MUI.Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} alignItems={{xs: 'left', md: 'center'}} margin={2} justifyContent="space-between">
                <MUI.Typography variant="h1" id="tabsTitle" sx={{ color: 'black' }}>
                  Graduating Submission
                </MUI.Typography>
                
                <MUI.Grid sx={{display: 'flex', alignItems: 'center'}} gap={4} xs={6}>
                  
                <MUI.Grid id="schoolYearGrid">
                  <MUI.InputLabel htmlFor="school_yr_submitted" id="schoolYearLabel"></MUI.InputLabel>
                    <Controller
                      name="school_yr_submitted"
                      id="school_yr_submitted"
                      control={control}
                      defaultValue={currentSchoolYear}
                      render={({ field }) => (
                        <MUI.Select
                          native
                          {...field}
                          sx={{border: '1px solid rgba(0,0,0,0.2)',
                          boxShadow: '11px 7px 15px -3px rgba(0,0,0,0.1)', borderRadius: '15px', height: '50px'}}
                          disabled // Disable the select field
                        >
                          <option value={currentSchoolYear}>{`SY ${currentSchoolYear}`}</option>
                        </MUI.Select>
                      )}
                    />
                </MUI.Grid>

                </MUI.Grid>

                {/* Submission History button */}
                <MUI.Button variant="contained" component={Link} to="" id="addButton">
                  <HistoryIcon sx={{ mr: 1 }} />
                  <MUI.Typography variant="body2" onClick={handleOpenHistoryModal}>Submission history</MUI.Typography>
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
                  Thanks for submitting the Gradauating Directory Form. 😊
                </MUI.Typography>
              </MUI.Grid>

            </MUI.Grid>
        ) : (
          <>
              <MUI.Grid  container spacing={3} sx={{ mt: 2, ml: 2, display: 'flex' }}> 
           
                <MUI.Grid item xs={12} md={12}>

                  <MUI.Grid container spacing={3}>

                  <MUI.Grid item xs={12}>
                    <MUI.Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} alignItems={{xs: 'left', md: 'center'}} margin={2} justifyContent="space-between">
                      <MUI.Typography variant="h1" id="tabsTitle" sx={{ color: 'black' }}>
                        Graduating Submission
                      </MUI.Typography>
                      
                      <MUI.Grid sx={{display: 'flex', alignItems: 'center'}} gap={4} xs={6}>
                        
                      <MUI.Grid id="schoolYearGrid">
                        <MUI.InputLabel htmlFor="school_yr_submitted" id="schoolYearLabel"></MUI.InputLabel>
                          <Controller
                            name="school_yr_submitted"
                            id="school_yr_submitted"
                            control={control}
                            defaultValue={currentSchoolYear}
                            render={({ field }) => (
                              <MUI.Select
                                native
                                {...field}
                                sx={{border: '1px solid rgba(0,0,0,0.2)',
                                boxShadow: '11px 7px 15px -3px rgba(0,0,0,0.1)', borderRadius: '15px', height: '50px'}}
                                disabled // Disable the select field
                              >
                                <option value={currentSchoolYear}>{`SY ${currentSchoolYear}`}</option>
                              </MUI.Select>
                            )}
                          />
                      </MUI.Grid>

                      </MUI.Grid>

                      {/* Submission History button */}
                      <MUI.Button variant="contained" component={Link} to="" id="addButton">
                        <HistoryIcon sx={{ mr: 1 }} />
                        <MUI.Typography variant="body2" onClick={handleOpenHistoryModal}>Submission history</MUI.Typography>
                      </MUI.Button>

                    </MUI.Box>
                  </MUI.Grid>

                  {/* Left Column */}
                  <MUI.Grid item xs={12} sm={6}>
                    <MUI.Grid item xs={12}>
                      <MUI.InputLabel htmlFor="graduateName" id="graduateNameLabel">1. Graduate Name</MUI.InputLabel>
                      
                      <MUI.TextField
                        id="graduateName"
                        placeholder="Graduate Name"
                        fullWidth 
                        margin="normal" 
                        disabled
                        sx={{
                          background: '#f5f5f5',
                          color: '#00000',
                          marginLeft: 2,
                          height: 'auto',
                          marginBottom: 2,
                        }}
                        value={`${userData?.user_first_name || ''} ${userData?.user_middle_name || ''} ${userData?.user_last_name || ''}`}
                        {...register("graduateName", {
                          required: {
                              value: false,
                              message: 'Graduate Name is required',
                          }
                        })}
                      />
                      

                        {errors.graduateName && (
                          <p id='errMsg'>
                              <MUI.InfoIcon className='infoErr' />
                              {errors.graduateName?.message}
                          </p>
                        )}
                    </MUI.Grid>

                    <MUI.Grid item xs={12}>
                      <MUI.InputLabel htmlFor="schoolGraduated" id="schoolGraduatedLabel">2. School Graduating</MUI.InputLabel>
                      
                      <MUI.TextField
                        id="schoolGraduated"
                        placeholder="School Graduated"
                        fullWidth 
                        margin="normal"
                        sx={{
                          background: '#f5f5f5',
                          color: '#00000',
                          marginLeft: 2,
                          height: 'auto',
                          marginBottom: 2,
                        }}
                        {...register("schoolGraduated", {
                          required: {
                              value: true,
                              message: 'School Graduated is required',
                          }
                        })}
                      />

                        {errors.schoolGraduated && (
                          <p id='errMsg'>
                              <MUI.InfoIcon className='infoErr' />
                              {errors.schoolGraduated?.message}
                          </p>
                        )}
                    </MUI.Grid>

                    <MUI.Grid item xs={12}>
                      <MUI.InputLabel htmlFor="addressSchool" id="addressSchoolLabel">3. School Address</MUI.InputLabel>
                      
                      <MUI.TextField
                        id="addressSchool"
                        placeholder="Address School "
                        fullWidth 
                        margin="normal"
                        sx={{
                          background: '#f5f5f5',
                          color: '#00000',
                          marginLeft: 2,
                          height: 'auto',
                          marginBottom: 2,
                        }}
                        {...register("addressSchool", {
                          required: {
                              value: true,
                              message: 'Address School is required',
                          }
                        })}
                      />

                        {errors.addressSchool && (
                          <p id='errMsg'>
                              <MUI.InfoIcon className='infoErr' />
                              {errors.addressSchool?.message}
                          </p>
                        )}
                    </MUI.Grid>

                    <MUI.Grid item xs={12}>
                      <MUI.InputLabel htmlFor="yearEnteredGraduated" id="yearEnteredGraduatedLabel">4. Year Entered & Graduated</MUI.InputLabel>
                      
                      <MUI.TextField
                          id="yearEnteredGraduated"
                          placeholder="Year Entered & Graduated"
                          fullWidth 
                          margin="normal"
                          disabled
                          sx={{
                            background: '#f5f5f5',
                            color: '#00000',
                            marginLeft: 2,
                            height: 'auto',
                            marginBottom: 2,
                          }}
                          value={`${userData.school_yr_started || ''} - ${userData.school_yr_graduated || 'Please fill up your profile for this field'}`}
                          {...register("yearEnteredGraduated", {
                            required: {
                                value: false,
                                message: 'Year Entered and Graduated is required',
                            }
                          })}
                      />

                        {errors.yearEnteredGraduated && (
                          <p id='errMsg'>
                              <MUI.InfoIcon className='infoErr' />
                              {errors.yearEnteredGraduated?.message}
                          </p>
                        )}

                    </MUI.Grid>


                    <MUI.Grid item xs={12}>
                      <MUI.InputLabel htmlFor="program" id="programLabel">5. College Course</MUI.InputLabel>
                      
                      <MUI.TextField
                          id="program"
                          placeholder='College Course'
                          fullWidth 
                          margin='normal'
                          disabled
                          sx={{
                            background: '#f5f5f5',
                            color: '#00000',
                            marginLeft: 2,
                            height: 'auto',
                            marginBottom: 2,
                          }}
                          value={userData?.program || 'Please fill up your profile for this field'}
                          {...register("program", {
                            required: {
                                value: false,
                                message: 'College Course is required',
                            }
                          })}
                      />

                        {errors.program && (
                          <p id='errMsg'>
                              <MUI.InfoIcon className='infoErr' />
                              {errors.program?.message}
                          </p>
                        )}

                    </MUI.Grid>

                  </MUI.Grid>

                  {/* Right Column */}

                  <MUI.Grid item xs={12} sm={6}>

                    <MUI.Grid item xs={12}>
                      <MUI.InputLabel htmlFor="street" id="streetGraduateLabel">6. Mailing Address</MUI.InputLabel>
                      
                      <MUI.TextField
                          id="street"
                          placeholder='Mailing Address'
                          fullWidth 
                          margin='normal'
                          disabled
                          sx={{
                            background: '#f5f5f5',
                            color: '#00000',
                            marginLeft: 2,
                            height: 'auto',
                            marginBottom: 2,
                          }}
                          value={`${userData.street || 'Please fill up your profile for this field'}, ${userData.barangay_name || ''} ${userData.cities_municipalities_name || ''} ${userData.province_name || ''} ${userData.region_name || ''} ${userData.zip_code || ''}` || 'Please fill up your profile for this field'}
                          {...register("street", {
                            required: {
                                value: false,
                                message: 'Street is required',
                            }
                          })}
                      />

                        {errors.street && (
                          <p id='errMsg'>
                              <MUI.InfoIcon className='infoErr' />
                              {errors.street?.message}
                          </p>
                        )}

                    </MUI.Grid>

                    <MUI.Grid item xs={12}>
                      <MUI.InputLabel htmlFor="user_email_address" id="userEmailAddressLabel">7. Email Address</MUI.InputLabel>
                      
                      <MUI.TextField
                          id="user_email_address"
                          placeholder='Email Address'
                          fullWidth 
                          margin='normal'
                          disabled
                          sx={{
                            background: '#f5f5f5',
                            color: '#00000',
                            marginLeft: 2,
                            height: 'auto',
                            marginBottom: 2,
                          }}
                          value={userData?.user_email_address || 'Please fill up your profile for this field'}
                          {...register("user_email_address", {
                            required: {
                                value: false,
                                message: 'Email Address is required',
                            }
                          })}
                      />

                        {errors.user_email_address && (
                          <p id='errMsg'>
                              <MUI.InfoIcon className='infoErr' />
                              {errors.user_email_address?.message}
                          </p>
                        )}

                    </MUI.Grid>

                    <MUI.Grid item xs={12}>
                      <MUI.InputLabel htmlFor="user_mobile_num" id="userMobileNumLabel">8. Contact Number </MUI.InputLabel>
                      
                      <MUI.TextField
                          id="user_mobile_num"
                          placeholder='Email Address'
                          fullWidth
                          margin='normal'
                          disabled
                          sx={{
                            background: '#f5f5f5',
                            color: '#00000',
                            marginLeft: 2,
                            height: 'auto',
                            marginBottom: 2,
                          }}
                          InputProps={{
                            startAdornment: <MUI.InputAdornment position="start">+63</MUI.InputAdornment>,
                          }}
                          value={userData?.user_mobile_num ? userData.user_mobile_num.substring(2) : 'Please fill up your profile for this field'}

                          {...register("user_mobile_num", {
                            required: {
                                value: false,
                                message: 'Mobile Number is required',
                            }
                          })}
                      />

                        {errors.user_mobile_num && (
                          <p id='errMsg'>
                              <MUI.InfoIcon className='infoErr' />
                              {errors.user_mobile_num?.message}
                          </p>
                        )}

                    </MUI.Grid>

                    <MUI.Grid item xs={12}>
                      <MUI.InputLabel htmlFor="futurePlan" id="futurePlanLabel">9. Future Plan (Optional) </MUI.InputLabel>
                      
                      <MUI.TextField
                          id="futurePlan"
                          placeholder='Future Plan'
                          fullWidth 
                          margin='normal'
                          sx={{
                            background: '#f5f5f5',
                            color: '#00000',
                            marginLeft: 2,
                            height: 'auto',
                            marginBottom: 2,
                          }}
                          {...register("futurePlan", {
                            required: {
                                value: false,
                                message: 'Future Plan is required',
                            }
                          })}
                      />

                        {errors.futurePlan && (
                          <p id='errMsg'>
                              <MUI.InfoIcon className='infoErr' />
                              {errors.futurePlan?.message}
                          </p>
                        )}

                    </MUI.Grid>

                    </MUI.Grid>

                  </MUI.Grid>

                </MUI.Grid>

            <MUI.Grid item xs={12}>
              <MUI.Typography variant='h3' sx={{fontWeight: 'bold'}}>
                Documentary Requirements
              </MUI.Typography>
            </MUI.Grid>

            <MUI.Grid item xs={12} sm={12}>
              <MUI.TableContainer sx={{ backgroundColor: '#fbf3f2', margin: '2rem 0 0 1rem' }}>
                <MUI.Table>
                  <MUI.TableHead>
                    <MUI.TableRow>
                      <MUI.TableCell>Description</MUI.TableCell>
                      <MUI.TableCell></MUI.TableCell>
                      <MUI.TableCell>File</MUI.TableCell>
                    </MUI.TableRow>
                  </MUI.TableHead>
                  <MUI.TableBody>

                    <MUI.TableRow>
                      <MUI.TableCell sx={{ border: 'none', display: 'flex', alignItems: 'flex-start', marginLeft: '-8px' }}>
                        <MUI.Typography variant='h4'>Copy of Report Card of the previous semester</MUI.Typography> 
                      </MUI.TableCell>

                      <MUI.TableCell sx={{ border: 'none' }}>
                          <MUI.Tooltip title={
                            <React.Fragment>
                              <p>Things to remember</p>
                              <ul>
                                <li>Submit the report card of the previous semester</li>
                                <li>Upload only PDF Files</li>
                              </ul>=
                            </React.Fragment>
                          }>
                            <div style={{ display: 'inline-block' }}>
                              <MUI.ErrorOutlineOutlinedIcon />
                            </div>
                          </MUI.Tooltip>
                        </MUI.TableCell>

                      <MUI.TableCell sx={{ border: 'none' }}>

                        <MUI.Grid sx={{ display: 'flex', alignItems: 'center' }}>
                          <MUI.InputLabel htmlFor="copyOfReportCard" id="copyOfReportCardLabel">
                            <MUI.Input
                              id="copyOfReportCard"
                              type="file"
                              onChange={(event) => {
                                if (event.target.files && event.target.files.length > 0) {
                                  handleFileChange(event, 'copyOfReportCard');
                                }
                              }}
                              {...register("copyOfReportCard", {
                                required: {
                                  value: true,
                                  message: 'File is required',
                                },
                                validate: {
                                  validFileType: (value) => {
                                    if (!value || value[0].type !== 'application/pdf') {
                                      return 'Invalid file type. Please select a PDF file.';
                                    }
                                    return true;
                                  },
                                  validFileSize: (value) => {
                                    if (value && value[0].size > 5 * 1024 * 1024) { // 5 MB in bytes
                                      return 'File size exceeds the limit of 5 MB.';
                                    }
                                    return true;
                                  }
                                }
                              })}
                            />
                          </MUI.InputLabel>
                          {errors.copyOfReportCard && (
                            <p id='errMsg'>
                              <MUI.InfoIcon className='infoErr' />
                              {errors.copyOfReportCard?.message}
                            </p>
                          )}
                        </MUI.Grid>

                      </MUI.TableCell>
                    </MUI.TableRow>

                    <MUI.TableRow >
                      <MUI.TableCell sx={{ border: 'none', display: 'flex', alignItems: 'flex-start', marginLeft: '-8px' }}>
                        <MUI.Typography variant='h4'>Copy of School Registration Form (RF)</MUI.Typography>
                      </MUI.TableCell>

                      <MUI.TableCell sx={{ border: 'none' }}>
                          <MUI.Tooltip title={
                            <React.Fragment>
                              <p>Things to remember</p>
                              <ul>
                                <li>Submit the report card of the previous semester</li>
                                <li>Upload only PDF Files</li>
                              </ul>
                            </React.Fragment>
                          }>
                            <div style={{ display: 'inline-block' }}>
                              <MUI.ErrorOutlineOutlinedIcon />
                            </div>
                          </MUI.Tooltip>
                        </MUI.TableCell>


                      <MUI.TableCell sx={{border: 'none'}}>

                        <MUI.Grid sx={{ display: 'flex', alignItems: 'center' }}>
                          <MUI.InputLabel htmlFor="copyOfRegistrationForm" id="copyOfRegistrationFormLabel">
                            <MUI.Input
                              id="copyOfRegistrationForm"
                              type="file"
                              onChange={(event) => {
                                if (event.target.files && event.target.files.length > 0) {
                                  handleFileChange(event, 'copyOfRegistrationForm');
                                }
                              }}
                              {...register("copyOfRegistrationForm", {
                                required: {
                                  value: true,
                                  message: 'File is required',
                                },
                                validate: {
                                  validFileType: (value) => {
                                    if (!value || value[0].type !== 'application/pdf') {
                                      return 'Invalid file type. Please select a PDF file.';
                                    }
                                    return true;
                                  },
                                  validFileSize: (value) => {
                                    if (value && value[0].size > 5 * 1024 * 1024) { // 5 MB in bytes
                                      return 'File size exceeds the limit of 5 MB.';
                                    }
                                    return true;
                                  }
                                }
                              })}
                            />
                          </MUI.InputLabel>
                          {errors.copyOfRegistrationForm && (
                            <p id='errMsg'>
                              <MUI.InfoIcon className='infoErr' />
                              {errors.copyOfRegistrationForm?.message}
                            </p>
                          )}

                        </MUI.Grid>

                      </MUI.TableCell>  
                    </MUI.TableRow>

                    <MUI.TableRow >
                      <MUI.TableCell sx={{ border: 'none', display: 'flex', alignItems: 'flex-start', marginLeft: '-8px' }}>
                        <MUI.Typography variant='h4'>Scanned Written Essay</MUI.Typography>
                      </MUI.TableCell>

                      <MUI.TableCell sx={{ border: 'none' }}>
                          <MUI.Tooltip title={
                            <React.Fragment>
                              <p>Things to remember</p>
                              <ul>
                                <li>Submit the report card of the previous semester</li>
                                <li>Upload only PDF Files</li>
                              </ul>
                            </React.Fragment>
                          }>
                            <div style={{ display: 'inline-block' }}>
                              <MUI.ErrorOutlineOutlinedIcon />
                            </div>
                          </MUI.Tooltip>
                        </MUI.TableCell>
                      <MUI.TableCell sx={{border: 'none'}}>
                        
                      <MUI.Grid sx={{ display: 'flex', alignItems: 'center' }}>
                        <MUI.InputLabel htmlFor="scannedWrittenEssay" id="scannedWrittenEssayLabel">
                          <MUI.Input
                            id="scannedWrittenEssay"
                            type="file"
                            onChange={(event) => {
                              if (event.target.files && event.target.files.length > 0) {
                                handleFileChange(event, 'scannedWrittenEssay');
                              }
                            }}
                            {...register("scannedWrittenEssay", {
                              required: {
                                value: true,
                                message: 'File is required',
                              },
                              validate: {
                                validFileType: (value) => {
                                  if (!value || value[0].type !== 'application/pdf') {
                                    return 'Invalid file type. Please select a PDF file.';
                                  }
                                  return true;
                                },
                                validFileSize: (value) => {
                                  if (value && value[0].size > 5 * 1024 * 1024) { // 5 MB in bytes
                                    return 'File size exceeds the limit of 5 MB.';
                                  }
                                  return true;
                                }
                              }
                            })}
                          />
                        </MUI.InputLabel>
                        {errors.scannedWrittenEssay && (
                          <p id='errMsg'>
                            <MUI.InfoIcon className='infoErr' />
                            {errors.scannedWrittenEssay?.message}
                          </p>
                        )}

                      </MUI.Grid>

                      </MUI.TableCell>
                    </MUI.TableRow>

                    <MUI.TableRow >
                    <MUI.TableCell sx={{ border: 'none', display: 'flex', alignItems: 'flex-start', marginLeft: '-8px' }}>
                        <MUI.Typography variant='h4'> Letter of gratitude to benefactor</MUI.Typography> 
                      </MUI.TableCell>

                      <MUI.TableCell sx={{ border: 'none' }}>
                          <MUI.Tooltip title={
                            <React.Fragment>
                              <p>Things to remember</p>
                              <ul>
                                <li>Submit the report card of the previous semester</li>
                                <li>Upload only PDF Files</li>
                              </ul>
                            </React.Fragment>
                          }>
                            <div style={{ display: 'inline-block' }}>
                              <MUI.ErrorOutlineOutlinedIcon />
                            </div>
                          </MUI.Tooltip>
                        </MUI.TableCell>

                      <MUI.TableCell sx={{border: 'none'}}>

                      <MUI.Grid sx={{ display: 'flex', alignItems: 'center' }}>
                        <MUI.InputLabel htmlFor="letterOfGratitude" id="letterOfGratitudeLabel">
                          <MUI.Input
                            id="letterOfGratitude"
                            type="file"
                            onChange={(event) => {
                              if (event.target.files && event.target.files.length > 0) {
                                handleFileChange(event, 'letterOfGratitude');
                              }
                            }}
                            {...register("letterOfGratitude", {
                              required: {
                                value: true,
                                message: 'File is required',
                              },
                              validate: {
                                validFileType: (value) => {
                                  if (!value || value[0].type !== 'application/pdf') {
                                    return 'Invalid file type. Please select a PDF file.';
                                  }
                                  return true;
                                },
                                validFileSize: (value) => {
                                  if (value && value[0].size > 5 * 1024 * 1024) { // 5 MB in bytes
                                    return 'File size exceeds the limit of 5 MB.';
                                  }
                                  return true;
                                }
                              }
                            })}
                          />
                        </MUI.InputLabel>
                        {errors.letterOfGratitude && (
                          <p id='errMsg'>
                            <MUI.InfoIcon className='infoErr' />
                            {errors.letterOfGratitude?.message}
                          </p>
                        )}
                      </MUI.Grid>

                      </MUI.TableCell>
                    </MUI.TableRow>

                    <MUI.TableRow >
                    <MUI.TableCell sx={{ border: 'none', display: 'flex', alignItems: 'flex-start', marginLeft: '-8px' }}>
                        <MUI.Typography variant='h4'>Statement of account issued by the school</MUI.Typography>
                      </MUI.TableCell>

                      <MUI.TableCell sx={{ border: 'none' }}>
                          <MUI.Tooltip title={
                            <React.Fragment>
                              <p>Things to remember</p>
                              <ul>
                                <li>Submit the report card of the previous semester</li>
                                <li>Upload only PDF Files</li>
                              </ul>
                            </React.Fragment>
                          }>
                            <div style={{ display: 'inline-block' }}>
                              <MUI.ErrorOutlineOutlinedIcon />
                            </div>
                          </MUI.Tooltip>
                        </MUI.TableCell>


                      <MUI.TableCell sx={{border: 'none'}}>

                      <MUI.Grid sx={{ display: 'flex', alignItems: 'center' }}>

                        <MUI.InputLabel htmlFor="statementOfAccount" id="statementOfAccountLabel">  
                          <MUI.Input
                            id="statementOfAccount"
                            type="file"
                            onChange={(event) => {
                              if (event.target.files && event.target.files.length > 0) {
                                handleFileChange(event, 'statementOfAccount');
                              }
                            }}
                            {...register("statementOfAccount", {
                              required: {
                                value: true,
                                message: 'File is required',
                              },
                              validate: {
                                validFileType: (value) => {
                                  if (!value || value[0].type !== 'application/pdf') {
                                    return 'Invalid file type. Please select a PDF file.';
                                  }
                                  return true;
                                },
                                validFileSize: (value) => {
                                  if (value && value[0].size > 5 * 1024 * 1024) { // 5 MB in bytes
                                    return 'File size exceeds the limit of 5 MB.';
                                  }
                                  return true;
                                }
                              }
                            })}
                          />

                        </MUI.InputLabel>
                        {errors.statementOfAccount && (

                          <p id='errMsg'>
                            <MUI.InfoIcon className='infoErr' />
                            {errors.statementOfAccount?.message}
                          </p>
                        )}
                      </MUI.Grid>

                      </MUI.TableCell>
                    </MUI.TableRow>

                    <MUI.TableRow >
                    <MUI.TableCell sx={{ border: 'none', display: 'flex', alignItems: 'flex-start', marginLeft: '-8px' }}>
                        <MUI.Typography variant='h4'> Graduation Picture</MUI.Typography> 
                      </MUI.TableCell>

                      <MUI.TableCell sx={{ border: 'none' }}>
                          <MUI.Tooltip title={
                            <React.Fragment>
                              <p>Things to remember</p>
                              <ul>
                                <li>Submit the report card of the previous semester</li>
                                <li>Upload only JPEG, PNG, JPG Files</li>
                              </ul>
                            </React.Fragment>
                          }>
                            <div style={{ display: 'inline-block' }}>
                              <MUI.ErrorOutlineOutlinedIcon />
                            </div>
                          </MUI.Tooltip>
                        </MUI.TableCell>


                      <MUI.TableCell sx={{border: 'none'}}>

                      <MUI.Grid sx={{ display: 'flex', alignItems: 'center' }}>
                          
                        <MUI.InputLabel htmlFor="graduationPicture" id="graduationPictureLabel">

                          <MUI.Input
                            id="graduationPicture"
                            type="file"
                            onChange={(event) => {
                              if (event.target.files && event.target.files.length > 0) {
                                handleFileChange(event, 'graduationPicture');
                              }
                            }}
                            {...register("graduationPicture", {
                              required: {
                                value: true,
                                message: 'File is required',
                              },
                              validate: {
                                validFileType: (value) => {
                                  if (!value || (value[0].type !== 'image/jpeg' && value[0].type !== 'image/png')) {
                                    return 'Invalid file type. Please select an image file.';
                                  }
                                  return true;
                                },
                                validFileSize: (value) => {
                                  if (value && value[0].size > 5 * 1024 * 1024) { // 5 MB in bytes
                                    return 'File size exceeds the limit of 5 MB.';
                                  }
                                  return true;
                                }
                              }
                            })}
                          />
                        </MUI.InputLabel>
                        {errors.graduationPicture && (
                          <p id='errMsg'>
                            <MUI.InfoIcon className='infoErr' />
                            {errors.graduationPicture?.message}
                          </p>
                        )}

                      </MUI.Grid>

                      </MUI.TableCell>
                    </MUI.TableRow>

                    <MUI.TableRow >
                    <MUI.TableCell sx={{ border: 'none', display: 'flex', alignItems: 'flex-start', marginLeft: '-8px' }}>
                        <MUI.Typography variant='h4'>Transcript of records</MUI.Typography>
                      </MUI.TableCell>

                      <MUI.TableCell sx={{ border: 'none' }}>
                          <MUI.Tooltip title={
                            <React.Fragment>
                              <p>Things to remember</p>
                              <ul>
                                <li>Submit the report card of the previous semester</li>
                                <li>Upload only PDF Files</li>
                              </ul>
                            </React.Fragment>
                          }>
                            <div style={{ display: 'inline-block' }}>
                              <MUI.ErrorOutlineOutlinedIcon />
                            </div>
                          </MUI.Tooltip>
                        </MUI.TableCell>


                      <MUI.TableCell sx={{border: 'none'}}>

                      <MUI.Grid sx={{ display: 'flex', alignItems: 'center' }}>
                          <MUI.InputLabel htmlFor="transcriptOfRecords" id="transcriptOfRecordsLabel">
                            <MUI.Input
                              id="transcriptOfRecords"
                              type="file"
                              onChange={(event) => {
                                if (event.target.files && event.target.files.length > 0) {
                                  handleFileChange(event, 'transcriptOfRecords');
                                }
                              }}
                              {...register("transcriptOfRecords", {
                                required: {
                                  value: true,
                                  message: 'File is required',
                                },
                                validate: {
                                  validFileType: (value) => {
                                    if (!value || value[0].type !== 'application/pdf') {
                                      return 'Invalid file type. Please select a PDF file.';
                                    }
                                    return true;
                                  },
                                  validFileSize: (value) => {
                                    if (value && value[0].size > 5 * 1024 * 1024) { // 5 MB in bytes
                                      return 'File size exceeds the limit of 5 MB.';
                                    }
                                    return true;
                                  }
                                }
                              })}
                            />
                          </MUI.InputLabel>
                          {errors.transcriptOfRecords && (
                            <p id='errMsg'>
                              <MUI.InfoIcon className='infoErr' />
                              {errors.transcriptOfRecords?.message}
                            </p>
                          )}
                      </MUI.Grid>

                      </MUI.TableCell>
                    </MUI.TableRow>

                  </MUI.TableBody>
                </MUI.Table>
                <MUI.Divider sx={{width:'100%'}}/>
              </MUI.TableContainer>
            </MUI.Grid>


            <MUI.Grid item xs={12} sx={{mt: 3, display: 'flex', justifyContent: 'flex-end'}}>

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
        </MUI.Grid>
        </MUI.Grid>

        {/* Confirmation Modal */}

        <MUI.Dialog open={modalConfirmation} onClose={handleCloseConfirmationModal}>
          <MUI.DialogTitle id="dialogTitle" mt={2}>
            Confirmation Heads Up
          </MUI.DialogTitle>
          <MUI.DialogContent>
            <MUI.Typography variant='h5' ml={1} sx={{color: '#44546F'}}>
              You're about to submit your renewal form. Are you sure you want to proceed?
            </MUI.Typography>
          </MUI.DialogContent>
          
          <MUI.DialogActions>
            <MUI.Button onClick={handleCloseConfirmationModal}>Cancel</MUI.Button>
            <MUI.Button onClick={handleSubmit(onSubmitGraduatingForm)} variant='contained'>
              Submit
            </MUI.Button>
          </MUI.DialogActions>

        </MUI.Dialog>

        {/* History Modal */}

        {/* Submission History Modal */}

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
                    <MUI.TableCell>Remarks</MUI.TableCell>
                    <MUI.TableCell>Updated By</MUI.TableCell>
                  </MUI.TableRow>
                </MUI.TableHead>
                <MUI.TableBody>
                {userData.graduating && Object.entries(userData.graduating).map(([schoolYear, submissions]) => (
                  submissions.map((submission, index) => (
                    <MUI.TableRow key={index}>
                      <MUI.TableCell>Graduation Form</MUI.TableCell>
                      <MUI.TableCell>
                        {formatDate(submission.updated_at)}
                      </MUI.TableCell>
                      <MUI.TableCell>{submission.submission_status}</MUI.TableCell>
                      <MUI.TableCell>{submission.remarks_message || 'No Remarks'}</MUI.TableCell>
                      <MUI.TableCell>{userMap[submission.updated_by] || 'Not yet updated'}</MUI.TableCell>
                    </MUI.TableRow>
                  ))
                ))}
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
      </MUI.Container>
    </MUI.ThemeProvider>
  </Layout>
  )
}
