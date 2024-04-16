import * as MUI from '../../../import'
import useAuth from '../../../hooks/useAuth'
import {Link} from 'react-router-dom';
import { SAP_ListItems, SMP_ListItems, SP_ListItems } from '../../../pages/Components/ListItems';
import useUserStore from '../../../store/UserStore';
import { useNavigate } from 'react-router-dom';
import theme from '../../../context/theme';

export const SideLogo = () => {
    return (
        <MUI.Box
            component="img"
            src='https://raw.githubusercontent.com/TianMeds/image--stocks-for-coding/main/GJJSP-SIS.png'
            alt="Scholarlink Portal"
            sx={{height: '100px', width: '120px', marginRight: '30px'}}
        />
    )
}

export const Account = () => {

    const isSmallScreen = MUI.useMediaQuery('(max-width:600px)');
    const {auth} = useAuth();
    const roles_name = auth.roles_name || '';

    const {selectedUser,setSelectedUser,user, users, avatarInitial, setAvatarInitial} = useUserStore();
    const navigate = useNavigate();
    const {role_id, first_name, last_name} = auth.user;

    const handleSeeProfile = () => {
      setSelectedUser(auth.user); // Update the selectedUser state
      const rolePath = role_id === 1 || role_id === 2 ? '/profile' : role_id === 3 ? '/scholar-profile' : '/*';
      navigate(rolePath); // Navigate based on the rolePath

      // Function to calculate initials
      setAvatarInitial(`${first_name.charAt(0).toUpperCase()}${last_name.charAt(0).toUpperCase()}`)
    };
  

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
              <MUI.Button variant='text' sx={{mt: -3, ml: -1}} onClick={handleSeeProfile}>
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