import * as MUI from '../../../import'
import useAuth from '../../../hooks/useAuth'
import { SAP_ListItems, SMP_ListItems, SP_ListItems } from '../../../pages/Components/ListItems';
import theme from '../../../context/theme';

export const SideLogo = () => {
    return (
        <MUI.Box
            component="img"
            src='https://raw.githubusercontent.com/TianMeds/image--stocks-for-coding/main/Scholarlink%20Logos.png'
            alt="Scholarlink Portal"
            sx={{height: '80px', width: '130px', marginRight: '30px'}}
        />
    )
}

export const Account = () => {

    const isSmallScreen = MUI.useMediaQuery('(max-width:600px)');
    const {auth} = useAuth();
    const last_name = auth?.user?.last_name || '';
    const roles_name = auth.roles_name || '';

    return (
    <MUI.ThemeProvider theme={theme}>
        <MUI.ListItem 
            sx={{
                fontSize: isSmallScreen ? '1.5rem' : '2rem',
                marginTop: isSmallScreen ? '2rem' : '1rem', // Add margin on top for small screens
                marginBottom: -3
              }}>
            <MUI.ListItemIcon>
              <MUI.AccountCircleIcon sx={{fontSize: isSmallScreen ? '2rem' : '3rem', mt: -4, ml: -1}}/>
            </MUI.ListItemIcon>
            <MUI.Box>
              <MUI.Typography variant="h5" color='textSecondary'>{last_name}</MUI.Typography>
              <MUI.Typography variant="body2" color="textSecondary">
                {roles_name}
              </MUI.Typography>
              <MUI.Button variant='text' sx={{mt: -3, ml: -1}}>
            See Profile
          </MUI.Button>
            </MUI.Box>
            
        </MUI.ListItem>
        </MUI.ThemeProvider>
    )
}

export const SidebarListItem = () => {
    const {auth} = useAuth();
    const role_id = auth?.user?.role_id || '';
    let selectedListItems;

    if(role_id === 1){
      selectedListItems = SAP_ListItems;
    }
    else if(role_id === 2){
      selectedListItems = SMP_ListItems;
    }
    else if(role_id === 3){
      selectedListItems = SP_ListItems;
    }
    else{
      selectedListItems = null;
    }

    return (
        <MUI.List component="nav">
            {selectedListItems}
        </MUI.List>
    )
}