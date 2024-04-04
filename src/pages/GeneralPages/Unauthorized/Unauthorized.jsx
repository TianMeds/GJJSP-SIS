import React from 'react'
import * as MUI from '../../../import';
import { Link } from 'react-router-dom';
import Error from '../../../assets/403.svg'
import theme from '../../../context/theme';

export default function Unauthorized() {

  const isMobile = MUI.useMediaQuery('(max-width:768px)');
  return (
    <MUI.ThemeProvider theme={theme}>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <MUI.Grid container spacing={2}>
          {/* Left Column */}
          <MUI.Grid item xs={12} sm={isMobile ? 12 : 6} order={isMobile ? 2 : 1}>
            <MUI.Box sx={{ p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '120px'}}>
              <MUI.Typography variant="h1" color='#311b92' fontWeight="900" textAlign="center" mb={2} mt={isMobile ? 4 : 0}>
                403 Error - Access Forbidden
              </MUI.Typography>
              <MUI.Typography variant="h5" textAlign="center" fontWeight='600' mb={2}>
              You don't have permission to access this resource. This might be due to insufficient privileges or an authentication issue. Please contact the administrator or return to the homepage
              </MUI.Typography>
              <MUI.Button variant="contained" color="primary" component={Link} to="/login"
                sx={{ textTransform: 'none', fontSize: '1.1rem', fontWeight: 'bold', margin: 2, padding: 1.5 }}
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
                <img src={Error} alt="Placeholder Image" style={{ maxWidth: '100%', height: '600px' }} />
              </MUI.Box>
            </MUI.Grid>
          )}
        </MUI.Grid>
      </div>
    </MUI.ThemeProvider>
  )
}
