import React, {useState} from 'react';
import * as MUI from '../../../import';
import Layout from '../../../component/Layout/SidebarNavbar/Layout';
import { Link } from 'react-router-dom';
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
  scannedWrittenEssay, setScannedWrittenEssay, letterOfGratitude, setLetterOfGratitude } = useSubmissionStore();
  const {getAuthToken, alertOpen, alertMessage, setAlertOpen, setAlertMessage, errorOpen, setErrorOpen, setErrorMessage, errorMessage} = useAuthStore();
  const {setLoading, setLoadingMessage} = useLoginStore();

  const [error, setError] = useState(null);

  //React Hook form 
  const form  = useForm();
  const { register, control, handleSubmit, formState, reset, watch, validate, setValue} = form
  const { errors } = formState;

  const handleFileChange = (event, fileType) => {
    const files = event.target.files;
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
      setCopyOfReportCard(file);
      console.log(file)
    } else if (fileType === 'copyOfRegistrationForm') {
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
    formData.append('copyOfReportCard', copyOfReportCard);
    formData.append('copyOfRegistrationForm', copyOfRegistrationForm);
    formData.append('scannedWrittenEssay', scannedWrittenEssay);
    formData.append('letterOfGratitude', letterOfGratitude);

    const token = getAuthToken();
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`
      }
    }

    try {
      const response = await axios.post('/api/renewal-documents', formData, config);
      console.log(response);
      setLoading(false);
      setAlertMessage('Renewal form submitted successfully');
      setAlertOpen(true);
      setCopyOfReportCard(null);
      setCopyOfRegistrationForm(null);
      setScannedWrittenEssay(null);
      setLetterOfGratitude(null);
      form.reset(FormValues);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setErrorMessage('Failed to submit renewal form');
      setErrorOpen(true);
    }
  };

  const getCurrentSchoolYear = () => {
    const currentYear = new Date().getFullYear();
    const nextYear = currentYear + 1;
    return `${currentYear}-${nextYear}`;
  };

  const currentSchoolYear = getCurrentSchoolYear();

  const [schoolYear, setSchoolYear] = useState('');
  const [term, setTerm] = useState('');

  const handleSchoolYearChange = (event) => {
    setSchoolYear(event.target.value);
    // Additional logic to update form fields based on the selected school year
  };

  const handleTermChange = (event) => {
    setTerm(event.target.value);
    // Additional logic to update form fields based on the selected term
  };


  return (
    <Layout>
      <MUI.ThemeProvider theme={theme}>
        <MUI.Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <MUI.Grid container spacing={3}>
            <MUI.Grid component="form"  method='post' noValidate container spacing={3} sx={{ mt: 2, ml: 2, display: 'flex' }} 
              onSubmit={handleSubmit(onSubmitRenewalForm)} encType='multipart/form-data'>

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
                      defaultValue=""
                      render={({ field }) => (
                        <MUI.Select
                          native
                          {...field}
                          value={schoolYear}
                          onChange={handleSchoolYearChange}
                          sx={{
                            border: '1px solid rgba(0,0,0,0.2)',
                            boxShadow: '11px 7px 15px -3px rgba(0,0,0,0.1)',
                            borderRadius: '15px',
                            height: '50px'
                          }}
                        >
                          <option value="">Select SY</option>
                          {[...Array(16).keys()].map((_, index) => {
                            const currentYear = new Date().getFullYear() - index - 1;
                            if (currentYear < 2008) return null; // Skip years before 2008
                            const nextYear = currentYear + 1;
                            return (
                              <option key={`${currentYear}-${nextYear}`} value={`${currentYear}-${nextYear}`}>
                                {`SY ${currentYear}-${nextYear}`}
                              </option>
                            );
                          })}
                        </MUI.Select>
                      )}
                    />
                  </MUI.Grid>

                  <MUI.Grid id="termGrid">
                    <MUI.InputLabel htmlFor="term_submitted" id="termLabel"></MUI.InputLabel>
                      <Controller
                        name="term_submitted"
                        id='term_submitted'
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                          <MUI.Select
                            native
                            {...field}
                            sx={{border: '1px solid rgba(0,0,0,0.2)',
                            boxShadow: '11px 7px 15px -3px rgba(0,0,0,0.1)', borderRadius: '15px', height: '50px'}}
                          >
                            <option value="">Select Term</option>
                            <option value="Term 1">Term 1</option>
                            <option value="Term 2">Term 2</option>
                            <option value="Term 3">Term 3</option>
                          </MUI.Select>
                        )}
                      />
                  </MUI.Grid>
                  
                  </MUI.Grid>

                  {/* Submission History button */}
                  <MUI.Button variant="contained" component={Link} to="" id="addButton">
                    <HistoryIcon sx={{ mr: 1 }} />
                    <MUI.Typography variant="body2">Submission history</MUI.Typography>
                  </MUI.Button>

                </MUI.Box>
              </MUI.Grid>


              <MUI.Grid item xs={12}>
                <MUI.Typography variant='h3' sx={{fontWeight: 'bold'}}>
                    Renewal Form
                </MUI.Typography>
              </MUI.Grid>


            

              <MUI.Grid container item xs={12} sx={{mt: 5, ml: 2, display: 'flex'}}>

                <MUI.Grid item xs={12}>
                  <MUI.InputLabel htmlFor="gwa_value" id="gwaLabel">1. General Weighted Average</MUI.InputLabel>
                  
                  <MUI.TextField
                    id="gwa_value"
                    placeholder="Enter GWA this term"
                    fullWidth // Make the text field take up the full width
                    margin="normal" // Adjust spacing as needed
                    sx={{
                      background: '#f5f5f5',
                      color: '#00000',
                      marginLeft: 2,
                      height: 'auto',
                      marginBottom: 2,
                    }}
                    {...register("gwa_value", {
                      required: {
                          value: true,
                          message: 'GWA is required',
                      }
                    })}
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
                          value: true,
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
                        <MUI.TableCell>File</MUI.TableCell>
                      </MUI.TableRow>
                    </MUI.TableHead>
                    <MUI.TableBody>

                      <MUI.TableRow>
                        <MUI.TableCell sx={{ border: 'none', display: 'flex', alignItems: 'flex-start', marginLeft: '-8px' }}>
                          <MUI.Typography variant='h4'>Copy of Report Card of the previous semester</MUI.Typography> <MUI.ErrorOutlineOutlinedIcon />
                        </MUI.TableCell>
                        <MUI.TableCell sx={{ border: 'none' }}>

                          <MUI.Grid sx={{ display: 'flex', alignItems: 'center' }}>

                            <MUI.Paper elevation={1} sx={{ padding: '10px', width: '150px', borderRadius: '5px', background: 'transparent', border: '1px solid #AAAAAA', mr:2,}}>
                              <MUI.Typography sx={{ color: '#777777' }}>{copyOfReportCard ? copyOfReportCard.name : 'Browse File'}</MUI.Typography>
                            </MUI.Paper>

                            <MUI.InputLabel htmlFor="copyOfReportCard" sx={{ cursor: 'pointer' }}>
                              <MUI.Button variant="contained" component="div" sx={{ backgroundColor: '#007bff', color: '#fff', borderRadius: '5px', cursor: 'pointer',padding: '10px', width: '100px' }}>
                                <MUI.AddIcon/> Add File
                              </MUI.Button>
                              <MUI.Input
                                type="file"
                                id="copyOfReportCard"
                                style={{ display: 'none' }}
                                onChange={(event) => {
                                  if (event.target.files && event.target.files.length > 0) {
                                    handleFileChange(event, 'copyOfReportCard');
                                  }
                                }}
                               
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
                          <MUI.Typography variant='h4'>Copy of School Registration Form (RF)</MUI.Typography> <MUI.ErrorOutlineOutlinedIcon />
                        </MUI.TableCell>
                        <MUI.TableCell sx={{border: 'none'}}>

                          <MUI.Grid sx={{ display: 'flex', alignItems: 'center' }}>

                            <MUI.Paper elevation={1} sx={{ padding: '10px', width: '150px', borderRadius: '5px', background: 'transparent', border: '1px solid #AAAAAA', mr:2,}}>
                              <MUI.Typography sx={{ color: '#777777' }}>{copyOfRegistrationForm ? copyOfRegistrationForm.name : 'Browse File'}</MUI.Typography>
                            </MUI.Paper>

                            <label htmlFor="copyOfRegistrationForm" sx={{ cursor: 'pointer' }}>
                              <MUI.Button variant="contained" component="div" sx={{ backgroundColor: '#007bff', color: '#fff', borderRadius: '5px', cursor: 'pointer',padding: '10px', width: '100px' }}>
                                <MUI.AddIcon/> Add File
                              </MUI.Button>
                              <input
                                type="file"
                                id="copyOfRegistrationForm"
                                style={{ display: 'none' }}
                                onChange={(event) => handleFileChange(event, 'copyOfRegistrationForm')}
                              />
                            </label>
                          </MUI.Grid>

                        </MUI.TableCell>  
                      </MUI.TableRow>

                      <MUI.TableRow >
                        <MUI.TableCell sx={{ border: 'none', display: 'flex', alignItems: 'flex-start', marginLeft: '-8px' }}>
                          <MUI.Typography variant='h4'>Scanned Written Essay</MUI.Typography> <MUI.ErrorOutlineOutlinedIcon sx={{ml: 9}}/>
                        </MUI.TableCell>
                        <MUI.TableCell sx={{border: 'none'}}>
                          
                        <MUI.Grid sx={{ display: 'flex', alignItems: 'center' }}>

                          <MUI.Paper elevation={1} sx={{ padding: '10px', width: '150px', borderRadius: '5px', background: 'transparent', border: '1px solid #AAAAAA', mr:2,}}>
                            <MUI.Typography sx={{ color: '#777777' }}>{scannedWrittenEssay ? scannedWrittenEssay.name : 'Browse File'}</MUI.Typography>
                          </MUI.Paper>

                          <label htmlFor="scannedWrittenEssay" sx={{ cursor: 'pointer' }}>
                            <MUI.Button variant="contained" component="div" sx={{ backgroundColor: '#007bff', color: '#fff', borderRadius: '5px', cursor: 'pointer',padding: '10px', width: '100px' }}>
                              <MUI.AddIcon/> Add File
                            </MUI.Button>
                            <input
                              type="file"
                              id="scannedWrittenEssay"
                              style={{ display: 'none' }}
                              onChange={(event) => handleFileChange(event, 'scannedWrittenEssay')}
                            />
                          </label>
                        </MUI.Grid>

                        </MUI.TableCell>
                      </MUI.TableRow>

                      <MUI.TableRow >
                      <MUI.TableCell sx={{ border: 'none', display: 'flex', alignItems: 'flex-start', marginLeft: '-8px' }}>
                          <MUI.Typography variant='h4'> Letter of gratitude to benefactor</MUI.Typography> <MUI.ErrorOutlineOutlinedIcon />
                        </MUI.TableCell>
                        <MUI.TableCell sx={{border: 'none'}}>

                        <MUI.Grid sx={{ display: 'flex', alignItems: 'center' }}>

                          <MUI.Paper elevation={1} sx={{ padding: '10px', width: '150px', borderRadius: '5px', background: 'transparent', border: '1px solid #AAAAAA', mr:2,}}>
                            <MUI.Typography sx={{ color: '#777777' }}>{letterOfGratitude ? letterOfGratitude.name : 'Browse File'}</MUI.Typography>
                          </MUI.Paper>

                          <label htmlFor="letterOfGratitude" sx={{ cursor: 'pointer' }}>
                            <MUI.Button variant="contained" component="div" sx={{ backgroundColor: '#007bff', color: '#fff', borderRadius: '5px', cursor: 'pointer',padding: '10px', width: '100px' }}>
                              <MUI.AddIcon/> Add File
                            </MUI.Button>
                            <input
                              type="file"
                              id="letterOfGratitude"
                              style={{ display: 'none' }}
                              onChange={(event) => handleFileChange(event, 'letterOfGratitude')}
                            />
                          </label>
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
                type='submit'
                >
                  
                  Submit
                </MUI.Button>

                </MUI.Box>
              </MUI.Grid>
            </MUI.Grid>
          </MUI.Grid>

          <DevTool control={control} />
        </MUI.Container>
      </MUI.ThemeProvider>
    </Layout>
  )
}
