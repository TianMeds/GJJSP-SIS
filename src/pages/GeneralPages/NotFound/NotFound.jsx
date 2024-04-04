import React from 'react'
import * as MUI from '../../../import';
import './NotFound.css';
import { Link } from 'react-router-dom';
import Error from '../../../assets/404.svg'
import theme from '../../../context/theme';


export default function NotFound() {

  const isMobile = MUI.useMediaQuery('(max-width:768px)');

  return (
    <MUI.ThemeProvider theme={theme}>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <MUI.Grid container spacing={2}>
          {/* Left Column */}
          <MUI.Grid item xs={12} sm={isMobile ? 12 : 6} order={isMobile ? 2 : 1}>
            <MUI.Box sx={{ p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '130px'}}>
              <MUI.Typography variant="h1" color='#311b92' fontWeight="900" textAlign="center" mb={2} mt={isMobile ? 4 : 0}>
                404 Error - Not Found
              </MUI.Typography>
              <MUI.Typography variant="h5" textAlign="center" fontWeight='600' mb={2}>
                Oops! The page you are looking for seems to be missing. It might have been removed, had its name changed, or is temporarily unavailable. Please check the URL for any mistakes or return to the homepage.
              </MUI.Typography>
              <MUI.Button variant="contained" color="primary" component={Link} to="/login"
                sx={{ fontWeight: 'bold', margin: 2, padding: 1.5 }}
              >
                <MUI.KeyboardBackspaceIcon sx={{ mr: 2 }} />
                Back to Login page
              </MUI.Button>
            </MUI.Box>
          </MUI.Grid>

          {/* Right Column */}
          {!isMobile && (
            <MUI.Grid item xs={12} sm={6} order={1}>
              <MUI.Box sx={{ p: 3, display: 'flex', alignItems: 'center' }}>
                <img src={Error} alt="Placeholder Image" style={{ maxWidth: '100%', height: 'auto' }} />
              </MUI.Box>
            </MUI.Grid>
          )}
        </MUI.Grid>
      </div>
    </MUI.ThemeProvider>
  )
}
