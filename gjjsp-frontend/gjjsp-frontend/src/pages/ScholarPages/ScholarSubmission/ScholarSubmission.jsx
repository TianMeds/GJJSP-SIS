import React from 'react'
import * as MUI from '../../../import';
import Layout from '../../../component/Layout/SidebarNavbar/Layout';

export default function ScholarSubmission() {
  return (
    <Layout>
      <MUI.Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <MUI.Grid container spacing={3}>
        <MUI.Grid item xs={12} md={8}>
          <MUI.Box  sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' }, // Adjusts layout for different screen sizes
              alignItems: { xs: 'flex-start', md: 'center' }, // Aligns items differently for mobile and larger screens
              marginLeft: 5, // Adjust the margin for better spacing on mobile
            }}
          >
            {/* Left side - Icon */}
            <MUI.DescriptionOutlinedIcon   sx={{fontSize: { xs: '40px', md: '50px' }, color: '#022ff8', display: {xs: 'none', md: 'flex'} }}/>

            {/* Middle section - Submission and Details */}
            <MUI.Box  sx={{ marginLeft: { xs: 2, md: 2 }, marginTop: { xs: 2, md: 0 } }}>
              <MUI.Typography variant="h4" sx={{fontWeight: 'bold'}}>Submissions</MUI.Typography>
              <MUI.Typography variant="body2" sx={{ marginTop: 1 }}>Submission Details</MUI.Typography>
            </MUI.Box>

            {/* Right side - Approve and Disapprove buttons */}
            <MUI.Box sx={{ margin: { xs: 2, md: 'auto' }, marginTop: { xs: 2, md: 0 }, display: 'flex', flexDirection: 'row'}}>
              <MUI.Button variant='contained' sx={{marginRight: 2}} onClick={() => handleOpenSubmission('approval')} >Approve</MUI.Button>
              <MUI.Button variant='outlined' onClick={() => handleOpenSubmission('dissapproval')}>Disapprove</MUI.Button>
            </MUI.Box>
          </MUI.Box>
        </MUI.Grid>
        </MUI.Grid>
      </MUI.Container>
  </Layout>
  )
}
