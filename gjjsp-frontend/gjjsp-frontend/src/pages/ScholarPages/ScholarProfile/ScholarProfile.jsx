import React, {lazy, Suspense, useEffect, useState} from 'react';
import axios from '../../../api/axios';
import { Link, useNavigate } from 'react-router-dom';

//Material UI Components
import * as MUI from '../../../import';
import Layout from '../../../component/Layout/SidebarNavbar/Layout';
import { ScholarProfileBox } from '../../../component/ProfileBox/ScholarProfileBox';
import { ProfileHeader } from '../../../component/ProfileHeader/ProfileHeader';
const LazyErrMsg = lazy(() => import('../../../component/ErrorMsg/ErrMsg'));

//Zustand Componentns
import useProfileStore from '../../../store/ProfileStore';
import useUserStore from '../../../store/UserStore';
import useAuthStore from '../../../store/AuthStore';
import useLoginStore from '../../../store/LoginStore';
import useScholarProfileStore from '../../../store/ScholarProfileStore';
import useAddressStore from '../../../store/AddressStore';

//React Hook Form
import {useForm, Controller } from 'react-hook-form';
import { DevTool } from "@hookform/devtools";

//Custom Components
import theme from '../../../context/theme';
import useAuth from '../../../hooks/useAuth';


export default function ScholarProfile() {
    
  //React Hook form 
  const form  = useForm();
  const { register, control, handleSubmit, formState, reset, watch, validate, setValue} = form
  const { errors } = formState;
  const password = watch("password");
  const {auth} = useAuth();

  //Regex Validation
  const USER_REGEX = /^[A-Za-z.-]+(\s*[A-Za-z.-]+)*$/;
  const EMAIL_REGEX =  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  const FBLINK_REGEX = /^(https?:\/\/)?(www\.)?facebook\.com\/@?[A-Za-z0-9_.-]+$/i;
  const CONTACT_REGEX = /^\+?63\d{10}$/

  //Zustand Hooks
  const 
  {profile, setProfiles, handleOpenProfile, handleCloseProfile, 
  editProfile, setEditProfile,setSelectedProfile, 
  changePassword, handleOpenChangePassword, 
  handleCloseChangePassword, editPassword, setEditPassword,setSelectedPassword, goBack, setGoBack
  } = useProfileStore();

  const {
    regions, setRegions, selectedRegion, setSelectedRegion,setRegionsName, setSelectedRegionCode, selectedRegionCode,
    provinces, setProvinces, selectedProvince, setSelectedProvince, setProvincesName, selectedProvinceCode, setSelectedProvinceCode,
    cities, setCities, selectedCity, setSelectedCity, setCitiesName, setBarangaysName, selectedCityCode, setSelectedCityCode,
    barangays, setBarangays, selectedBarangay, setSelectedBarangay
  } = useAddressStore();

  const {getAuthToken, alertOpen, alertMessage, setAlertOpen, setAlertMessage, errorOpen, setErrorOpen, setErrorMessage, errorMessage} = useAuthStore();

  const {selectedUser, setSelectedUser} = useUserStore();

  const {
    editScholarProfile, setEditScholarProfile, selectedScholarProfile, setSelectedScholarProfile, 
    handleCloseScholarProfile, handleOpenScholarProfile, scholarProfiles, scholarProfile, setScholarProfiles,
    scholarFamMembers,setScholarFamMembers, selectedScholarFamMember,setSelectedScholarFamMember, editScholarFamMembers, setEditScholarFamMembers,
    highschoolAcadDetails, setHighschoolAcadDetails, undergradAcadDetails, setUndergradAcadDetails, selectedHighschoolAcadDetail, setSelectedHighschoolAcadDetail,
    selectedUndergradAcadDetail, setSelectedUndergradAcadDetail, editHighschoolAcadDetails, setEditHighschoolAcadDetails, editUndergradAcadDetails, setEditUndergradAcadDetails,
    scholarPhoto, setScholarPhoto,
  } = useScholarProfileStore();

  const { showPassword, handleTogglePassword, setLoading, setLoadingMessage } = useLoginStore();

  const role_id = auth?.user?.role_id || '';


  const navigate = useNavigate();
  
  const [activeStep, setActiveStep] = useState(0);
  const currentStep = activeStep;
  const relevantStep = 1;

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setScholarPhoto(file);
  };
  


  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  //Reseting Form Values 
  const FormValues = {
    gender: '',
    religion: '',
    birthdate: '',
    birthplace: '',
    civil_status: '',
    num_fam_mem: '',
    school_yr_started: '',
    school_yr_graduated: '',
    school_id: '',
    program: '',
    acad_terms: '',
    home_visit_sched: '',
    fb_account: '',
    region_name: '',
    province: '',
    cities_municipalities_name: '',
    barangay_name: '',
    street: '',
    zip_code: '',
    father_name: '',
    mother_name: '',
    relation_to_scholar: '',
    fam_mem_name: '',
    occupation: '',
    income: '',
    fam_mem_mobile_num: '',
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
};


  //Submit Form Scholar Data
  const onSubmitScholarProfileForm = async (data, event) => {
    event.preventDefault();
    const authToken = useAuthStore.getState().getAuthToken();

    const config = {
        headers: {
            "Content-type": "application/json",
            'Authorization': `Bearer ${authToken}`
        }
    };

    const formattedData = {
        gender: data.gender,
        religion: data.religion,
        birthdate: formatDate(data.birthdate),
        birthplace: data.birthplace,
        civil_status: data.civil_status,
        num_fam_mem: data.num_fam_mem,
        school_yr_started: data.school_yr_started,
        school_yr_graduated: data.school_yr_graduated,
        school_id: data.school_id,
        program: data.program,
        home_visit_sched: data.home_visit_sched,
        fb_account: data.fb_account,
        region_name: data.region_name,
        province_name: data.province_name,
        cities_municipalities_name: data.cities_municipalities_name,
        barangay_name: data.barangay_name,
        street: data.street,
        zip_code: data.zip_code,
    };

    const scholarFamMemData = {
      father_name: data.father_name,
      mother_name: data.mother_name,
      relation_to_scholar: data.relation_to_scholar,
      fam_mem_name: data.fam_mem_name,
      occupation: data.occupation,
      income: data.income,
      fam_mem_mobile_num: data.fam_mem_mobile_num,
  };

    const highschoolData = {
      track_name: data.track_name,
      strand_name: data.strand_name,
      gwa_school_yr_graduated: data.gwa_school_yr_graduated,
      school_name: data.school_name,
      school_address: data.school_address,
      school_yr_graduated_hs: data.school_yr_graduated_hs,
    };

    const undergradData = {
      undergrad_sy: data.undergrad_sy,
      current_yr_level: data.current_yr_level,
      gwa_current_school_yr: data.gwa_current_school_yr,
    };
    
    try {
        if (editScholarProfile) {
            // Update Scholar Profile
            setLoading(true);
            setLoadingMessage('Updating personal information...');
            const responseProfile = await axios.put(`/api/scholarsProfile/${selectedScholarProfile.id}`, formattedData, config);
            console.log(selectedScholarProfile.id)
            setEditScholarProfile(false);
            handleCloseScholarProfile();
            setAlertOpen(true);
            setAlertMessage('Profile Updated');
        }   
        const responseProfiles = await axios.get(`/api/scholarsProfile`, {
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        });

        if (responseProfiles.status === 200) {
            setScholarProfiles(responseProfiles.data.data);
            setAlertOpen(true);
            setAlertMessage('Profiled has been updated');
        } else {
            setErrorOpen(true);
            setAlertMessage('Failed to fetch data');
        }

        if (editScholarFamMembers) {
            // Update Scholar Family Member
            setLoading(true);
            setLoadingMessage('Updating family member data...');
            const responseFam = await axios.put(`/api/scholarFam/${selectedScholarFamMember.id}`, scholarFamMemData, config);
            console.log(selectedScholarFamMember.id)
            setEditScholarFamMembers(false);
            handleCloseScholarProfile();
            setAlertOpen(true);
            setAlertMessage('Family Member Updated');
        }

        const responseFamMembers = await axios.get(`/api/scholarFam`, {
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        });

        if (responseFamMembers.status === 200) {
            setScholarFamMembers(responseFamMembers.data.data);
            setAlertOpen(true);
            setAlertMessage('Family data has been updated');
        } else {
            setErrorOpen(true);
            setErrorMessage('Failed to fetch data');
        }

        if (editHighschoolAcadDetails) {
            // Update High School Data
            setLoading(true);
            setLoadingMessage('Updating high school data...');
            const responseHighschool = await axios.put(`/api/highschool-acad-detail/${selectedHighschoolAcadDetail.id}`, highschoolData, config);
            setEditHighschoolAcadDetails(false);
            handleCloseScholarProfile();
            setAlertOpen(true);
            setAlertMessage('High School Data Updated');
        }

        const responseHighschool = await axios.get(`/api/highschool-acad-detail`, {
          headers: {
            'Authorization': `Bearer ${authToken}`
          }
        });

        if (responseHighschool.status === 200) {
          setHighschoolAcadDetails(responseHighschool.data.data);
          setAlertOpen(true);
          setAlertMessage('High School data has been updated');
        }
        else{
          setErrorOpen(true);
          setErrorMessage("Failed to fetch data")
        }

        if (editUndergradAcadDetails) {
          //Update Undergrad Data
          setLoading(true);
          setLoadingMessage('Updating Undergrad data...');
          const responseUndergrad = await axios.put(`/api/undergrad-acad-detail/${selectedUndergradAcadDetail.id}`, undergradData, config);
          setEditUndergradAcadDetails(false);
          handleCloseScholarProfile();
          setAlertOpen(true);
          setAlertMessage('Undergraduate Data Updated');
          setLoading(false);
        }

        const responseUndergrad = await axios.get(`/api/undergrad-acad-detail`, {
          headers: {
            'Authorization' : `Bearer ${authToken}`
          }
        });

        if (responseUndergrad.status === 200) {
          setUndergradAcadDetails(responseUndergrad.data.data);
          setAlertOpen(true);
          setAlertMessage('Undergraduate data has been updated');
        }
        else{
          setErrorOpen(true);
          setErrorMessage("Failed to fetch data")
        }

        form.reset(FormValues);
    } catch (error) {
        if (error.response?.status === 401) {
            setErrorOpen(true);
            setErrorMessage("You've been logged out");
            navigate('/login');
        }
        else if(error.response?.status === 500) {
            setErrorOpen(true);
          setErrorMessage("Complete all fields");
          setLoading(false);
        }
      setLoading(false);
    }
};

  //Change Password Form
  const onSubmitPasswordForm = async (data, event) => {
    event.preventDefault();
    const authToken = useAuthStore.getState().getAuthToken();
  
    const config = {
      headers: {
        "Content-type": "application/json",
        'Authorization': `Bearer ${authToken}`
      }
    };
  
    try {
      setLoading(true);
      setLoadingMessage('Updating password...');
      
      const response = await axios.put(
        `/api/profile/${selectedUser.id}`, { password: data.password }, config
      );
  
      if (response.status === 200) {
        setAlertOpen(true);
        setAlertMessage('Password Updated');
      } else {
        setErrorOpen(true);
        setErrorMessage('Failed to update password');
      }
  
      handleCloseChangePassword();
      setLoading(false);
    } catch (error) {
      if (error.response?.status === 401) {
        setErrorOpen(true);
        setErrorMessage("You've been logout");
        navigate('/login');
      } 
    }
  };

// Fetch Scholar Data
useEffect(() => {
  const fetchScholarProfile = async (selectedUser) => {
    try {
      const authToken = useAuthStore.getState().getAuthToken();
      
      // Extract the id from the selected user
      const userId = selectedUser.id;

      const response = await axios.get(`/api/scholarsProfile?userId=${selectedUser.id}`, {
        headers: {
          'Authorization':  `Bearer ${authToken}`
        }
      });

      if (response.status === 200) {
        setScholarProfiles(response.data.data);
        setAlertOpen(true);
        setAlertMessage('Users list has been updated');
      } else {
        setErrorOpen(true);
        setAlertMessage('Failed to fetch data');
      }

      form.reset(FormValues);
    } catch (error) {
      if (error.response?.status === 401) {
        setErrorOpen(true);
        setErrorMessage("You've been logout");
        navigate('/login');
      }
    }
  };

  fetchScholarProfile(selectedUser); // Pass the selectedUser to the fetchScholarProfile function
}, [selectedUser]); // Include selectedUser in the dependency array so that useEffect runs whenever selectedUser changes



  // Fetch Scholar Family Member
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

  // Fetch High School Data
  useEffect(() => {
    const fetchHighSchool = async () => {
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
    fetchHighSchool();
  }, []);

  // Fetch Undergrad Data
  useEffect(() => {
    const fetchUndergrad = async () => {
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
    fetchUndergrad();
  }, []);
    

// Fetch regions and provinces concurrently
useEffect(() => {
  const fetchRegionAndProvinces = async () => {
    try {
      const [regionsResponse, provincesResponse] = await Promise.all([
        fetch('https://psgc.gitlab.io/api/regions'),
        selectedRegionCode ? fetch(`https://psgc.gitlab.io/api/regions/${selectedRegionCode}/provinces`) : null,
      ]);

      // Handle regions response
      if (!regionsResponse.status === 200) {
        throw new Error('Failed to fetch regions');
      }
      const regionsData = await regionsResponse.json();
      setRegions(regionsData);

      // Handle provinces response
      if (provincesResponse && !provincesResponse.status === 200) {
        throw new Error('Failed to fetch provinces');
      }

      const provincesData = provincesResponse ? await provincesResponse.json() : [];
      setProvinces(provincesData);

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  fetchRegionAndProvinces();
}, [selectedRegionCode]);

// Fetch provinces when a region is selected
useEffect(() => {
  const fetchProvinces = async () => {
    try {
      // Reset provinces state to an empty array
      setProvinces([]);

      if (selectedRegionCode && selectedRegionCode !== '130000000') {
        const provincesEndpoint = `https://psgc.gitlab.io/api/regions/${selectedRegionCode}/provinces`;

        const response = await fetch(provincesEndpoint);

        if (!response.ok) {
          throw new Error('Failed to fetch provinces');
        }

        const data = await response.json();
        setProvinces(data);

      }
    } catch (error) {
      console.error('Error fetching provinces:', error);
    }
  };

  fetchProvinces();
}, [selectedProvinceCode, selectedRegionCode]);

// Fetch cities when a province is selected
useEffect(() => {
  const fetchCities = async () => {
    try {
      // Reset cities state to an empty array
      setCities([]);

      if (selectedProvinceCode) {
        let citiesEndpoint = '';

        // Special case: Fetch cities for Metro Manila directly from the region
        if (selectedRegionCode === '130000000') {
          citiesEndpoint = `https://psgc.gitlab.io/api/regions/${selectedRegionCode}/cities-municipalities/`;
        } else {
          citiesEndpoint = `https://psgc.gitlab.io/api/provinces/${selectedProvinceCode}/cities-municipalities/`;
        }

        const response = await fetch(citiesEndpoint);

        if (!response.ok) {
          throw new Error('Failed to fetch cities');
        }

        const data = await response.json();
        setCities(data);

      } else if (selectedRegionCode === '130000000') {
        // Special case: Fetch cities for NCR when no province is selected
        const ncrCitiesEndpoint = `https://psgc.gitlab.io/api/regions/${selectedRegionCode}/cities-municipalities/`;

        const response = await fetch(ncrCitiesEndpoint);

        if (!response.ok) {
          throw new Error('Failed to fetch cities');
        }

        const data = await response.json();
        setCities(data);
      }
    } catch (error) {
      console.error('Error fetching cities:', error);
    }
  };

  fetchCities();
}, [selectedProvinceCode, selectedRegionCode, selectedCityCode]);

useEffect(() => {
  const fetchBarangays = async () => {
    try {
      // Reset barangays state to an empty array
      setBarangays([]);

      if (selectedCityCode) {
        const barangaysEndpoint = `https://psgc.gitlab.io/api/cities-municipalities/${selectedCityCode}/barangays/`;

        const response = await fetch(barangaysEndpoint);

        if (!response.ok) {
          throw new Error('Failed to fetch barangays');
        }

        const data = await response.json();
        setBarangays(data);
      }
    } catch (error) {
      console.error('Error fetching barangays:', error);
    }
  };

  fetchBarangays();
}, [selectedCityCode, selectedBarangay]);


  //Put Scholar Data and Update
  const updateScholarProfile = async () => {
    setLoading(true);
    setLoadingMessage("Please wait opening edit profile");
    setEditScholarProfile(true);
    setEditScholarFamMembers(true);
    setEditHighschoolAcadDetails(true);
    setEditUndergradAcadDetails(true);
  
    try {
      const authToken = useAuthStore.getState().getAuthToken();
  
      // Fetch Scholar Profile
      const profileResponse = await axios.get(`/api/scholarsProfile?userId=${selectedUser.id}`, {
        headers: {
          'Authorization': `Bearer ${authToken}`
        },
        validateStatus: function (status) {
          return status === 404 || (status >= 200 && status < 300);
        }
      });
  
      const profileData = profileResponse.data.data;
  
      if (profileResponse.status === 404 || !profileData || profileData.length === 0) {
        setSelectedScholarProfile({
          gender: '',
          religion: '',
          birthdate: '',
          birthplace: '',
          civil_status: '',
          num_fam_mem: '',
          school_yr_started: '',
          school_yr_graduated: '',
          school_id: '',
          program: '',
          acad_terms: '',
          home_visit_sched: '',
          fb_account: ''
        });
  
        form.reset();
      } else {
        const profileWithoutPassword = {
          ...profileResponse.data.data,
          password: undefined
        };
  
        setSelectedScholarProfile(profileWithoutPassword);
        setScholarProfiles(profileWithoutPassword);
        form.reset(profileWithoutPassword);
      }
  
      // Fetch Scholar Family Member
      const scholarFamResponse = await axios.get(`/api/scholarFam?userId=${selectedUser.id}`, {
        headers: {
          'Authorization': `Bearer ${authToken}`
        },
        validateStatus: function (status) {
          return status === 404 || (status >= 200 && status < 300);
        }
      });
  
      const scholarFamData = scholarFamResponse.data.data;

      if (scholarFamResponse.status === 404 || !scholarFamData || scholarFamData.length === 0) {
        setSelectedScholarFamMember({
          father_name: '',
          mother_name: '',
          relation_to_scholar: '',
          fam_mem_name: '',
          occupation: '',
          income: '',
          fam_mem_mobile_num: '',
        });

        form.reset();
      }

      if (scholarFamResponse.status === 200) {
        setSelectedScholarFamMember(scholarFamResponse.data.data);
        setScholarFamMembers(scholarFamResponse.data.data);

        setAlertOpen(true);
        setAlertMessage('Family Members data has been updated');
      } else {
        setErrorOpen(true);
        setAlertMessage('Failed to fetch data');
      }

      // Fetch High School Data
      const highschoolResponse = await axios.get(`/api/highschool-acad-detail?userId=${selectedUser.id}`, {
        headers: {
          'Authorization': `Bearer ${authToken}`
        },
        validateStatus: function (status) {
          return status === 404 || (status >= 200 && status < 300);
        }
      });

      const highschoolData = highschoolResponse.data.data;

      if (highschoolResponse.status === 404 || !highschoolData || highschoolData.length === 0) {
        setSelectedHighschoolAcadDetail({
          track_name: '',
          strand_name: '',
          gwa_school_yr_graduated: '',
          school_name: '',
          school_address: '',
          school_yr_graduated_hs: '',
        });

        form.reset();
      }

      if (highschoolResponse.status === 200) {
        setSelectedHighschoolAcadDetail(highschoolResponse.data.data);
        setHighschoolAcadDetails(highschoolResponse.data.data);

        setAlertOpen(true);
        setAlertMessage('High School Data has been updated');
      } else {
        setErrorOpen(true);
        setErrorMessage('Failed to fetch data');
      }

      // Fetch Undergrad Data
      const undergradResponse = await axios.get(`/api/undergrad-acad-detail?userId=${selectedUser.id}`, {
        headers: {
          'Authorization': `Bearer ${authToken}`
        },
        validateStatus: function (status) {
          return status === 404 || (status >= 200 && status < 300);
        }
      });

      const undergradData = undergradResponse.data.data;
      
      if (undergradResponse.status === 404 || !undergradData || undergradData.length === 0) {
        setSelectedUndergradAcadDetail({
          undergrad_sy: '',
          current_yr_level: '',
          gwa_current_school_yr: '',
        });

        handleOpenScholarProfile();
        form.reset();
      }

      if (undergradResponse.status === 200) {
        setSelectedUndergradAcadDetail(undergradResponse.data.data);
        setUndergradAcadDetails(undergradResponse.data.data);
        
        setAlertOpen(true);
        setAlertMessage('Undergrad Data has been updated');
      } else {
        setErrorOpen(true);
        setErrorMessage('Failed to fetch data');
      }

      handleOpenScholarProfile();
      setLoading(false);
    } catch (error) {
      console.error('Error fetching scholar data:', error);
      setLoading(false);
    }
  };

  //Update Scholar Password
  const updatePassword = async () => {
    setLoading(true)
    setLoadingMessage("Please wait opening change password")
    setEditPassword(true)
  
    try{
      const authToken = getAuthToken();
      const response = await axios.get(`/api/profile`, {
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      });
      const passwordWithoutPassword = {
        ...response.data.data,
        password: undefined
      };
  
      setSelectedPassword(passwordWithoutPassword);
      handleOpenChangePassword();
      form.reset(passwordWithoutPassword);
      setLoading(false)
    }
    catch (error) {
      // Handle error, such as displaying an error message
      console.error('Error fetching user data:', error);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const authToken = getAuthToken();
        const response = await axios.get(`/api/profile`, {
          headers: {
            'Authorization': `Bearer ${authToken}`
          }
        });
  
        setGoBack(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        setErrorOpen(true);
        setErrorMessage('Failed to fetch data');
      }
    };
  
    fetchData();
  }, []);
  

  //Dialog
  const steps = [
    {
      title: 'Personal Information',
      label: 'Personal Information',
      content: (
        <div>
          <MUI.Grid container spacing={2}>
          {/* First Column */}
          <MUI.Grid item xs={4}>
            <MUI.Grid id="genderGrid">
              <MUI.InputLabel htmlFor="gender" id="genderLabel">Gender</MUI.InputLabel>

                <MUI.FormControl sx={{ width: '100%', borderRadius: '8px' }}>
                  <MUI.Select
                    id='gender'
                    native
                    {...register('gender', {
                      required: true,
                    })}
                  >
                    <option value="" disabled>Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </MUI.Select>

                </MUI.FormControl>

              {errors.gender && (
                  <p id='errMsg'>
                      <MUI.InfoIcon className='infoErr' />
                      {errors.gender?.message}
                  </p>
              )}
            </MUI.Grid>

            <MUI.Grid id="religionGrid">
              <MUI.InputLabel htmlFor="religion" id="religionLabel">Religion</MUI.InputLabel>
              <Controller
                name='religion'
                control={control}
                defaultValue={scholarProfiles.religion || ""}
                rules={{
                  required: 'Religion is required',
                  validate: (value) => value !== '' || 'Please select a religion'
                }}
                render={({ field }) => (
                  <MUI.FormControl sx={{ width: '100%', borderRadius: '8px' }}>
                    <MUI.Select
                      id="religion"
                      native
                      {...field}
                      value={field.value || ""} 
                    >
                      <option value="" disabled>Select Religion</option>
                      <option value="Roman Catholic">Roman Catholic</option>
                      <option value="Islam">Islam</option>
                      <option value="Iglesia ni Cristo">Iglesia ni Cristo</option>
                      <option value="Protestant">Protestant</option>
                      <option value="Buddhism">Buddhism</option>
                      <option value="Seventh-day Adventist">Seventh-day Adventist</option>
                      <option value="Jehovah's Witness">Jehovah's Witness</option>
                      <option value="Christianity">Christianity</option>
                      <option value="Other">Other</option>
                    </MUI.Select>
                  </MUI.FormControl>
                )}
              />
              {errors.religion && (
                  <p id='errMsg'>
                      <MUI.InfoIcon className='infoErr' />
                      {errors.religion?.message}
                  </p>
              )}
              {errors.religion && (
                <p id='errMsg'>
                  <MUI.InfoIcon className='infoErr' />
                  {errors.religion?.message}
                </p>
              )}
            </MUI.Grid>

            <MUI.Grid id="birthdateGrid">
              <MUI.InputLabel htmlFor="birthdate" id="birthdateLabel">Birthdate</MUI.InputLabel>
              <MUI.TextField
                  type='date'
                  id='birthdate'
                  fullWidth
                  defaultValue={scholarProfiles.birthdate || ""}
                  {...register("birthdate", {
                      required: {
                          value: true,
                          message: 'Birthdate is required',
                      }
                  })}
              />
              {errors.birthdate && (
                  <p id='errMsg'>
                      <MUI.InfoIcon className='infoErr' />
                      {errors.birthdate?.message}
                  </p>
              )}
            </MUI.Grid>

            <MUI.Grid id="birthplaceGrid">
              <MUI.InputLabel htmlFor="birthplace" id="birthplaceLabel">Birthplace</MUI.InputLabel>
              <Controller
                name='birthplace'
                control={control}
                defaultValue={scholarProfiles.birthplace || ""}
                rules={{
                  required: 'Birthplace is required',
                }}
                render={({ field }) => (
                  <MUI.FormControl sx={{ width: '100%', borderRadius: '8px' }}>
                    <MUI.TextField
                      type='text'
                      id='birthplace'
                      placeholder='Birthplace'
                      fullWidth
                      {...field}
                    />
                  </MUI.FormControl>
                )}
              />
              {errors.birthplace && (
                <p id='errMsg'>
                  <MUI.InfoIcon className='infoErr' />
                  {errors.birthplace?.message}
                </p>
              )}
            </MUI.Grid>


          </MUI.Grid>

          {/* Second Column */}
          <MUI.Grid item xs={4}>

            <MUI.Grid id="civilStatusGrid">
              <MUI.InputLabel htmlFor="civil_status" id="civilStatusLabel">Civil Status</MUI.InputLabel>
              <Controller
                  name='civil_status'
                  control={control}
                  defaultValue={scholarProfiles.civil_status || ""}
                  rules={{
                      required: 'Civil Status is required',
                      validate: (value) => value !== '' || 'Please select a civil status'
                  }}
                  render={({ field }) => (
                      <MUI.FormControl sx={{ width: '100%', borderRadius: '8px' }}>
                          <MUI.Select
                              id="civil_status"
                              native
                              {...field}
                              value={field.value || ""} 
                          >
                              <option value="" disabled>Select Civil Status</option>
                              <option value="Single">Single</option>
                              <option value="Married">Married</option>
                              <option value="Separated">Separated</option>
                              <option value="Divorced">Divorced</option>
                          </MUI.Select>
                      </MUI.FormControl>
                  )}
              />
              {errors.civil_status && (
                  <p id='errMsg'>
                      <MUI.InfoIcon className='infoErr' />
                      {errors.civil_status?.message}
                  </p>
              )}
            </MUI.Grid>
            
            <MUI.Grid id="schoolYrStartedGrid">
              <MUI.InputLabel htmlFor="school_yr_started" id="schoolYrStartedLabel">Year Started</MUI.InputLabel>
              <MUI.TextField
                  type='text'
                  id='school_yr_started'
                  placeholder='School Year Started'
                  fullWidth
                  autoComplete='off'
                  defaultValue={scholarProfiles.school_yr_started || ""}
                  {...register("school_yr_started", {
                      required: {
                          value: true,
                          message: 'School Year Started is required',
                      },
                      pattern: {
                          value: /^(19|20)\d{2}$/,
                          message: 'Please enter a valid year (e.g., 2000)',
                      },
                  })}
              />
              {errors.school_yr_started && (
                  <p id='errMsg'>
                      <MUI.InfoIcon className='infoErr' />
                      {errors.school_yr_started?.message}
                  </p>
              )}
            </MUI.Grid>

            <MUI.Grid id="schoolYrGraduatedGrid">
              <MUI.InputLabel htmlFor="school_yr_graduated" id="schoolYrGraduatedLabel">Year Graduated</MUI.InputLabel>
              <MUI.TextField
                  type='text'
                  id='school_yr_graduated'
                  placeholder='School Year Graduated'
                  fullWidth
                  defaultValue={scholarProfiles.school_yr_graduated || ""}
                  {...register("school_yr_graduated", {
                      required: {
                          value: true,
                          message: 'School Year Graduated is required',
                      },
                      pattern: {
                        value: /^(19|20)\d{2}$/,
                        message: 'Please enter a valid year (e.g., 2000)',
                      },
                  })}
              />
              {errors.school_yr_graduated && (
                  <p id='errMsg'>
                      <MUI.InfoIcon className='infoErr' />
                      {errors.school_yr_graduated?.message}
                  </p>
              )}
            </MUI.Grid>

            <MUI.Grid id="programGrid">
                <MUI.InputLabel htmlFor="program" id="programLabel">Program</MUI.InputLabel>
                <MUI.TextField
                    type='text'
                    id='program'
                    placeholder='Program'
                    fullWidth
                    defaultValue={scholarProfiles.program || ""}
                    {...register("program", {
                        required: {
                            value: true,
                            message: 'Program is required',
                        }
                    })}
                />
                {errors.program && (
                    <p id='errMsg'>
                        <MUI.InfoIcon className='infoErr' />
                        {errors.program?.message}
                    </p>
                )}
            </MUI.Grid>


          </MUI.Grid>

          {/* Third Column */}
          <MUI.Grid item xs={4}>

            <MUI.Grid id="homeVisitSchedGrid">
            <MUI.InputLabel htmlFor="home_visit_sched" id="homeVisitSchedLabel">Home Visit Schedule</MUI.InputLabel>
            <MUI.TextField
                type='date'  
                id='home_visit_sched'
                placeholder='Home Visit Schedule'
                fullWidth
                defaultValue={scholarProfiles.home_visit_sched || ""}
                {...register("home_visit_sched", {
                    required: {
                        value: true,
                        message: 'Home Visit Schedule is required',
                    }
                })}
            />
            {errors.home_visit_sched && (
                <p id='errMsg'>
                    <MUI.InfoIcon className='infoErr' />
                    {errors.home_visit_sched?.message}
                </p>
            )}
          </MUI.Grid>

          <MUI.Grid id="fbAccountGrid">
            <MUI.InputLabel htmlFor="fb_account" id="fbAccountLabel">Facebook Link</MUI.InputLabel>
            <MUI.TextField
                type='text'
                id='fb_account'
                placeholder='facebook.com/Username'
                fullWidth
                defaultValue={scholarProfiles.fb_account || ""}
                {...register("fb_account", {
                    required: {
                        value: true,
                        message: 'Facebook Account is required',
                    },
                    pattern: {
                      value: FBLINK_REGEX,
                      message: 'Please enter a valid FB link (e.g., facebook.com/Username) ',
                    }
                })}
            />
            {errors.fb_account && (
                <p id='errMsg'>
                    <MUI.InfoIcon className='infoErr' />
                    {errors.fb_account?.message}
                </p>
            )}
          </MUI.Grid>

          <MUI.Grid id="acadTermsGrid">
              <MUI.InputLabel htmlFor="acad_terms" id="acadTermsLabel">School Academic Terms</MUI.InputLabel>
              <Controller
                  name='acad_terms'
                  defaultValue=""
                  control={control}
                  rules={{
                    required: 'Academic Term is required',
                    validate: (value) => value !== '' || 'Please select an Academic Term'
                  }}
                  render={({ field }) => (
                    <MUI.FormControl sx={{ width: '100%', borderRadius: '8px' }}>
                      <MUI.Select
                        id="acad_terms"
                        native
                        {...field}
                        value={field.value || ""} 
                        onChange={field.onChange}
                      >
                        <option value="" disabled>Select Academic Terms</option>
                        <option value="2">2 Terms</option>
                        <option value="3">3 Terms</option>
                      </MUI.Select>
                    </MUI.FormControl>
                  )}
                />
              {errors.acad_terms && (
                  <p id='errMsg'>
                      <MUI.InfoIcon className='infoErr' />
                      {errors.acad_terms?.message}
                  </p>
              )}
            </MUI.Grid>


          </MUI.Grid>
        </MUI.Grid>  
        </div>
      ),
    },
    {
      title: 'Address Information',
      label: 'Address Information',
      content: (
        <div>
          <MUI.Grid container spacing={2}>
            {/* First Column */}

            <MUI.Grid item xs={6}>

            <MUI.Grid id="regionGrid">
              <MUI.InputLabel htmlFor="region_name" id="regionLabel">
                Region
              </MUI.InputLabel>
              <Controller
                name="region_name"
                control={control}
                defaultValue={scholarProfiles.region_name || ''}
                rules={{
                  required: 'Region is required',
                  validate: (value) => value !== '' || 'Please select a region',
                }}
                render={({ field }) => (
                  <MUI.FormControl sx={{ width: '100%', borderRadius: '8px' }}>
                    <MUI.Select
                      id="region_name"
                      native
                      {...field}
                      onChange={(e) => {
                        setValue('province_name', ''); // Clear province when region changes
                        setValue('cities_municipalities_name', ''); // Clear city when region changes
                        setValue('barangay_name', ''); // Clear barangay when region changes

                        const selectedRegionCode = e.target.options[e.target.selectedIndex].dataset.code;
                        setSelectedRegionCode(selectedRegionCode);
                        field.onChange(e);
                      }}
                    >
                      <option value="">Select Region</option>
                      {regions.map((region) => (
                        <option key={region.name} value={region.name} data-code={region.code}>
                          {region.name}
                        </option>
                      ))}
                    </MUI.Select>
                  </MUI.FormControl>
                )}
              />
              {errors.region_name && (
                <p id="errMsg">
                  <MUI.InfoIcon className="infoErr" />
                  {errors.region_name?.message}
                </p>
              )}
            </MUI.Grid>

              <MUI.Grid id="provinceGrid">
                <MUI.InputLabel htmlFor="province_name" id="provinceLabel">
                  Province
                </MUI.InputLabel>
                <Controller
                  name="province_name"
                  control={control}
                  defaultValue={scholarProfiles.province_name || ''}
                  rules={{
                    required: selectedRegionCode === '130000000' ? false : 'Province is required',
                    validate: (value) => (selectedRegionCode === '130000000' || value !== '') || 'Please select a province',
                  }}
                  render={({ field }) => (
                    <MUI.FormControl sx={{ width: '100%', borderRadius: '8px' }}>
                      <MUI.Select
                        id="province_name"
                        native
                        {...field}
                        onChange={(e) => {
                          setValue('cities_municipalities_name', ''); // Clear city when province changes
                          const selectedProvinceCode = e.target.options[e.target.selectedIndex].dataset.code;
                          setSelectedProvinceCode(selectedProvinceCode);
                          field.onChange(e);
                        }}
                      >
                        <option value="">Select Province</option>
                        {selectedRegionCode === '130000000' ? (
                          // Show only Metro Manila when NCR is selected
                          <option key="Metro Manila" value="Metro Manila" data-code="MM">
                            Metro Manila
                          </option>
                        ) : (
                          // Show all provinces for other regions
                          provinces.map((province) => (
                            <option key={province.name} value={province.name} data-code={province.code}>
                              {province.name}
                            </option>
                          ))
                        )}
                      </MUI.Select>
                    </MUI.FormControl>
                  )}
                />
                {errors.province_name && (
                  <p id="errMsg">
                    <MUI.InfoIcon className="infoErr" />
                    {errors.province_name?.message}
                  </p>
                )}
              </MUI.Grid>


            <MUI.Grid id="cityGrid">
              <MUI.InputLabel htmlFor="cities-municipalities_name" id="cityLabel">
                City
              </MUI.InputLabel>
              <Controller
                name="cities_municipalities_name"
                control={control}
                defaultValue={scholarProfiles.cities_municipalities_name || ''}
                rules={{
                  required: selectedRegionCode === '130000000' ? false : 'City is required',
                  validate: (value) => (selectedRegionCode === '130000000' || value !== '') || 'Please select a city',
                }}
                render={({ field }) => (
                  <MUI.FormControl sx={{ width: '100%', borderRadius: '8px' }}>
                    <MUI.Select
                      id="cities-municipalities_name"
                      native
                      {...field}
                      onChange={(e) => {
                        setValue('barangay_name', ''); // Clear barangay when city changes
                        const selectedCityCode = e.target.options[e.target.selectedIndex].dataset.code;
                        setSelectedCityCode(selectedCityCode);
                        field.onChange(e);
                      }}
                    >
                      <option value="">Select City</option>
                      {cities.map((city) => (
                        <option key={city.name} value={city.name} data-code={city.code}>
                          {city.name}
                        </option>
                      ))}
                    </MUI.Select>
                  </MUI.FormControl>
                )}
              />
              {errors.cities_municipalities_name && (
                <p id="errMsg">
                  <MUI.InfoIcon className="infoErr" />
                  {errors.cities_municipalities_name?.message}
                </p>
              )}
            </MUI.Grid>
            </MUI.Grid>

            {/* Second Column */}
            <MUI.Grid item xs={6}>

            {currentStep === relevantStep && (
              <MUI.Grid id="barangayGrid">
                <MUI.InputLabel htmlFor="barangay_name" id="barangayLabel">
                  Barangay
                </MUI.InputLabel>
                <Controller
                  name="barangay_name"
                  control={control}
                  defaultValue={scholarProfiles.barangay_name || ''}
                  rules={{
                    required: selectedRegionCode === '130000000' ? false : 'Barangay is required',
                    validate: (value) => (selectedRegionCode === '130000000' || value !== '') || 'Please select a barangay',
                  }}
                  render={({ field }) => (
                    <MUI.FormControl sx={{ width: '100%', borderRadius: '8px' }}>
                      <MUI.Select
                        id="barangay_name"
                        native
                        {...field}
                      >
                        <option value="">Select Barangay</option>
                        {barangays.map((barangay) => (
                          <option key={barangay.name} value={barangay.name}>
                            {barangay.name}
                          </option>
                        ))}
                      </MUI.Select>
                    </MUI.FormControl>
                  )}
                />
                {errors.barangay_name && (
                  <p id="errMsg">
                    <MUI.InfoIcon className="infoErr" />
                    {errors.barangay_name?.message}
                  </p>
                )}
              </MUI.Grid>
            )}  

            <MUI.Grid id="streetGrid">
                <MUI.InputLabel htmlFor="street" id="streetLabel">House No. & Street</MUI.InputLabel>
                <MUI.TextField
                    type='text'
                    id='street'
                    placeholder='Street'
                    fullWidth
                    defaultValue={scholarProfiles.street || ""}
                    {...register("street", {
                        required: {
                            value: true,
                            message: 'Street is required',
                        }
                    })}
                />
                {errors.street && (
                    <p id='errMsg'>
                        <MUI.InfoIcon className='infoErr' />
                        {errors.street?.message}
                    </p>
                )}
              </MUI.Grid>

              <MUI.Grid id="zipCodeGrid">
                <MUI.InputLabel htmlFor="zip_code" id="zipCodeLabel">Zip Code</MUI.InputLabel>
                <Controller
                  name='zip_code'
                  control={control}
                  defaultValue={scholarProfiles.zip_code || ''}
                  autoComplete='off'
                  rules={{
                    required: 'Zip Code is required',
                  }}
                  render={({ field }) => (
                    <MUI.FormControl sx={{ width: '100%', borderRadius: '8px' }}>
                      <MUI.TextField
                        type='text'
                        id='zip_code'
                        placeholder='Zip Code'
                        fullWidth
                        {...field}
                      />
                    </MUI.FormControl>
                  )}
                />
                {errors.zip_code && (
                  <p id='errMsg'>
                    <MUI.InfoIcon className='infoErr' />
                    {errors.zip_code?.message}
                  </p>
                )}
              </MUI.Grid>

            </MUI.Grid>

          </MUI.Grid>

        </div>
      ),
    },
    {
      title: 'Family Information',
      label: 'Family Information',
      content: (
        <div>
          <MUI.Grid container spacing={2}>
            {/* First Column */}
            <MUI.Grid item xs={4}>

              <MUI.Grid id="fatherNameGrid">
                <MUI.InputLabel htmlFor="father_name" id="fatherNameLabel">Father's Name</MUI.InputLabel>
                <MUI.TextField
                    type='text'
                    id='father_name'
                    placeholder='Father Name'
                    fullWidth
                    defaultValue={scholarFamMembers.father_name || ""}
                    {...register("father_name", {
                        required: {
                            value: true,
                            message: 'Father Name is required',
                        }
                    })}
                />
                {errors.father_name && (
                    <p id='errMsg'>
                        <MUI.InfoIcon className='infoErr' />
                        {errors.father_name?.message}
                    </p>
                )}
              </MUI.Grid>

              <MUI.Grid id="motherNameGrid">
                <MUI.InputLabel htmlFor="mother_name" id="motherNameLabel">Mother's Name</MUI.InputLabel>
                <MUI.TextField
                    type='text'
                    id='mother_name'
                    placeholder='Mother Name'
                    autoComplete='off'
                    fullWidth
                    defaultValue={scholarFamMembers.mother_name || ""}
                    {...register("mother_name", {
                        required: {
                            value: true,
                            message: 'Mother Name is required',
                        }
                    })}
                />
                {errors.mother_name && (
                    <p id='errMsg'>
                        <MUI.InfoIcon className='infoErr' />
                        {errors.mother_name?.message}
                    </p>
                )}
              </MUI.Grid>

              <MUI.Grid id="numFamMemGrid">
                <MUI.InputLabel htmlFor="num_fam_mem" id="numFamMemLabel">Number of Family Members</MUI.InputLabel>
                <MUI.Select
                    id="num_fam_mem"
                    native
                    defaultValue={scholarProfiles.num_fam_mem || ""}
                    {...register("num_fam_mem", {
                        required: {
                            value: true,
                            message: 'Number of Family Members is required',
                        }
                    })}
                >
                    <option value="" disabled>Select No. of Fam Members</option>
                    {/* Generate options from 1 to 20 */}
                    {Array.from({ length: 20 }, (_, index) => (
                        <option key={index + 1} value={index + 1}>{index + 1}</option>
                    ))}
                </MUI.Select>

                {errors.num_fam_mem && (
                    <p id='errMsg'>
                        <MUI.InfoIcon className='infoErr' />
                        {errors.num_fam_mem?.message}
                    </p>
                )}
              </MUI.Grid>

            </MUI.Grid>

            {/* Second Column */}
            <MUI.Grid item xs={4}>

            <MUI.Grid id="incomeGrid">
              <MUI.InputLabel htmlFor="income" id="incomeLabel">
                Monthly Income 
              </MUI.InputLabel>
              <Controller
                name="income"
                control={control}
                defaultValue={scholarFamMembers.income || ''}
                rules={{
                  required: 'Income is required',
                }}
                render={({ field }) => (
                  <MUI.FormControl sx={{ width: '100%', borderRadius: '8px' }}>
                    <MUI.Select
                      id="income"
                      native
                      {...field}
                    >
                      <option value="">Select Income</option>
                      <option value="0-10,000">0 - ₱10,000</option>
                      <option value="10,001-20,000">₱10,001 - ₱20,000</option>
                      <option value="20,001-30,000">₱20,001 - ₱30,000</option>
                      <option value="30,001-40,000">₱30,001 - ₱40,000</option>
                      <option value="40,001-50,000">₱40,001 - ₱50,000</option>
                      <option value="50,001-More">₱50,001 - More</option>
                    </MUI.Select>
                  </MUI.FormControl>
                )}
              />
              {errors.income && (
                <p id="errMsg">
                  <MUI.InfoIcon className="infoErr" />
                  {errors.income?.message}
                </p>
              )}
            </MUI.Grid>

              <MUI.Grid id="occupationGrid">
              <MUI.InputLabel htmlFor="occupation" id="occupationLabel">Guardian's Occupation</MUI.InputLabel>
              <Controller
                name='occupation'
                control={control}
                defaultValue={scholarFamMembers.occupation || ''}
                autoComplete='off'
                rules={{
                  required: 'Occupation is required',
                }}
                render={({ field }) => (
                  <MUI.FormControl sx={{ width: '100%', borderRadius: '8px' }}>
                    <MUI.TextField
                      type='text'
                      id='occupation'
                      placeholder='Occupation'
                      fullWidth
                      {...field}
                    />
                  </MUI.FormControl>
                )}
              />
              {errors.occupation && (
                <p id='errMsg'>
                  <MUI.InfoIcon className='infoErr' />
                  {errors.occupation?.message}
                </p>
              )}
            </MUI.Grid>
            <MUI.Grid id="relationToScholarGrid">
              <MUI.InputLabel htmlFor="relation_to_scholar" id="relationToScholarLabel">Guardian Relation</MUI.InputLabel>
              <Controller
                name='relation_to_scholar'
                control={control}
                defaultValue={scholarFamMembers.relation_to_scholar || ""}
                rules={{
                  required: 'Relation to scholar is required',
                  validate: (value) => value !== '' || 'Please select a relation to scholar'
                }}
                render={({ field }) => (
                  <MUI.FormControl sx={{ width: '100%', borderRadius: '8px' }}>
                    <MUI.Select
                      id="relation_to_scholar"
                      native
                      {...field}                    >
                      <option value="">Select Relation</option>
                      <option value="Father">Father</option>
                      <option value="Mother">Mother</option>
                      <option value="Guardian">Guardian</option>
                    </MUI.Select>
                  </MUI.FormControl>
                )}
              />
              {errors.relation_to_scholar && (
                  <p id='errMsg'>
                      <MUI.InfoIcon className='infoErr' />
                      {errors.relation_to_scholar?.message}
                  </p>
              )}
            </MUI.Grid>
          
            
            </MUI.Grid>

            {/* Third Column */}
            <MUI.Grid item xs={4}>
              
            <MUI.Grid id="famMemberNameGrid">
                <MUI.InputLabel htmlFor="fam_mem_name" id="famMemberNameLabel">Guardian's Name</MUI.InputLabel>
                <MUI.TextField
                    type='text'
                    id='fam_mem_name'
                    placeholder='Family Member Name'
                    fullWidth
                    defaultValue={scholarFamMembers.fam_mem_name || ""}
                    {...register("fam_mem_name", {
                        required: {
                            value: true,
                            message: 'Family Member Name is required',
                        }
                    })}
                />
                {errors.fam_mem_name && (
                    <p id='errMsg'>
                        <MUI.InfoIcon className='infoErr' />
                        {errors.fam_mem_name?.message}
                    </p>
                )}
              </MUI.Grid>

            <MUI.Grid id="famMemberContactGrid">
                <MUI.InputLabel htmlFor="fam_mem_contact" id="famMemberContactLabel">Guardian's Contact Number</MUI.InputLabel>
                <MUI.TextField
                    type='text'
                    id='fam_mem_mobile_num'
                    placeholder='Guardian Contact Number'
                    fullWidth
                    defaultValue={scholarFamMembers.fam_mem_mobile_num || ""}
                    {...register("fam_mem_mobile_num", {
                        required: {
                            value: true,
                            message: 'Guardian Contact Number is required',
                        }
                    })}
                />
                {errors.fam_mem_mobile_num && (
                    <p id='errMsg'>
                        <MUI.InfoIcon className='infoErr' />
                        {errors.fam_mem_mobile_num?.message}
                    </p>
                )}
            </MUI.Grid>
                  
            </MUI.Grid>    

          </MUI.Grid>

        </div>
      ),
    },
    {
      title: 'High School Information',
      label: 'High School Information',
      content: (
        <div>
          <MUI.Grid container spacing={6}>
            {/* First Column */}
            <MUI.Grid item xs={6}>

              <MUI.Grid id="trackNameGrid">
                <MUI.InputLabel htmlFor="track_name" id="trackNameLabel">SHS Track</MUI.InputLabel>
                <Controller
                  name='track_name'
                  control={control}
                  defaultValue={highschoolAcadDetails.track_name}
                  rules={{
                    required: 'SHS Track is required',
                    validate: (value) => value !== '' || 'Please select a SHS Track'
                  }}
                  render={({ field }) => (
                    <MUI.FormControl sx={{ width: '100%', borderRadius: '8px' }}>
                      <MUI.Select
                        id="track_name"
                        native
                        {...field}
                      >
                        <option value="">Select SHS Track</option>
                        <option value="Academic">Academic</option>
                        <option value="Technical-Vocational-Livelihood">Technical-Vocational-Livelihood</option>
                        <option value="Sports">Sports</option>
                        <option value="Arts and Design">Arts and Design</option>
                      </MUI.Select>
                    </MUI.FormControl>
                  )}
                />
                {errors.track_name && (
                  <p id='errMsg'>
                    <MUI.InfoIcon className='infoErr' />
                    {errors.track_name?.message}
                  </p>
                )}
              </MUI.Grid>

              <MUI.Grid id="strandNameGrid">
                <MUI.InputLabel htmlFor="strand_name" id="strandNameLabel">SHS Strand</MUI.InputLabel>
                <Controller
                  name='strand_name'
                  control={control}
                  defaultValue={highschoolAcadDetails.strand_name}
                  rules={{
                    required: 'SHS Strand is required',
                    validate: (value) => value !== '' || 'Please select a SHS Strand'
                  }}
                  
                  render={({ field }) => (
                    <MUI.FormControl sx={{ width: '100%', borderRadius: '8px' }}>
                      <MUI.Select
                        id="strand_name"
                        native
                        {...field}
                      >
                        <option value="" >Select SHS Strand</option>
                        <option value="Accountancy, Business and Management (ABM)">Accountancy, Business and Management (ABM)</option>
                        <option value="General Academic Strand (GAS)">General Academic Strand (GAS)</option>
                        <option value="Humanities and Social Sciences (HUMSS)">Humanities and Social Sciences (HUMSS)</option>
                        <option value="Science, Technology, Engineering and Mathematics (STEM)">Science, Technology, Engineering and Mathematics (STEM)</option>
                        <option value="Information and Communications Technology">Information and Communications Technology (ICT)</option>
                        <option value="Home Economics">Home Economics (HE)</option>
                        <option value="Arts and Design">Arts and Design (AD)</option>
                        <option value="Sports">Sports (SP)</option>
                      </MUI.Select>
                    </MUI.FormControl>
                  )}
                />
                {errors.strand_name && (
                  <p id='errMsg'>
                    <MUI.InfoIcon className='infoErr' />
                    {errors.strand_name?.message}
                  </p>
                )}
              </MUI.Grid>

              <MUI.Grid id="HSGwaGrid">

                <MUI.InputLabel htmlFor="gwa_school_yr_graduated" id="HSGwaLabel">High School GWA</MUI.InputLabel>
                <MUI.TextField
                  type='text'
                  id='gwa_school_yr_graduated'
                  placeholder='High School GWA'
                  fullWidth
                  defaultValue={highschoolAcadDetails.gwa_school_yr_graduated}
                  inputProps={{
                      inputMode: 'numeric',
                      pattern: '[0-9]*', // Only allow digits
                  }}
                  {...register("gwa_school_yr_graduated", {
                      required: {
                          value: true,
                          message: 'High School GWA is required',
                      },
                      pattern: {
                          value: /^[0-9]+$/,
                          message: 'Please enter a valid number',
                      }
                  })}
              />
                {errors.hs_gwa && (
                    <p id='errMsg'>
                        <MUI.InfoIcon className='infoErr' />
                        {errors.hs_gwa?.message}
                    </p>
                )}
              </MUI.Grid>

            </MUI.Grid>
            {/* Second Column */}
            <MUI.Grid item xs={6}>

                <MUI.Grid id="HsSchoolNameGrid">
                  <MUI.InputLabel htmlFor="school_name" id="HsSchoolNameLabel">High School Name</MUI.InputLabel>
                    <MUI.TextField
                      type='text'
                      id='school_name'
                      placeholder='High School Name'
                      fullWidth
                      autoComplete='off'
                      defaultValue={highschoolAcadDetails.school_name || ""}
                      {...register("school_name", {
                          required: {
                              value: true,
                              message: 'High School Name is required',
                          }
                      })}
                  />
                  {errors.school_name && (
                      <p id='errMsg'>
                          <MUI.InfoIcon className='infoErr' />
                          {errors.school_name?.message}
                      </p>
                  )}
                </MUI.Grid>

                <MUI.Grid id="HsSchoolAddressGrid">

                  <MUI.InputLabel htmlFor="school_address" id="HsSchoolAddressLabel">High School Address</MUI.InputLabel>
                  <MUI.TextField
                      type='text'
                      id='school_address'
                      placeholder='High School Address'
                      fullWidth
                      defaultValue={highschoolAcadDetails.school_address}
                      {...register("school_address", {
                          required: {
                              value: true,
                              message: 'High School Address is required',
                          }
                      })}
                  />
                  {errors.school_address && (
                      <p id='errMsg'>
                          <MUI.InfoIcon className='infoErr' />
                          {errors.school_address?.message}
                      </p>
                  )}
                </MUI.Grid>

                <MUI.Grid id="schoolYrGraduatedHsGrid">
                  <MUI.InputLabel htmlFor="school_yr_graduated_hs" id="schoolYrGraduatedHsLabel">High School Year Graduated</MUI.InputLabel>
                  <MUI.TextField
                      type='text'
                      id='school_yr_graduated_hs'
                      placeholder='High School Year Graduated'
                      fullWidth
                      defaultValue={highschoolAcadDetails.school_yr_graduated_hs}
                      {...register("school_yr_graduated_hs", {
                          required: {
                              value: true,
                              message: 'High School Year Graduated is required',
                          }
                      })}
                  />
                  {errors.school_yr_graduated_hs && (
                      <p id='errMsg'>
                          <MUI.InfoIcon className='infoErr' />
                          {errors.school_yr_graduated_hs?.message}
                      </p>
                  )}
                </MUI.Grid>

            </MUI.Grid>

          </MUI.Grid>

        </div>
      ),
    },
    {
      title: 'Undergraduate Information',
      label: 'Undergraduate Information',
      content: (
        <div>
          <MUI.Grid container spacing={6}>
            {/* First Column */}
            <MUI.Grid item xs={4}>

            <MUI.Grid id="undergradSyGrid">
  <MUI.InputLabel htmlFor="undergrad_sy" id="undergradSyLabel">School Year</MUI.InputLabel>
  <Controller
    name="undergrad_sy"
    control={control}
    defaultValue=""
    rules={{
      validate: {
        checkSchoolYear: () => {
          const started = watch("school_yr_started");
          const graduated = watch("school_yr_graduated");
          const currentSchoolYear = watch("undergrad_sy");
          
          if (!started || !graduated) {
            return "Please input School Year Started and School Year Graduated first";
          } else if (!currentSchoolYear) {
            return "School Year is required";
          }
    
          return true;
        },
      },
    }}
    render={({ field }) => (
      <MUI.FormControl sx={{ width: '100%', borderRadius: '8px' }}>
        <MUI.Select
          id="undergrad_sy"
          native
          {...field}
          value={field.value || ""}
          onChange={field.onChange}
          disabled={!watch("school_yr_started") || !watch("school_yr_graduated")} // Disable if either field is empty
        >
          <option value="" disabled>Select Current School Year</option>
          {/* Generate options based on the School Year Started and Graduated */}
          {Array.from(
            { length: parseInt(watch("school_yr_graduated") || 0) - parseInt(watch("school_yr_started") || 0) + 1 },
            (_, i) => {
              const startYear = parseInt(watch("school_yr_started") || 0) + i;
              const endYear = startYear + 1;
              return (
                <option key={`${startYear}-${endYear}`} value={`${startYear}-${endYear}`}>
                  {`${startYear}-${endYear}`}
                </option>
              );
            }
          )}
        </MUI.Select>
      </MUI.FormControl>
    )}
  />
  {errors.undergrad_sy && (
    <p id='errMsg'>
      <MUI.InfoIcon className='infoErr' />
      {errors.undergrad_sy?.message}
    </p>
  )}
</MUI.Grid>

            
            </MUI.Grid>

            <MUI.Grid item xs={4}>

              <MUI.Grid id="currentYrLevelGrid">
                <MUI.InputLabel htmlFor="current_yr_level" id="currentYrLevelLabel">Current Year Level</MUI.InputLabel>
                <Controller
                  name='current_yr_level'
                  control={control}
                  defaultValue=""
                  rules={{
                    required: 'Current Year Level is required',
                    validate: (value) => value !== '' || 'Please select a Current Year Level'
                  }}
                  render={({ field }) => (
                    <MUI.FormControl sx={{ width: '100%', borderRadius: '8px' }}>
                      <MUI.Select
                        id="current_yr_level"
                        native
                        {...field}
                      >
                        <option value="" disabled>Select Current Year Level</option>
                        <option value="1st Year">1st Year</option>
                        <option value="2nd Year">2nd Year</option>
                        <option value="3rd Year">3rd Year</option>
                        <option value="4th Year">4th Year</option>
                        <option value="5th Year">5th Year</option>
                      </MUI.Select>
                    </MUI.FormControl>
                  )}
                />
                {errors.current_yr_level && (
                  <p id='errMsg'>
                    <MUI.InfoIcon className='infoErr' />
                    {errors.current_yr_level?.message}
                  </p>
                )}
              </MUI.Grid>
            </MUI.Grid>

            <MUI.Grid item xs={4}>
              <MUI.Grid id="undergradGwaGrid">
                <MUI.InputLabel htmlFor="gwa_current_school_yr" id="undergradGwaLabel">GWA Current School year</MUI.InputLabel>
                <MUI.TextField
                    type='text'
                    id='gwa_current_school_yr'
                    placeholder='GWA Current School year'
                    fullWidth
                    defaultValue=""
                    {...register("gwa_current_school_yr", {
                        required: {
                            value: true,
                            message: 'GWA Current School year is required',
                        }
                    })}
                />
                {errors.gwa_current_school_yr && (
                    <p id='errMsg'>
                        <MUI.InfoIcon className='infoErr' />
                        {errors.gwa_current_school_yr?.message}
                    </p>
                )}
              </MUI.Grid> 

            </MUI.Grid>

          </MUI.Grid>

        </div>
      ),
    }
  ];

  return (
    <Layout>
      <MUI.ThemeProvider theme={theme}>
    <MUI.Grid item xs={12} md={8} lg={9}>

    {goBack.role_id === 1 || goBack.role_id === 2 ? (
       <MUI.IconButton style={{ marginRight: '8px', color: 'black' }} onClick={() => navigate("/scholar")}>
       <MUI.ArrowBackIcon /> <p>Back to Scholar List</p>
     </MUI.IconButton>
    ) : null}




        <MUI.Box mb={4} sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
            <MUI.Typography variant='h1' sx={{color: 'black', fontWeight: 'bold'}}>Profile</MUI.Typography>
        </MUI.Box>

        <MUI.Box mb={4}>
          <MUI.Typography variant='h5'>Manage your personal information, and control which information other people see</MUI.Typography>
        </MUI.Box>

        <MUI.Box>
          <MUI.Link>Learn more about our data privacy policy.</MUI.Link>
        </MUI.Box>

      
        <ProfileHeader handleOpenProfile={handleOpenProfile} updatePassword={updatePassword} updateScholarProfile={updateScholarProfile}/>
      
        <ScholarProfileBox/>
    
    </MUI.Grid>

  
      <MUI.Dialog open={scholarProfile} onClose={handleCloseScholarProfile} fullWidth maxWidth="lg" component='form' method='post' noValidate onSubmit={handleSubmit(onSubmitScholarProfileForm)}>         
      <MUI.DialogTitle id="dialogTitle">{steps[activeStep].title}</MUI.DialogTitle>
      <MUI.Typography variant='body2' id="dialogLabel">Required fields are marked with an asterisk *</MUI.Typography>
      <MUI.Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((step) => (
          <MUI.Step key={step.title}>
            <MUI.StepLabel>{step.label}</MUI.StepLabel>
          </MUI.Step>
        ))}
      </MUI.Stepper>
        <MUI.Grid sx={{ marginLeft: 3 }}>
          <Suspense fallback="Scholarlink Loading...">
              <LazyErrMsg />
          </Suspense>
        </MUI.Grid>

        <MUI.DialogContent>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        {steps[activeStep].content}
           
        </div>

          <MUI.DialogActions sx={{mt: 5}}>
          <MUI.Button onClick={activeStep === 0 ? handleCloseScholarProfile : handleBack} color="primary">
            {activeStep === 0 ? 'Cancel' : 'Back'}
          </MUI.Button>

            <MUI.Button
              color="primary"
              variant="contained"
              onClick={handleNext}
              style={{ display: activeStep === steps.length - 1 ? 'none' : 'block' }}
            >
              Next
            </MUI.Button>

            <MUI.Button
              type="submit"
              color="primary"
              variant="contained"
              style={{ display: activeStep === steps.length - 1 ? 'block' : 'none' }}
            >
              Submit
            </MUI.Button>
          </MUI.DialogActions>


        </MUI.DialogContent>

      </MUI.Dialog>          

      {/* Update Password Dialog */}
      {changePassword && (
        <MUI.Dialog open={changePassword} onClose={handleCloseChangePassword} fullWidth maxWidth="xs" component='form' method='post' noValidate onSubmit={handleSubmit(onSubmitPasswordForm)}>
        <MUI.DialogTitle id="dialogTitle">Change Password</MUI.DialogTitle>
          <MUI.DialogContent>

            <MUI.Grid id="userNameGrid">
              <MUI.InputLabel htmlFor="password" id="userNameLabel">New Password</MUI.InputLabel>
                <MUI.TextField 
                  type={showPassword ? 'text' : 'password'}
                  id='password'
                  placeholder='Password' 
                  fullWidth 
                  InputProps={{
                    endAdornment: (
                      <MUI.InputAdornment position="end">
                        <MUI.IconButton onClick={handleTogglePassword} edge="end">
                          {showPassword ? 
                          <MUI.VisibilityIcon sx={{ fontSize: '1.2rem' }} /> : <MUI.VisibilityOffIcon sx={{ fontSize: '1.2rem' }}  />
                          }
                        </MUI.IconButton>
                      </MUI.InputAdornment>
                    ),
                  }} 
                  {...register("password", {
                    required: {
                    value: true,
                    message: 'Password is required',
                  },
                    minLength: {
                    value: 8,
                    message: 'Password should be at least 8 characters long',
                  }
                  })}
                />
              {errors.password && (
                <p id='errMsg'> 
                <MUI.InfoIcon className='infoErr'/> 
                {errors.password?.message}  
                </p>
              )}
            </MUI.Grid>

            <MUI.Grid id="userNameGrid">
            <MUI.InputLabel htmlFor="confirmPassword" id="confirmPasswordLabel">Confirm Password</MUI.InputLabel>
            <MUI.TextField
            type={showPassword ? 'text' : 'password'}
            id="confirmPassword"
            placeholder='Confirm password'
            fullWidth
            InputProps={{
              endAdornment: (
                <MUI.InputAdornment position="end">
                  <MUI.IconButton onClick={handleTogglePassword} edge="end">
                    {showPassword ? 
                    <MUI.VisibilityIcon sx={{ fontSize: '1.2rem' }} /> : <MUI.VisibilityOffIcon sx={{ fontSize: '1.2rem' }}  />
                    }
                  </MUI.IconButton>
                </MUI.InputAdornment>
              ),
            }} 
            {...register("confirmPassword", {
              required: {
              value: true,
              message: 'Password is required',
            },
              minLength: {
              value: 8,
              message: 'Password should be at least 8 characters long',
            },
              validate: (value) => value === password || 'The passwords do not match',
            })}
            />
            {errors.confirmPassword && (
              <p id='errMsg'> 
              <MUI.InfoIcon className='infoErr'/> 
              {errors.confirmPassword?.message}  
              </p>
            )}
          </MUI.Grid>
          </MUI.DialogContent>

          <MUI.DialogActions>
            {/* Add action buttons, e.g., Save Changes and Cancel */}
            <MUI.Button onClick={handleCloseChangePassword} color="primary" id='Button'>
              Cancel
            </MUI.Button>
            <MUI.Button
              color="primary" 
              type='submit' 
              variant='contained'
              id='addUserBtn'
            >
              {editPassword ? 'Save Changes' : ''}
            </MUI.Button>
          </MUI.DialogActions>
          </MUI.Dialog>
    )}


<MUI.Snackbar
            open={alertOpen}
            autoHideDuration={5000}
            onClose={() => setAlertOpen(false)}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            <MUI.MuiAlert onClose={() => setAlertOpen(false)} variant="filled" severity="success" sx={{ width: '100%' }}>
              {alertMessage}
            </MUI.MuiAlert>
          </MUI.Snackbar>

          <MUI.Snackbar
            open={errorOpen}
            autoHideDuration={5000}
            onClose={() => setErrorOpen(false)}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            <MUI.MuiAlert onClose={() => setErrorOpen(false)} variant='filled' severity='error' sx={{width: '100%'}}>
              {errorMessage}
            </MUI.MuiAlert>
          </MUI.Snackbar>

    <DevTool control={control} />
    </MUI.ThemeProvider>
  </Layout>
  )
}
