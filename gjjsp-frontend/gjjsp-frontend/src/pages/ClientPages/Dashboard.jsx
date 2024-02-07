import React, { useEffect } from 'react';
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
import { BarChart } from '@mui/x-charts/BarChart';


export default function Dashboard() {

  const { scholarStatus, setScholarStatus, scholarStatuses } = useDashboardStore();
  const {getAuthToken,setAlertOpen, setAlertMessage, setErrorOpen, setErrorMessage} = useAuthStore();
  const {page, setPage, rowsPerPage, setRowsPerPage, pressedRows, setPressedRows} = useSubmissionStore();

  const navigate = useNavigate();


  useEffect(() => {
    setAlertOpen(true);
    setAlertMessage("Fetching Scholarlink Report");
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
          setAlertOpen(true);
          setAlertMessage('Updated Scholarlink Report');
        } else {
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

    fetchScholarStatus();
  }, [])

  //Get Scholars Data

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
            <MUI.Grid item xs={12} md={8} lg={7}>
              <MUI.Paper
                sx={{
                  p: 3,
                  display: 'flex',
                  flexDirection: 'column',
                  height: 'auto',
                }}
              >
                <MUI.Typography>Introduction</MUI.Typography>
                <MUI.Typography variant='h4' m={2}>Welcome to Scholarlink</MUI.Typography>

                <MUI.Box sx={{ display: 'flex', mb: 2, mt:3 }}>
                  <img src={LogoImg} alt="Your Image Alt Text" style={{ width: '130px', height: '130px', marginLeft: -20}} />

                  <MUI.Box sx={{ display: 'flex', flexDirection: 'column', mt: 2 }}>
                    <MUI.Typography variant='h5' pb={2}>
                      Check out the
                        <MUI.Typography component={Link} to="" variant='h5' sx={{textDecoration: 'none'}}> Scholarlink User Guide </MUI.Typography> 
                      for a quick tutorial
                    </MUI.Typography>

                    <MUI.Typography variant='h5' >
                      Contact
                      <MUI.Typography component={Link} to="" variant='h5' sx={{textDecoration: 'none'}}> See So Support Team </MUI.Typography> 
                      for any issues or questions
                    </MUI.Typography>
                  </MUI.Box>
                </MUI.Box>
              </MUI.Paper>

              <MUI.Grid item xs={12} mt={2}>
                <MUI.Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 'auto'}}>
                  <MUI.Typography>New Submissions</MUI.Typography>

                  <MUI.TableContainer>
                    <MUI.Table>
                      <MUI.TableHead>
                        <MUI.TableRow>
                          <MUI.TableCell>Scholar's Name</MUI.TableCell>
                          <MUI.TableCell>Submission</MUI.TableCell>
                          <MUI.TableCell>Submission Date</MUI.TableCell>
                          <MUI.TableCell>Status</MUI.TableCell>
                        </MUI.TableRow>
                      </MUI.TableHead>

                      <MUI.TableBody>
                        {scholarStatus
                          .map((scholarStatuses, index) => (
                          <MUI.TableRow key={index}>
                            <MUI.TableCell>{scholarStatuses.scholar_status_name}</MUI.TableCell>
                            <MUI.TableCell>Application Form</MUI.TableCell>
                            <MUI.TableCell>12/01/2024</MUI.TableCell>
                            <MUI.TableCell>For Approval</MUI.TableCell>
                          </MUI.TableRow>
                        ))}
                      </MUI.TableBody>
                    </MUI.Table> 
                  </MUI.TableContainer>

                </MUI.Paper>
              </MUI.Grid>

            </MUI.Grid>
            {/* Scholars Status Report */}
              <MUI.Grid item xs={12} md={4} lg={5}>
                <MUI.Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 'auto',
                  }}
                >

                  <MUI.Typography>Scholar Statistics</MUI.Typography>

                  <MUI.TableContainer>
                    <MUI.Table>
                      <MUI.TableHead>
                        <MUI.TableRow>
                          <MUI.TableCell>Status</MUI.TableCell>
                          <MUI.TableCell>Count</MUI.TableCell>
                        </MUI.TableRow>
                      </MUI.TableHead>

                      <MUI.TableBody>
                        {scholarStatus
                          .map((scholarStatuses, index) => (
                          <MUI.TableRow key={index}>
                            <MUI.TableCell>{scholarStatuses.scholar_status_name}</MUI.TableCell>
                            <MUI.TableCell>1</MUI.TableCell>
                          </MUI.TableRow>
                        ))}
                      </MUI.TableBody>
                    </MUI.Table> 
                  </MUI.TableContainer>
                </MUI.Paper>
              </MUI.Grid>

              {/* Scholar's Status Report */}

              <MUI.Grid item xs={12} mt={2}>
                <BarChart
                  xAxis={[
                    {
                      id: 'barCategories',
                      data: ['bar A', 'bar B', 'bar C'],
                      scaleType: 'band',
                    },
                  ]}
                  series={[
                    {
                      data: [2, 5, 3],
                    },
                  ]}
                  width={500}
                  height={300}
                />
              </MUI.Grid>
          </MUI.Grid>
        </MUI.Container>

        {/* Pop up Dialog  for Privacy Notice and Warning */}
        <PrivacyNotice />

      </MUI.ThemeProvider>
    </Layout>
  )
}
