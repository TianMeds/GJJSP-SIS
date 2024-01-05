import React from 'react'
import * as MUI from '../../import';
import useAuth from '../../hooks/useAuth';

export const ScholarProfileBox = () => {
    const {auth} = useAuth();
    // const first_name = auth?.user?.first_name || '';
    // const last_name = auth?.user?.last_name || '';
    const email_address = auth?.user?.email_address || '';
    const user_mobile_num = auth?.user?.user_mobile_num || '';
    const roles_name = auth.roles_name || '';
    let first_name = 'Mc Joseph';
    let last_name = 'Agbanlog';
    let sy_started = 'S.Y 2015-2016';
    let sy_graduated = 'On going';
    let status = 'Renewed';
    let current_yr = '2nd';
    let gwa = '3.5';
    let num_yrs_scholar = '3 years';

  return (

    
    <MUI.Grid container spacing={2} sx={{mt: 5}}>
         {/* Scholar Overview part 1 */}
     <MUI.Grid item xs={6} md={12} mb={2}>
     <MUI.Typography variant="h3" sx={{ marginBottom: 5 }}>
           Scholar Overview
         </MUI.Typography>

       <MUI.Box
         sx={{
           display: 'inline-flex',
           alignItems: 'flex-start',
           gap: '24px',
           height: 'auto',
           border: '2px solid rgba(0,0,0,0.2)',
           boxShadow: '11px 7px 15px -3px rgba(0,0,0,0.1)',
           padding: '20px',
           borderRadius: '5px',
           '@media (max-width: 600px)': {
            flexDirection: 'column',}
         }}
       >
       <MUI.Box>
         <MUI.Typography variant='h5'>Name</MUI.Typography>
             <MUI.Typography sx={{ mt: 2}}>{first_name + ' ' + last_name}</MUI.Typography>
       </MUI.Box>

       <MUI.Box>
         <MUI.Typography variant='h5'>Started</MUI.Typography>
         <MUI.Typography sx={{mt: 2}}>{sy_started}</MUI.Typography>
       </MUI.Box>

       <MUI.Box>
         <MUI.Typography variant='h5'>Graduated</MUI.Typography>
         <MUI.Typography sx={{mt: 2}}>{sy_graduated}</MUI.Typography>
       </MUI.Box>

               
       <MUI.Box>
         <MUI.Typography variant='h5'>Status</MUI.Typography>
         <MUI.Typography sx={{mt: 2}}>{status}</MUI.Typography>
       </MUI.Box>

       <MUI.Box>
         <MUI.Typography variant='h5'>GWA</MUI.Typography>
         <MUI.Typography sx={{mt: 2}}>{gwa}</MUI.Typography>
       </MUI.Box>     

       <MUI.Box>
         <MUI.Typography variant='h5'>Year Level</MUI.Typography>
         <MUI.Typography sx={{mt: 2}}>{current_yr}</MUI.Typography>
       </MUI.Box> 

       <MUI.Box>
         <MUI.Typography variant='h5'>Years as Scholar</MUI.Typography>
         <MUI.Typography sx={{mt: 2}}>{num_yrs_scholar}</MUI.Typography>
       </MUI.Box> 

       </MUI.Box>

     </MUI.Grid>

          {/* First Box: Undergrad */}
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
          <MUI.Typography sx={{textTransform: 'uppercase' , mt: 2}}>{first_name + ' ' + last_name}</MUI.Typography>
        </MUI.Box>

        <MUI.Box sx={{mt: 3}}>
          <MUI.Typography variant='h5'>Role</MUI.Typography>
          <MUI.Typography sx={{mt: 2}}>{roles_name}</MUI.Typography>
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
                <MUI.Typography variant='h5'>Facebook Account</MUI.Typography>
                <MUI.Typography sx={{textTransform: 'uppercase', mt: 2}}>{first_name + ' ' + last_name}</MUI.Typography>
            </MUI.Box>

            <MUI.Box sx={{mt: 3}}>
                <MUI.Typography variant='h5'>Email Address</MUI.Typography>
                <MUI.Typography sx={{mt: 2}}>{email_address}</MUI.Typography>
            </MUI.Box>

            <MUI.Box sx={{mt: 3}}>
                <MUI.Typography variant='h5'>Mobile Number</MUI.Typography>
                <MUI.Typography sx={{mt: 2}}>{user_mobile_num}</MUI.Typography>
            </MUI.Box>

        </MUI.Box>
      </MUI.Grid>
      
    </MUI.Grid>
  )
}
