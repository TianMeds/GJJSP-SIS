import React, {useEffect, useState} from 'react';
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

export default function AlumniSubmitted() {

    //React Hook form 
    const form  = useForm();
    const { register, control, handleSubmit, formState, reset, watch, validate, setValue} = form
    const { errors } = formState;
    const navigate = useNavigate();

    //Stores
    const {getAuthToken, alertOpen, alertMessage, setAlertOpen, setAlertMessage, errorOpen, setErrorOpen, setErrorMessage, errorMessage} = useAuthStore();
    const { setLoading, setLoadingMessage } = useLoginStore();
    const {alumniForms, setAlumniForms, filteredSubmission, setFilteredSubmission, searchQuery, handleSearch, selectedSubmission, setSelectedSubmission, passYear, setPassYear, modalAlumni, setModalAlumni, alumniIdToSend, setAlumniIdToSend } = useSubmissionStore();

    const getCurrentYear = () => {
        const currentYear = new Date().getFullYear(); // Get current year
        const nextYear = currentYear + 1; // Get next year
        const yearsToShow = 0; // Number of past years to show
        const years = [];
    
        for (let i = 0; i <= yearsToShow; i++) {
            years.push(currentYear - i);
        }
    
        return years.reverse().concat([nextYear]); // Return an array with past and future years
    };

    const currentYear = new Date().getFullYear();

    useEffect(() => {
        const fetchScholars = async () => {
            try {
                const authToken = getAuthToken();

                const response = await axios.get('/api/scholars', {
                    headers: {
                        Authorization: `Bearer ${authToken}`
                    }
                });

                if (response.status === 200) {
                    setAlumniForms(response.data.data);
                    setAlertOpen(true);
                    setAlertMessage('Scholars fetched successfully');
                }
                else {
                    setErrorOpen(true);
                    setErrorMessage('Failed to fetch scholars');
                }
            }
            catch(error) {
                if(error.response.status === 401) 
                {
                    navigate('/login');
                }
                else {
                    setErrorOpen(true);
                    setErrorMessage('Unable to fetch alumni forms. Please try again');
                }
            }
        }

        fetchScholars();
    }, []);

    const viewSubmission = (submissionId, currentYear) => {
        const selectedSubmission = alumniForms.find((alumniForm) => alumniForm.id === submissionId);

        if(selectedSubmission) {
            setSelectedSubmission(selectedSubmission);
            setPassYear(currentYear);
            navigate('/alumni-view');
        }

        else {
            setErrorOpen(true);
            setErrorMessage('Unable to view submission');
        }
    }

    const  handleOpenModalAlumni = (id) => {
        setAlumniIdToSend(id);
        setModalAlumni(true);
    }

    const handleCloseModalAlumni = () => {
        setAlumniIdToSend(null);
        setModalAlumni(false);
    }

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
    
            const response = await axios.put(`/api/alumni-reminders/${alumniIdToSend}`, null, {
                headers: {
                    'Authorization': `Bearer ${authToken}`
                }
            });
    
            if (response.status === 200) {
                setAlertMessage('Reminders sent successfully.');
                setAlertOpen(true);
            } else {
               setErrorMessage('Failed to send reminders.');
                setErrorOpen(true);
            }
            setLoading(false);
            handleCloseModalAlumni();
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

    const selectedYear = watch('year_submitted');

  return (
      <Layout>
        <MUI.ThemeProvider theme={theme}>
            <MUI.Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <MUI.Grid container spacing={3}>
                    <MUI.Grid item xs={12}>
                        <MUI.Grid item sx={{display: 'flex', alignItems: 'center'}} gap={4} xs={12}>

                            <MUI.Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} alignItems={{xs: 'left', md: 'center'}} margin={2} justifyContent="space-between">
                                <MUI.Typography variant="h1" id="tabsTitle" sx={{ color: 'black' }}>
                                    Alumni Submission
                                </MUI.Typography>
                            </MUI.Box>

                        
                            <MUI.Grid id="schoolYearGrid">
                                <MUI.InputLabel htmlFor="year_submitted" id="schoolYearLabel"></MUI.InputLabel>
                                <Controller
                                    name="year_submitted"
                                    id="year_submitted"
                                    control={control}
                                    defaultValue=""
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
                                            <option value="">Select Year</option>
                                            {getCurrentYear().map((year) => (
                                                <option key={year} value={year}>{`Year ${year}`}</option>
                                            ))}
                                        </MUI.Select>
                                    )}
                                />
                            </MUI.Grid>


                        </MUI.Grid>
                    </MUI.Grid>

                    <MUI.Grid sx={{ borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', overflow: 'auto', width: '100%' }}>

                <MUI.Container sx={{mt: 4, mb: 4,  display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Search>
                            <SearchIconWrapperV2>
                                <MUI.SearchIcon />
                            </SearchIconWrapperV2>
                            <StyledInputBaseV2
                                placeholder="Search for names, groups, or email addresses"
                                inputProps={{ 'aria-label': 'search' }}
                                value={searchQuery}
                                onChange={handleSearch}
                            />
                        </Search>

                        <MUI.FormControl sx={{ minWidth: 120 }}>
                            <MUI.Select
                            value={filteredSubmission}
                            onChange={(e) => setFilteredSubmission(e.target.value)} 
                            displayEmpty
                            inputProps={{ 'aria-label': 'Filter' }}
                            startAdornment={
                                <MUI.InputAdornment position="start">
                                <MUI.FilterListIcon
                                    viewBox="0 0 24 24"
                                    sx={{ width: 20, height: 20, color: 'rgba(0, 0, 0, 0.54)' }}
                                />
                                </MUI.InputAdornment>
                            }
                            sx={{ borderRadius: '12px' }}
                            >
                            <MUI.MenuItem value="All">All</MUI.MenuItem>
                            <MUI.MenuItem value="For Approval">For Approval</MUI.MenuItem>
                            <MUI.MenuItem value="Approved">Approved</MUI.MenuItem>
                            <MUI.MenuItem value="For Resubmission">For Resubmission</MUI.MenuItem>
                            </MUI.Select>
                        </MUI.FormControl>
                </MUI.Container>
                
                <MUI.TableContainer sx={{ backgroundColor: '#fbf3f2' }}>
                    <MUI.Table> 
                        <MUI.TableHead>
                            <MUI.TableRow>
                                <MUI.TableCell sx={{fontWeight: 'bold', fontSize: '1rem'}}>Scholar's Name</MUI.TableCell>
                                <MUI.TableCell sx={{fontWeight: 'bold', fontSize: '1rem'}}>Status</MUI.TableCell>
                                <MUI.TableCell sx={{fontWeight: 'bold', fontSize: '1rem'}}>View Submission</MUI.TableCell>
                                <MUI.TableCell sx={{fontWeight: 'bold', fontSize: '1rem'}}>Action</MUI.TableCell>
                            </MUI.TableRow>
                        </MUI.TableHead>
                        <MUI.TableBody>
                            {alumniForms
                            .filter((alumniForm) => (
                            filteredSubmission === 'All' ? true : (
                                Object.entries(alumniForm.alumni).some(([schoolYear, submissions]) => (
                                    schoolYear === selectedYear && submissions.some((submission) => submission.submission_status === filteredSubmission)
                                ))
                            )
                            ))
                            .filter((alumniForm) => {
                                if (selectedYear === '') {
                                    return true;
                                }
                                else {
                                    return Object.keys(alumniForm.alumni).some((schoolYear) => schoolYear === selectedYear);
                                }
                            })
                            .filter((alumniForm) => (
                                (`${alumniForm.user_first_name} ${alumniForm.user_middle_name || ""} ${alumniForm.user_last_name}`).toLowerCase().includes(searchQuery?.toLowerCase())
                            ))
                            .map((alumniForm, index) => (
                                <React.Fragment key={index}>
                                    {alumniForm.alumni[selectedYear]?.map((submission, submissionIndex) => (
                                        <MUI.TableRow key={`${index}-${selectedYear}-${submissionIndex}`} className='user' >
                                            <MUI.TableCell>{`${alumniForm.user_first_name} ${alumniForm.user_middle_name || ''} ${alumniForm.user_last_name}`}</MUI.TableCell>
                                            <MUI.TableCell>
                                                {submission.submission_status === 'For Approval' ? (
                                                    <span className='For_Approval'>For Approval</span>
                                                ) : submission.submission_status === 'Approved' ? (
                                                    <span className='Approved'>Approved</span>
                                                ) : submission.submission_status === 'For Resubmission' ? (
                                                    <span className='For_Resubmission'>For Resubmission</span>
                                                ) : (
                                                    <span className='No_Submission'>No Submission</span>
                                                )}
                                            </MUI.TableCell>
                                            <MUI.TableCell>
                                                <MUI.IconButton color="inherit" onClick={() => viewSubmission(alumniForm.id, currentYear)}>
                                                    <MUI.TableChartIcon sx={{ transform: 'rotate(90deg)' }} />
                                                </MUI.IconButton>
                                            </MUI.TableCell>
                                            <MUI.TableCell sx={{ color: '#2684ff' }}>
                                                <MUI.Button variant='contained' onClick={() => handleOpenModalAlumni(alumniForm.id)}>
                                                    <MUI.NotificationsIcon/>
                                                    <MUI.Typography variant='h5'>Send Reminders</MUI.Typography>  
                                                </MUI.Button>
                                            </MUI.TableCell>
                                        </MUI.TableRow>
                                    ))}
                                    {/* Render a row indicating no submission if there are no submissions */}
                                    {Object.keys(alumniForm.alumni).length === 0 && (
                                        <MUI.TableRow key={`${index}-no-submission`} className='user' >
                                            <MUI.TableCell>{`${alumniForm.user_first_name} ${alumniForm.user_middle_name || ''} ${alumniForm.user_last_name}`}</MUI.TableCell>
                                            <MUI.TableCell>
                                                <span className='No_Submission'>No Submission</span>
                                            </MUI.TableCell>
                                            <MUI.TableCell>
                                                <MUI.IconButton color="inherit" onClick={() => viewSubmission(alumniForm.id, currentYear)}>
                                                    <MUI.TableChartIcon sx={{ transform: 'rotate(90deg)' }} />
                                                </MUI.IconButton>
                                            </MUI.TableCell>
                                            <MUI.TableCell sx={{ color: '#2684ff' }}>
                                                <MUI.Button variant='contained' onClick={() => handleOpenModalAlumni(alumniForm.id)}>
                                                    <MUI.NotificationsIcon/>
                                                    <MUI.Typography variant='h5'>Send Reminders</MUI.Typography>  
                                                </MUI.Button>
                                            </MUI.TableCell>
                                        </MUI.TableRow>
                                    )}
                                </React.Fragment>
                            ))}
                        </MUI.TableBody>
                    </MUI.Table>
                    <MUI.Divider sx={{ width: '100%' }}/>
                </MUI.TableContainer>


                </MUI.Grid>

                <MUI.Dialog open={modalAlumni} onClose={handleCloseModalAlumni} >
                    <MUI.DialogTitle id="dialogTitle" mt={2}>
                        Send Reminders
                    </MUI.DialogTitle>
                    <MUI.DialogContent>
                    <MUI.Typography variant='h5' ml={1} sx={{color: '#44546F'}}>
                        You are about to send reminders to {alumniForms.user_first_name} {alumniForms.user_middle_name || ""} {alumniForms.user_last_name} for their Alumni submission. Are you sure you want to proceed?
                    </MUI.Typography>
                    </MUI.DialogContent>

                    <MUI.DialogActions>
                    <MUI.Button  color="primary" onClick={handleCloseModalAlumni}>
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


                </MUI.Grid>
            </MUI.Container>
        </MUI.ThemeProvider>
    </Layout>
  )
}
