import React, {useState} from 'react';
import * as MUI from '../../../import';
import Layout from '../../../component/Layout/SidebarNavbar/Layout';
import { Link } from 'react-router-dom';
import theme from '../../../context/theme';
import HistoryIcon from '@mui/icons-material/History';
import axios from '../../../api/axios';

import useLoginStore from '../../../store/LoginStore';
import useAuthStore from '../../../store/AuthStore';
import useSubmissionStore from '../../../store/SubmissionStore';

import {useForm, Controller } from 'react-hook-form';
import { DevTool } from "@hookform/devtools";

const FormValues = {
  future_company: '',
  future_company_location: '',
  future_position: '',
  meeting_benefactor_sched: '',
  school_yr_submitted: '',
  term_submitted: '',
  copyOfReportCard: null,
  copyOfRegistrationForm: null,
  scannedWrittenEssay: null,
  letterOfGratitude: null,
  statementOfAccount: null,
  graduationPicture: null,
  transcriptOfRecords: null,
}

export default function GraduatingSubmission() {

  // Zustand Store
  const {copyOfReportCardGraduating, setCopyOfReportCardGraduating, copyOfRegistrationFormGraduating, setCopyOfRegistrationFormGraduating, scannedWrittenEssayGraduating, setScannedWrittenEssayGraduating, letterOfGratitudeGraduating, setLetterOfGratitudeGraduating, statementOfAccount, setStatementOfAccount, graduationPicture, setGraduationPicture, transcriptOfRecords, setTranscriptOfRecords} = useSubmissionStore();
  const {getAuthToken, alertOpen, alertMessage, setAlertOpen, setAlertMessage, errorOpen, setErrorOpen, setErrorMessage, errorMessage} = useAuthStore();
  const {setLoading, setLoadingMessage} = useLoginStore();
  
  //React Hook form 
  const form  = useForm();
  const { register, control, handleSubmit, formState, reset, watch, validate, setValue} = form
  const { errors } = formState;


  const handleFileChange = (event, fileType) => {
    const file = event.target.files[0];
    
    if (fileType === 'copyOfReportCard') {
      setCopyOfReportCardGraduating(file);
    } else if (fileType === 'copyOfRegistrationForm') {
      setCopyOfRegistrationFormGraduating(file);
    }
    else if (fileType === 'scannedWrittenEssay') {
      setScannedWrittenEssayGraduating(file);
      console.log(file);
    }
    else if (fileType === 'letterOfGratitude') {
      setLetterOfGratitudeGraduating(file);
    }
    else if (fileType === 'statementOfAccount') {
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
    formData.append('future_company', data.future_company);
    formData.append('future_company_location', data.future_company_location);
    formData.append('future_position', data.future_position);
    formData.append('meeting_benefactor_sched', data.meeting_benefactor_sched);
    formData.append('school_yr_submitted', data.school_yr_submitted);
    formData.append('term_submitted', data.term_submitted);
    formData.append('copyOfReportCard', copyOfReportCardGraduating);
    formData.append('copyOfRegistrationForm', copyOfRegistrationFormGraduating);
    formData.append('scannedWrittenEssay', scannedWrittenEssayGraduating);
    formData.append('letterOfGratitude', letterOfGratitudeGraduating);
    formData.append('statementOfAccount', statementOfAccount);
    formData.append('graduationPicture', graduationPicture);
    formData.append('transcriptOfRecords', transcriptOfRecords);

    const authToken = getAuthToken();
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${authToken}`
      }
    }

    try{
      const response = await axios.post('/api/graduating-documents', formData, config);
      console.log(response);
      setLoading(false);
      setAlertOpen(true);
      setAlertMessage('Graduating Form submitted successfully');
      setCopyOfRegistrationFormGraduating(null);
      setCopyOfReportCardGraduating(null);
      setScannedWrittenEssayGraduating(null);
      setLetterOfGratitudeGraduating(null);
      setStatementOfAccount(null);
      setGraduationPicture(null);
      setTranscriptOfRecords(null);
      form.reset(FormValues);
    }
    catch(error){
      console.log(error);
      setLoading(false);
      setErrorOpen(true);
      setErrorMessage('Failed to submit Graduating Form');
    }
  };


    


  return (
    <Layout>
    <MUI.ThemeProvider theme={theme}>
      <MUI.Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <MUI.Grid container spacing={3}>
          <MUI.Grid component="form"  method='post' noValidate container spacing={3} sx={{ mt: 2, ml: 2, display: 'flex' }} 
              onSubmit={handleSubmit(onSubmitGraduatingForm)} encType="multipart/form-data">

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
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <MUI.Select
                      native
                      {...field}
                      id='school_yr_submitted'
                      sx={{border: '1px solid rgba(0,0,0,0.2)',
                      boxShadow: '11px 7px 15px -3px rgba(0,0,0,0.1)', borderRadius: '15px', height: '50px'}}
                    >
                      <option value="">Select SY</option>
                      <option value="SY 2023-2024">SY 2023-2024</option>
                      <option value="SY 2022-2023">SY 2022-2023</option>
                      <option value="SY 2021-2022">SY 2021-2022</option>
                      
                    </MUI.Select>
                  )}
                />
            </MUI.Grid>

                  <MUI.Grid id="termGrid">
                    <MUI.InputLabel htmlFor="term_submitted" id="termLabel"></MUI.InputLabel>
                      <Controller
                        name="term_submitted"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                          <MUI.Select
                            native
                            {...field}
                            id='term_submitted'
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
                  Graduating Form
                </MUI.Typography>
              </MUI.Grid>

            <MUI.Grid container spacing={3} sx={{ mt: 2, ml: 2, display: 'flex' }} >
           
              <MUI.Grid container item xs={12} sx={{mt: 5, ml: 2, display: 'flex'}}>

              <MUI.Grid item xs={12}>
                <MUI.InputLabel htmlFor="future_company" id="futureCompanyNameLabel">1. Future Company Name</MUI.InputLabel>
                
                <MUI.TextField
                  id="future_company"
                  placeholder="Future Company Name"
                  fullWidth // Make the text field take up the full width
                  margin="normal" // Adjust spacing as needed
                  sx={{
                    background: '#f5f5f5',
                    color: '#00000',
                    marginLeft: 2,
                    height: 'auto',
                    marginBottom: 2,
                  }}
                  {...register("future_company", {
                    required: {
                        value: true,
                        message: 'Future Company Name is required',
                    }
                  })}
                />

                  {errors.future_company_name && (
                    <p id='errMsg'>
                        <MUI.InfoIcon className='infoErr' />
                        {errors.company_name?.message}
                    </p>
                  )}
              </MUI.Grid>

            <MUI.Grid item xs={12}>
              <MUI.InputLabel htmlFor="future_company_location" id="futureCompanyLocationLabel">2. Future Company Location</MUI.InputLabel>
              
              <MUI.TextField
                id="future_company_location"
                placeholder="Future Company Location"
                fullWidth // Make the text field take up the full width
                margin="normal" // Adjust spacing as needed
                sx={{
                  background: '#f5f5f5',
                  color: '#00000',
                  marginLeft: 2,
                  height: 'auto',
                  marginBottom: 2,
                }}
                {...register("future_company_location", {
                  required: {
                      value: true,
                      message: 'Future Company Location is required',
                  }
                })}
              />

                {errors.future_company_location && (
                  <p id='errMsg'>
                      <MUI.InfoIcon className='infoErr' />
                      {errors.future_company_location?.message}
                  </p>
                )}
            </MUI.Grid>

            <MUI.Grid item xs={12}>
              <MUI.InputLabel htmlFor="future_position" id="futureJobLabel">3. Future Job Position</MUI.InputLabel>
              
              <MUI.TextField
                id="future_position"
                placeholder="Future Job Position"
                fullWidth // Make the text field take up the full width
                margin="normal" // Adjust spacing as needed
                sx={{
                  background: '#f5f5f5',
                  color: '#00000',
                  marginLeft: 2,
                  height: 'auto',
                  marginBottom: 2,
                }}
                {...register("future_position", {
                  required: {
                      value: true,
                      message: 'Future Job Position is required',
                  }
                })}
              />

                {errors.future_position && (
                  <p id='errMsg'>
                      <MUI.InfoIcon className='infoErr' />
                      {errors.future_position?.message}
                  </p>
                )}
            </MUI.Grid>


            <MUI.Grid item xs={4}>
              <MUI.InputLabel htmlFor="meeting_benefactor_sched" id="meetingDateLabel">4. Meeting with benefactor schedule</MUI.InputLabel>
              
              <MUI.TextField
                  id="meeting_benefactor_sched"
                  type='date'
                  defaultValue=""
                  fullWidth // Make the text field take up the full width
                  sx={{
                    background: '#f5f5f5',
                    color: '#00000',
                    marginLeft: 2,
                    height: 'auto',
                    marginBottom: 2,
                  }}
                  {...register("meeting_benefactor_sched", {
                    required: {
                        value: true,
                        message: 'Meeting with benefactor schedule is required',
                    }
                  })}
              />

                {errors.meeting_benefactor_sched && (
                  <p id='errMsg'>
                      <MUI.InfoIcon className='infoErr' />
                      {errors.meeting_benefactor_sched?.message}
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
                            <MUI.Typography sx={{ color: '#777777' }}>{copyOfReportCardGraduating ? copyOfReportCardGraduating.name : 'Browse File'}</MUI.Typography>
                          </MUI.Paper>

                          <label htmlFor="copyOfReportCard" sx={{ cursor: 'pointer' }}>
                            <MUI.Button variant="contained" component="div" sx={{ backgroundColor: '#007bff', color: '#fff', borderRadius: '5px', cursor: 'pointer',padding: '10px', width: '100px' }}>
                              <MUI.AddIcon/> Add File
                            </MUI.Button>
                            <input
                              type="file"
                              id="copyOfReportCard"
                              style={{ display: 'none' }}
                              onChange={(event) => handleFileChange(event, 'copyOfReportCard')}
                            />
                          </label>
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
                            <MUI.Typography sx={{ color: '#777777' }}>{copyOfRegistrationFormGraduating? copyOfRegistrationFormGraduating.name : 'Browse File'}</MUI.Typography>
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
                          <MUI.Typography sx={{ color: '#777777' }}>{scannedWrittenEssayGraduating ? scannedWrittenEssayGraduating.name : 'Browse File'}</MUI.Typography>
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
                          <MUI.Typography sx={{ color: '#777777' }}>{letterOfGratitudeGraduating ? letterOfGratitudeGraduating.name : 'Browse File'}</MUI.Typography>
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

                    <MUI.TableRow >
                    <MUI.TableCell sx={{ border: 'none', display: 'flex', alignItems: 'flex-start', marginLeft: '-8px' }}>
                        <MUI.Typography variant='h4'>Statement of account issued by the school</MUI.Typography> <MUI.ErrorOutlineOutlinedIcon />
                      </MUI.TableCell>
                      <MUI.TableCell sx={{border: 'none'}}>

                      <MUI.Grid sx={{ display: 'flex', alignItems: 'center' }}>

                        <MUI.Paper elevation={1} sx={{ padding: '10px', width: '150px', borderRadius: '5px', background: 'transparent', border: '1px solid #AAAAAA', mr:2,}}>
                          <MUI.Typography sx={{ color: '#777777' }}>{statementOfAccount ? statementOfAccount.name : 'Browse File'}</MUI.Typography>
                        </MUI.Paper>

                        <label htmlFor="statementOfAccount" sx={{ cursor: 'pointer' }}>
                          <MUI.Button variant="contained" component="div" sx={{ backgroundColor: '#007bff', color: '#fff', borderRadius: '5px', cursor: 'pointer',padding: '10px', width: '100px' }}>
                            <MUI.AddIcon/> Add File
                          </MUI.Button>
                          <input
                            type="file"
                            id="statementOfAccount"
                            style={{ display: 'none' }}
                            onChange={(event) => handleFileChange(event, 'statementOfAccount')}
                          />
                        </label>
                      </MUI.Grid>

                      </MUI.TableCell>
                    </MUI.TableRow>

                    <MUI.TableRow >
                    <MUI.TableCell sx={{ border: 'none', display: 'flex', alignItems: 'flex-start', marginLeft: '-8px' }}>
                        <MUI.Typography variant='h4'> Graduation Picture</MUI.Typography> <MUI.ErrorOutlineOutlinedIcon />
                      </MUI.TableCell>
                      <MUI.TableCell sx={{border: 'none'}}>

                      <MUI.Grid sx={{ display: 'flex', alignItems: 'center' }}>

                        <MUI.Paper elevation={1} sx={{ padding: '10px', width: '150px', borderRadius: '5px', background: 'transparent', border: '1px solid #AAAAAA', mr:2,}}>
                          <MUI.Typography sx={{ color: '#777777' }}>{graduationPicture ? graduationPicture.name : 'Browse File'}</MUI.Typography>
                        </MUI.Paper>

                        <label htmlFor="graduationPicture" sx={{ cursor: 'pointer' }}>
                          <MUI.Button variant="contained" component="div" sx={{ backgroundColor: '#007bff', color: '#fff', borderRadius: '5px', cursor: 'pointer',padding: '10px', width: '100px' }}>
                            <MUI.AddIcon/> Add File
                          </MUI.Button>
                          <input
                            type="file"
                            id="graduationPicture"
                            style={{ display: 'none' }}
                            onChange={(event) => handleFileChange(event, 'graduationPicture')}
                          />
                        </label>
                      </MUI.Grid>

                      </MUI.TableCell>
                    </MUI.TableRow>

                    <MUI.TableRow >
                    <MUI.TableCell sx={{ border: 'none', display: 'flex', alignItems: 'flex-start', marginLeft: '-8px' }}>
                        <MUI.Typography variant='h4'>Transcript of records</MUI.Typography> <MUI.ErrorOutlineOutlinedIcon />
                      </MUI.TableCell>
                      <MUI.TableCell sx={{border: 'none'}}>

                      <MUI.Grid sx={{ display: 'flex', alignItems: 'center' }}>

                        <MUI.Paper elevation={1} sx={{ padding: '10px', width: '150px', borderRadius: '5px', background: 'transparent', border: '1px solid #AAAAAA', mr:2,}}>
                          <MUI.Typography sx={{ color: '#777777' }}>{transcriptOfRecords ? transcriptOfRecords.name : 'Browse File'}</MUI.Typography>
                        </MUI.Paper>

                        <label htmlFor="transcriptOfRecords" sx={{ cursor: 'pointer' }}>
                          <MUI.Button variant="contained" component="div" sx={{ backgroundColor: '#007bff', color: '#fff', borderRadius: '5px', cursor: 'pointer',padding: '10px', width: '100px' }}>
                            <MUI.AddIcon/> Add File
                          </MUI.Button>
                          <input
                            type="file"
                            id="transcriptOfRecords"
                            style={{ display: 'none' }}
                            onChange={(event) => handleFileChange(event, 'transcriptOfRecords')}
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

              <MUI.Button variant='contained' sx={{ mb: { xs: 1, sm: 0 } }}
                type='submit'
              >
                Submit
              </MUI.Button>


                <MUI.Button variant='text' sx={{color: '#091E42', ml: { xs: 2, sm: 2 }, mb: { xs: 1, sm: 0 } }}>
                  Save for now
                </MUI.Button>

              </MUI.Box>
              </MUI.Grid>
          </MUI.Grid>
        </MUI.Grid>

        </MUI.Grid>

        <DevTool control={control} />
      </MUI.Container>
    </MUI.ThemeProvider>
  </Layout>
  )
}
