import React, {useEffect, useState} from 'react';
import * as MUI from '../../import';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth'
import useUserStore from '../../store/UserStore';
import useProfileStore from '../../store/ProfileStore';
import useAuthStore from '../../store/AuthStore';
import axios from '../../api/axios';

export const ProfileHeader = ({updateProfile}) => {

    const {avatarInitial, selectedUser} = useUserStore();
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedOption, setSelectedOption] = useState('Anyone');
    const [avatarSrc, setAvatarSrc] = useState('');
    const [isHovered, setIsHovered] = useState(false);
    const {auth} = useAuth();
    const {profiles, profile, setProfile, handleOpenProfile, handleCloseProfile} = useProfileStore();

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
                    <React.Fragment>
                        <input
                            accept="image/*"
                            id="avatar-upload"
                            type="file"
                            style={{ display: 'none' }}
                            onChange={handleFileChange}
                        />
                        <div
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                            style={{ position: 'relative', display: 'inline-block' }}
                        >
                            <label htmlFor="avatar-upload">
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

                            {isHovered && (
                                <div
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '100%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: 'rgba(169, 169, 169, 0.8)',
                                    borderRadius: '50%',
                                    cursor: 'pointer',
                                }}
                                >
                                <label htmlFor="avatar-upload" style={{ cursor: 'pointer' }}>
                                <MUI.CameraAltOutlinedIcon/>
                                </label>
                                </div>
                            )}
                            </label>
                        </div>
                    </React.Fragment>

                    <MUI.Box sx={{ display: 'flex', flexDirection: 'column', }}>
                    {/* Display the name next to the avatar */}
                    <MUI.Typography variant="h2" sx={{ color: 'black', fontWeight: 'bold', ml: 1 }}>
                        {selectedUser.first_name} {selectedUser.last_name}
                    </MUI.Typography>
                    </MUI.Box>


                </MUI.Box>

                
                <MUI.Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'flex-end', mt: 7}}>

                {isOwnProfile && <MUI.Button variant='outlined' onClick={() => updateProfile(selectedUser.id)}>Edit Profile</MUI.Button>}
                </MUI.Box>
            </MUI.Box>
        </MUI.Container>
    )
}