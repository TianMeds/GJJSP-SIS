import React, {useEffect, useState} from 'react';
import * as MUI from '../../import';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth'
import useUserStore from '../../store/UserStore';
import useProfileStore from '../../store/ProfileStore';
import useAuthStore from '../../store/AuthStore';
import axios from '../../api/axios';

export const ProfileHeader = ({updateProfile, updatePassword, updateScholarProfile}) => {

    const {avatarInitial, selectedUser} = useUserStore();
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedOption, setSelectedOption] = useState('Anyone');
    const [avatarSrc, setAvatarSrc] = useState('');
    const [isHovered, setIsHovered] = useState(false);
    const {auth} = useAuth();
    const {profiles, profile, setProfile, handleOpenProfile, handleCloseProfile, handleOpenChangePassword} = useProfileStore();
    const {role_id} = auth.user;

      const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (e) => {
            setAvatarSrc(e.target.result);
          };
          reader.readAsDataURL(file);
        }
      };

      

      const isOwnProfile = selectedUser.id === auth.user.id;
      const isScholar = role_id === 3;
      
    return ( 
        <MUI.Container sx={{mt: 3, ml: -3}}>

            <MUI.Box
                sx={{
                mt: 3,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                height: '200px',
                width: '100%',
                backgroundImage: `linear-gradient(to bottom, #FF8F73 50%, white 50%)`,
                padding: '20px',
                }}>
                <MUI.Box sx={{ display: 'flex', alignItems: 'center' }}>

                    <MUI.Avatar
                        src={avatarSrc || ''}
                        sx={{
                            width: 100,
                            height: 100,
                            backgroundColor: 'blue',
                            fontSize: '30px',
                            cursor: 'pointer',
                        }}
                    >
                        {avatarSrc ? null : avatarInitial}
                    </MUI.Avatar>

                    <MUI.Box sx={{ display: 'flex', flexDirection: 'column', }}>
                    {/* Display the name next to the avatar */}
                    <MUI.Typography variant="h2" sx={{ color: 'black', fontWeight: 'bold', ml: 1 }}>
                        {selectedUser.first_name} {selectedUser.last_name}
                    </MUI.Typography>
                    </MUI.Box>


                </MUI.Box>

                
                <MUI.Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'flex-end', mt: 7}}>

                {isOwnProfile && (
                    <>
                    {!isScholar && (
                       <MUI.Button variant='outlined' onClick={() => updateProfile()} sx={{mr: 2}}>
                            Edit Profile
                        </MUI.Button>
                    )}

                    {isScholar && (
                        <MUI.Button variant='outlined' onClick={() => updateScholarProfile()} sx={{mr: 2}}>
                            Update Scholar Profile
                        </MUI.Button>
                    
                    )}

                        <MUI.Button variant='text' onClick={() => updatePassword()}>Change Password</MUI.Button>
                    </>
                )}
                </MUI.Box>
            </MUI.Box>
        </MUI.Container>
    )
}