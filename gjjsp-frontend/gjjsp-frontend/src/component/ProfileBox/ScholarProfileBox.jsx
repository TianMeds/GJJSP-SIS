import React,{useEffect} from 'react'
import * as MUI from '../../import';
import useAuth from '../../hooks/useAuth';
import axios from '../../api/axios';
import useAuthStore from '../../store/AuthStore';
import useScholarStore from '../../store/ScholarStore';
import useUserStore from '../../store/UserStore';

export const ScholarProfileBox = () => {
    const {auth} = useAuth();

    //Variable Declaration for no data still in the backend
    let current_yr = '2nd';
    let gwa = '3.5';
    let num_yrs_scholar = '3 years';
    let school = 'South East Asia College';
    let school_address = '11AA Paguig City';
    let track = 'ICT';
    let shs_graduated = 'S.Y 2011-2023';
    let fathers_Name = 'Juanito DelaCruz';
    let mothers_Name = 'Juana DelaCruz';
    let mobile_Number = '044343434';
    let permanent_Address = "11AA Paguig City";
    let facebook = 'Juan DelaCruz';
    let proj_partner = 'Gado and Jess Jalandoni Scholarship';
    let scholarship_type = 'full scholarship';
    let program = 'Bacher of Science in Information Technology';

    const {scholars, setScholars, scholar, setScholar, scholarsData, setScholarsData} = useScholarStore();
    const {selectedUser} = useUserStore();
    const {getAuthToken, alertOpen, setAlertOpen, alertMessage, setAlertMessage, errorOpen, setErrorOpen, errorMessage, setErrorMessage} = useAuthStore();


    //Get Foreign Key Data to users
    useEffect(() => {
      const fetchUser = async() => {
        try{
          const authToken = useAuthStore.getState().getAuthToken();
          const response = await axios.get('/api/profile', {
            headers: {
              'Authorization': `Bearer ${authToken}`
            }
          });

          if (response.status === 200) {
            setScholars(response.data.data);
          }
          else{
            setErrorMessage('Something went wrong');
            setErrorOpen(true);
          }
        }
        catch(error){
          setErrorMessage('Something went wrong');
          setErrorOpen(true);
        }
      };
      fetchUser();
    },[])

  useEffect(() => {
    const fetchScholar = async() => {
      try{
        const authToken = useAuthStore.getState().getAuthToken();
        const scholarResponse = await axios.get('/api/scholarsProfile', {
          headers: {
            'Authorization': `Bearer ${authToken}`
          }
        });

        if(scholarResponse.status === 200){
          setScholarsData(scholarResponse.data.data);
          console.log(scholarResponse.data.data);
        }
        else{
          setErrorMessage('Something went wrong');
          setErrorOpen(true);
        }
      }
      catch(error){
        setErrorMessage('Something went wrong');
        setErrorOpen(true);
      }
    }
    fetchScholar();
  }, [])

    

  return (
    <MUI.Grid container spacing={2} sx={{mt: 5}}>
         {/* Scholar Overview part 1 */}
     <MUI.Grid item xs={12}  mb={2}>
      <MUI.Typography variant="h3" sx={{ marginBottom: 5 }}>
        Scholar Overview
      </MUI.Typography>

      <MUI.Box
          sx={{
            display: 'flex',
            height: 'auto',
            border: '2px solid rgba(0,0,0,0.2)',
            boxShadow: '11px 7px 15px -3px rgba(0,0,0,0.1)',
            padding: '20px',
            borderRadius: '5px',
            flexDirection: {
              xs: 'column',
              lg: 'row',
            },
          }}
        >
        
          <MUI.Grid mr={3}>
            <MUI.Typography variant='h5' fontWeight="bold">Name</MUI.Typography>
            <MUI.Typography sx={{ mt: 2, width: '100%', mb: 2 }}>{selectedUser.first_name + ' ' + selectedUser.last_name}</MUI.Typography>
          </MUI.Grid>

         <MUI.Grid mr={3}>
            <MUI.Typography variant='h5'  fontWeight="bold">Started</MUI.Typography>
            {scholarsData.school_yr_started && (
              <MUI.Typography sx={{ mt: 2 }}>
                {`S.Y ${scholarsData.school_yr_started} - ${parseInt(scholarsData.school_yr_started) + 1}`}
              </MUI.Typography>
            )}

          </MUI.Grid>

          <MUI.Grid mr={3}>
            <MUI.Typography variant='h5'  fontWeight="bold">Graduated</MUI.Typography>

            {scholarsData.school_yr_graduated && (
              <MUI.Typography sx={{ mt: 2 }}>
                {`S.Y ${scholarsData.school_yr_graduated} - ${parseInt(scholarsData.school_yr_graduated) + 1}`}
              </MUI.Typography>
            
            )}
          </MUI.Grid> 

          <MUI.Grid mr={3}>
            <MUI.Typography variant='h5'  fontWeight="bold">Status</MUI.Typography>
            <MUI.Typography sx={{ mt: 2, width: '100%' }}>{scholars.scholar_status_name}</MUI.Typography>
          </MUI.Grid>
  {/*
          <MUI.Grid mr={3}>
            <MUI.Typography variant='h5'  fontWeight="bold">GWA</MUI.Typography>
            <MUI.Typography sx={{ mt: 2, width: '100%' }}>{gwa}</MUI.Typography>
          </MUI.Grid>

          <MUI.Grid mr={3}>
            <MUI.Typography variant='h5'  fontWeight="bold">Year Level</MUI.Typography>
            <MUI.Typography sx={{ mt: 2, width: '100%' }}>{current_yr}</MUI.Typography>
          </MUI.Grid>

          <MUI.Grid mr={3}>
            <MUI.Typography variant='h5'  fontWeight="bold">Years as Scholar</MUI.Typography>
            <MUI.Typography sx={{ mt: 2, width: '100%' }}>{num_yrs_scholar}</MUI.Typography>
          </MUI.Grid> */}
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
        {/* <MUI.Box>
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
          <MUI.Typography sx={{mt: 2}}>{scholar.program}</MUI.Typography>
        </MUI.Box> */}

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
          
            {/* <MUI.Box>
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
            </MUI.Box> */}
          
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
                <MUI.Typography variant='h5'>Last Name</MUI.Typography>
                <MUI.Typography sx={{ mt: 2}}>{selectedUser.last_name}</MUI.Typography>
            </MUI.Box>

            <MUI.Box sx={{mt: 3}}>
                <MUI.Typography variant='h5'>FirstName</MUI.Typography>
                <MUI.Typography sx={{mt: 2}}>{selectedUser.first_name}</MUI.Typography>
            </MUI.Box>

            <MUI.Box sx={{mt: 3}}>
                <MUI.Typography variant='h5'>MiddleName</MUI.Typography>
                <MUI.Typography sx={{mt: 2}}>{selectedUser.middle_name}</MUI.Typography>
            </MUI.Box>

            <MUI.Box sx={{mt: 3}}>
                <MUI.Typography variant='h5'>Gender</MUI.Typography>
                <MUI.Typography sx={{mt: 2}}>{scholarsData.gender}</MUI.Typography>
            </MUI.Box>

            <MUI.Box sx={{mt: 3}}>
                <MUI.Typography variant='h5'>Religion</MUI.Typography>
                <MUI.Typography sx={{mt: 2}}>{scholarsData.religion}</MUI.Typography>
            </MUI.Box>

            <MUI.Box sx={{mt: 3}}>
                <MUI.Typography variant='h5'>Birth Date</MUI.Typography>
                <MUI.Typography sx={{mt: 2}}>{scholarsData.birthdate}</MUI.Typography>
            </MUI.Box>

            <MUI.Box sx={{mt: 3}}>
                <MUI.Typography variant='h5'>Place of Birth</MUI.Typography>
                <MUI.Typography sx={{mt: 2}}>{scholarsData.birthplace}</MUI.Typography>
            </MUI.Box>

            <MUI.Box sx={{mt: 3}}>
                <MUI.Typography variant='h5'>Civil Status</MUI.Typography>
                <MUI.Typography sx={{mt: 2}}>{scholarsData.civil_status}</MUI.Typography>
            </MUI.Box> 
        </MUI.Box>
      </MUI.Grid>

       {/* Fourth Box: Contact */}
      <MUI.Grid item md={6}>
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
                <MUI.Typography sx={{ mt: 2}}>{scholarsData.fb_account}</MUI.Typography>
            </MUI.Box>

            <MUI.Box sx={{mt: 3}}>
                <MUI.Typography variant='h5'>Email Address</MUI.Typography>
                <MUI.Typography sx={{mt: 2}}>{selectedUser.email_address}</MUI.Typography>
            </MUI.Box>

            <MUI.Box sx={{mt: 3}}>
                <MUI.Typography variant='h5'>Mobile Number</MUI.Typography>
                <MUI.Typography sx={{mt: 2}}>{selectedUser.user_mobile_num}</MUI.Typography>
            </MUI.Box> 
            
          </MUI.Box>

          <MUI.Grid item md={12}>
            <MUI.Typography variant="h3" sx={{ mb: 5, mt: 4 }}>
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
                {/* <MUI.Box>
                    <MUI.Typography variant='h5'>Present Address</MUI.Typography>
                    <MUI.Typography sx={{textTransform: 'uppercase', mt: 2}}>{school}</MUI.Typography>
                </MUI.Box>

                <MUI.Box sx={{mt: 3}}>
                    <MUI.Typography variant='h5'>Permanent Address</MUI.Typography>
                    <MUI.Typography sx={{mt: 2}}>{permanent_Address}</MUI.Typography>
                </MUI.Box> */}

              </MUI.Box>
          </MUI.Grid>

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
          
            {/* <MUI.Box>
                <MUI.Typography variant='h5'>Number of Family Members</MUI.Typography>
                <MUI.Typography sx={{textTransform: 'uppercase', mt: 2}}>{school}</MUI.Typography>
            </MUI.Box>

            <MUI.Box sx={{mt: 3}}>
                <MUI.Typography variant='h5'>Mothers Name</MUI.Typography>
                <MUI.Typography sx={{mt: 2}}>{mothers_Name}</MUI.Typography>
                <MUI.Typography variant='h5'>Fathers Name</MUI.Typography>
                <MUI.Typography sx={{mt: 2}}>{fathers_Name}</MUI.Typography>
            </MUI.Box> */}

            </MUI.Box>
      </MUI.Grid>


      
      
    </MUI.Grid>
  )
}