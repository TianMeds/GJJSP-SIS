import React,{useEffect, useState} from 'react'
import * as MUI from '../../import';
import useAuth from '../../hooks/useAuth';
import axios from '../../api/axios';
import useAuthStore from '../../store/AuthStore';
import useScholarStore from '../../store/ScholarStore';
import useUserStore from '../../store/UserStore';
import useLoginStore from '../../store/LoginStore';
import useScholarProfileStore from '../../store/ScholarProfileStore';
import {useNavigate} from 'react-router-dom';

export const ScholarProfileBox = () => {
    const {auth, setAuth} = useAuth();

    const {scholars, setScholars, scholar, setScholar, scholarsData, setScholarsData, scholarshipCateg, setScholarshipCateg, projectPartner, setProjectPartner, school, setSchool} = useScholarStore();
    const {selectedUser} = useUserStore();
    const {setLoading, setLoadingMessage} = useLoginStore();
    const {getAuthToken, alertOpen, setAlertOpen, alertMessage, setAlertMessage, errorOpen, setErrorOpen, errorMessage, setErrorMessage} = useAuthStore();
    const {scholarFamMembers, setScholarFamMembers, yearsInProgram, setYearsInProgram, highschoolAcadDetails, setHighschoolAcadDetails,  undergradAcadDetails, setUndergradAcadDetails  } = useScholarProfileStore();
    const navigate = useNavigate();

//Fetch the Users Profiles
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

//Fetch Data of the Scholars Profile
useEffect(() => {
  const fetchScholar = async() => {
    setLoading(true)
    setLoadingMessage('Loading Scholar Data')
    try{
      const authToken = useAuthStore.getState().getAuthToken();
      const scholarResponse = await axios.get(`/api/scholarsProfile?userId=${selectedUser.id}`, {
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      });

      if(scholarResponse.status === 200){
        setScholarsData(scholarResponse.data.data);
      }
      else if (scholarResponse.status === 404) {
        setScholarsData([]);
        console.log("Hello")
      }
      else{
        setErrorMessage('Something went wrong');
        setErrorOpen(true);
      }
      setLoading(false)
    }
    catch(error){
      if (error.response.status === 401 ) {
        setErrorMessage('Session Expired');
        setErrorOpen(true);
        useAuthStore.getState().resetAuthToken();
        setAuth(null); // Update authentication state
        navigate('/login')
      }
      else if(error.response.status === 404){
        setScholarsData([]);
      }
      else{
        setErrorMessage('Something went wrong');
        setErrorOpen(true);
      }
      setLoading(false)
    }
  }
  fetchScholar();
}, [])

//Fetch the Scholar Family Members
useEffect(() => {
  const fetchScholarFamMember = async () => {
    try {
      const authToken = useAuthStore.getState().getAuthToken();
      
      const response = await axios.get(`/api/scholarFam?userId=${selectedUser.id}`, {
        headers: {
          'Authorization':
          `Bearer ${authToken}`
        }
      });

    if (response.status === 200) {
        setScholarFamMembers(response.data.data);
        setAlertOpen(true);
        setAlertMessage('Users list has been updated');
    } else {
        setErrorOpen(true);
        setAlertMessage('Failed to fetch data');
    } 
    } catch (error) {
        if (error.response?.status === 401) {
            setErrorOpen(true);
            setErrorMessage("You've been logout");
            navigate('/login');
        }
    }
  };
  fetchScholarFamMember();
}, []);

//Fetch the High School Academic Details
useEffect(() => {
  const fetchHighSchoolAcademicDetails = async () => {
    try {
      const authToken = useAuthStore.getState().getAuthToken();

      const response = await axios.get(`/api/highschool-acad-detail?userId=${selectedUser.id}`, {
        headers: {
          'Authorization':
          `Bearer ${authToken}`
        }
      });

    if (response.status === 200) {
        setHighschoolAcadDetails(response.data.data);
        setAlertOpen(true);
        setAlertMessage('Users list has been updated');
    } else {
        setErrorOpen(true);
        setErrorMessage('Failed to fetch data');
    }
    } catch (error) {
        if (error.response?.status === 401) {
            navigate('/login');
        }
    }
  };
  fetchHighSchoolAcademicDetails();
}, []);

//Fetch the Undergrad Academic Details
useEffect(() => {
  const fetchUndergradAcademicDetails = async () => {
    try {
      const authToken = useAuthStore.getState().getAuthToken();

      const response = await axios.get(`/api/undergrad-acad-detail?userId=${selectedUser.id}`, {
        headers: {
          'Authorization':
          `Bearer ${authToken}`
        }
      });

    if (response.status === 200) {
        setUndergradAcadDetails(response.data.data);
        setAlertOpen(true);
        setAlertMessage('Users list has been updated');
    } else {
        setErrorOpen(true);
        setErrorMessage('Failed to fetch data');
    }
    } catch (error) {
        if (error.response?.status === 401) {
            navigate('/login');
        }
    } 
  };
  fetchUndergradAcademicDetails();
}, []);

//Function to calculate the Year of scholar here
useEffect(() => {
  // Call your function to calculate the years
  const calculateYearInProgram = () => {
    const currentYear = new Date().getFullYear();
    const yearStarted = parseInt(scholarsData.school_yr_started);

    if (!isNaN(yearStarted)) {
      const yearsInSystem = currentYear - yearStarted;
      setYearsInProgram(yearsInSystem);
    } else {
      setYearsInProgram(0); // or handle invalid input as needed
    }
  };

  // Execute the function
  calculateYearInProgram();

  // You may want to re-run this effect when scholarsData changes
}, [scholarsData]);

useEffect(() => {
  setAlertOpen(true);
  setErrorOpen(false);
  setAlertMessage('Please wait updating scholar list');

  const fetchScholarshipCategory = async () => {
    try {
      const authToken = useAuthStore.getState().getAuthToken();
      const response = await axios.get('/api/scholarships', {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      });

      if (response.status === 200) {
        setScholarshipCateg(response.data.data);
        setAlertOpen(false);
        setAlertMessage("Updated Scholarship Category")
      } else {
        setErrorOpen(true);
        setErrorMessage("Error updating scholarship category")
      }

      const projectPartnerResponse = await axios.get('/api/project-partners', {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      });

      if (projectPartnerResponse.status === 200) {
        setProjectPartner(projectPartnerResponse.data.data);
        setAlertOpen(false);
        setAlertMessage("Updated Project Partner")
      } else {
        setErrorOpen(true);
        setErrorMessage("Error updating project partner")
      }

      const schoolResponse = await axios.get('/api/schools', {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      });

      if (schoolResponse.status === 200) {
        setSchool(schoolResponse.data.data);
        setAlertOpen(false);
        setAlertMessage("Updated School")
      }
      else {
        setErrorOpen(true);
        setErrorMessage("Error updating school")
      }
      
    } catch (err) {
      if (err.response.status === 401 || err.projectPartnerResponse.status === 401 || err.schoolResponse.status === 401 ) {
        setErrorOpen(true);
        setErrorMessage("Session expired. Please login again.")
        navigate('/login')
      }
    }
  }

  fetchScholarshipCategory();
}, []);

const statusMapping = {
  1: "New",
  2: "For Renewal",
  3: "For Renewal: Graduating",
  4: "Renewed",
  5: "Graduating",
  6: "Graduated",
  7: "Alumni",
  8: "Withdrew",
}


const getStatusClassName = (statusId) => {
  switch (statusId) {
    case 1:
      return "New";
    case 2:
      return "For_Renewal";
    case 3:
      return "For_Renewal_Graduating";
    case 4:
      return "Renewed";
    case 5:
      return "Graduating";
    case 6:
      return "Graduated";
    case 7:
      return "Alumni";
    case 8:
      return "Withdrew";
    default:
      return "";
  }
};

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
            <MUI.Typography variant='h5'>Status</MUI.Typography>
            <MUI.Typography variant='h5' mt={2}>
              {statusMapping[scholarsData.scholar_status_id] || 'Unknown'}
            </MUI.Typography>
          </MUI.Grid>

          <MUI.Grid mr={3}>
            <MUI.Typography variant='h5'  fontWeight="bold">GWA</MUI.Typography>
            <MUI.Typography sx={{ mt: 2, width: '100%' }}>{undergradAcadDetails.gwa_current_school_yr}</MUI.Typography>
          </MUI.Grid>

          <MUI.Grid mr={3}>
            <MUI.Typography variant='h5'  fontWeight="bold">Year Level</MUI.Typography>
            <MUI.Typography sx={{ mt: 2, width: '100%' }}>{undergradAcadDetails.current_yr_level}</MUI.Typography>
          </MUI.Grid>

          <MUI.Grid mr={3}>
            <MUI.Typography variant='h5'  fontWeight="bold">Years as Scholar</MUI.Typography>
            <MUI.Typography sx={{ mt: 2, width: '100%' }}>{yearsInProgram}</MUI.Typography>
          </MUI.Grid>
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
          <MUI.Typography sx={{textTransform: 'uppercase' , mt: 2}}>
          {scholarshipCateg.find(category => category.id === scholarsData.scholarship_categ_id)?.scholarship_categ_name || 'Unknown Category'}
          </MUI.Typography>
        </MUI.Box>

        <MUI.Box sx={{mt: 3}}>
          <MUI.Typography variant='h5'>Project Partner</MUI.Typography>
          <MUI.Typography sx={{mt: 2}}>{projectPartner.find(partner => partner.id === scholarsData.project_partner_id)?.project_partner_name}</MUI.Typography>
        </MUI.Box>

        <MUI.Box sx={{mt: 3}}>
          <MUI.Typography variant='h5'>School</MUI.Typography>
          <MUI.Typography sx={{mt: 2}}>{school.find(school => school.id === scholarsData.school_id)?.school_name}</MUI.Typography>
        </MUI.Box>

        <MUI.Box sx={{mt: 3}}>
          <MUI.Typography variant='h5'>School Address</MUI.Typography>
          <MUI.Typography sx={{mt: 2}}>{school.find(school => school.id === scholarsData.school_id)?.school_address}</MUI.Typography>
        </MUI.Box>

        <MUI.Box sx={{mt: 3}}>
          <MUI.Typography variant='h5'>Program</MUI.Typography>
          <MUI.Typography sx={{mt: 2}}>{scholarsData.program}</MUI.Typography>
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
                <MUI.Typography sx={{textTransform: 'uppercase', mt: 2}}>{highschoolAcadDetails.school_name}</MUI.Typography>
            </MUI.Box>

            <MUI.Box sx={{mt: 3}}>
                <MUI.Typography variant='h5'>School Address</MUI.Typography>
                <MUI.Typography sx={{mt: 2}}>{highschoolAcadDetails.school_address}</MUI.Typography>
            </MUI.Box>

            <MUI.Box sx={{mt: 3}}>
                <MUI.Typography variant='h5'>Track</MUI.Typography>
                <MUI.Typography sx={{mt: 2}}>{highschoolAcadDetails.track_name}</MUI.Typography>
            </MUI.Box>

            <MUI.Box sx={{mt: 3}}>
                <MUI.Typography variant='h5'>Strand</MUI.Typography>
                <MUI.Typography sx={{mt: 2}}>{highschoolAcadDetails.strand_name}</MUI.Typography>
            </MUI.Box>

            <MUI.Box sx={{mt: 3}}>
                <MUI.Typography variant='h5'>Graduated</MUI.Typography>
                <MUI.Typography sx={{mt: 2}}>{highschoolAcadDetails.school_yr_graduated_hs}</MUI.Typography>
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
            <MUI.Typography variant="h3" sx={{ mb: 2, mt: 2 }}>
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
                    <MUI.Typography sx={{textTransform: 'uppercase', mt: 2}}>{scholarsData.street}  {scholarsData.barangay_name} {scholarsData.cities_municipalities_name}</MUI.Typography>
                </MUI.Box>

                <MUI.Box sx={{mt: 3}}>
                    <MUI.Typography variant='h5'>Region</MUI.Typography>
                    <MUI.Typography sx={{mt: 2}}>{scholarsData.region_name}</MUI.Typography>
                </MUI.Box> 

                <MUI.Box sx={{mt: 3}}>
                    <MUI.Typography variant='h5'>Province</MUI.Typography>
                    <MUI.Typography sx={{mt: 2}}>{scholarsData.province_name}</MUI.Typography>
                </MUI.Box> 

                <MUI.Box sx={{mt: 3}}>
                    <MUI.Typography variant='h5'>Zip Code</MUI.Typography>
                    <MUI.Typography sx={{mt: 2}}>{scholarsData.zip_code}</MUI.Typography>
                </MUI.Box>

              </MUI.Box>
          </MUI.Grid>

      </MUI.Grid>
      


    
      
      {/* Eight Box: Family  */}
<MUI.Grid item xs={12} md={12} mt={2}>
      <MUI.Typography variant="h3" sx={{ marginBottom: 5 }}>
            Family
          </MUI.Typography>
          <MUI.Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              height: 'auto',
              border: '2px solid rgba(0,0,0,0.2)',
              boxShadow: '11px 7px 15px -3px rgba(0,0,0,0.1)',
              padding: '20px',
              borderRadius: '5px',
            }}
          >
            <MUI.Grid container spacing={3}>
              <MUI.Grid item xs={6}>
                {/* Left column */}
                <MUI.Box mt={2} mb={2}>
                  <MUI.Typography variant='h5'>Mother's Name</MUI.Typography>
                  <MUI.Typography sx={{ mt: 2, mb: 2 }}>{scholarFamMembers.mother_name}</MUI.Typography>
                </MUI.Box>

                <MUI.Box mt={2} mb={2}>
                  <MUI.Typography variant='h5'>Father's Name</MUI.Typography>
                  <MUI.Typography sx={{ mt: 2, mb: 2 }}>{scholarFamMembers.father_name}</MUI.Typography>
                </MUI.Box>

                <MUI.Box mt={2} mb={2}>
                  <MUI.Typography variant='h5'>Guardian's Name</MUI.Typography>
                  <MUI.Typography sx={{ mt: 2, mb: 2 }}>{scholarFamMembers.fam_mem_name}</MUI.Typography>

                  <MUI.Typography variant='h5'>Guardian's Occupation</MUI.Typography>
                  <MUI.Typography sx={{ mt: 2, mb: 2 }}>{scholarFamMembers.occupation}</MUI.Typography>
                </MUI.Box>
              </MUI.Grid>

              <MUI.Grid item xs={6}>
                {/* Right column */}

                <MUI.Box mt={2} mb={2}>
                  <MUI.Typography variant='h5'>Guardian's Contact Number</MUI.Typography>
                  <MUI.Typography sx={{ mt: 2, mb: 2 }}>{scholarFamMembers.fam_mem_mobile_num}</MUI.Typography>
                </MUI.Box>

                <MUI.Box mt={2} mb={2}>
                  <MUI.Typography variant='h5'>Number of Family Members</MUI.Typography>
                  <MUI.Typography sx={{ mt: 2, mb: 2 }}>{scholarsData.num_fam_mem}</MUI.Typography>
                </MUI.Box>

                <MUI.Box mt={2} mb={2}>
                  <MUI.Typography variant='h5'>Monthly Income</MUI.Typography>
                  <MUI.Typography sx={{ mt: 2, mb: 2 }}>{scholarFamMembers.income}</MUI.Typography>
                </MUI.Box>

              </MUI.Grid>
            </MUI.Grid>
          </MUI.Box>
      </MUI.Grid>


      
      
    </MUI.Grid>
  )
}