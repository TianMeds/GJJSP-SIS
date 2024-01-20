import React, {lazy, Suspense, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from '../../api/axios';

//Components 
import * as MUI from '../../import';
import Layout from '../../component/Layout/SidebarNavbar/Layout';
import { ProfileBox } from '../../component/ProfileBox/ProfileBox';
import { ProfileHeader } from '../../component/ProfileHeader/ProfileHeader';
import theme from '../../context/theme';
const LazyErrMsg = lazy(() => import('../../component/ErrorMsg/ErrMsg'));

//Zustand Components
import useProfileStore from '../../store/ProfileStore';
import useLoginStore from '../../store/LoginStore';
import useUserStore from '../../store/UserStore';
import useAuthStore from '../../store/AuthStore';
import useAuth from '../../hooks/useAuth';

//React Hook Form
import {useForm, Controller } from 'react-hook-form';
import { DevTool } from "@hookform/devtools";

//Reseting Form Values 
const FormValues = {
  first_name: "",
  middle_name: "",
  last_name: "",
  user_mobile_num: "",
  email_address: "",
  password: "",
  role_id: "",
  user_status: "",
}

export default function Profile() {

  const form  = useForm();
  const { register, control, handleSubmit, formState, reset, watch, validate} = form
  const { errors } = formState;
  const navigate = useNavigate();
  const password = watch("password");

  //Zustand Hooks
  const 
  {profile, setProfiles, handleOpenProfile, handleCloseProfile, 
  editProfile, setEditProfile,setSelectedProfile, 
  changePassword, handleOpenChangePassword, 
  handleCloseChangePassword, editPassword, setEditPassword,setSelectedPassword} = useProfileStore();

  const {getAuthToken, alertOpen, alertMessage, setAlertOpen, setAlertMessage, errorOpen, setErrorOpen, setErrorMessage, errorMessage} = useAuthStore();

  const {selectedUser, setSelectedUser} = useUserStore();

  const { showPassword, handleTogglePassword, setLoading, setLoadingMessage } = useLoginStore();

  //Regex Validation
  const USER_REGEX = /^[A-Za-z.-]+(\s*[A-Za-z.-]+)*$/;
  const EMAIL_REGEX =  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  const CONTACT_REGEX = /^\+?63\d{10}$/

  

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
      setLoading(false)
      setErrorOpen(true);
      setErrorMessage("You've been logout");
      navigate('/login');
    } 
    else if(error.response?.status === 409) {
      setLoading(false)
      setErrorOpen(true);
      setErrorMessage("Email already exists");
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
useEffect(() => {
  setLoading(true);
  setErrorOpen(false)
  setLoadingMessage('Fetching Updated Profile...');
  const fetchProfiles = async () => {
    try {
      const authToken = getAuthToken();
      const response = await axios.get('/api/profile',{
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      });
      if (response.status === 200) {
        setProfiles(response.data.data);
        setAlertOpen(true);
        setAlertMessage('You can now edit your profile');
        setLoading(false)
      }
    }
    catch (error) {
      console.log(error);
    }
  }
  fetchProfiles();
}, []);
  
  
//Update Profile Data
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

//Update Password Data
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

    <MUI.Box mb={4} sx={{ display: 'flex', alignItems: 'center' }}>
      <MUI.Typography variant='h1' sx={{ color: 'black', fontWeight: 'bold', marginRight: 'auto' }}>
        Profile
      </MUI.Typography>

    </MUI.Box>

        <MUI.Box mb={4}>
          <MUI.Typography variant='h5'>Manage your personal information, and control which information other people see</MUI.Typography>
        </MUI.Box>

        <MUI.Box>
          <MUI.Link>Learn more about our data privacy policy.</MUI.Link>
        </MUI.Box>

        <ProfileHeader handleOpenProfile={handleOpenProfile} updateProfile={updateProfile} updatePassword={updatePassword}/>
      
        <ProfileBox/>
        
        
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

    </MUI.ThemeProvider>
  </Layout>
  )
}
