import React from 'react';
import * as MUI from '../../import';
import { useState } from "react";
import { SMP_ListItems, SAP_ListItems, SP_ListItems } from '../Components/ListItems';
import { AppBar, Drawer, drawerWidth, customColor, Search, SearchIconWrapper, StyledInputBase } from '../Components/Styles';

const defaultTheme = MUI.createTheme();


const getRoleFromListItems = (listItems) => {
    if (listItems === SMP_ListItems) {
      return "Scholar Manager Portal";
    } else if (listItems === SAP_ListItems) {
      return "Scholarship Administrator Portal";
    } else if (listItems === SP_ListItems) {
      return "Scholar Portal";
    }
    // Default case, in case the role is not recognized
    return "Default Role";
  };


const Layout = ({children}) => {

    const [selectedListItems, setSelectedListItems] = useState(SAP_ListItems);
    const isSmallScreen = MUI.useMediaQuery('(max-width:600px)');
    const [open, setOpen] = useState(true);
    const [anchorEl, setAnchorEl] = useState(null);
  
    const toggleDrawer = () => {
      setOpen(!open);
    };
  
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    
    const handleClose = () => {
      setAnchorEl(null);
    };
  
    const handleLogout = () => {
      // Your logout logic here
      handleClose();
    };

    const handleListItemsChange = (newListItems) => {
        setSelectedListItems(newListItems);
      };


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
          <MUI.Typography variant='h6' sx={{fontWeight: 'bold'}}>{getRoleFromListItems(selectedListItems)}</MUI.Typography>
          <MUI.Box sx={{ flexGrow: 1 }} />
          <MUI.Box sx={{ display:'flex', alignItems: 'center' }}>
          {/* ------------------------ Search Bar  ----------------------*/}
          <Search>
            <SearchIconWrapper>
              <MUI.SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
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
              getContentAnchorEl={null}
              >
          {/* ------------------------ Logout ----------------------*/}    
              <MUI.MenuItem onClick={handleLogout}>
              Logout 
                <MUI.LogoutIcon fontSize="small" sx={{ marginLeft: 1 }} />
              </MUI.MenuItem>
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
              <MUI.Typography variant="h6">Medallada</MUI.Typography>
              <MUI.Typography variant="body1" color="textSecondary">
                Scholar
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