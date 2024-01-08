//import React from 'react'
import * as MUI from '../../import';
import useAuth from '../../hooks/useAuth';

export const ScholarProfileBox = () => {
    const {auth} = useAuth();
    const first_name = auth?.user?.first_name || '';
    const last_name = auth?.user?.last_name || '';
    //const email_address = auth?.user?.email_address || '';
    //const user_mobile_num = auth?.user?.user_mobile_num || '';
    //const roles_name = auth.roles_name || '';
    //let first_name = 'Mc Joseph';
    //let last_name = 'Agbanlog';
    let sy_started = 'S.Y 2015-2016';
    let sy_graduated = 'On going';
    let status = 'Renewed';
    let current_yr = '2nd';
    let gwa = '3.5';
    let num_yrs_scholar = '3 years';
    let school = 'South East Asia College';
    let school_address = 'some address';
    let track = 'ICT';
    let shs_graduated = 'S.Y 2011-2023';
    let fathers_Name = 'Juanito DelaCruz';
    let mothers_Name = 'Juana DelaCruz';
    let mobile_Number = '044343434';
    let email_address = 'JuanDelaCruz@gmail.com';
    let permanent_Address = "Some Address";
    let facebook = 'Juan DelaCruz';
    let proj_partner = 'gado and jess jalandoni scholarship';
    let scholarship_type = 'full scholarship';
    let middle_name = 'Medallada';
    let gender = 'male';
    let religion = 'catholic';
    let birthdate = 'June 24, 2003';
    let birth_place = 'quezon city';
    let civil_status = 'single';
    let program = 'Bacher of Science in Information Technology';

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
            Undergraduate academic details
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
          <MUI.Typography variant='h5'>Scholarship Type</MUI.Typography>
          <MUI.Typography sx={{textTransform: 'uppercase' , mt: 2}}>{scholarship_type}</MUI.Typography>
        </MUI.Box>

        <MUI.Box sx={{mt: 3}}>
          <MUI.Typography variant='h5'>Project Partner</MUI.Typography>
          <MUI.Typography sx={{mt: 2}}>{proj_partner}</MUI.Typography>
        </MUI.Box>

        <MUI.Box sx={{mt: 3}}>
          <MUI.Typography variant='h5'>School</MUI.Typography>
          <MUI.Typography sx={{mt: 2}}>{school}</MUI.Typography>
        </MUI.Box>

        <MUI.Box sx={{mt: 3}}>
          <MUI.Typography variant='h5'>School Address</MUI.Typography>
          <MUI.Typography sx={{mt: 2}}>{school_address}</MUI.Typography>
        </MUI.Box>

        <MUI.Box sx={{mt: 3}}>
          <MUI.Typography variant='h5'>Program</MUI.Typography>
          <MUI.Typography sx={{mt: 2}}>{program}</MUI.Typography>
        </MUI.Box>

        </MUI.Box>
      </MUI.Grid>

      {/* Second Box: High school academic details */}
      <MUI.Grid item xs={12} md={6}>
      <MUI.Typography variant="h3" sx={{ marginBottom: 5 }}>
            High school academic details
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
                <MUI.Typography variant='h5'>School</MUI.Typography>
                <MUI.Typography sx={{textTransform: 'uppercase', mt: 2}}>{school}</MUI.Typography>
            </MUI.Box>

            <MUI.Box sx={{mt: 3}}>
                <MUI.Typography variant='h5'>School Address</MUI.Typography>
                <MUI.Typography sx={{mt: 2}}>{school_address}</MUI.Typography>
            </MUI.Box>

            <MUI.Box sx={{mt: 3}}>
                <MUI.Typography variant='h5'>Track</MUI.Typography>
                <MUI.Typography sx={{mt: 2}}>{track}</MUI.Typography>
            </MUI.Box>

            <MUI.Box sx={{mt: 3}}>
                <MUI.Typography variant='h5'>Graduated</MUI.Typography>
                <MUI.Typography sx={{mt: 2}}>{shs_graduated}</MUI.Typography>
            </MUI.Box>
          
        </MUI.Box>
      </MUI.Grid>

       {/* Third Box: Personal */}
       <MUI.Grid item xs={12} md={6}>
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
                <MUI.Typography variant='h5'>LastName</MUI.Typography>
                <MUI.Typography sx={{textTransform: 'uppercase', mt: 2}}>{last_name}</MUI.Typography>
            </MUI.Box>

            <MUI.Box sx={{mt: 3}}>
                <MUI.Typography variant='h5'>FirstName</MUI.Typography>
                <MUI.Typography sx={{mt: 2}}>{first_name}</MUI.Typography>
            </MUI.Box>

            <MUI.Box sx={{mt: 3}}>
                <MUI.Typography variant='h5'>MiddleName</MUI.Typography>
                <MUI.Typography sx={{mt: 2}}>{middle_name}</MUI.Typography>
            </MUI.Box>

            <MUI.Box sx={{mt: 3}}>
                <MUI.Typography variant='h5'>Gender</MUI.Typography>
                <MUI.Typography sx={{mt: 2}}>{gender}</MUI.Typography>
            </MUI.Box>

            <MUI.Box sx={{mt: 3}}>
                <MUI.Typography variant='h5'>Religion</MUI.Typography>
                <MUI.Typography sx={{mt: 2}}>{religion}</MUI.Typography>
            </MUI.Box>

            <MUI.Box sx={{mt: 3}}>
                <MUI.Typography variant='h5'>Birth Date</MUI.Typography>
                <MUI.Typography sx={{mt: 2}}>{birth_place}</MUI.Typography>
            </MUI.Box>

            <MUI.Box sx={{mt: 3}}>
                <MUI.Typography variant='h5'>Place of Birth</MUI.Typography>
                <MUI.Typography sx={{mt: 2}}>{birthdate}</MUI.Typography>
            </MUI.Box>

            <MUI.Box sx={{mt: 3}}>
                <MUI.Typography variant='h5'>Civil Status</MUI.Typography>
                <MUI.Typography sx={{mt: 2}}>{civil_status}</MUI.Typography>
            </MUI.Box>

        </MUI.Box>
      </MUI.Grid>

       {/* Fourth Box: Contact */}
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
                <MUI.Typography variant='h5'>Facebook</MUI.Typography>
                <MUI.Typography sx={{textTransform: 'uppercase', mt: 2}}>{facebook}</MUI.Typography>
            </MUI.Box>

            <MUI.Box sx={{mt: 3}}>
                <MUI.Typography variant='h5'>Email Address</MUI.Typography>
                <MUI.Typography sx={{mt: 2}}>{email_address}</MUI.Typography>
            </MUI.Box>

            <MUI.Box sx={{mt: 3}}>
                <MUI.Typography variant='h5'>Mobile Number</MUI.Typography>
                <MUI.Typography sx={{mt: 2}}>{mobile_Number}</MUI.Typography>
            </MUI.Box>
            
            </MUI.Box>
      </MUI.Grid>

{/* Fifth Box:  */}
<MUI.Grid item xs={12} md={6}>
      <MUI.Typography variant="h3" sx={{ marginBottom: 5 }}>
            
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
                <MUI.Typography variant='h5'></MUI.Typography>
                <MUI.Typography sx={{textTransform: 'uppercase', mt: 2}}>{}</MUI.Typography>
            </MUI.Box>

            <MUI.Box sx={{mt: 3}}>
                <MUI.Typography variant='h5'></MUI.Typography>
                <MUI.Typography sx={{mt: 2}}>{}</MUI.Typography>
            </MUI.Box>

            <MUI.Box sx={{mt: 3}}>
                <MUI.Typography variant='h5'></MUI.Typography>
                <MUI.Typography sx={{mt: 2}}>{}</MUI.Typography>
            </MUI.Box>

            <MUI.Box sx={{mt: 3}}>
                <MUI.Typography variant='h5'></MUI.Typography>
                <MUI.Typography sx={{mt: 2}}>{}</MUI.Typography>
            </MUI.Box>


        </MUI.Box>
      </MUI.Grid>
      
    {/* Sixth Box: Home Address */}
<MUI.Grid item xs={12} md={6}>
      <MUI.Typography variant="h3" sx={{ marginBottom: 5 }}>
            Home Address
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
                <MUI.Typography variant='h5'>Present Address</MUI.Typography>
                <MUI.Typography sx={{textTransform: 'uppercase', mt: 2}}>{school}</MUI.Typography>
            </MUI.Box>

            <MUI.Box sx={{mt: 3}}>
                <MUI.Typography variant='h5'>Permanent Address</MUI.Typography>
                <MUI.Typography sx={{mt: 2}}>{permanent_Address}</MUI.Typography>
            </MUI.Box>

            </MUI.Box>
      </MUI.Grid>

      {/* Seventh Box:  */}
<MUI.Grid item xs={12} md={6}>
      <MUI.Typography variant="h3" sx={{ marginBottom: 5 }}>
            
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
                <MUI.Typography variant='h5'></MUI.Typography>
                <MUI.Typography sx={{textTransform: 'uppercase', mt: 2}}>{}</MUI.Typography>
            </MUI.Box>

            <MUI.Box sx={{mt: 3}}>
                <MUI.Typography variant='h5'></MUI.Typography>
                <MUI.Typography sx={{mt: 2}}>{}</MUI.Typography>
            </MUI.Box>

            </MUI.Box>
      </MUI.Grid>

      
      {/* Eight Box: Family Address */}
<MUI.Grid item xs={12} md={6}>
      <MUI.Typography variant="h3" sx={{ marginBottom: 5 }}>
            Family Address
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
                <MUI.Typography variant='h5'>Number of Family Members</MUI.Typography>
                <MUI.Typography sx={{textTransform: 'uppercase', mt: 2}}>{school}</MUI.Typography>
            </MUI.Box>

            <MUI.Box sx={{mt: 3}}>
                <MUI.Typography variant='h5'>Mothers Name</MUI.Typography>
                <MUI.Typography sx={{mt: 2}}>{mothers_Name}</MUI.Typography>
                <MUI.Typography variant='h5'>Fathers Name</MUI.Typography>
                <MUI.Typography sx={{mt: 2}}>{fathers_Name}</MUI.Typography>
            </MUI.Box>

            </MUI.Box>
      </MUI.Grid>


      
      
    </MUI.Grid>
  )
}