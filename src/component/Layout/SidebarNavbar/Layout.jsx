import React, {useState} from 'react';
import * as MUI from '../../../import';
import { AppBar, Drawer} from './Styles';
import { NotificationIcon, HelpIcon, SettingsIcon, PortalName } from '../Navbar/Navbar';
import { SideLogo, Account, SidebarListItem } from '../Sidebar/Sidebar';
import LoaderAnimation from '../../LoadingAnimation/LoaderAnimation';

const defaultTheme = MUI.createTheme();

const Layout = ({children}) => {
    const [open, setOpen] = useState(true);

    const toggleDrawer = () => {
      setOpen(!open);
    };
  
  return (

    <MUI.ThemeProvider theme={defaultTheme}>
      <MUI.Box sx={{ display: 'flex'}} >
        <MUI.CssBaseline/>

        {/* ------------------------ Navbar ----------------------*/}
        <AppBar position='absolute' open={open}>
          <MUI.Toolbar sx={{pr: '24px',}}>
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
              <PortalName/>
              <MUI.Box sx={{ flexGrow: 1 }} />
              <MUI.Box sx={{ display:'flex', alignItems: 'center' }}>
                <NotificationIcon/>
                <HelpIcon/>
                <SettingsIcon/>
              </MUI.Box>
          </MUI.Toolbar>
        </AppBar> 

        {/* ------------------------ Sidebar ----------------------*/}
        <Drawer variant="permanent" open={open}>
          <MUI.Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <SideLogo/>
            <MUI.IconButton onClick={toggleDrawer}>
              <MUI.MenuIcon/>
            </MUI.IconButton>
          </MUI.Toolbar>

          {/* Account */}
          <Account/>
          
          <SidebarListItem/>
          
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

          {/* ------------------------ Loading Animation ----------------------*/}
          <LoaderAnimation/>

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