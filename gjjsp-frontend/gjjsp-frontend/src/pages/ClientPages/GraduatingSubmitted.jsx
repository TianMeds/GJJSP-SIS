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

export default function GraduatingSubmitted() {

    //React Hook form 
    const form  = useForm();
    const { register, control, handleSubmit, formState, reset, watch, validate, setValue} = form
    const { errors } = formState;

    const navigate = useNavigate();

    const {getAuthToken, alertOpen, alertMessage, setAlertOpen, setAlertMessage, errorOpen, setErrorOpen, setErrorMessage, errorMessage} = useAuthStore();
    const {setLoading, setLoadingMessage } = useLoginStore();
    const {graduatingForms, setGraduatingForms, modalGraduating, setModalGraduating, graduatingIdToSend, setGraduatingIdToSend, filteredSubmission, setFilteredSubmission, searchQuery, handleSearch, selectedSubmission, setSelectedSubmission, passYear, setPassYear} = useSubmissionStore();

    const [schoolYears, setSchoolYears] = useState([]);


    const handleOpenModalGraduating = (id) => {
        setGraduatingIdToSend(id);
        setModalGraduating(true);
    }

    const handleCloseModalGraduating = () => {
        setGraduatingIdToSend(null);
        setModalGraduating(false);
    }

    const getCurrentSchoolYear = () => {
        const currentMonth = new Date().getMonth() + 1;
        const currentYear = new Date().getFullYear();

        const startYear = currentMonth < 4 ? currentYear - 1 : currentYear;
        const endYear = startYear + 1;

        return `${startYear}-${endYear}`;
    };
    useEffect(() => {
        const storedSchoolYears = localStorage.getItem('schoolYears');
        const parsedSchoolYears = storedSchoolYears ? JSON.parse(storedSchoolYears) : [];
        
        const currentSY = getCurrentSchoolYear();
        if (!parsedSchoolYears.includes(currentSY)) {
            const updatedYears = [currentSY, ...parsedSchoolYears].slice(0, 10);
            localStorage.setItem('schoolYears', JSON.stringify(updatedYears));
            setSchoolYears(updatedYears);
        } else {
            setSchoolYears(parsedSchoolYears);
        }
    }, []);
    

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
                    setGraduatingForms(response.data.data);
                    setAlertOpen(true);
                    setAlertMessage('Graduating forms fetched successfully.');
                }
                else{
                   setErrorOpen(true);
                     setErrorMessage('Failed to fetch graduating forms.');
                }
            }
            catch(error){
                if(error.response.status === 401) {
                    navigate('/login')
                }
                else{
                    setErrorMessage('Unable to fetch graduating forms. Please try again.');
                    setErrorOpen(true);
                }
            }
        }
        fetchScholars();
    }, []);

    const sendReminder = async () => {
        try { 
            const authToken = getAuthToken();

            setLoading(true);
            setLoadingMessage('Sending reminders...');
            setAlertOpen(true);
            setAlertMessage('Sending Reminder.');

            const response = await axios.put(`/api/graduating-reminders/${graduatingIdToSend}`, null, {
                headers: {
                    'Authorization': `Bearer ${authToken}`
                }
            });

            if (response.status === 200) {
                setAlertMessage('Reminder sent successfully.');
                setAlertOpen(true);
            }
            else{
                setErrorMessage('Failed to send reminder.');
                setErrorOpen(true);
            }

            setLoading(false);
            handleCloseModalGraduating();
        }

        catch(error){
            if(error.response.status === 401) {
                navigate('/login')
            }
            else{
                setErrorMessage('Unable to send reminder. Please try again.');
                setErrorOpen(true);
            }
        }
    }

    const selectedYear = watch("school_yr_submitted");

    const viewSubmission = (submissionId, schoolYear) => {
        const selectedSubmission = graduatingForms.find((graduatingForm) => graduatingForm.id === submissionId);

        if (selectedSubmission) {
            setSelectedSubmission(selectedSubmission);
            setPassYear(schoolYear);
            navigate('/graduating-view');
        }

        else {
            setErrorMessage('Unable to view submission. Please try again.');
            setErrorOpen(true);
        }
    };

  return (
    <Layout>
    <MUI.ThemeProvider theme={theme}>
        <MUI.Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <MUI.Grid container spacing={3}>
                <MUI.Grid item xs={12}>
                    <MUI.Grid item sx={{display: 'flex', alignItems: 'center'}} gap={4} xs={12}>

                        <MUI.Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} alignItems={{xs: 'left', md: 'center'}} margin={2} justifyContent="space-between">
                            <MUI.Typography variant="h1" id="tabsTitle" sx={{ color: 'black' }}>
                                Graduating Submission
                            </MUI.Typography>
                        </MUI.Box>

                    
                        <MUI.Grid id="schoolYearGrid">
                            <MUI.InputLabel htmlFor="school_yr_submitted" id="schoolYearLabel"></MUI.InputLabel>
                            <Controller
                                name="school_yr_submitted"
                                id="school_yr_submitted"
                                control={control}
                                defaultValue={schoolYears[0]}
                                render={({ field }) => (
                                <MUI.Select
                                    native
                                    {...field}
                                    sx={{border: '1px solid rgba(0,0,0,0.2)',
                                    boxShadow: '11px 7px 15px -3px rgba(0,0,0,0.1)', borderRadius: '15px', height: '50px'}}
                                >
                                    <option value="">Select SY</option>
                                    {schoolYears.map(year => (
                                        <option key={year} value={year}>{`SY ${year}`}</option>
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
            </MUI.Grid>

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
                        {graduatingForms
                        .filter((graduatingForm) => (
                            filteredSubmission === 'All' ? true : (
                                Object.entries(graduatingForm.graduating).some(([schoolYear, submissions]) => (
                                    schoolYear === selectedYear && submissions.some((submission) => submission.submission_status === filteredSubmission)
                                ))
                            )
                        ))
                        .filter((graduatingForm) => {
                            if (selectedYear === '') {
                                return true;
                            }
                            else {
                                return Object.keys(graduatingForm.graduating).some((schoolYear) => schoolYear === selectedYear);
                            }
                        })

                        .filter((graduatingForm) => (
                            (`${graduatingForm.user_first_name} ${graduatingForm.user_middle_name || ""} ${graduatingForm.user_last_name}`).toLowerCase().includes(searchQuery?.toLowerCase())
                        ))
                        .map((graduatingForm, index) => (
                            <React.Fragment key={index}>
                                {Object.entries(graduatingForm.graduating).map(([schoolYear, submissions]) => (
                                    selectedYear === schoolYear && (
                                        submissions.map((submission, submissionIndex) => (
                                            <MUI.TableRow key={`${index}-${schoolYear}-${submissionIndex}`} className='user' >
                                                <MUI.TableCell>{`${graduatingForm.user_first_name} ${graduatingForm.user_middle_name || ''} ${graduatingForm.user_last_name}`}</MUI.TableCell>
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
                                                    <MUI.IconButton color="inherit" onClick={() => viewSubmission(graduatingForm.id, schoolYear)}>
                                                        <MUI.TableChartIcon sx={{ transform: 'rotate(90deg)' }} />
                                                    </MUI.IconButton>
                                                </MUI.TableCell>
                                                <MUI.TableCell sx={{ color: '#2684ff' }}>
                                                    <MUI.Button variant='contained' onClick={() => handleOpenModalGraduating(graduatingForm.id)}>
                                                        <MUI.NotificationsIcon/>
                                                        <MUI.Typography variant='h5'>Send Reminders</MUI.Typography>  
                                                    </MUI.Button>
                                                </MUI.TableCell>
                                            </MUI.TableRow>
                                        ))
                                    )
                                ))}
                                {/* Render a row indicating no submission if there are no submissions */}
                                {Object.keys(graduatingForm.graduating).length === 0 && (
                                    <MUI.TableRow key={`${index}-no-submission`} className='user' >
                                        <MUI.TableCell>{`${graduatingForm.user_first_name} ${graduatingForm.user_middle_name || ''} ${graduatingForm.user_last_name}`}</MUI.TableCell>
                                        <MUI.TableCell>
                                        <span className='No_Submission'>No Submission</span>
                                        </MUI.TableCell>
                                        <MUI.TableCell>
                                            <MUI.IconButton color="inherit" onClick={() => viewSubmission(graduatingForm.id, schoolYear)}>
                                                <MUI.TableChartIcon sx={{ transform: 'rotate(90deg)' }} />
                                            </MUI.IconButton>
                                        </MUI.TableCell>
                                        <MUI.TableCell sx={{ color: '#2684ff' }}>
                                            <MUI.Button variant='contained' onClick={() => handleOpenModalGraduating(graduatingForm.id)}>
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



                <MUI.Dialog open={modalGraduating} onClose={handleCloseModalGraduating} >
                    <MUI.DialogTitle id="dialogTitle" mt={2}>
                        Send Reminders
                    </MUI.DialogTitle>
                    <MUI.DialogContent>
                    <MUI.Typography variant='h5' ml={1} sx={{color: '#44546F'}}>
                        You are about to send reminders to {graduatingForms.user_first_name} {graduatingForms.user_middle_name || ""} {graduatingForms.user_last_name} for their graduating submission. Are you sure you want to proceed?
                    </MUI.Typography>
                    </MUI.DialogContent>

                    <MUI.DialogActions>
                    <MUI.Button  color="primary" onClick={handleCloseModalGraduating}>
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
