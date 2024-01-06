import React, {useEffect} from 'react'
import * as MUI from '../../import';
import useAuth from '../../hooks/useAuth';
import useUserStore from '../../store/UserStore';
import useLoginStore from '../../store/LoginStore';
import useAuthStore from '../../store/AuthStore';
import axios from '../../api/axios';

export const ProfileBox = ({ userId }) => {
    const {auth} = useAuth();
    const first_name = auth?.user?.first_name || '';
    const last_name = auth?.user?.last_name || '';
    const email_address = auth?.user?.email_address || '';
    const user_mobile_num = auth?.user?.user_mobile_num || '';
    const roles_name = auth.roles_name || '';

    const {user, setUser, selectedUser, setSelectedUser} =useUserStore();
    const {loading, setLoading, loadingMessage, setLoadingMessage} = useLoginStore();
    const {authToken} = useAuthStore();
    

    //Get User Details


  return (
    <MUI.Grid container spacing={2} sx={{mt: 5}}>

      {/* First Column: Personal */}
      <MUI.Grid item xs={12} md={6} mb={2}>
      <MUI.Typography variant="h3" sx={{ marginBottom: 5 }}>
            Personal
          </MUI.Typography>

        <MUI.Box
          sx={{
            height: 'auto',
            border: '2px solid rgba(0,0,0,0.2)',
            boxShadow: '11px 7px 15px -3px rgba(0,0,0,0.1)',
            padding: '20px',
            borderRadius: '5px',
          }}
        >
        <MUI.Box>
          <MUI.Typography variant='h5'>Full Name</MUI.Typography>
          <MUI.Typography sx={{textTransform: 'uppercase' , mt: 2}}>{selectedUser.first_name + ' ' + selectedUser.last_name}</MUI.Typography>
        </MUI.Box>

        <MUI.Box sx={{mt: 3}}>
          <MUI.Typography variant='h5'>Role</MUI.Typography>
          <MUI.Typography sx={{mt: 2}}>{selectedUser.roles_name}</MUI.Typography>
        </MUI.Box>

        </MUI.Box>
      </MUI.Grid>

      {/* Second Column: Contact */}
      <MUI.Grid item xs={12} md={6}>
      <MUI.Typography variant="h3" sx={{ marginBottom: 5 }}>
            Contact
          </MUI.Typography>
        <MUI.Box
          sx={{
            height: 'auto',
            border: '2px solid rgba(0,0,0,0.2)',
            boxShadow: '11px 7px 15px -3px rgba(0,0,0,0.1)',
            padding: '20px',
            borderRadius: '5px',
          }}
        >
          
            
            <MUI.Box>
                <MUI.Typography variant='h5'>Email Address</MUI.Typography>
                <MUI.Typography sx={{mt: 2}}>{selectedUser.email_address}</MUI.Typography>
            </MUI.Box>

            <MUI.Box sx={{mt: 3}}>
                <MUI.Typography variant='h5'>Mobile Number</MUI.Typography>
                <MUI.Typography sx={{mt: 2}}>{selectedUser.user_mobile_num}</MUI.Typography>
            </MUI.Box>

        </MUI.Box>
      </MUI.Grid>
      
    </MUI.Grid>
  )
}
