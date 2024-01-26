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
  handleCloseChangePassword, editPassword, setEditPassword,setSelectedPassword} = useProfileStore();

  const {
    regions, setRegions, selectedRegion, setSelectedRegion,setRegionsName, setSelectedRegionCode, selectedRegionCode,
    provinces, setProvinces, selectedProvince, setSelectedProvince, setProvincesName, selectedProvinceCode, setSelectedProvinceCode,
    cities, setCities, selectedCity, setSelectedCity, setCitiesName, setBarangaysName, selectedCityCode, setSelectedCityCode,
    barangays, setBarangays, selectedBarangay, setSelectedBarangay
  } = useAddressStore();

  const {getAuthToken, alertOpen, alertMessage, setAlertOpen, setAlertMessage, errorOpen, setErrorOpen, setErrorMessage, errorMessage} = useAuthStore();

  const {selectedUser, setSelectedUser} = useUserStore();

  const {editScholarProfile, setEditScholarProfile, selectedScholarProfile, setSelectedScholarProfile, handleCloseScholarProfile, handleOpenScholarProfile, scholarProfiles, scholarProfile, setScholarProfiles} = useScholarProfileStore();

  const { showPassword, handleTogglePassword, setLoading, setLoadingMessage } = useLoginStore();

  const navigate = useNavigate();
  
  const [activeStep, setActiveStep] = useState(0);

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
    home_visit_sched: '',
    fb_account: '',
    region: '',
    province: '',
    city: '',
    barangay: '',
    street: '',
    zip_code: '',
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
        ...data,
        birthdate: formatDate(data.birthdate),
        home_visit_sched: formatDate(data.home_visit_sched),
    };

    try {
        if (editScholarProfile) {
            setLoading(true);
            setLoadingMessage('Updating profile...');
            const response = await axios.put(`/api/scholarsProfile/${selectedScholarProfile.id}`, {...data}, config);
            setEditScholarProfile(false);
            handleCloseScholarProfile();
            setAlertOpen(true);
            setAlertMessage('Profile Updated');
            setLoading(false);
        }   

        const response = await axios.get(`/api/scholarsProfile`, {
            headers: {
                'Authorization': `Bearer ${authToken}`
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
    const fetchScholarProfile = async () => {
      try {
        const authToken = useAuthStore.getState().getAuthToken();
        
        const response = await axios.get(`/api/scholarsProfile`, {
          headers: {
            'Authorization': 
            `Bearer ${authToken}`
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
    fetchScholarProfile();
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

    try {
        const authToken = useAuthStore.getState().getAuthToken();
        const scholarId = selectedUser.id;

        const response = await axios.get(`/api/scholarsProfile`, {
          headers: {
              'Authorization': `Bearer ${authToken}`
          },
          validateStatus: function (status) {
            return status === 404  || (status >= 200 && status < 300); 
          }
        });

        const profileData = response.data.data;
        console.log(profileData);

        if (response.status === 404 || !profileData || profileData.length === 0  ) {
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
            home_visit_sched: '',
            fb_account: ''
          });

          console.log(response)
          handleOpenScholarProfile();
          form.reset();
          
        }else {

          const profileWithoutPassword = {
            ...response.data.data,
            password: undefined
          };

          setSelectedScholarProfile(profileWithoutPassword);
          handleOpenScholarProfile();
          form.reset(profileWithoutPassword);
        }
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
              <Controller
                  name='gender'
                  defaultValue=""
                  control={control}
                  rules={{
                    required: 'Gender is required',
                    validate: (value) => value !== '' || 'Please select a gender'
                  }}
                  render={({ field }) => (
                    <MUI.FormControl sx={{ width: '100%', borderRadius: '8px' }}>
                      <MUI.Select
                        id="gender"
                        native
                        {...field}
                        value={field.value || ""}  // Use formData.religion instead of field.value
                        onChange={field.onChange}
                      >
                        <option value="" disabled>Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </MUI.Select>
                    </MUI.FormControl>
                  )}
                />
              {errors.gender && (
                  <p id='errMsg'>
                      <MUI.InfoIcon className='infoErr' />
                      {errors.gender?.message}
                  </p>
              )}
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
                defaultValue=''
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
                defaultValue=''
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
                  defaultValue=''
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
                              {/* Add more options if needed */}
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
              <MUI.InputLabel htmlFor="school_yr_started" id="schoolYrStartedLabel">School Year Started</MUI.InputLabel>
              <MUI.TextField
                  type='text'
                  id='school_yr_started'
                  placeholder='School Year Started'
                  fullWidth
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
              <MUI.InputLabel htmlFor="school_yr_graduated" id="schoolYrGraduatedLabel">School Year Graduated</MUI.InputLabel>
              <MUI.TextField
                  type='text'
                  id='school_yr_graduated'
                  placeholder='School Year Graduated'
                  fullWidth
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

            <MUI.Grid id="schoolIdGrid">
              <MUI.InputLabel htmlFor="school_id" id="schoolIdLabel">
                  School
              </MUI.InputLabel>
                <Controller
                    name="school_id"
                    control={control}
                    defaultValue=""
                    rules={{
                        required: 'School ID is required',
                    }}
                    render={({ field }) => (
                        <MUI.FormControl sx={{ borderRadius: '8px', width: '200px' }}>
                            <MUI.Select
                                id="school_id"
                                native
                                {...field}
                                value={field.value || ""} 
                                MenuProps={{
                                    PaperProps: {
                                        style: {
                                            width: '200px',
                                        },
                                    },
                                }}
                            >
                              <option value="" disabled>Select School</option>
                              <option value="1">Ateneo De Manila University</option>
                              <option value="2">Assumption College – Makati City | Assumption college</option>
                              <option value="3">Don Bosco Technical College – Mandaluyong | Don Bosco Technical College</option>
                              <option value="4">Don Bosco Training Center Nueva Ecija</option>
                              <option value="5">Don Bosco Technical College – Technical Vocational Educational Technology</option>
                              <option value="6">Don Bosco Technical College – Mandaluyong – BATCH 18</option>
                              <option value="7">Don Bosco Technical College – Technical Vocational Educational Technology – BATCH 19</option>
                              <option value="8">Don Bosco Training Center Mandaluyong Technical Vocational Educational Technology</option>
                              <option value="9">Don Bosco Training Center Nueva Ecija c/o Fr. Clarence (Sr. Elizabeth Tolentino, FDCC)</option>
                              <option value="10">University of St. La Salle – Bacolod</option>
                              <option value="11">La Consolacion College – Bacolod</option>
                              <option value="12">La Consolacion College – Manila</option>
                              <option value="13">La Consolacion College – Binan</option>
                              <option value="14">University of Negros Occidental – Recoletos | University of Negros Occidental</option>
                              <option value="15">University of Perpetual Help System Dalta – Laguna</option>
                              <option value="16">Concordia College – Manila</option>
                              <option value="17">Canossa College of San Pablo City</option>
                              <option value="18">Iloilo Science and Technology University</option>
                              <option value="19">West Visayas State University (Iloilo City) | West Visayas State University</option>
                              <option value="20">ISAT-U, Colegio de Sagrado, U.I & Other State Colleges</option>
                              <option value="21">University of Santo Tomas</option>
                              <option value="22">Polytechnic University of the Philippines</option>
                              <option value="23">Centro Escolar University</option>
                              <option value="24">Makati Science Technological Institute of the Philippines</option>
                              <option value="25">Saint Pedro Poveda College</option>
                              <option value="26">Visayan Center for Hotel and Restaurant Services</option>
                            </MUI.Select>
                        </MUI.FormControl>
                    )}
                />
                {errors.school_id && (
                    <p id='errMsg'>
                        <MUI.InfoIcon className='infoErr' />
                        {errors.school_id?.message}
                    </p>
                )}
            </MUI.Grid>
          
          </MUI.Grid>

          {/* Third Column */}
          <MUI.Grid item xs={4}>

            <MUI.Grid id="programGrid">
                <MUI.InputLabel htmlFor="program" id="programLabel">Program</MUI.InputLabel>
                <MUI.TextField
                    type='text'
                    id='program'
                    placeholder='Program'
                    fullWidth
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

            <MUI.Grid id="homeVisitSchedGrid">
            <MUI.InputLabel htmlFor="home_visit_sched" id="homeVisitSchedLabel">Home Visit Schedule</MUI.InputLabel>
            <MUI.TextField
                type='date'  // Change the type to 'date'
                id='home_visit_sched'
                placeholder='Home Visit Schedule'
                fullWidth
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
          <MUI.Grid container spacing={6}>
            {/* First Column */}

            <MUI.Grid item xs={4}>

            <MUI.Grid id="regionGrid">
              <MUI.InputLabel htmlFor="region_name" id="regionLabel">
                Region
              </MUI.InputLabel>
              <Controller
                name="region_name"
                control={control}
                defaultValue=""
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
            </MUI.Grid>;

              <MUI.Grid id="provinceGrid">
                <MUI.InputLabel htmlFor="province_name" id="provinceLabel">
                  Province
                </MUI.InputLabel>
                <Controller
                  name="province_name"
                  control={control}
                  defaultValue=""
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
              </MUI.Grid>;
            </MUI.Grid>

            {/* Second Column */}
            <MUI.Grid item xs={4}>

            <MUI.Grid id="cityGrid">
              <MUI.InputLabel htmlFor="cities-municipalities_name" id="cityLabel">
                City
              </MUI.InputLabel>
              <Controller
                name="cities_municipalities_name"
                control={control}
                defaultValue=""
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
            </MUI.Grid>;

            <MUI.Grid id="barangayGrid">
              <MUI.InputLabel htmlFor="barangay_name" id="barangayLabel">
                Barangay
              </MUI.InputLabel>
              <Controller
                name="barangay_name"
                control={control}
                defaultValue=""
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
                      onChange={(e) => {
                        setSelectedBarangay(e.target.value);
                        field.onChange(e);
                      }}
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
            </MUI.Grid>;
            </MUI.Grid>

            {/* Third Column */}
            <MUI.Grid item xs={4}>

              <MUI.Grid id="streetGrid">
                <MUI.InputLabel htmlFor="street" id="streetLabel">House No. & Street</MUI.InputLabel>
                <MUI.TextField
                    type='text'
                    id='street'
                    placeholder='Street'
                    fullWidth
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
                  defaultValue=''
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
          <MUI.Grid container spacing={6}>
            {/* First Column */}
            <MUI.Grid item xs={4}>

              <MUI.Grid id="numFamMemGrid">
                <MUI.InputLabel htmlFor="num_fam_mem" id="numFamMemLabel">Number of Family Members</MUI.InputLabel>
                <MUI.TextField
                    type='text'
                    id='num_fam_mem'
                    placeholder='Number of Family Members'
                    fullWidth
                    {...register("num_fam_mem", {
                        required: {
                            value: true,
                            message: 'Number of Family Members is required',
                        }
                    })}
                />
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

            </MUI.Grid>

            {/* Third Column */}
            <MUI.Grid item xs={4}>

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
            <MUI.Grid item xs={4}>

              <MUI.Grid id="numFamMemGrid">
                <MUI.InputLabel htmlFor="num_fam_mem" id="numFamMemLabel">Number of Family Members</MUI.InputLabel>
                <MUI.TextField
                    type='text'
                    id='num_fam_mem'
                    placeholder='Number of Family Members'
                    fullWidth
                    {...register("num_fam_mem", {
                        required: {
                            value: true,
                            message: 'Number of Family Members is required',
                        }
                    })}
                />
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

            </MUI.Grid>

            {/* Third Column */}
            <MUI.Grid item xs={4}>

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

              <MUI.Grid id="numFamMemGrid">
                <MUI.InputLabel htmlFor="num_fam_mem" id="numFamMemLabel">Number of Family Members</MUI.InputLabel>
                <MUI.TextField
                    type='text'
                    id='num_fam_mem'
                    placeholder='Number of Family Members'
                    fullWidth
                    {...register("num_fam_mem", {
                        required: {
                            value: true,
                            message: 'Number of Family Members is required',
                        }
                    })}
                />
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

            </MUI.Grid>

            {/* Third Column */}
            <MUI.Grid item xs={4}>

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

  
      <MUI.Dialog open={scholarProfile} onClose={handleCloseScholarProfile} fullWidth maxWidth="md" component='form' method='post' noValidate onSubmit={handleSubmit(onSubmitScholarProfileForm)}>         
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
      <MUI.Button disabled={activeStep === 0} onClick={handleBack} color="primary">
      Back
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

    <DevTool control={control} />
    </MUI.ThemeProvider>
  </Layout>
  )
}
