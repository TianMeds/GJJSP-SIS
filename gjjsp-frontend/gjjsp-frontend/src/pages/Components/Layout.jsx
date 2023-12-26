import React from 'react';
import * as MUI from '../../import';
import { useState } from "react";
import { SMP_ListItems, SAP_ListItems, SP_ListItems } from '../Components/ListItems';
import { AppBar, Drawer, drawerWidth, customColor, Search, SearchIconWrapper, StyledInputBase } from '../Components/Styles';
import useAuth from '../../hooks/useAuth';
import axios from '../../api/axios';
import useLoginStore from '../Store/LoginStore';

const defaultTheme = MUI.createTheme();
const LOGOUT_URL = "/api/logout"



const Layout = ({children}) => {
    const {auth, setAuth } = useAuth();
    const isSmallScreen = MUI.useMediaQuery('(max-width:600px)');
    const [open, setOpen] = useState(true);
    const [anchorEl, setAnchorEl] = useState(null);

    const {
      loading,
      setLoading,
    } = useLoginStore();

    const last_name = auth?.user?.last_name || '';
    const role_id = auth?.user?.role_id || '';
    const roles_name = auth.roles_name || '';
    let selectedListItems;
    let portalRole;

    if(role_id === 1){
      selectedListItems = SAP_ListItems;
      portalRole = "Scholar Administrator Portal"
    }
    else if(role_id === 2){
      selectedListItems = SMP_ListItems;
      portalRole = "Scholar Manager Portal"
    }
    else if(role_id === 3){
      selectedListItems = SP_ListItems;
      portalRole = "Scholar Portal"
    }
    else{
      selectedListItems = null;
      portalRole = "Portal"
    }

    const toggleDrawer = () => {
      setOpen(!open);
    };
  
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    
    const handleClose = () => {
      setAnchorEl(null);
    };
  
    const onLogout = async() => {
      setLoading(true);
      try{
        const remember_token = localStorage.getItem('token');
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
      
        localStorage.removeItem('token');

        setLoading(false);

        setAuth(null); // Update authentication state
      }
      catch(err){
        setLoading(false);
        console.log(err);
      }
    }


  return (
    <MUI.ThemeProvider theme={defaultTheme}>
      <MUI.Box sx={{ display: 'flex'}}>
        <MUI.CssBaseline/>
        <AppBar position='absolute' open={open}>
          <MUI.Toolbar sx={{pr: '24px',}}>
            {/* ------------------------ Hamburger Button ----------------------*/}
            <MUI.IconButton 
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={toggleDrawer}
                sx={{
                  marginRight: '36px',
                  ...(open && { display: 'none' }),
                }}
              >
                <MUI.MenuIcon/>
            </MUI.IconButton>
            <MUI.Typography variant='body1' sx={{fontWeight: 'bold'}}>{portalRole}</MUI.Typography>
            <MUI.Box sx={{ flexGrow: 1 }} />
            <MUI.Box sx={{ display:'flex', alignItems: 'center' }}>
              {/* ------------------------ Notification Icon ----------------------*/}
              <MUI.IconButton color="inherit">
                <MUI.Badge badgeContent={4} color="secondary">
                  <MUI.NotificationsIcon />
                </MUI.Badge>
              </MUI.IconButton>
              {/* ------------------------ Help Icon ----------------------*/}
              <MUI.IconButton color="inherit">
                  <MUI.HelpOutlineIcon />
              </MUI.IconButton>
              {/* ------------------------ Settings Icon ----------------------*/}
              <MUI.IconButton color="inherit" onClick={handleClick} sx={{ textTransform: 'capitalize' }}>
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
                
                <MUI.Link to="/login" onClick={onLogout}>
                  <MUI.MenuItem>
                    Logout 
                    <MUI.LogoutIcon fontSize="small" sx={{ marginLeft: 1 }} />
                  </MUI.MenuItem>
                </MUI.Link>
              </MUI.Menu>
            </MUI.Box>
          </MUI.Toolbar>

          
        </AppBar> 

        {/* ------------------------ Drawer or the Sidebar  ----------------------*/}
        <Drawer variant="permanent" open={open}>
          <MUI.Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <MUI.Box
              component="img"
              src='https://raw.githubusercontent.com/TianMeds/image--stocks-for-coding/main/Scholarlink%20Logos.png'
              alt="Scholarlink Portal"
              sx={{height: '70px', width: '130px', marginRight: '30px'}}
            />
            <MUI.IconButton onClick={toggleDrawer}>
              <MUI.MenuIcon/>
            </MUI.IconButton>
          </MUI.Toolbar>

          {/* ------------------------ Accounts ----------------------*/}
          <MUI.ListItem 
            sx={{
                fontSize: isSmallScreen ? '1.5rem' : '2rem',
                marginTop: isSmallScreen ? '2rem' : '0', // Add margin on top for small screens
              }}>
            <MUI.ListItemIcon>
              <MUI.AccountCircleIcon sx={{fontSize: isSmallScreen ? '2rem' : '2.5rem',}}/>
            </MUI.ListItemIcon>
            <MUI.Box sx={{ml: 1}}>
              <MUI.Typography variant="h6">{last_name}</MUI.Typography>
              <MUI.Typography variant="body2" color="textSecondary">
                {roles_name}
              </MUI.Typography>
            </MUI.Box>
          </MUI.ListItem>
          <MUI.List component="nav">
          {selectedListItems}
          </MUI.List>
        </Drawer>

        <MUI.Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? '#fbf3f2'
                : '#032539',
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
            
          }}
        >
          <MUI.Toolbar />

          {loading && (
              <MUI.Backdrop
              open={loading}
              sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
              >
                <MUI.Box
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: (theme) => theme.zIndex.drawer + 2,
                  }}
                >
                  <MUI.CircularProgress />
                </MUI.Box>
              </MUI.Backdrop>
          )}
          {/* ------------------------ Main Content ----------------------*/}
          <MUI.Container maxWidth="lg" height="100%" sx={{ mt: 4, mb: 4 }}>
            <MUI.Grid container spacing={3}>
              {children}
            </MUI.Grid>
          </MUI.Container>
                
        </MUI.Box>
      </MUI.Box>
    </MUI.ThemeProvider>
  )
}

export default Layout