import React, { useEffect, useState } from 'react';
import * as MUI from '../../import';
import Layout from '../../component/Layout/SidebarNavbar/Layout';
import theme from '../../context/theme';
import LogoImg from '../../assets/Scholarlink Logo (40 x 40 px).svg'
import { Link, useNavigate } from 'react-router-dom';
import axios from '../../api/axios';
import useDashboardStore from '../../store/DashboardStore';
import useAuthStore from '../../store/AuthStore';
import useSubmissionStore from '../../store/SubmissionStore';
import PrivacyNotice from '../../component/Layout/Dialog/PrivacyNotice';
import useAuth from '../../hooks/useAuth';
import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from '@mui/x-charts/PieChart';
import { LineChart } from '@mui/x-charts/LineChart';


export default function Dashboard() {

  const { scholarStatus, setScholarStatus, scholarStatuses, totalUsers,setTotalUsers, totalScholars, setTotalScholars, totalScholarshipCategories, setTotalScholarshipCategories, totalProjectPartners, setTotalProjectPartners, scholarSubmission, setScholarSubmission, term1Data, setTerm1Data, term2Data, setTerm2Data, term3Data, setTerm3Data, graduatingSubmission, setGraduatingSubmission, alumniSubmission, setAlumniSubmission, scholarStatusCount, setScholarStatusCount } = useDashboardStore();
  const {getAuthToken,alertOpen, setAlertOpen, alertMessage, setAlertMessage, errorOpen, errorMessage, setErrorOpen, setErrorMessage} = useAuthStore();
  const {page, setPage, rowsPerPage, setRowsPerPage, pressedRows, setPressedRows} = useSubmissionStore();

  const {auth} = useAuth();
  const role_id = auth?.user?.role_id || '';


  const [refreshTrigger, setRefreshTrigger] = useState(false);

  const navigate = useNavigate();

  const handleRefresh = () => {
    setRefreshTrigger(!refreshTrigger);
    setAlertOpen(true);
    setAlertMessage("Refreshing Dashboard");

  };

  useEffect(() => {
    setErrorOpen(false);
    const fetchTotal = async () => {
      try {
        const authToken = getAuthToken();
  
        // Fetch total users
        const responseUsers = await axios.get('/api/total-users', {
          headers: {
            'Authorization': `Bearer ${authToken}`
          }
        });
  
        if (responseUsers.status === 200) {
          setTotalUsers(responseUsers.data);
        }
  
        // Fetch total scholars
        const responseScholars = await axios.get('/api/total-scholars', {
          headers: {
            'Authorization': `Bearer ${authToken}`
          }
        });
  
        if (responseScholars.status === 200) {
          setTotalScholars(responseScholars.data);
        }

        // Fetch total scholarship categories
        const responseScholarshipCategories = await axios.get('/api/total-scholarships', {
          headers: {
            'Authorization': `Bearer ${authToken}`
          }
        });

        if (responseScholarshipCategories.status === 200) {
          setTotalScholarshipCategories(responseScholarshipCategories.data);
        }

        // Fetch total project partners
        const responseProjectPartners = await axios.get('/api/total-project-partners', {
          headers: {
            'Authorization': `Bearer ${authToken}`
          }
        });

        if (responseProjectPartners.status === 200) {
          setTotalProjectPartners(responseProjectPartners.data);
        }

      } catch (error) {
        console.log(error);
      }
    };
  
    fetchTotal();
  }, [refreshTrigger]);


  useEffect(() => {
    setErrorOpen(false);
    const fetchScholarStatus = async () => {
      try {
        const authToken = useAuthStore.getState().getAuthToken();
        const response = await axios.get('/api/scholar-status',{
          headers: {
            'Authorization': `Bearer ${authToken}`
          }
        });

        if (response.status === 200) {
          setScholarStatus(response.data.data);
        } else {
          setErrorOpen(true);
          setErrorMessage('Failed to fetch data');
        }

        const responseScholarsNum = await axios.get('/api/scholars',{
          headers: {
            'Authorization': `Bearer ${authToken}`
          }
        });

        if (responseScholarsNum.status === 200) {
          setScholarStatusCount(responseScholarsNum.data.data);
        } 

        const responseSubmission = await axios.get('/api/renewal-documents',{
          headers: {
            'Authorization': `Bearer ${authToken}`
          }
        });

        if (responseSubmission.status === 200) {
          setScholarSubmission(responseSubmission.data.data);
        }

        const responseGraduating = await axios.get('/api/graduating-documents',{
          headers: {
            'Authorization': `Bearer ${authToken}`
          }
        });

        if (responseGraduating.status === 200) {
          setGraduatingSubmission(responseGraduating.data.data);
        }

        const responseAlumni = await axios.get('/api/alumni-form',{
          headers: {
            'Authorization': `Bearer ${authToken}`
          }
        });

        if (responseAlumni.status === 200) {
          setAlumniSubmission(responseAlumni.data.data);
        }
      
      } catch (error) {
        if(error.response?.status === 401){
          setErrorOpen(true)
          setErrorMessage("You've been logout");
          navigate('/login')
        }
      }
    };

    fetchScholarStatus();
  }, [refreshTrigger])

  //Bar chart data 
  useEffect(() => {
    setErrorOpen(false);
    const fetchBarChart = async () => {
      try {
        const authToken = useAuthStore.getState().getAuthToken();
        const response = await axios.get('/api/renewal-documents',{
          headers: {
            'Authorization': `Bearer ${authToken}`
          }
        });

        if (response.status === 200) {
          setTerm1Data(response.data.data);
        } else {
          setErrorOpen(true);
          setErrorMessage('Failed to fetch data');
        }

        const graduatingResponse = await axios.get('/api/graduating-documents',{
          headers: {
            'Authorization': `Bearer ${authToken}`
          }
        });

        if (graduatingResponse.status === 200) {
          setTerm2Data(graduatingResponse.data.data);
        } else {
          setErrorOpen(true);
          setErrorMessage('Failed to fetch data');
        }

        const alumniResponse = await axios.get('/api/alumni-form',{
          headers: {
            'Authorization': `Bearer ${authToken}`
          }
        });

        if (alumniResponse.status === 200) {
          setTerm3Data(alumniResponse.data.data);
        }
        else {
          setErrorOpen(true);
          setErrorMessage('Failed to fetch data');
        }
      } catch (error) {
        if(error.response?.status === 401){
          setErrorOpen(true)
          setErrorMessage("You've been logout");
          navigate('/login')
        }
      }
    };

    fetchBarChart();
  }, [refreshTrigger])  

  const allSubmissions = [...scholarSubmission, ...graduatingSubmission, ...alumniSubmission ];
  const graduatingCount = scholarStatusCount.filter(scholar => scholar.scholar_status_id === 5).length;
  const scholarsRenewingCount = scholarStatusCount.filter(scholar => scholar.scholar_status_id === 2).length;
  const scholarsOnExtensionCount = scholarStatusCount.filter(scholar => scholar.scholar_status_id === 8).length;

  return (
    <Layout>

      <MUI.ThemeProvider theme={theme}>
        <MUI.Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <MUI.Grid container spacing={3}>

            {/* Header */}
            <MUI.Grid item xs={6} sm={12}> 
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
                      mt: { xs: '10px', sm: '1rem', md: '0' },
                    }}
                    
                    >
                    <MUI.Typography variant='h5'>Refresh </MUI.Typography>
                    <MUI.LoopIcon />
                  </MUI.Button> 

                </MUI.Box>
            </MUI.Grid>

           <MUI.Grid container direction="row" item xs={12} spacing={2}>
              
           {role_id === 1 && (
              <MUI.Grid item xs={12} sm={12} md={3} mt={2}>
                  <MUI.Paper elevation={3} sx={{ p: 3, height: '100px', display: 'flex', borderRadius: '12px' }}>
                      <MUI.Grid>
                          <MUI.PeopleAltOutlinedIcon sx={{ fontSize: 50, color: '#007aff' }} />
                      </MUI.Grid>
                      <MUI.Grid ml={4} mt={-1}>
                          <MUI.Typography variant='h5' sx={{ color: '#9e9e9e' }}>Users</MUI.Typography>
                          <MUI.Typography variant='h1'>{totalUsers.total_users}</MUI.Typography>
                      </MUI.Grid>
                  </MUI.Paper>
              </MUI.Grid>
          )}

              <MUI.Grid item xs={12} sm={12} md={3} mt={2}>
                <MUI.Paper  elevation={3} sx={{ p: 3, height: '100px', display: 'flex', borderRadius: '12px' }}>
                  <MUI.Grid>
                    <MUI.GroupsOutlinedIcon sx={{ fontSize: 50, color: '#007aff' }} />
                  </MUI.Grid>
                  <MUI.Grid ml={4} mt={-1}>
                    <MUI.Typography variant='h5' sx={{color: '#9e9e9e'}}>Scholars</MUI.Typography>
                    <MUI.Typography variant='h1' >{totalScholars.total_scholars}</MUI.Typography>
                  </MUI.Grid>
                </MUI.Paper>
              </MUI.Grid>

              <MUI.Grid item xs={12} sm={12} md={3} mt={2}>
                <MUI.Paper  elevation={3} sx={{ p: 3, height: '100px', display: 'flex', borderRadius: '12px' }}>
                  <MUI.Grid>
                    <MUI.SchoolOutlinedIcon sx={{ fontSize: 50, color: '#007aff' }} />
                  </MUI.Grid>
                  <MUI.Grid ml={4} mt={-1}>
                    <MUI.Typography variant='h5' sx={{color: '#9e9e9e'}}>Categories</MUI.Typography>
                    <MUI.Typography variant='h1' >{totalScholarshipCategories.total_scholarship_categ}</MUI.Typography>
                  </MUI.Grid>
                </MUI.Paper>
              </MUI.Grid>


              <MUI.Grid item xs={12} sm={12} md={3} mt={2}>
                <MUI.Paper  
                elevation={3} 
                sx={{ p: 3, height: '100px', display: 'flex', borderRadius: '12px' }}>
                  <MUI.Grid>
                    <MUI.HandshakeOutlinedIcon sx={{ fontSize: 50, color: '#007aff' }} />
                  </MUI.Grid>
                  <MUI.Grid ml={4} mt={-1}>
                    <MUI.Typography variant='h5' sx={{color: '#9e9e9e'}}>Partners</MUI.Typography>
                    <MUI.Typography variant='h1' >{totalProjectPartners.total_project_partners}</MUI.Typography>
                  </MUI.Grid>
                </MUI.Paper>
              </MUI.Grid>
           </MUI.Grid>

            {/* Introduction Box */}
            <MUI.Grid item xs={12} sm={12} md={9}>
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
                  <MUI.Typography variant='h2'sx={{fontWeight: 'bold'}} fontSize={{ xs: '1rem', sm: '1rem', md: '1.75rem' }} m={2}>Welcome, Admin to Scholarlink</MUI.Typography>

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
                <MUI.Box sx={{ display: { xs: 'none', sm: 'none', md: 'block' } }}>
                  <img src={LogoImg} alt="Your Image Alt Text" style={{ width: '200px', height: '200px' }} />
                </MUI.Box>
              </MUI.Paper>


              <MUI.Grid item xs={12} mt={2}>
                <MUI.Paper  elevation={3} sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 'auto', borderRadius: '12px'}}>
                  <MUI.Typography variant='h3' sx={{fontWeight: 'bold', mb: 2}} >Total of Renewal Submissions</MUI.Typography>
                  <br/>
                  <BarChart
                    series={[
                      { data: [term1Data.filter(entry => entry.term_submitted === 'Term 1').length],  label: 'Term 1' },
                      { data: [term1Data.filter(entry => entry.term_submitted === 'Term 2').length],  label: 'Term 2' },
                      { data: [term1Data.filter(entry => entry.term_submitted === 'Term 3').length],  label: 'Term 3' },
                    ]}
                    height={350}
                    xAxis={[
                      {
                        data: ['Renewal'],
                        scaleType: 'band',
                        categoryGapRatio: 0.1,
                        barGapRatio: 0.1
                      }
                    ]}
                    margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
                    yAxis={[
                      {
                        scaleType: 'linear',
                        label: 'Number of Submissions',
                        max: 30, // Set the maximum value for the y-axis
                        tickInterval: [5],
                        tickLabelInterval: () => 1, // Wrap tickLabelInterval in a function
                      },
                    ]}
                  />

                </MUI.Paper>
              </MUI.Grid>

              


              <MUI.Grid item xs={12} mt={2}>
                <MUI.Paper  elevation={3} sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 'auto', borderRadius: '12px'}}>
                  <MUI.Typography variant='h2' sx={{fontWeight: 'bold'}} mb={5}>Submissions</MUI.Typography>

                  <MUI.TableContainer>
                    <MUI.Table sx={{ minWidth: 650, borderCollapse: 'separate', borderSpacing: 0 }}>
                      <MUI.TableHead>
                        <MUI.TableRow>
                          <MUI.TableCell sx={{ background: '#f5f5f5', fontWeight: 'bold', fontSize: '1rem', padding: '16px', textAlign: 'left', borderBottom: 'none', borderRight: 'none', borderTopLeftRadius: '12px' }}>Scholar's Name</MUI.TableCell>
                          <MUI.TableCell sx={{ background: '#f5f5f5', fontWeight: 'bold', fontSize: '1rem', padding: '16px', textAlign: 'left', borderBottom: 'none', borderRight: 'none' }}>Type of Submission</MUI.TableCell>
                          <MUI.TableCell sx={{ background: '#f5f5f5', fontWeight: 'bold', fontSize: '1rem', padding: '16px', textAlign: 'left', borderBottom: 'none', borderRight: 'none' }}>Date Submitted</MUI.TableCell>
                          <MUI.TableCell sx={{ background: '#f5f5f5', fontWeight: 'bold', fontSize: '1rem', padding: '16px', textAlign: 'left', borderBottom: 'none', borderTopRightRadius: '12px' }}>Status</MUI.TableCell>
                        </MUI.TableRow>
                      </MUI.TableHead>

                      <MUI.TableBody>
                        {allSubmissions
                          .slice()
                          .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at)) // Sort by updated_at date in descending order
                          .slice(0, 6) // Limit to the 6 latest submissions
                          .map((scholarSubmissions, index) => {
                            return (
                              <MUI.TableRow key={index}>
                                <MUI.TableCell sx={{ background: '#ffffff', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '12px', borderRight: '1px solid #f5f5f5', padding: '16px', fontSize: '0.875rem' }}>
                                  <MUI.Typography variant='body1'>
                                    {scholarSubmissions.user_first_name} {scholarSubmissions.user_middle_name ? scholarSubmissions.user_middle_name : ''} {scholarSubmissions.user_last_name}
                                  </MUI.Typography>
                                </MUI.TableCell>
                                <MUI.TableCell sx={{ background: '#ffffff', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',  borderRadius: '12px', borderRight: '1px solid #f5f5f5', padding: '16px', fontSize: '0.875rem' }}>
                                  <MUI.Typography variant='body1'>
                                    {scholarSubmissions.gwa_value 
                                        ? 'Renewal Forms' 
                                        : (scholarSubmissions.futurePlan
                                            ? 'Graduating Forms' 
                                            : (scholarSubmissions.company_name 
                                                ? 'Alumni Forms' 
                                                : 'Unknown Forms'
                                              )
                                          )
                                    }
                                  </MUI.Typography>
                                </MUI.TableCell>
                                <MUI.TableCell sx={{ background: '#ffffff', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '12px', borderRight: '1px solid #f5f5f5', padding: '16px', fontSize: '0.875rem' }}>
                                  <MUI.Typography variant='body1'>
                                    {new Date(scholarSubmissions.updated_at).toLocaleDateString()}
                                  </MUI.Typography>
                                </MUI.TableCell>
                                <MUI.TableCell sx={{ background: '#ffffff', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '12px', padding: '16px', fontSize: '0.875rem', borderTopRightRadius: '12px' }}>
                                  <MUI.Typography variant='body1'>
                                    {scholarSubmissions.submission_status}
                                  </MUI.Typography>
                                </MUI.TableCell>
                              </MUI.TableRow>
                            );
                          })}
                      </MUI.TableBody>

                    </MUI.Table>
                  </MUI.TableContainer>
                </MUI.Paper>
              </MUI.Grid>

            </MUI.Grid>
            {/* Scholars Status Report */}
              <MUI.Grid item xs={12} sm={12} md={3}>
              <MUI.Paper
               elevation={3}
                  sx={{
                    p: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 'auto',
                    alignItems: 'center', 
                    borderRadius: '12px',
                  }}
                >
                  <MUI.Typography variant='h4' sx={{fontWeight: 'bold'}} mb={2} mt={2}>Scholar Status Statistics</MUI.Typography>
                  
                  <MUI.TableContainer>
                    <MUI.Table style={{ borderCollapse: 'collapse', width: '100%', borderRadius: '8px', overflow: 'hidden' }}>
                      <MUI.TableHead>
                        <MUI.TableRow>
                          <MUI.TableCell style={{ padding: '12px', color: '#333', fontWeight: '500', borderBottom: '1px solid rgba(224, 224, 224, 1)' }}>Status</MUI.TableCell>
                          <MUI.TableCell style={{ padding: '12px', color: '#333', fontWeight: '500', borderBottom: '1px solid rgba(224, 224, 224, 1)' }}>Count</MUI.TableCell>
                        </MUI.TableRow>
                      </MUI.TableHead>

                      <MUI.TableBody>
                        {scholarStatus.map((scholarStatuses, index) => (
                          <MUI.TableRow key={index}>
                            <MUI.TableCell style={{ padding: '12px', color: '#333', borderBottom: '1px solid rgba(224, 224, 224, 1)' }}>{scholarStatuses.scholar_status_name}</MUI.TableCell>
                            <MUI.TableCell style={{ padding: '12px', color: '#333', borderBottom: '1px solid rgba(224, 224, 224, 1)' }}>
                            {scholarStatusCount.filter((scholar) => scholar.scholar_status_id === scholarStatuses.id).length}
                            </MUI.TableCell>
                          </MUI.TableRow>
                        ))}
                      </MUI.TableBody>
                    </MUI.Table>
                  </MUI.TableContainer>
                </MUI.Paper>

                
                <MUI.Grid container spacing={2} justifyContent="center">
                  <MUI.Grid item xs={12} mt={2}>
                    <MUI.Paper  elevation={3} sx={{ height: '500px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 2, borderRadius: '12px' }}>
                      <MUI.Typography variant='h3' sx={{ fontWeight: 'bold' }}>GJJSP Scholarships's Impact Indicator</MUI.Typography>
                      <PieChart
                        series={[{ data: [{ value: graduatingCount, label: 'Graduating' },   { value: scholarsRenewingCount, label: 'Scholars Renewing' }, { value: scholarsOnExtensionCount, label: 'Scholars on Withdrew' } ] }]}
                        width={200}
                        height={300}
                        margin={{ top: -50, bottom: 100, left: 10, right: 10 }}
                        slotProps={{
                          legend: {
                            direction: 'row',
                            position: { vertical: 'bottom', horizontal: 'middle' },
                            padding: 0,
                          },
                        }}
                      />
                    </MUI.Paper>
                  </MUI.Grid>
                </MUI.Grid>
              </MUI.Grid>
              
          </MUI.Grid>


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

        {/* Pop up Dialog  for Privacy Notice and Warning */}
        <PrivacyNotice  />

      </MUI.ThemeProvider>
    </Layout>
  )
}
