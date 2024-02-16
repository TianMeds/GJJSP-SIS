import React, {useEffect, useState}  from 'react'
import {Link, useNavigate } from 'react-router-dom';


//Components 
import EditProfileDialog from '../../../component/Layout/Dialog/EditProfileDialog';
import Layout from '../../../component/Layout/SidebarNavbar/Layout';
import useAuthStore from '../../../store/AuthStore';
import LogoImg from '../../../assets/Scholarlink Logo (40 x 40 px).svg'
import theme from '../../../context/theme';
import * as MUI from '../../../import';



export default function ScholarDashboard() {

  const navigate = useNavigate();
  
  const {getAuthToken, alertOpen, alertMessage, setAlertMessage, setAlertOpen, errorOpen, errorMessage, setErrorMessage, setErrorOpen, setOpenDialog, setOpenPrivacyDialog} = useAuthStore();
  const [buttonClicked, setButtonClicked] = useState(false);

  const handleRefresh = () => {
    if (buttonClicked) {
      setAlertOpen(true);
      setAlertMessage('Refreshed');
    }
  };

  const handleButtonClick = () => {
    setButtonClicked(true);
  };

  useEffect(() => {
    setErrorOpen(false);
    handleRefresh();
    // Reset the buttonClicked state after the effect runs
    setButtonClicked(false);
  }, [buttonClicked]);


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
                    onClick={handleButtonClick}
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

                  <MUI.Grid container alignItems="center">
                    <MUI.ApartmentIcon  sx={{color: '#1976d2'}}/>
                  <MUI.Grid item>
                    <MUI.Typography variant='h5'  sx={{color: '#1976d2'}}>Total Scholars: 100</MUI.Typography>
                  </MUI.Grid>
                </MUI.Grid> 
                <br/>

                <MUI.Grid container alignItems="center">
                    <MUI.SchoolOutlinedIcon   sx={{color: '#1976d2'}}/>
                  <MUI.Grid item>
                    <MUI.Typography variant='h5'  sx={{color: '#1976d2'}}>Total Scholars: 100</MUI.Typography>
                  </MUI.Grid>
                </MUI.Grid> 

                <br/>
                
                <MUI.Grid container alignItems="center">
                    <MUI.CalendarTodayIcon  sx={{color: '#1976d2'}}/>
                  <MUI.Grid item>
                    <MUI.Typography variant='h5'  sx={{color: '#1976d2'}}>Total Scholars: 100</MUI.Typography>
                  </MUI.Grid>
                </MUI.Grid> 


                  
                </MUI.Paper>
              </MUI.Grid>
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
