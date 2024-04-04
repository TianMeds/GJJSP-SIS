import React, {useEffect} from 'react';
import * as MUI from '../../import';
import Layout from '../../component/Layout/SidebarNavbar/Layout';
import { Link, useNavigate } from 'react-router-dom';
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
    const { renewalForms, setRenewalForms, renewalForm, selectedSubmission, setSelectedSubmission, submissionValues, setSubmissionValues, submissionValue, renewalSubmission, setRenewalSubmission, modalRenewal, setModalRenewal, renewalIdToSend, setRenewalIdToSend  } = useSubmissionStore();

    const navigate = useNavigate();
    //Get Scholars Data

    const  handleOpenModalRenewal = (id) => {
        setRenewalIdToSend(id);
        setModalRenewal(true);
    }

    const handleCloseModalRenewal = () => {
        setRenewalIdToSend(null);
        setModalRenewal(false);
    }



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
                    setRenewalForms(response.data.data);
                    setAlertOpen(true);
                    setAlertMessage('Renewal forms fetched successfully.');
                }
                else{
                   setErrorOpen(true);
                     setErrorMessage('Failed to fetch renewal forms.');
                }
            }
            catch(error){
                if(error.response.status === 401) {
                    navigate('/login')
                }
                else{
                    setErrorMessage('Unable to fetch renewal forms. Please try again.');
                    setErrorOpen(true);
                }
            }
        }
        fetchScholars();
    }, []);

    const sendReminder = async () => {
        try {
            const authToken = getAuthToken();
            if (!authToken) {
                console.error("Authentication token is missing.");
                return;
            }
            
            setLoading(true);
            setLoadingMessage('Sending reminders...');
            setAlertOpen(true);
            setAlertMessage('Sending reminders...');
    
            const response = await axios.put(`/api/send-reminders/${renewalIdToSend}`, null, {
                headers: {
                    'Authorization': `Bearer ${authToken}`
                }
            });
    
            if (response.status === 200) {
                setRenewalSubmission(response.data.data);
                setAlertMessage('Reminders sent successfully.');
                setAlertOpen(true);
            } else {
               setErrorMessage('Failed to send reminders.');
                setErrorOpen(true);
            }
            setLoading(false);
            handleCloseModalRenewal();
        } catch (error) {
            if(error.response.status === 401) {
                navigate('/login')
            }
            else{
                setErrorMessage('Unable to send reminders. Please try again.');
                setErrorOpen(true);
            }
        setLoading(false);

        }
    };


      //View Submission Function
    const viewSubmission = (submissionId) => {
        
        const selectedSubmission = renewalForms.find((renewalForm) => renewalForm.id === submissionId);

        if(selectedSubmission){
            setSelectedSubmission(selectedSubmission);
            navigate('/renewal-view');
        }

        else{
            console.log('Submission not found');
        }
    };
    
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
                            <MUI.TableCell sx={{border: 'none'}}  className='submission_status'> 
                                {renewalForm.submission_status && renewalForm.submission_status.length > 0 ? renewalForm.submission_status : 'No Submission'}
                            </MUI.TableCell>
                            
                            <MUI.TableCell sx={{border: 'none'}}  className='role'>
                                <MUI.IconButton color="inherit" onClick={() => viewSubmission(renewalForm.id)}>
                                    <MUI.TableChartIcon sx={{transform: 'rotate(90deg)'}}/>
                                </MUI.IconButton>
                            </MUI.TableCell>

                            <MUI.TableCell sx={{border: 'none'}}  className='status'>
                                <MUI.IconButton color="inherit">
                                    <MUI.AddCommentOutlinedIcon />
                                </MUI.IconButton>
                            </MUI.TableCell>

                            <MUI.TableCell sx={{border: 'none', color: '#2684ff' }}>

                                <MUI.Button variant='contained' onClick={() => handleOpenModalRenewal(renewalForm.id)}>
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

                <MUI.Dialog open={modalRenewal} onClose={handleCloseModalRenewal} >
                    <MUI.DialogTitle id="dialogTitle" mt={2}>
                        Send Reminders
                    </MUI.DialogTitle>
                    <MUI.DialogContent>
                    <MUI.Typography variant='h5' ml={1} sx={{color: '#44546F'}}>
                        You are about to send reminders to {renewalForms.user_first_name} {renewalForms.user_middle_name || ""} {renewalForms.user_last_name} for their renewal submission. Are you sure you want to proceed?
                    </MUI.Typography>
                    </MUI.DialogContent>

                    <MUI.DialogActions>
                    <MUI.Button  color="primary" onClick={handleCloseModalRenewal}>
                        Cancel
                    </MUI.Button>
                    <MUI.Button
                        color="primary"
                        variant="contained"
                        sx={{
                        borderRadius: '5px',
                        mb: 2,
                        mt: 2,
                        backgroundColor: '#43a047',
                        '&:hover': {
                            backgroundColor: '#43a047', // Change color on hover
                        },
                        }}
                        onClick={sendReminder}
                    >
                        Send Reminder
                    </MUI.Button>
                    </MUI.DialogActions>

                </MUI.Dialog>

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

            </MUI.Container>
        </MUI.ThemeProvider>
    </Layout>
  )
}
