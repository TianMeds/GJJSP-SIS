import React, {useState} from 'react';
import * as MUI from '../../../import';
import Layout from '../../../component/Layout/SidebarNavbar/Layout';
import { Link } from 'react-router-dom';
import theme from '../../../context/theme';
import HistoryIcon from '@mui/icons-material/History';
import axios from '../../../api/axios';

import useLoginStore from '../../../store/LoginStore';
import useAuthStore from '../../../store/AuthStore';

//React Hook Form
import {useForm, Controller } from 'react-hook-form';
import { DevTool } from "@hookform/devtools";


const FormValues = {
  company_name: '',
  company_location: '',
  position_in_company: '',
  licensure_exam_type: '',
  exam_passed_date: '',
  volunteer_group_name: '',
  yr_volunteered: ''
}

export default function AlumniSubmission() {


    // Zustand Store
    const {getAuthToken, alertOpen, alertMessage, setAlertOpen, setAlertMessage, errorOpen, setErrorOpen, setErrorMessage, errorMessage} = useAuthStore();
    const {setLoading, setLoadingMessage} = useLoginStore();

    //React Hook form 
    const form  = useForm();
    const { register, control, handleSubmit, formState, reset, watch, validate, setValue} = form
    const { errors } = formState;

    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
      const file = event.target.files[0];
      setSelectedFile(file);
    };

    const onSubmit = async (data, event) => {
      event.preventDefault();
      setLoading(true);
      setLoadingMessage('Submitting Alumni Form...');
      const authToken = getAuthToken();
      
      try{
        const config = {
          headers: {
            "Content-type": "application/json",
            "Authorization": `Bearer ${authToken}`
          }
        };

        const alumniFormData = {
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

        setLoading(false);
        form.reset(FormValues);
      }

      catch(error){
        console.log(error);
      }

    }

  return (
    <Layout>
    <MUI.ThemeProvider theme={theme}>
      <MUI.Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <MUI.Grid container spacing={3}>
        <MUI.Grid item xs={12}>
          <MUI.Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} alignItems={{xs: 'left', md: 'center'}} margin={2} justifyContent="space-between">
            <MUI.Typography variant="h1" id="tabsTitle" sx={{ color: 'black' }}>
              Alumni Submission
            </MUI.Typography>
            
            <MUI.Grid sx={{display: 'flex', alignItems: 'center'}} gap={4} xs={6}>
              <MUI.FormControl>
                <MUI.Select
                  native
                  sx={{border: '1px solid rgba(0,0,0,0.2)',
                  boxShadow: '11px 7px 15px -3px rgba(0,0,0,0.1)', borderRadius: '15px', height: '50px'}}
                >
                  <option value="All">SY 2023-2024</option>
                  <option value="New">SY 2022-2023</option>
                  <option value="For Renewal">SY 2021-2022</option>
                </MUI.Select>
              </MUI.FormControl>

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
                  Alumni Form
                </MUI.Typography>
              </MUI.Grid>


              <MUI.Grid component="form"  method='post' noValidate container spacing={3} sx={{ mt: 2, ml: 2, display: 'flex' }} onSubmit={handleSubmit(onSubmit)}> 
           
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
                  <MUI.InputLabel htmlFor="company_location" id="currentCompanyLocationLabel">2. Current Company Location</MUI.InputLabel>
                  
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
                  <MUI.InputLabel htmlFor="licensure_exam_type" id="licensureExamLabel">4. Licensure Exam Type</MUI.InputLabel>
                  
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
                  <MUI.InputLabel htmlFor="exam_passed_date" id="examDateLabel">5. Exam  Passed Date</MUI.InputLabel>
                  
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
                          value: false,
                          message: 'Exam Passed Date is required',
                      }
                    })}
                  />

                  {errors.exam_passed_date && (
                    <p id='errMsg'>
                        <MUI.InfoIcon className='infoErr' />
                        {errors.exam_passed_date?.message}
                    </p>
                  )}
                </MUI.Grid>

                <MUI.Grid item xs={12}>
                  <MUI.InputLabel htmlFor="volunteer_group_name" id="volunteerGroupLabel">6. Volunteer Group Name (Optional)</MUI.InputLabel>
                  
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
                          value: false,
                      }
                    })}
                  />
                </MUI.Grid>

                </MUI.Grid>

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

          <DevTool control={control} />
          
      </MUI.Container>
    </MUI.ThemeProvider>
  </Layout>


  )
}
