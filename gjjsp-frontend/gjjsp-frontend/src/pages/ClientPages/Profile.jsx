import React from 'react';
import * as MUI from '../../import';
import Layout from '../../component/Layout/SidebarNavbar/Layout';
import { ProfileBox } from '../../component/ProfileBox/ProfileBox';
import { ProfileHeader } from '../../component/ProfileHeader/ProfileHeader';
import theme from '../../context/theme';

export default function Profile() {
  return (
    <Layout>
      <MUI.ThemeProvider theme={theme}>
    <MUI.Grid item xs={12} md={8} lg={9}>

        <MUI.Box mb={4}>
            <MUI.Typography variant='h1' sx={{color: 'black', fontWeight: 'bold'}}>Profile</MUI.Typography>
        </MUI.Box>

        <MUI.Box mb={4}>
          <MUI.Typography variant='h5'>Manage your personal information, and control which information other people see</MUI.Typography>
        </MUI.Box>

        <MUI.Box>
          <MUI.Link>Learn more about our data privacy policy.</MUI.Link>
        </MUI.Box>

        <ProfileHeader/>
      
        <ProfileBox/>
        
        
    </MUI.Grid>
    </MUI.ThemeProvider>
  </Layout>
  )
}
