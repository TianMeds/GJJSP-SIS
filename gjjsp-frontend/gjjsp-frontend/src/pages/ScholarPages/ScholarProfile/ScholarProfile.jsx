import React, {lazy, Suspense} from 'react';
import axios from '../../../api/axios';

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

//React Hook Form
import {useForm, Controller } from 'react-hook-form';
import { DevTool } from "@hookform/devtools";

//Custom Components
import theme from '../../../context/theme';


export default function ScholarProfile() {
    
  //React Hook form 
  const form  = useForm();
  const { register, control, handleSubmit, formState, reset, watch, validate} = form
  const { errors } = formState;
  const password = watch("password");
  const confirmPassword = watch("confirmPassword");

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

  const {getAuthToken, alertOpen, alertMessage, setAlertOpen, setAlertMessage, errorOpen, setErrorOpen, setErrorMessage, errorMessage} = useAuthStore();

  const {selectedUser, setSelectedUser} = useUserStore();

  const {editScholarProfile, setEditScholarProfile, selectedScholarProfile, setSelectedScholarProfile, handleCloseScholarProfile, handleOpenScholarProfile, scholarProfiles, scholarProfile, setScholarProfiles} = useScholarProfileStore();

  const { showPassword, handleTogglePassword, setLoading, setLoadingMessage } = useLoginStore();
  

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
    home_address_id: '',
    fb_account: ''
  }
  //Submit Form
  const onSubmitProfileForm = async (data, event) => {
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
      setLoadingMessage('Updating profile...');
  
      if (editProfile) {
        // Assuming /api/profile returns the authenticated user's profile directly
        const response = await axios.put(`/api/profile/${selectedUser.id}`, { ...data }, config);
        setEditProfile(false);
        handleCloseProfile();
        handleCloseChangePassword();
        setProfiles([response.data.data]); // Update with the actual response structure
        setSelectedUser(response.data.data);
        setAlertOpen(true);
        setAlertMessage('Profile Updated');
        setLoading(false);
      } 
      if(response.status === 200){
        setProfiles(response.data.data); // Update with the actual response structure
        setSelectedUser(response.data.data);
        setAlertOpen(true);
        setAlertMessage('Profile Updated');
        
        form.reset(FormValues);
      }
    } catch (error) {
      if (error.response?.status === 401) {
        setErrorOpen(true);
        setErrorMessage("You've been logout");
        navigate('/login');
      } 
    }
  }
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

    try {
      if(editScholarProfile){
        setLoading(true);
        setLoadingMessage('Updating profile...');
        const response = await axios.put(`/api/scholarsProfile/${selectedScholarProfile.id}`, {...data}, config);
        setEditScholarProfile(false);
        handleCloseScholarProfile();
        setAlertOpen(true);
        setAlertMessage('Profile Updated');
        setLoading(false);
      }
      else{
        setAlertOpen(true);
        setAlertMessage('Adding profile...');
        setLoading(true);
        setLoadingMessage('Adding profile...');
        const response = await axios.post('/api/scholarsProfile', {
        gender: data.gender,
        religion: data.religion,
        birthdate: data.birthdate,
        birthplace: data.birthplace,
        civil_status: data.civil_status,
        num_fam_mem: data.num_fam_mem,
        school_yr_started: data.school_yr_started,
        school_yr_graduated: data.school_yr_graduated,
        school_id: data.school_id,
        program: data.program,
        home_visit_sched: data.home_visit_sched,
        home_address_id: data.home_address_id,
        fb_account: data.fb_account
      }, config);

      setAlertOpen(true);
      setAlertMessage('Profile Added');
      setLoading(false);
      handleCloseScholarProfile(); 
      }

      const response = await axios.get('/api/scholarsProfile', {
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      });
      if (response.status === 200) {
        setScholarProfiles(response.data.data)
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
  }


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

  //Get Value

  //Update Scholar Profile
  const updateProfile = async () => {
    setLoading(true)
    setLoadingMessage("Please wait opening edit profile")
    setEditProfile(true);
    try {
      const authToken = useAuthStore.getState().getAuthToken();
      const response = await axios.get(`/api/profile`, {
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      });
  
      const profileWithoutPassword = {
        ...response.data.data,
        password: undefined
      };
  
      setSelectedProfile(profileWithoutPassword);
      handleOpenProfile();
      form.reset(profileWithoutPassword);
      setLoading(false)
    } catch (error) {
      // Handle error, such as displaying an error message
      console.error('Error fetching user data:', error);
    }
  };

  const updateScholarProfile = async () => {
    setLoading(true)
    setLoadingMessage("Please wait opening edit profile")
    setEditScholarProfile(true);
    try {
      const authToken = useAuthStore.getState().getAuthToken();
      const response = await axios.get(`/api/scholarsProfile`, {
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      });
  
      const profileWithoutPassword = {
        ...response.data.data,
        password: undefined
      };
  
      setSelectedScholarProfile(profileWithoutPassword);
      handleOpenScholarProfile();
      form.reset(profileWithoutPassword);
      setLoading(false)
    } catch (error) {
      // Handle error, such as displaying an error message
      console.error('Error fetching user data:', error);
    }
  }

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

  return (
    <Layout>
      <MUI.ThemeProvider theme={theme}>
    <MUI.Grid item xs={12} md={8} lg={9}>

        <MUI.Box mb={4}>
            <MUI.Typography variant='h1' sx={{color: 'black', fontWeight: 'bold'}}>Profile</MUI.Typography>
        </MUI.Box>

        <MUI.Box mb={4}>
          <MUI.Typography variant='h5'>Manage your personal information, and control which information other people see</MUI.Typography>
        </MUI.Box>

        <MUI.Box>
          <MUI.Link>Learn more about our data privacy policy.</MUI.Link>
        </MUI.Box>

      
        <ProfileHeader handleOpenProfile={handleOpenProfile} updateProfile={updateProfile} updatePassword={updatePassword} updateScholarProfile={updateScholarProfile}/>
      
        <ScholarProfileBox/>

    </MUI.Grid>

      {/* Update Profile Dialog */}
      {profile && (
        <MUI.Dialog open={profile} onClose={handleCloseProfile} fullWidth maxWidth="xs" component='form' method='post' noValidate onSubmit={handleSubmit(onSubmitProfileForm)}>
        {/* Content of the Dialog */}
          <MUI.DialogTitle id="dialogTitle">Edit Profile</MUI.DialogTitle>
            <MUI.Typography variant='body2' id="dialogLabel">Required fields are marked with an asterisk *</MUI.Typography>
              <MUI.Grid sx={{marginLeft: 3}}>
                <Suspense fallback="Scholarlink Loading...">
                  <LazyErrMsg/>
                </Suspense>
              </MUI.Grid>

              <MUI.DialogContent>
                {/* Form Fields of New User*/}
                <MUI.Grid id="userNameGrid">
                  <MUI.InputLabel htmlFor="first_name" id="userNameLabel">First Name</MUI.InputLabel>
                  <MUI.TextField 
                    type='text'
                    id='first_name'
                    placeholder='Name' 
                    fullWidth 

                    {...register("first_name", {
                      required: {
                      value: true,
                      message: 'First name is required',
                      },
                      pattern: {
                      value: USER_REGEX,
                      message: 'Names should only contain letters, periods, and hypens, with no leading or hanging spaces.',
                      }
                    })}
                  
                  />
                    {errors.first_name && (
                      <p id='errMsg'> 
                      <MUI.InfoIcon className='infoErr'/> 
                      {errors.first_name?.message}  
                      </p>
                    )}
                  </MUI.Grid>

                  <MUI.Grid id="userNameGrid">
                    <MUI.InputLabel htmlFor="middle_name" id="middleNameLabel">Middle Name</MUI.InputLabel>
                      <MUI.TextField 
                      type='text'
                      id='middle_name'
                      placeholder='Name' 
                      fullWidth 

                      {...register("middle_name", {
                        pattern: {
                        value: USER_REGEX,
                        message: 'Names should only contain letters, periods, and hypens, with no leading or hanging spaces.',
                      }
                      })}
                    />
                    {errors.middle_name && (
                      <p id='errMsg'> 
                      <MUI.InfoIcon className='infoErr'/> 
                      {errors.middle_name?.message}  
                      </p>
                    )}
                  </MUI.Grid>

                  <MUI.Grid id="userNameGrid">
                    <MUI.InputLabel htmlFor="last_name" id="userNameLabel">Last Name</MUI.InputLabel>
                      <MUI.TextField 
                        type='text'
                        id='last_name'
                        placeholder='Name' 
                        fullWidth 

                        {...register("last_name", {
                          required: {
                          value: true,
                          message: 'Last name is required',
                        },
                          pattern: {
                          value: USER_REGEX,
                          message: 'Names should only contain letters, periods, and hypens, with no leading or hanging spaces.',
                        }
                        })}
                      />
                    {errors.last_name && (
                      <p id='errMsg'> 
                      <MUI.InfoIcon className='infoErr'/> 
                      {errors.last_name?.message}  
                      </p>
                    )}
                  </MUI.Grid>

                  <MUI.Grid id="userMobileNumGrid">
                    <MUI.InputLabel htmlFor="user_mobile_num" id="userMobileNumLabel">Mobile Number</MUI.InputLabel>
                      <MUI.TextField 
                        type='text'
                        id='user_mobile_num'
                        placeholder='63XXX-XXXX-XXX' 
                        fullWidth 
                          {...register("user_mobile_num", {
                            required: {
                              value: true,
                              message: 'Mobile Number is required',
                            },
                            pattern: {
                              value: CONTACT_REGEX,
                              message: 'Enter your mobile number in 63 format with no spaces and symbol',
                            }
                          })}
                      />
                      {errors.user_mobile_num && (
                      <p id='errMsg'> <MUI.InfoIcon className='infoErr'/> {errors.user_mobile_num?.message}</p>
                      )}
                  </MUI.Grid>

                  <MUI.Grid id="emailAddressGrid">
                    <MUI.InputLabel htmlFor="email_address" id="emailAddressLabel">Email</MUI.InputLabel>
                      <MUI.TextField 
                        type='email'
                        id='email_address'
                        placeholder='Email Address' 
                        fullWidth 
                          {...register("email_address", {
                              required: {
                              value: true,
                              message: 'Email Address is required',
                            },
                              pattern: {
                              value: EMAIL_REGEX,
                              message: 'Please enter a valid email address',
                            }
                          })}
                      />
                        {errors.email_address && (
                        <p id='errMsg'> <MUI.InfoIcon className='infoErr'/> {errors.email_address?.message}</p>
                        )}
                  </MUI.Grid>

              </MUI.DialogContent>

              <MUI.DialogActions>
                {/* Add action buttons, e.g., Save Changes and Cancel */}
                <MUI.Button onClick={handleCloseProfile} color="primary" id='Button'>
                  Cancel
                </MUI.Button>
                <MUI.Button
                  color="primary" 
                  type='submit' 
                  variant='contained'
                  id='addUserBtn'
                >
                  {editProfile ? 'Save Changes' : ''}
                </MUI.Button>
              </MUI.DialogActions>
        </MUI.Dialog>
      )}

      {/* Update Scholar Profile Dialog */}
      <MUI.Dialog open={scholarProfile} onClose={handleCloseScholarProfile} fullWidth maxWidth="md" component='form' method='post' noValidate onSubmit={handleSubmit(onSubmitScholarProfileForm)}>         
      <MUI.DialogTitle id="dialogTitle">Edit Profile</MUI.DialogTitle>
      <MUI.Typography variant='body2' id="dialogLabel">Required fields are marked with an asterisk *</MUI.Typography>
        <MUI.Grid sx={{ marginLeft: 3 }}>
          <Suspense fallback="Scholarlink Loading...">
              <LazyErrMsg />
          </Suspense>
        </MUI.Grid>

        <MUI.DialogContent>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>
          {/* Form Fields of New User*/}
          <MUI.Grid id="genderGrid">
            <MUI.InputLabel htmlFor="gender" id="genderLabel">Gender</MUI.InputLabel>
              <Controller
                name='gender'
                control={control}
                defaultValue=''
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
          <MUI.TextField
              type='text'
              id='birthplace'
              placeholder='Birthplace'
              fullWidth
              {...register("birthplace", {
                  required: {
                      value: true,
                      message: 'Birthplace is required',
                  }
              })}
          />
          {errors.birthplace && (
              <p id='errMsg'>
                  <MUI.InfoIcon className='infoErr' />
                  {errors.birthplace?.message}
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
        </div>

        <div>
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
        
        <MUI.Grid id="numFamMemGrid">
            <MUI.InputLabel htmlFor="num_fam_mem" id="numFamMemLabel">Number of Family Members</MUI.InputLabel>
            <MUI.TextField
                type='number'
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

      </div>

      <div>

      

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

      <MUI.Grid id="homeAddressIdGrid">
          <MUI.InputLabel htmlFor="home_address_id" id="homeAddressIdLabel">Home Address ID</MUI.InputLabel>
          <MUI.TextField
              type='text'
              id='home_address_id'
              placeholder='Home Address ID'
              fullWidth
              {...register("home_address_id", {
                  required: {
                      value: true,
                      message: 'Home Address ID is required',
                  }
              })}
          />
          {errors.home_address_id && (
              <p id='errMsg'>
                  <MUI.InfoIcon className='infoErr' />
                  {errors.home_address_id?.message}
              </p>
          )}
      </MUI.Grid>

      </div>
      </div>

      <MUI.DialogActions>
        {/* Add action buttons, e.g., Save Changes and Cancel */}
        <MUI.Button onClick={handleCloseScholarProfile} color="primary" id='Button'>
            Cancel
        </MUI.Button>
        <MUI.Button
            color="primary"
            type='submit'
            variant='contained'
            id='addUserBtn'
        >
            {editScholarProfile ? 'Save Changes' : ''}
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
