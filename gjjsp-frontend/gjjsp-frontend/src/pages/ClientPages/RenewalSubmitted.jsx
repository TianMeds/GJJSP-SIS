import React, {useEffect, useState} from 'react';
import * as MUI from '../../import';
import Layout from '../../component/Layout/SidebarNavbar/Layout';
import { Link, useNavigate } from 'react-router-dom';
import theme from '../../context/theme';
import HistoryIcon from '@mui/icons-material/History';
import axios from '../../api/axios';
import classNames from 'classnames';

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
    const { register, control, handleSubmit, formState, reset, watch, validate, setValue, getValues} = form
    const { errors } = formState;

    //Zustand Calls
    const {getAuthToken, alertOpen, alertMessage, setAlertOpen, setAlertMessage, errorOpen, setErrorOpen, setErrorMessage, errorMessage} = useAuthStore();
    const { showPassword, handleTogglePassword, setLoading, setLoadingMessage } = useLoginStore();
    const { renewalForms, setRenewalForms, renewalForm, selectedSubmission, setSelectedSubmission, setRenewalSubmission, modalRenewal, setModalRenewal, renewalIdToSend, setRenewalIdToSend, filteredSubmission, setFilteredSubmission, searchQuery, handleSearch,  setRenewalMap,  setPassYear, setPassTerm  } = useSubmissionStore();
    const [schoolYears, setSchoolYears] = useState([]);

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
            const updatedYears = [currentSY, ...parsedSchoolYears].slice(0, 2);
            localStorage.setItem('schoolYears', JSON.stringify(updatedYears));
            setSchoolYears(updatedYears);
        } else {
            setSchoolYears(parsedSchoolYears);
        }
    }, []);
    

    useEffect(() => {
        const fetchRenewalForms = async () => {
            try {
                console.log("Fetching renewal forms...");
                const authToken = getAuthToken();
                
                const response = await axios.get('/api/renewal-documents', {
                    headers: {
                        'Authorization': `Bearer ${authToken}`
                    }
                });
        
                if (response.status === 200) {
                    setRenewalMap(response.data.data);
                }
                
            } catch (error) {
                console.error("Error fetching renewal forms:", error);
                if (error.response && error.response.status === 401) {
                    navigate('/login');
                }
            }
        };
        fetchRenewalForms();
    }, []);
            

    const selectedTerm = watch("term_submitted");
    const selectedYear = watch("school_yr_submitted");
    

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
                setErrorMessage('You are not authorized to perform this action. Please refresh browser');
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
    const viewSubmission = (submissionId, schoolYear, term) => {
        
        const selectedSubmission = renewalForms.find((renewalForm) => renewalForm.id === submissionId);

        if(selectedSubmission){
            setPassYear(schoolYear);
            setPassTerm(term);
            setSelectedSubmission(selectedSubmission);
            navigate('/renewal-view');
        }

        else{
            setErrorOpen(true);
            setErrorMessage('Failed to view submission.');
        }
    };
    
  return (
    <Layout>
        <MUI.ThemeProvider theme={theme}>
            <MUI.Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <MUI.Grid container spacing={3}>
                    <MUI.Grid item xs={12}  mb={4}> 
                        <MUI.Grid item sx={{display: 'flex', alignItems: 'center'}} gap={4}>

                            <MUI.Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} alignItems={{xs: 'left', md: 'center'}} justifyContent="space-between">
                                <MUI.Typography variant="h1" id="tabsTitle" sx={{ color: 'black' }}>
                                    Renewal Submission
                                </MUI.Typography>
                            </MUI.Box>

                    

                            <MUI.Grid id="schoolYearGrid">
                                <MUI.InputLabel htmlFor="school_yr_submitted" id="schoolYearLabel"></MUI.InputLabel>
                                <Controller
                                    name="school_yr_submitted"
                                    id="school_yr_submitted"
                                    control={control}
                                    defaultValue={schoolYears[0]} // Set the default value to the first school year in the list
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
                                        <option value="">Select SY</option> 
                                        {schoolYears.map(year => (
                                        <option key={year} value={year}>{`SY ${year}`}</option>
                                        ))}
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
                            {/* <MUI.MenuItem value="No Submission">No Submission</MUI.MenuItem> */}
                            </MUI.Select>
                        </MUI.FormControl>
                    </MUI.Container>

                    <MUI.TableContainer sx={{ backgroundColor: '#00000' }}>
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
                        {renewalForms
                            .filter((renewalForm) => {
                                return filteredSubmission === "All" ? true : (
                                    Object.values(renewalForm.renewing).some(termData => termData.submission_status === filteredSubmission)
                                );
                            })
                            // Filter the submissions based on the selected school year
                            .filter((renewalForm) => {
                                if (selectedYear === "") {
                                    return true; // No year selected, don't apply filtering
                                } else {
                                    return Object.keys(renewalForm.renewing).some(schoolYear => schoolYear === selectedYear);
                                }
                            })
                            .filter((renewalForm) => (
                                (`${renewalForm.user_first_name} ${renewalForm.user_middle_name || ""} ${renewalForm.user_last_name}`).toLowerCase().includes(searchQuery?.toLowerCase())
                            ))
                            .map((renewalForm, index) => (
                                <React.Fragment key={index}>
                                    {Object.entries(renewalForm.renewing).map(([schoolYear, terms]) => (
                                        terms
                                            .filter(termData => termData.term === selectedTerm || selectedTerm === "")
                                            .map((termData, docIndex) => (
                                                <MUI.TableRow key={`${index}-${termData.term}-${docIndex}`} className='user'>
                                                    <MUI.TableCell sx={{border: 'none'}}  className='name'>
                                                        {`${renewalForm.user_first_name} ${renewalForm.user_middle_name || ""} ${renewalForm.user_last_name}`}
                                                    </MUI.TableCell>
                                                    <MUI.TableCell sx={{border: 'none'}}  className='submission_status'> 
                                                        {termData.submission_status === 'For Approval' ? (
                                                            <span className='For_Approval'>For Approval</span>
                                                        ) : termData.submission_status === 'Approved' ? (
                                                            <span className='Approved'>Approved</span>
                                                        ) : termData.submission_status === 'For Resubmission' ? (
                                                            <span className='For_Resubmission'>For Resubmission</span>
                                                        ) : (
                                                            <span className='No_Submission'>No Submission</span>
                                                        )}
                                                    </MUI.TableCell>
                                                    <MUI.TableCell sx={{border: 'none'}}  className='role'>
                                                        <MUI.IconButton color="inherit" onClick={() => viewSubmission(renewalForm.id, schoolYear, termData.term)}>
                                                            <MUI.TableChartIcon sx={{transform: 'rotate(90deg)' , marginLeft: '2rem'}}/>
                                                        </MUI.IconButton>
                                                    </MUI.TableCell>
                                                    <MUI.TableCell sx={{border: 'none', color: '#2684ff' }}>
                                                        <MUI.Button variant='contained' onClick={() => handleOpenModalRenewal(renewalForm.id)}>
                                                            <MUI.NotificationsIcon/>
                                                            <MUI.Typography variant='h6' color={'white'}>
                                                                Send Reminders
                                                            </MUI.Typography>  
                                                        </MUI.Button>
                                                    </MUI.TableCell>
                                                </MUI.TableRow>
                                            ))
                                    ))}
                                    {/* Render a row indicating no submissions if there are no documents */}
                                    {!Object.keys(renewalForm.renewing).length && (
                                        <MUI.TableRow>
                                            <MUI.TableCell sx={{border: 'none'}}  className='name'>
                                                {`${renewalForm.user_first_name} ${renewalForm.user_middle_name || ""} ${renewalForm.user_last_name}`}
                                            </MUI.TableCell>
                                            <MUI.TableCell sx={{border: 'none'}}  className='submission_status'> 
                                                <span className='No_Submission'>No Submission</span>
                                            </MUI.TableCell>
                                            <MUI.TableCell sx={{border: 'none'}}  className='role'>
                                                <MUI.IconButton color="inherit" onClick={() => viewSubmission(renewalForm.id)}>
                                                    <MUI.TableChartIcon sx={{transform: 'rotate(90deg)', marginLeft: '2rem'}}/>
                                                </MUI.IconButton>
                                            </MUI.TableCell>
                                            <MUI.TableCell sx={{border: 'none', color: '#2684ff' }}>
                                                <MUI.Button variant='contained' onClick={() => handleOpenModalRenewal(renewalForm.id)}>
                                                    <MUI.NotificationsIcon/>
                                                    <MUI.Typography variant='h6' color={'white'}>
                                                        Send Reminders
                                                    </MUI.Typography>  
                                                </MUI.Button>
                                            </MUI.TableCell>
                                        </MUI.TableRow>
                                    )}
                                </React.Fragment>
                            ))}
                    </MUI.TableBody>

                        </MUI.Table>
                        <MUI.Divider sx={{width:'100%'}}/>
                    </MUI.TableContainer>


                </MUI.Grid>

                </MUI.Grid>


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
{/* 
                <MUI.Dialog open={modalRemarks} onClose={handleCloseModalRemarks}>
                    <MUI.DialogTitle id="dialogTitle" mt={2}>
                        Send Remarks
                    </MUI.DialogTitle>

                    <MUI.DialogContent>
                        <MUI.Grid id="remarksGrid">
                            <MUI.InputLabel htmlFor="remarks_message" id="remarksLabel">First Name</MUI.InputLabel>
                                <MUI.TextField 
                                type='text'
                                id='remarks_message'
                                placeholder='Name' 
                                fullWidth 
                                
                                {...register("remarks_message", {
                                    required: {
                                    value: true,
                                    message: 'Remarks Message is required',
                                    },
                                })}
                                />
                                {errors.remarks_message && (
                                <p id='errMsg'> 
                                <MUI.InfoIcon className='infoErr'/> 
                                {errors.remarks_message?.message}  
                                </p>
                            )}
                        </MUI.Grid>
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


                        >
                            Send Remarks
                        </MUI.Button>
                    </MUI.DialogActions>



                </MUI.Dialog> */}

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
