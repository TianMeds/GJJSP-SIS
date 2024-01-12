import React, {useEffect, useState}  from 'react'
import * as MUI from '../../../import';
import Layout from '../../../component/Layout/SidebarNavbar/Layout';
import useUserStore from '../../../store/UserStore';
import useAuth from '../../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

export default function ScholarDashboard() {

  const [openDialog, setOpenDialog] = useState(false);
  const {auth} = useAuth();
  const role_id = auth?.user?.role_id || '';
  const {setSelectedUser} = useUserStore();
  const navigate = useNavigate();
  

  useEffect(() => {
    showScholarshipDialog();
  }, [])

  const showScholarshipDialog = () => {
    setOpenDialog(true);
  }

  const handleCloseDialog = () => {
    setOpenDialog(false);
  }

  const handleSeeProfile = () => {
    setSelectedUser(auth.user); // Update the selectedUser state
    const rolePath = role_id === 1 || role_id === 2 ? '/profile' : role_id === 3 ? '/scholar-profile' : '/*';
    navigate(rolePath); // Navigate based on the rolePath
};

  return (
    <Layout>
    <MUI.Grid item xs={12} md={8} lg={9}>
        <MUI.Paper
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            height: 240,
          }}
        >
          <MUI.Typography>
            Scholar Dashboard
          </MUI.Typography>
        </MUI.Paper>
    </MUI.Grid>

    <MUI.Dialog open={openDialog} onClose={handleCloseDialog}  
          fullWidth
          width="100%"
          sx={{
            margin: '20px',
          }}
    >
        <MUI.DialogTitle>Detailed Information</MUI.DialogTitle>
        <MUI.DialogContent>
          <MUI.Typography>
            Welcome Scholar! Before you enjoy the usage of Scholarlink please complete your profile first in the see profie
          </MUI.Typography>
          <MUI.Typography>To view your profile press here</MUI.Typography>
          <MUI.Button variant="contained" onClick={handleSeeProfile}>
            See Profile
          </MUI.Button>
        </MUI.DialogContent>
        <MUI.DialogActions>
          <MUI.Button onClick={handleCloseDialog} color="primary">
            Close
          </MUI.Button>
        </MUI.DialogActions>
      </MUI.Dialog>


  </Layout>
  )
}
