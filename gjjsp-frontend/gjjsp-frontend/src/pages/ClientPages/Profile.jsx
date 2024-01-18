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
  const { register, control, handleSubmit, formState, reset, validate} = form
  const { errors } = formState;
  const navigate = useNavigate();

  const {profiles, profile, setProfiles, handleOpenProfile, handleCloseProfile, editProfile, setEditProfile, selectedProfile, setSelectedProfile} = useProfileStore();
  const {getAuthToken, alertOpen, alertMessage, setAlertOpen, setAlertMessage, errorOpen, setErrorOpen, setErrorMessage, errorMessage} = useAuthStore();
  const {selectedUser, setSelectedUser} = useUserStore();
  const { showPassword, handleTogglePassword } = useLoginStore();

  //Regex Validation
  const USER_REGEX = /^[A-Za-z.-]+(\s*[A-Za-z.-]+)*$/;
  const EMAIL_REGEX =  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  const CONTACT_REGEX = /^\+?63\d{10}$/

  //Submit Form
  const onSubmit = async (data, event) => {
    event.preventDefault();
    const authToken = useAuthStore.getState().getAuthToken();

    const config = {
      headers: {
        "Content-type": "application/json",
        'Authorization': `Bearer ${authToken}`
      }
    };
  try {
    if(editProfile) {
      setAlertOpen(true);
      setAlertMessage('Updating profile...');
      const response = await axios.put(
        `/api/users/${selectedProfile.id}`, {...data}, config)
        setEditProfile(false)
        setSelectedProfile(null);
        handleCloseProfile();
        setAlertOpen(true);
        setAlertMessage('Profile Updated');
    }
    else{
      const response = await axios.post(
        '/api/users',{
          first_name: data.first_name,
          middle_name: data.middle_name,
          last_name: data.last_name,
          user_mobile_num: data.user_mobile_num,
          email_address: data.email_address,
          password: data.password,
          role_id: data.role_id,
          user_status: data.user_status,
        }, config)
        handleCloseProfile();
    }
    const response = await axios.get('/api/users', {
      headers: {
        'Authorization': `Bearer ${authToken}`
      }
    });
    if (response.status === 200) {
      setProfiles(response.data.data);
      setSelectedUser(selectedProfile);
      setAlertOpen(true);
      setAlertMessage('Profile Updated');
    }
    else {
      setErrorOpen(true);
      setErrorMessage('Failed to fetch data');
    }
    form.reset(FormValues)
  }
  catch (error) {
    if (error.response?.status === 401) {
      setErrorOpen(true)
      setErrorMessage("You've been logout");
      navigate('/login')
    }
  }
}
  //Get Value 
  useEffect(() => {
    setAlertOpen(true)
    setErrorOpen(false)
    setAlertMessage('Please wait fetching profile data');
    const fetchProfiles = async () => {
      try {
        const authToken = getAuthToken();
        const response = await axios.get('/api/users',{
          headers: {
            'Authorization': `Bearer ${authToken}`
          }
        });
        if (response.status === 200) {
          setProfiles(response.data.data);
          setAlertOpen(true);
          setAlertMessage('You can now edit your profile');
        }
      }
      catch (error) {
        console.log(error);
      }
    }
    fetchProfiles();
  }, []);
  
  //Update Profile Data
  const updateProfile = (profileId) => {
    const selectedProfile = profiles.find(profile => profile.id === profileId);
    setEditProfile(true)
    setSelectedProfile(selectedProfile);
    handleOpenProfile()
    form.reset(selectedProfile)
  }

  const refreshProfile = (profileId) => {
    const selectedProfile = profiles.find(profile => profile.id === profileId);
    setSelectedUser(selectedProfile);
  }
  
  return (
    <Layout>
      <MUI.ThemeProvider theme={theme}>
    <MUI.Grid item xs={12} md={8} lg={9}>

    <MUI.Box mb={4} sx={{ display: 'flex', alignItems: 'center' }}>
      <MUI.Typography variant='h1' sx={{ color: 'black', fontWeight: 'bold', marginRight: 'auto' }}>
        Profile
      </MUI.Typography>
      
      <MUI.Button variant="outlined" onClick={() =>  refreshProfile(selectedUser.id)} sx={{mr: 2}}>
        Refresh Profile
      </MUI.Button>

      <MUI.Button variant='outlined'>Change Password</MUI.Button>

    </MUI.Box>

        <MUI.Box mb={4}>
          <MUI.Typography variant='h5'>Manage your personal information, and control which information other people see</MUI.Typography>
        </MUI.Box>

        <MUI.Box>
          <MUI.Link>Learn more about our data privacy policy.</MUI.Link>
        </MUI.Box>

        <ProfileHeader handleOpenProfile={handleOpenProfile} updateProfile={updateProfile}/>
      
        <ProfileBox/>
        
        
    </MUI.Grid>

    {/* Update Profile Dialog */}
    <MUI.Dialog open={profile} onClose={handleCloseProfile} fullWidth maxWidth="xs" component='form' method='post' noValidate onSubmit={handleSubmit(onSubmit)}>
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
