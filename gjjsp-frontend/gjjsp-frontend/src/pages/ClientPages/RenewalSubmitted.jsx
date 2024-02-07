import React, {useEffect} from 'react';
import * as MUI from '../../import';
import Layout from '../../component/Layout/SidebarNavbar/Layout';
import { Link } from 'react-router-dom';
import theme from '../../context/theme';
import HistoryIcon from '@mui/icons-material/History';
import axios from '../../api/axios';

import useLoginStore from '../../store/LoginStore';
import useAuthStore from '../../store/AuthStore';
import useSubmissionStore from '../../store/SubmissionStore';
import { Search, SearchIconWrapperV2,StyledInputBaseV2 } from '../../component/Layout/SidebarNavbar/Styles';

//React Hook Form
import {useForm, Controller } from 'react-hook-form';
import { DevTool } from "@hookform/devtools";

export default function RenewalSubmitted() {

    //React Hook form 
    const form  = useForm();
    const { register, control, handleSubmit, formState, reset, watch, validate, setValue} = form
    const { errors } = formState;

    //Zustand Calls
    const {getAuthToken, alertOpen, alertMessage, setAlertOpen, setAlertMessage, errorOpen, setErrorOpen, setErrorMessage, errorMessage} = useAuthStore();
    const { showPassword, handleTogglePassword, setLoading, setLoadingMessage } = useLoginStore();
    const { renewalForms, setRenewalForms, renewalSubmissionStatus, setRenewalSubmissionStatus  } = useSubmissionStore();

    //Get Scholars Data

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
                    setRenewalForms(response.data.data);
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

    useEffect(() => {
        const fetchScholarSubmission = async () => {
            try {
                const authToken = getAuthToken();
            
                const response = await axios.get('/api/renewal-documents', {
                    headers: {
                        'Authorization': `Bearer ${authToken}`
                    }
                });

                if (response.status === 200) {
                    console.log(response.data.data);
                    setRenewalSubmissionStatus(response.data.data);
                }
                else{
                    console.log(response);
                }
            }
            catch(error){
                console.log(error);
            }
        
        }
        fetchScholarSubmission();
    }, []);

    // //Get Scholar Data who submits
    // useEffect(() => {
    //     const fetchScholarSubmission = async () => {
    //         try {
    //             const authToken = getAuthToken();

    //             const response = await axios.get('/api/renewal-documents', {
    //                 headers: {
    //                     'Authorization': `Bearer ${authToken}`  
    //                 }
    //             });

    //             if (response.status === 200) {
    //                 console.log(response.data.data);
    //                 setRenewalForms(response.data.data);
    //             }
    //             else{
    //                 console.log(response);
    //             }
    //         }
    //         catch(error){
    //             console.log(error);
    //         }
    //     }
    
    //     fetchScholarSubmission();
    
    // }, []);
    
  return (
    <Layout>
        <MUI.ThemeProvider theme={theme}>
            <MUI.Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <MUI.Grid container spacing={3}>
                    <MUI.Grid item xs={12}>
                        <MUI.Grid item sx={{display: 'flex', alignItems: 'center'}} gap={4}>

                            <MUI.Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} alignItems={{xs: 'left', md: 'center'}} justifyContent="space-between">
                                <MUI.Typography variant="h1" id="tabsTitle" sx={{ color: 'black' }}>
                                    Renewal Submission
                                </MUI.Typography>
                            </MUI.Box>

                        
                            <MUI.Grid id="schoolYearGrid">
                                <MUI.InputLabel htmlFor="schoolYear" id="schoolYearLabel"></MUI.InputLabel>
                                <Controller
                                    name="schoolYear"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => (
                                    <MUI.Select
                                        native
                                        {...field}
                                        id='schoolYear'
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
                                <MUI.InputLabel htmlFor="term" id="termLabel"></MUI.InputLabel>
                                <Controller
                                    name="term"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => (
                                    <MUI.Select
                                        native
                                        {...field}
                                        id='term'
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
                    </MUI.Grid>

                    <MUI.Grid container  ml={2} mt={8} mb={8} sx={{display: 'flex'}}>
                        

                        <MUI.Grid item>
                            <Search>
                                <SearchIconWrapperV2>
                                    <MUI.SearchIcon />
                                </SearchIconWrapperV2>
                                <StyledInputBaseV2
                                    placeholder="Search for names, groups, or email addresses"
                                    inputProps={{ 'aria-label': 'search' }}
                                />
                            </Search>
                        </MUI.Grid>

                        <MUI.Grid item>
                            <MUI.IconButton aria-label="filter">
                                <MUI.FilterListIcon />
                            </MUI.IconButton>
                        </MUI.Grid>

                        <MUI.Grid item>
                            <MUI.FormControl>
                                <MUI.Select
                                    native
                                    sx={{ width: '100%', border: '1px solid rgba(0,0,0,0.2)', boxShadow: '11px 7px 15px -3px rgba(0,0,0,0.1)', borderRadius: '15px', height: '50px' }}
                                >
                                    <option value="All">All</option>
                                    <option value="For Approval">For Approval</option>
                                    <option value="Approved">Approved</option>
                                    <option value="For Resubmission">For Resubmission</option>
                                    <option value="No Submission">No Submission</option>
                                </MUI.Select>
                            </MUI.FormControl>
                        </MUI.Grid>
                    </MUI.Grid>

                </MUI.Grid>

                <MUI.TableContainer sx={{ backgroundColor: '#fbf3f2' }}>
                    <MUI.Table> 
                    <MUI.TableHead>
                        <MUI.TableRow>
                        <MUI.TableCell>Scholar's Name</MUI.TableCell>
                        <MUI.TableCell>Status</MUI.TableCell>
                        <MUI.TableCell>View Submission</MUI.TableCell>
                        <MUI.TableCell>Remarks</MUI.TableCell>
                        <MUI.TableCell>Action</MUI.TableCell>
                        </MUI.TableRow>
                    </MUI.TableHead>
                        <MUI.TableBody>
                            {renewalForms.map((renewalForm, index) => (
                            <MUI.TableRow key={index} className='user' >
                            <MUI.TableCell sx={{border: 'none'}}  className='name'>
                            {`${renewalForm.user_first_name} ${renewalForm.user_middle_name || ""} ${renewalForm.user_last_name}`}
                            </MUI.TableCell>
                            <MUI.TableCell sx={{border: 'none'}}  className='email'> 
                                {renewalForm.submission_status && renewalForm.submission_status.length > 0 ? renewalForm.submission_status : 'No Submission'}
                            </MUI.TableCell>
                            
                            <MUI.TableCell sx={{border: 'none'}}  className='role'>
                                <MUI.IconButton color="inherit" component={Link} to='/renewal-view' sx={{ml: 2}}>
                                    <MUI.TableChartIcon sx={{transform: 'rotate(90deg)'}}/>
                                </MUI.IconButton>
                            </MUI.TableCell>

                            <MUI.TableCell sx={{border: 'none'}}  className='status'>
                                <MUI.IconButton color="inherit">
                                    <MUI.AddCommentOutlinedIcon />
                                </MUI.IconButton>
                            </MUI.TableCell>

                            <MUI.TableCell sx={{border: 'none', color: '#2684ff' }}>

                                <MUI.Button variant='contained'>
                                    <MUI.NotificationsIcon/>
                                    <MUI.Typography variant='h5'>
                                        Send Reminders
                                    </MUI.Typography>  
                                </MUI.Button>

                            </MUI.TableCell>
                            </MUI.TableRow>
                        ))} 
                        </MUI.TableBody>
                    </MUI.Table>
                    <MUI.Divider sx={{width:'100%'}}/>
                </MUI.TableContainer>   

            </MUI.Container>
        </MUI.ThemeProvider>
    </Layout>
  )
}
