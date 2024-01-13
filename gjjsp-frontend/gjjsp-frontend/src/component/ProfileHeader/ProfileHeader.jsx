import React, {useEffect, useState} from 'react';
import * as MUI from '../../import';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../../api/axios';   
import useAuthStore from '../../store/AuthStore';
import useUserStore from '../../store/UserStore';

export const ProfileHeader = () => {

    const {getAuthToken, setAlertOpen, setAlertMessage, setErrorOpen, setErrorMessage} = useAuthStore();
    const {avatarInitial, setAvatarInitial} = useUserStore();
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedOption, setSelectedOption] = useState('Anyone');
    const [avatarSrc, setAvatarSrc] = useState('');
    const [isHovered, setIsHovered] = useState(false);
    const navigate = useNavigate();

    const handleOpenMenu = (event) => {
        setAnchorEl(event.currentTarget);
      };
    
      const handleCloseMenu = (option) => {
        setAnchorEl(null);
        if (option) {
          setSelectedOption(option);
        }
      };

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

        const firstName = "Christian";
        const lastName = "Medallada";

        // Function to calculate initials
        const calculateInitials = () => {
        const firstInitial = firstName.charAt(0).toUpperCase();
        const lastInitial = lastName.charAt(0).toUpperCase();
        return `${firstInitial}${lastInitial}`;
        };


    return ( 
        <MUI.Container sx={{mt: 3, ml: -3}}>
            <MUI.Typography variant='h4' sx={{color: 'black'}}>Profile photo and header image</MUI.Typography>
            <MUI.Box
                sx={{
                mt: 3,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                height: '200px',
                width: '80%',
                backgroundImage: `linear-gradient(to bottom, #FF8F73 50%, white 50%)`,
                padding: '20px',
                }}>
                <MUI.Box>
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
                </MUI.Box>
                
                <MUI.Box>
                    <MUI.Typography variant='body2' sx={{mt: '5rem', display: 'flex', alignItems: 'center',}}>Who can see your profile photo? 
                        <MUI.InfoIcon sx={{fontSize: '14px', ml: '0.3rem'}}/>
                    </MUI.Typography>

                    <MUI.IconButton onClick={handleOpenMenu}  sx={{
                    borderRadius: '8px', // Optional: Add border-radius for rounded corners
                    }}>
                    {selectedOption === 'Anyone' ? (
                    <>
                        <MUI.PublicIcon />
                        <MUI.Typography>Anyone</MUI.Typography>
                    </>
                    ) : (
                    <>
                        <MUI.PersonIcon />
                        <MUI.Typography>Only me</MUI.Typography>
                    </>
                    )}
                    </MUI.IconButton>
                    <MUI.Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={() => handleCloseMenu(null)}
                    >
                        <MUI.MenuItem onClick={() => handleCloseMenu('Anyone')}>
                        <MUI.PublicIcon />
                        <MUI.Typography></MUI.Typography>
                        </MUI.MenuItem>
                        <MUI.MenuItem onClick={() => handleCloseMenu('Only me')}>
                        <MUI.PersonIcon />
                        <MUI.Typography>Only me</MUI.Typography>
                        </MUI.MenuItem>
                    </MUI.Menu>
                </MUI.Box>
            </MUI.Box>
        </MUI.Container>
    )
}