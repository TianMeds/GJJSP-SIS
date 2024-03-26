import React, {useState, useEffect} from 'react';
import * as MUI from '../../../import';
import Layout from '../../../component/Layout/SidebarNavbar/Layout';
import { Link, useNavigate } from 'react-router-dom';
import theme from '../../../context/theme';
import useSubmissionStore from '../../../store/SubmissionStore';
import HistoryIcon from '@mui/icons-material/History';
import axios from '../../../api/axios';

import useLoginStore from '../../../store/LoginStore';
import useAuthStore from '../../../store/AuthStore';

import {useForm, Controller } from 'react-hook-form';
import { DevTool } from "@hookform/devtools";

const FormValues = {
  school_yr_submitted: '',
  term_submitted: '',
  gwa_value: '',
  gwa_remarks: '',
  copyOfReportCard: null,
  copyOfRegistrationForm: null,
  scannedWrittenEssay: null,
  letterOfGratitude: null,
}



export default function RenewalSubmission() {


  
  // Zustand Store
  const {copyOfReportCard, setCopyOfReportCard,  copyOfRegistrationForm, setCopyOfRegistrationForm,
  scannedWrittenEssay, setScannedWrittenEssay, letterOfGratitude, setLetterOfGratitude, userData, setUserData, modalConfirmation, setModalConfirmation, handleOpenConfirmationModal, handleCloseConfirmationModal, modalHistory, setModalHistory, handleOpenHistoryModal, handleCloseHistoryModal } = useSubmissionStore();

  const {getAuthToken, alertOpen, alertMessage, setAlertOpen, setAlertMessage, errorOpen, setErrorOpen, setErrorMessage, errorMessage} = useAuthStore();
  const {setLoading, setLoadingMessage} = useLoginStore();

  const [submissions, setSubmissions] = useState([]);

  const [error, setError] = useState(null);
  const navigate = useNavigate();

  //React Hook form 
  const form  = useForm();
  const { register, control, handleSubmit, formState, reset, watch, validate, setValue} = form
  const { errors } = formState;

  const [userMap, setUserMap] = useState({});
  const [schoolYear, setSchoolYear] = useState('');
  const [term, setTerm] = useState('');


  const handleFileChange = (e, fileType) => {
    const files = e.target.files;
    const allowedTypes = ['application/pdf']; // Allowed file types
  
    if (!files || files.length === 0) {
      console.log('Required file');
      return; // Stop execution if no file is selected
    }
  
    const file = files[0];
  
    if (!allowedTypes.includes(file.type)) {
      console.log('Invalid file type')
      return; // Stop execution if file type is invalid
    }
  
    setError(null); // Clear error if file type is valid
  
    if (fileType === 'copyOfReportCard') {
      console.log(file);
      setCopyOfReportCard(file);
      console.log(file)
    } else if (fileType === 'copyOfRegistrationForm') {
      console.log(file)
      setCopyOfRegistrationForm(file);
    } else if (fileType === 'scannedWrittenEssay') {
      setScannedWrittenEssay(file);
      console.log(file);
    } else if (fileType === 'letterOfGratitude') {
      setLetterOfGratitude(file);
    }
  }
  const onSubmitRenewalForm = async (data, event) => {
    event.preventDefault();
    setLoading(true);
    setLoadingMessage('Submitting renewal form...');

    const formData = new FormData();
    formData.append('gwa_value', data.gwa_value);
    formData.append('gwa_remarks', data.gwa_remarks);
    formData.append('school_yr_submitted', data.school_yr_submitted);
    formData.append('term_submitted', data.term_submitted);
    formData.append('copyOfReportCard', data.copyOfReportCard[0]);
    formData.append('copyOfRegistrationForm', data.copyOfRegistrationForm[0]);
    formData.append('scannedWrittenEssay', data.scannedWrittenEssay[0]);
    formData.append('letterOfGratitude', data.letterOfGratitude[0]);

    const token = getAuthToken();
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`
      }
    }

    try {
      const response = await axios.post('/api/renewal-documents', formData, config);
      setCopyOfReportCard(null);
      setCopyOfRegistrationForm(null);
      setScannedWrittenEssay(null);
      setLetterOfGratitude(null);
      form.reset(FormValues);

      const scholarProfile = await axios.get('/api/scholarsProfile', config);
      setUserData(scholarProfile.data.data);
      setLoading(false);
      handleCloseConfirmationModal();
      setAlertOpen(true);
      setAlertMessage('Renewal Submission submitted successfully');
    
    } catch (error) {
      if (error.response?.status === 401) {
        navigate('/login');
      }
      else {
        setErrorOpen(true);
        setErrorMessage('Failed to submit renewal form');
      }
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
  

  const isTermDisabled = (term) => {
    const currentSchoolYear = getCurrentSchoolYear();

    if (userData && userData.renewing) {
        // Check if the current school year exists in userData.renewing
        if (!userData.renewing[currentSchoolYear]) {
            // If it's a new school year, enable Term 1 and disable Term 2 and Term 3
            if (term === 'Term 1') {
                return false; // Enable Term 1
            } else {
                return true; // Disable Term 2 and Term 3
            }
        }

        // Check if Term 1 exists, if not, disable Term 2 and Term 3
        if (term === 'Term 2' || term === 'Term 3') {
            if (!userData.renewing[currentSchoolYear].some(entry => entry.term === 'Term 1')) {
                return true; // Disable Term 2 and Term 3 if Term 1 doesn't exist
            } else if (term === 'Term 3' && (!userData.renewing[currentSchoolYear].some(entry => entry.term === 'Term 2' && entry.submission_status === 'Approved'))) {
              return true; // Disable Term 3 if Term 2 doesn't exist or is not approved
          }
        }

        // Check if the term exists for the current school year
        if (userData.renewing[currentSchoolYear].some(entry => entry.term === term)) {
            // Find the entry for the term
            const termEntry = userData.renewing[currentSchoolYear].find(entry => entry.term === term);
            // Check if the term is marked for resubmission
            if (termEntry.submission_status === 'For Resubmission') {
                // Enable the term if it's marked for resubmission
                return false;
            } else {
                // Disable the term if it's not marked for resubmission
                return true;
            }
        }
    }

    // Enable the term if it doesn't exist in the userData or if the current school year doesn't exist
    return false;
};






    const allTermsDisabled = () => {
      if (userData.acad_terms === '2') {
        return isTermDisabled('Term 1') && isTermDisabled('Term 2');
      } else if (userData.acad_terms === '3') {
        return isTermDisabled('Term 1') && isTermDisabled('Term 2') && isTermDisabled('Term 3');
      } else {
        // Default behavior if acad_terms is neither '2' nor '3'
        return true; // Or false, depending on your specific logic
      }
    };


    
    
    const getCurrentSchoolYear = () => {
      const currentMonth = new Date().getMonth() + 1; // Get current month (1-indexed)
      const currentYear = new Date().getFullYear(); // Get current year
    
      // Determine school year based on current month
      const startYear = currentMonth < 4 ? currentYear - 1 : currentYear;
      const endYear = startYear + 1;
    
      return `${startYear}-${endYear}`;
    };

    const currentSY = getCurrentSchoolYear();

    const isDisabled = userData.renewing && userData.renewing[currentSY] && userData.renewing[currentSY].length > 0 && userData.renewing[currentSY].some(entry => entry.submission_status === 'For Approval');



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

  return (
    <Layout>
      <MUI.ThemeProvider theme={theme}>
        <MUI.Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <MUI.Grid container spacing={3}>
            <MUI.Grid component="form"  method='post' noValidate container spacing={3} sx={{ mt: 2, ml: 2, display: 'flex' }} 
              onSubmit={handleSubmit(onSubmitRenewalForm)} encType='multipart/form-data'>

{isDisabled ? (
  <MUI.Grid item xs={12}>
    <MUI.Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} alignItems={{xs: 'left', md: 'center'}} margin={2} justifyContent="space-between">
      <MUI.Typography variant="h1" id="tabsTitle" sx={{ color: 'black' }}>
        Renewal Submission
      </MUI.Typography>
  
      <MUI.Grid item sx={{display: 'flex', alignItems: 'center'}} gap={4} xs={6}>
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
                disabled // Disable the select field
                sx={{
                  border: '1px solid rgba(0,0,0,0.2)',
                  boxShadow: '11px 7px 15px -3px rgba(0,0,0,0.1)',
                  borderRadius: '15px',
                  height: '50px'
                }}
              >
                <option value={currentSchoolYear}>{`SY ${currentSchoolYear}`}</option>
              </MUI.Select>
            )}
          />
        </MUI.Grid>

        <MUI.Grid id="termGrid">
          <Controller
            name="term_submitted"
            id='term_submitted'
            control={control}
            defaultValue={term}
            rules={{ required: 'Term selection is required' }}
            render={({ field }) => (
              <div>
              <MUI.Select
                native
                {...field}
                sx={{
                  border: '1px solid rgba(0,0,0,0.2)',
                  boxShadow: '11px 7px 15px -3px rgba(0,0,0,0.1)',
                  borderRadius: '15px',
                  height: '50px'
                }}
              >
                <option value="">Select Term</option>
                {Array.from({ length: userData?.acad_terms || 0 }, (_, index) => (
                  <option
                    key={index + 1}
                    value={`Term ${index + 1}`}
                    disabled={isTermDisabled(`Term ${index + 1}`)}
                  >
                    {`Term ${index + 1}`}
                  </option>
                ))}
              </MUI.Select>
              <MUI.FormHelperText error={!!errors.term_submitted}>{errors.term_submitted && errors.term_submitted.message}</MUI.FormHelperText>
              </div>
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
        No submission for now based on your Scholar Status. 😊
      </MUI.Typography>
    </MUI.Grid>
  </MUI.Grid>
) : (
  allTermsDisabled() ? (
    <MUI.Grid item xs={12}>
      <MUI.Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} alignItems={{xs: 'left', md: 'center'}} margin={2} justifyContent="space-between">
        <MUI.Typography variant="h1" id="tabsTitle" sx={{ color: 'black' }}>
          Renewal Submission
        </MUI.Typography>
    
        <MUI.Grid item sx={{display: 'flex', alignItems: 'center'}} gap={4} xs={6}>
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
                  disabled // Disable the select field
                  sx={{
                    border: '1px solid rgba(0,0,0,0.2)',
                    boxShadow: '11px 7px 15px -3px rgba(0,0,0,0.1)',
                    borderRadius: '15px',
                    height: '50px'
                  }}
                >
                  <option value={currentSchoolYear}>{`SY ${currentSchoolYear}`}</option>
                </MUI.Select>
              )}
            />
          </MUI.Grid>

          <MUI.Grid id="termGrid">
            <Controller
              name="term_submitted"
              id='term_submitted'
              control={control}
              defaultValue={term}
              render={({ field }) => (
                <MUI.Select
                  native
                  {...field}
                  sx={{
                    border: '1px solid rgba(0,0,0,0.2)',
                    boxShadow: '11px 7px 15px -3px rgba(0,0,0,0.1)',
                    borderRadius: '15px',
                    height: '50px'
                  }}
                >
                  <option value="">Select Term</option>
                  {Array.from({ length: userData?.acad_terms || 0 }, (_, index) => (
                    <option
                      key={index + 1}
                      value={`Term ${index + 1}`}
                      disabled={isTermDisabled(`Term ${index + 1}`)}
                    >
                      {`Term ${index + 1}`}
                    </option>
                  ))}
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
         You completed the renewal submission for this school year. 😊
        </MUI.Typography>
      </MUI.Grid>
    </MUI.Grid>
  ) : (
    <>

    <MUI.Grid item xs={12}>
      <MUI.Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} alignItems={{xs: 'left', md: 'center'}} margin={2} justifyContent="space-between">
        <MUI.Typography variant="h1" id="tabsTitle" sx={{ color: 'black' }}>
          Renewal Submission
        </MUI.Typography>
  
        
        <MUI.Grid item sx={{display: 'flex', alignItems: 'center'}} gap={4} xs={6}>
       
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
                disabled // Disable the select field
                sx={{
                  border: '1px solid rgba(0,0,0,0.2)',
                  boxShadow: '11px 7px 15px -3px rgba(0,0,0,0.1)',
                  borderRadius: '15px',
                  height: '50px'
                }}
              >
                <option value={currentSchoolYear}>{`SY ${currentSchoolYear}`}</option>
              </MUI.Select>
            )}
          />
        </MUI.Grid>

        <MUI.Grid id="termGrid">
          <Controller
            name="term_submitted"
            id='term_submitted'
            control={control}
            defaultValue={term}
            rules={{ required: 'Term selection is required' }}
            render={({ field }) => (
              <MUI.Select
                native
                {...field}
                sx={{
                  border: '1px solid rgba(0,0,0,0.2)',
                  boxShadow: '11px 7px 15px -3px rgba(0,0,0,0.1)',
                  borderRadius: '15px',
                  height: '50px'
                }}
              >
                <option value="">Select Term</option>
                {Array.from({ length: userData?.acad_terms || 0 }, (_, index) => (
                  <option
                    key={index + 1}
                    value={`Term ${index + 1}`}
                    disabled={isTermDisabled(`Term ${index + 1}`)}
                  >
                    {`Term ${index + 1}`}
                  </option>
                ))}
              </MUI.Select>
            )}
          />
          {errors.term_submitted && (
          <p id='errMsg'>
            <MUI.InfoIcon className='infoErr' />
            {errors.term_submitted?.message}
          </p>
        )}
        </MUI.Grid>


        
        </MUI.Grid>

        {/* Submission History button */}
        <MUI.Button variant="contained" component={Link} to="" id="addButton" onClick={handleOpenHistoryModal}>
          <HistoryIcon sx={{ mr: 1 }} />
          <MUI.Typography variant="body2">Submission history</MUI.Typography>
        </MUI.Button>

      </MUI.Box>
    </MUI.Grid>

    <MUI.Grid container item xs={12} sx={{mt: 5, ml: 2, display: 'flex'}}>

      <MUI.Grid item xs={12}>
        <MUI.InputLabel htmlFor="gwa_value" id="gwaLabel">1. General Weighted Average</MUI.InputLabel>
        <Controller
          name="gwa_value"
          control={control}
          defaultValue=""
          rules={{ required: 'GWA is required' }}
          render={({ field }) => (
            <MUI.Select
              native
              {...field}
              id="gwa_value"
              placeholder="Select GWA"
              fullWidth
              margin="normal"
              autoComplete="off"
              sx={{
                background: '#f5f5f5',
                color: '#00000',
                marginLeft: 2,
                height: 'auto',
                marginBottom: 2,
              }}
            >
              <option value="" disabled>Select GWA</option>
              <option value="1">1.0</option>
              <option value="1.5">1.5</option>
              <option value="2">2.0</option>
              <option value="2.5">2.5</option>
              <option value="3">3.0</option>
              <option value="3.5">3.5</option>
              <option value="4">4.0</option>
            </MUI.Select>
          )}
        />
        {errors.gwa_value && (
          <p id='errMsg'>
            <MUI.InfoIcon className='infoErr' />
            {errors.gwa_value?.message}
          </p>
        )}
      </MUI.Grid>


        <MUI.Grid item xs={12}>
          <MUI.InputLabel htmlFor="gwa_remarks" id="remarksLabel">2. Add remarks about GWA</MUI.InputLabel>
          
          <MUI.TextField
            id="gwa_remarks"
            placeholder="Add remark"
            fullWidth // Make the text field take up the full width
            margin="normal" // Adjust spacing as needed
            sx={{
              background: '#f5f5f5',
              color: '#00000',
              marginLeft: 2,
              height: 'auto',
              marginBottom: 2,
            }}
            {...register("gwa_remarks", {
              required: {
                  value: false,
                  message: 'Remarks is required',
              }
            })}
          />

          {errors.gwa_remarks && (
            <p id='errMsg'>
                <MUI.InfoIcon className='infoErr' />
                {errors.gwa_remarks?.message}
            </p>
          )}
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
                  </ul>
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
                  type='file' 
                  id='copyOfReportCard'                               
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
                  )
                  }

                  
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
                      <li>Submit the School Registration Form </li>
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
                  <MUI.Input type='file'
                  id='copyOfRegistrationForm'
                  onChange={(e) => handleFileChange(e, 'copyOfRegistrationForm')}
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
                  )
                  }

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
                      <li>Upload the Written Essay for the Project Partners and Benefactors</li>
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
                  <MUI.Input type='file'
                  id='scannedWrittenEssay'
                  onChange={(e) => handleFileChange(e, 'scannedWrittenEssay')}
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
                  )
                  }
              

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
                      <li>Submit the letter of gratitude to the benefactor</li>
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
                  <MUI.Input type='file'
                  id='letterOfGratitude'
                  onChange={(e) => handleFileChange(e, 'letterOfGratitude')}
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
                  )
                  }
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

    <MUI.Button 
    variant='contained' 
    sx={{ mb: { xs: 1, sm: 0 } }}
    onClick={handleOpenConfirmationModal}
    >
      
      Submit
    </MUI.Button>

    </MUI.Box>
  </MUI.Grid>

  </>
  )
)}


            </MUI.Grid>
          </MUI.Grid>

          {/* Submitting Confirmation Modal */}

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
              <MUI.Button onClick={handleSubmit(onSubmitRenewalForm)} variant='contained'>
                Submit
              </MUI.Button>
            </MUI.DialogActions>

          </MUI.Dialog>

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
                {userData.renewing && Object.entries(userData.renewing).map(([schoolYear, terms]) => (
                    terms.map((submission, index) => (
                        <MUI.TableRow key={index}>
                            <MUI.TableCell>Renewal Form</MUI.TableCell>
                            <MUI.TableCell>{formatDate(submission.updated_at)}</MUI.TableCell>
                            <MUI.TableCell>{submission.submission_status}</MUI.TableCell>
                            <MUI.TableCell style={{ width: '30%' }}>{submission.remarks_message || 'No remarks'}</MUI.TableCell>
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
