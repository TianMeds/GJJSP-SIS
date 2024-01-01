import * as MUI from '../../../import'
import useLoginStore from '../../../store/LoginStore'
import axios from '../../../api/axios'
import { useState, useEffect } from 'react'
import useAuth from '../../../hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import { SAP_ListItems, SMP_ListItems, SP_ListItems } from '../../../pages/Components/ListItems'

const LOGOUT_URL = '/api/logout'


export const PortalName = () => {
    const {auth} = useAuth();
    const role_id = auth?.user?.role_id || '';
    let portalRole;

    if(role_id === 1){
      portalRole = "Scholar Administrator Portal"
    }
    else if(role_id === 2){
      portalRole = "Scholar Manager Portal"
    }
    else if(role_id === 3){
      portalRole = "Scholar Portal"
    }
    else{
      portalRole = "Portal"
    }


    return (
      <MUI.Typography variant='body1' sx={{fontWeight: 'bold'}}>{portalRole}</MUI.Typography>
    )

}

export const NotificationIcon = () =>  {
    return (

        <MUI.IconButton color="inherit">
            <MUI.Badge badgeContent={4} color="secondary">
                <MUI.NotificationsIcon />
            </MUI.Badge>
        </MUI.IconButton>
    )
}

export const HelpIcon = () => {
    return (
        <MUI.IconButton color="inherit">
            <MUI.HelpOutlineIcon />
        </MUI.IconButton>
    )
}

export const SettingsIcon = () => {

    const [anchorEl, setAnchorEl] = useState(null);
    const {auth, setAuth } = useAuth();
    const navigate = useNavigate();

    const {
        loading,
        setLoading,
        expirationTime,
        token,
        setToken,
    } = useLoginStore();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    
    const handleClose = () => {
    setAnchorEl(null);
    };

    const onLogout = async() => {
        setLoading(true);
        try{
          const remember_token = localStorage.getItem('remember_token');
          const config = {
            headers: {
              Authorization: `Bearer ${remember_token}` // Attach the token to the Authorization header
            }
          };
  
          const response = await axios.post(
              LOGOUT_URL,
              null,
              config
          )
          localStorage.removeItem('remember_token');
  
          setLoading(false);
  
          setAuth(null); // Update authentication state
        }
        catch(err){
          setLoading(false);
          if(err.response.status === 401) {
            localStorage.removeItem('remember_token');
            setAuth(null); // Update authentication state
            navigate('/login')
          }
        }
      }

      const checkTokenExpiration = async () => {
  
        if(expirationTime){
          const currentTime = Date.now();
          const tokenExpirationTime = parseInt(expirationTime, 10) + 1800 * 1000;
          if (currentTime > tokenExpirationTime) {
            onLogout()
          }
        }
      }
  
      useEffect(() => {
        const tokenCheckInterval = setInterval(() => {
          checkTokenExpiration(); // Check token expiration periodically
        }, 1800000); // Check every minute (adjust as needed)
        return () => clearInterval(tokenCheckInterval); // Clear the interval on component unmount
    
      }, []);

    return (
        <>
        <MUI.IconButton color="inherit" onClick={handleClick}>
            <MUI.SettingsIcon />
        </MUI.IconButton>

        <MUI.Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                >
                {/* ------------------------ Logout ----------------------*/}  
              
                <MUI.Link to="/login" onClick={onLogout} sx={{ textDecoration:'none', fontSize: '12px', color: 'black' }}>
                  <MUI.MenuItem>
                  <MUI.LogoutIcon fontSize="small" sx={{ mr: 1}} />
                    Logout  
                  </MUI.MenuItem>
                </MUI.Link>
              </MUI.Menu>
        </>
    )
}