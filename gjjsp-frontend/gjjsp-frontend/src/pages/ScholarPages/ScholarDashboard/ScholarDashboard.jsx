import React, {useEffect, useState}  from 'react'
import {Link, useNavigate } from 'react-router-dom';


//Components 
import EditProfileDialog from '../../../component/Layout/Dialog/EditProfileDialog';
import Layout from '../../../component/Layout/SidebarNavbar/Layout';
import useAuthStore from '../../../store/AuthStore';
import LogoImg from '../../../assets/Scholarlink Logo (40 x 40 px).svg'
import theme from '../../../context/theme';
import * as MUI from '../../../import';
import useDashboardStore from '../../../store/DashboardStore';
import axios from '../../../api/axios';



export default function ScholarDashboard() {

  const navigate = useNavigate();
  
  const {getAuthToken, alertOpen, alertMessage, setAlertMessage, setAlertOpen, errorOpen, errorMessage, setErrorMessage, setErrorOpen, setOpenDialog, setOpenPrivacyDialog} = useAuthStore();
  const [buttonClicked, setButtonClicked] = useState(false);
  const {schoolsData, setSchoolsData, undergraduateData, setUndergraduateData, renewalData, setRenewalData} = useDashboardStore();

  const [scholarProfiles, setScholarProfiles] = useState([]);
  const [refreshTrigger, setRefreshTrigger] = useState(false);

  const handleRefresh = () => {
    setRefreshTrigger(!refreshTrigger);
    setAlertOpen(true);
    setAlertMessage("Refreshing Dashboard");
  };

  useEffect(() => {
    const fetchScholarDashboard = async () => {
      try {
        const token = getAuthToken();

        const response = await axios.get('/api/scholarsProfile', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.status === 200) {
          setScholarProfiles(response.data.data);
          setAlertOpen(true);
          setAlertMessage('Scholar Dashboard loaded');
        } else {
          setErrorOpen(true);
          setErrorMessage('Request failed with status:', response.status);
        }

        const underGradResponse = await axios.get('/api/undergrad-acad-detail', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (underGradResponse.status === 200) {
          setUndergraduateData(underGradResponse.data.data);
          setAlertOpen(true);
          setAlertMessage('Undergraduate data loaded');
        } else {
          setErrorOpen(true);
          setErrorMessage('Request failed with status:', underGradResponse.status);
        }

        const renewalResponse = await axios.get('/api/scholar-renewal-documents', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (renewalResponse.status === 200) {
          setRenewalData(renewalResponse.data.data);
          setAlertOpen(true);
          setAlertMessage('Renewal data loaded');
        }
        else {
          setErrorOpen(true);
          setErrorMessage('Request failed with status:', renewalResponse.status);
        }

        const schoolResponse = await axios.get('/api/schools', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (schoolResponse.status === 200) {
          setSchoolsData(schoolResponse.data.data);
          setAlertOpen(true);
          setAlertMessage('Schools loaded');
        }
        else {
          setErrorOpen(true);
          setErrorMessage('Request failed with status:', schoolResponse.status);
        }

      } catch (error) {
        setErrorMessage('Request failed with error:');
        setErrorOpen(true);
      
      }
    }; 
    fetchScholarDashboard();
  }, [refreshTrigger]);

  const handleButtonClick = () => {
    setButtonClicked(true);
  };

  useEffect(() => {
    setErrorOpen(false);
    handleRefresh();
    // Reset the buttonClicked state after the effect runs
    setButtonClicked(false);
  }, [buttonClicked]);

  useEffect(() => {
    const fetchScholarDashboard = async () => {
      try {
        const token = getAuthToken();
        const response = await axios.get('/api/scholarsProfile', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
  
        if (response.status === 200) {
          setScholarProfiles(response.data.data);
          setAlertOpen(true);
          setAlertMessage('Scholar Dashboard loaded');
        } else {
          setErrorOpen(true);
          setErrorMessage('Request failed with status:', response.status);
        }
      } catch (error) {
        console.error('Request failed with error:', error);
      }
    };
  
    fetchScholarDashboard();
  }, []);

  useEffect(() => {
    const fetchSchool = async () => {
      try {
        const token = getAuthToken();
        const response = await axios.get('/api/schools', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
  
        if (response.status === 200) {
          setSchoolsData(response.data.data);
          setAlertOpen(true);
          setAlertMessage('Schools loaded');
        } else {
          setErrorOpen(true);
          setErrorMessage('Request failed with status:');
        }

        const underGradResponse = await axios.get('/api/undergrad-acad-detail', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (underGradResponse.status === 200) {
          setUndergraduateData(underGradResponse.data.data);
          setAlertOpen(true);
          setAlertMessage('Undergraduate data loaded');
        } else {
          setErrorOpen(true);
          setErrorMessage('Request failed with status:');
        }

        const renewalResponse = await axios.get('/api/scholar-renewal-documents', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (renewalResponse.status === 200) {
          setRenewalData(renewalResponse.data.data);
          setAlertOpen(true);
          setAlertMessage('Renewal data loaded');
        }
        else {
          setErrorOpen(true);
          setErrorMessage('Request failed with status:');
        }

      } catch (error) {
        setErrorOpen(true);
        setErrorMessage('Request failed with error:');
      }
    }
    fetchSchool();
  }, []);

  const statusMapping = {
    1: "New",
    2: "For Renewal",
    3: "For Renewal: Graduating",
    4: "Renewed",
    5: "Graduating",
    6: "Graduated",
    7: "Alumni",
    8: "Withdrew",
  }

  const getStatusClassName = (statusId) => {
    switch (statusId) {
      case 1:
        return "New";
      case 2:
        return "For_Renewal";
      case 3:
        return "For_Renewal_Graduating";
      case 4:
        return "Renewed";
      case 5:
        return "Graduating";
      case 6:
        return "Graduated";
      case 7:
        return "Alumni";
      case 8:
        return "Withdrew";
      default:
        return "";
    }
  };

  const formatDate = (dateString) => {
    const options = { month: 'long', day: 'numeric', year: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
  };

  return (
    <Layout>
         <MUI.ThemeProvider theme={theme}>
        <MUI.Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <MUI.Grid container spacing={3}>

            {/* Header */}
            <MUI.Grid item xs={12}>
              <MUI.Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} alignItems={{xs: 'left', md: 'center'}} margin={2} justifyContent="space-between">
                <MUI.Typography variant="h1" id="tabsTitle" sx={{color: 'black'}}>Dashboard</MUI.Typography>
                          
                  {/* Add User Button */}
                  <MUI.Button variant="contained"
                    onClick={handleRefresh}
                    sx={{
                      backgroundColor: '#FFFFFF', 
                      color: '#091E42',
                      '&:hover': {
                        backgroundColor: 'transparent', // Set the background color to transparent on hover
                        boxShadow: '0px 2px 4px rgba(0, 0, 0, 1)', // Add the desired shadow on hover
                      },
                    }}>
                    <MUI.Typography variant='h5'>Refresh </MUI.Typography>
                    <MUI.LoopIcon />
                  </MUI.Button> 

                </MUI.Box>
            </MUI.Grid>

            {/* Introduction Box */}
            <MUI.Grid item xs={12} md={8} lg={8}>
            <MUI.Paper
               elevation={3}
                sx={{
                  p: 3,
                  display: 'flex',
                  flexDirection: 'row', 
                  height: '250px',
                  justifyContent: 'space-between', 
                  alignItems: 'center', 
                  borderRadius: '12px'
                }}
              >
                <div>
                  <MUI.Typography variant='h2'sx={{fontWeight: 'bold'}} m={2}>Welcome, Admin to Scholarlink</MUI.Typography>

                  <MUI.Box sx={{ display: 'flex', flexDirection: 'column', m: 2 }}>
                    <MUI.Typography variant='h5' pb={2}>
                      Check out the
                      <MUI.Typography component={Link} to="" variant='h5' sx={{textDecoration: 'none'}}> Scholarlink User Guide </MUI.Typography> 
                      for a quick tutorial 
                    </MUI.Typography>

                    <MUI.Typography variant='h5'>
                      Contact{' '}
                      <MUI.Link
                        href="mailto:cbmedallada@student.apc.edu.ph"
                        variant='h5'
                        sx={{ textDecoration: 'none' }}
                      >
                        See So Support Team
                      </MUI.Link>{' '}
                      for any issues or questions
                    </MUI.Typography>
                  </MUI.Box>
                </div>
                <img src={LogoImg} alt="Your Image Alt Text" style={{ width: '200px', height: '200px' }} />
              </MUI.Paper>
              
            </MUI.Grid>
            {/* Scholars Status Report */}
              <MUI.Grid item xs={12} md={2} lg={4}>
                <MUI.Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 'auto',
                  }}
                >
                  <MUI.Typography variant='h3' sx={{fontWeight: 'bold'}} >Academic Status</MUI.Typography>
                  <br/>

                  <MUI.Grid container alignItems="center" ml={1}>
                    <MUI.ApartmentIcon sx={{ color: '#1976d2' }} />
                    <MUI.Grid item>
                      <MUI.Typography variant='h5' sx={{ color: '#1976d2', ml: 1 }}>
                      {schoolsData.find((school) => school.id === scholarProfiles.school_id)?.school_name || 'School Not Found'}
                      </MUI.Typography>
                    </MUI.Grid>
                  </MUI.Grid>
                <br/>

                <MUI.Grid container alignItems="center" ml={1}>
                    <MUI.SchoolOutlinedIcon   sx={{color: '#1976d2'}}/>
                  <MUI.Grid item>
                    <MUI.Typography variant='h5'  sx={{color: '#1976d2' , ml: 1}}>{undergraduateData.current_yr_level || 'No Data yet'}</MUI.Typography>
                  </MUI.Grid>
                </MUI.Grid> 

                <br/>
                
                <MUI.Grid container alignItems="center" ml={1}>
                    <MUI.CalendarTodayIcon  sx={{color: '#1976d2'}}/>
                  <MUI.Grid item>
                    <MUI.Typography variant='h5'  sx={{color: '#1976d2', ml: 1}}>{undergraduateData.undergrad_sy || 'No Data yet'}</MUI.Typography>
                  </MUI.Grid>
                </MUI.Grid> 
                </MUI.Paper>

                <MUI.Grid item xs={12} md={8} lg={12} mt={2}>
                  <MUI.Paper
                    sx={{
                      p: 2,
                      display: 'flex',
                      flexDirection: 'column',
                      height: 'auto',
                    }}
                  >
                  <MUI.Grid container alignItems="center">
                    <MUI.Typography variant='h4' sx={{ fontWeight: 'bold' }}>Scholar Status :</MUI.Typography>
                    <MUI.Typography variant='h4' ml={2} className={getStatusClassName(scholarProfiles.scholar_status_id)}> {statusMapping[scholarProfiles.scholar_status_id] || 'Unknown'}</MUI.Typography>
                  </MUI.Grid>
                  </MUI.Paper>
                </MUI.Grid>
              </MUI.Grid>
              
          </MUI.Grid>

          <MUI.Grid xs={8} mt={2}>
            <MUI.Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 'auto',
              }}
            >
              <MUI.Typography variant='h3' sx={{fontWeight: 'bold', mb: 4}} >Submissions</MUI.Typography>

              <MUI.TableContainer>
                    <MUI.Table sx={{ minWidth: 650, borderCollapse: 'separate', borderSpacing: 0 }}>
                      <MUI.TableHead>
                        <MUI.TableRow>
                          <MUI.TableCell sx={{ background: '#f5f5f5', fontWeight: 'bold', fontSize: '1rem', padding: '16px', textAlign: 'left', borderBottom: 'none', borderRight: 'none', borderTopLeftRadius: '12px' }}>Submission</MUI.TableCell>
                          <MUI.TableCell sx={{ background: '#f5f5f5', fontWeight: 'bold', fontSize: '1rem', padding: '16px', textAlign: 'left', borderBottom: 'none', borderRight: 'none' }}>Submitted</MUI.TableCell>
                          <MUI.TableCell sx={{ background: '#f5f5f5', fontWeight: 'bold', fontSize: '1rem', padding: '16px', textAlign: 'left', borderBottom: 'none', borderRight: 'none' }}>Status</MUI.TableCell>
                          <MUI.TableCell sx={{ background: '#f5f5f5', fontWeight: 'bold', fontSize: '1rem', padding: '16px', textAlign: 'left', borderBottom: 'none', borderTopRightRadius: '12px' }}>Terms</MUI.TableCell>
                        </MUI.TableRow>
                      </MUI.TableHead>

                      <MUI.TableBody>
                        {renewalData
                          .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at)) // Sort by date
                          .map((item, index) => (
                            <MUI.TableRow key={index}>
                              <MUI.TableCell sx={{ borderBottom: 'none', borderRight: 'none', padding: '16px', textAlign: 'left' }}>
                                {item.gwa_value ? "Renewal Form" : item.futurePlan ? "Graduating Form" : item.company_name ? "Alumni Form" : ""}
                              </MUI.TableCell>
                              <MUI.TableCell sx={{ borderBottom: 'none', borderRight: 'none', padding: '16px', textAlign: 'left' }}>
                                {formatDate(item.updated_at.replace('T', ' ').replace('.000000Z', ''))}
                              </MUI.TableCell>
                              <MUI.TableCell sx={{ borderBottom: 'none', borderRight: 'none', padding: '16px', textAlign: 'left' }}>
                              {item.submission_status === 'For Approval' ? (
                                    <span className='For_Approval'>For Approval</span>
                                  ) : item.submission_status === 'Approved' ? (
                                    <span className='Approved'>Approved</span>
                                  ) : item.submission_status === 'For Resubmission' ? (
                                    <span className='For_Resubmission'>For Resubmission</span>
                                  ) : (
                                    <span className='No_Submission'>No Submission</span>
                                  )}
                              </MUI.TableCell>
                              <MUI.TableCell sx={{ borderBottom: 'none', padding: '12px' }}>
                                {item.term_submitted}
                              </MUI.TableCell>
                            </MUI.TableRow>
                          ))}
                      </MUI.TableBody>

                    </MUI.Table>
                  </MUI.TableContainer>
            </MUI.Paper>
          </MUI.Grid>
            
          
        </MUI.Container>
        {/* Pop up Dialog  for Privacy Notice and Warning */}
        <EditProfileDialog />

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


      </MUI.ThemeProvider>
  </Layout>
  )
}
