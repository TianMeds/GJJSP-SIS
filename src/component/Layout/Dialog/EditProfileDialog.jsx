import React, { useEffect, useState } from 'react';
import * as MUI from '../../../import';
import useUserStore from '../../../store/UserStore';
import useAuthStore from '../../../store/AuthStore';
import useAuth from '../../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import PrivacyNotice from './PrivacyNotice';

export default function EditProfileDialog() {
  const {openDialog, setOpenDialog, openPrivacyNotice, setOpenPrivacyNotice } = useAuthStore();
  const { auth } = useAuth();
  const {role_id, first_name, last_name} = auth.user;
  const { setSelectedUser, setAvatarInitial } = useUserStore();
  const navigate = useNavigate();

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  

  const handleSeeProfile = () => {
    setSelectedUser(auth.user);
    const rolePath = role_id === 1 || role_id === 2 ? '/profile' : role_id === 3 ? '/scholar-profile' : '/*';
      navigate(rolePath);
      // Function to calculate initials
      setAvatarInitial(`${first_name.charAt(0).toUpperCase()}${last_name.charAt(0).toUpperCase()}`)
      handleCloseDialog();
  };

  const handleNext = () => {
    setOpenDialog(false);
    setOpenPrivacyNotice(true);
  };

  return (
    <>
      <MUI.Dialog open={openDialog} onClose={handleCloseDialog} fullWidth width="100%" sx={{ margin: '20px' }}>
        <MUI.DialogTitle sx={{ backgroundColor: '#007AFF', color: 'white', fontWeight: 'bold', mb: 5 }} variant="h5">
          Welcome to Scholarlink
        </MUI.DialogTitle>
        <MUI.DialogContent>
          <MUI.Typography sx={{ fontSize: '1.2rem', fontStyle: 'italic', color: '#333', marginBottom: '16px' }}>
            Welcome, Scholar! To make the most of your Scholarlink experience, it's essential to add your personal
            details. Before you proceed, kindly head to "See Profile" and complete your profile.
          </MUI.Typography>

          <br />

          <MUI.Typography sx={{ color: 'rgba(0, 0, 0, 0.6)', fontStyle: 'italic', marginBottom: '16px' }}>
            You can skip this part if you've already edited your profile.
          </MUI.Typography>

          <MUI.Button variant="outlined" onClick={handleSeeProfile} sx={{ mr: 3 }}>
            See Profile
          </MUI.Button>

          <MUI.Button variant="outlined" onClick={handleNext}>
            Next
          </MUI.Button>
        </MUI.DialogContent>
      </MUI.Dialog>

      {/* Render the PrivacyNotice component */}
      {openPrivacyNotice && <PrivacyNotice onClose={() => setOpenPrivacyNotice(false)} />}
    </>
  );
}
