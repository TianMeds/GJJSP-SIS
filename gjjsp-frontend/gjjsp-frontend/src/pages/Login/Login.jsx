import React from 'react';
import * as MUI from '../../import';
import BGIMG from '../../assets/SchoolBG1.jpg';
import axios from '../../api/axios';
import useAuth from '../../hooks/useAuth';
import { useForm, Controller } from 'react-hook-form';
import { useState } from "react";
import { Link, useNavigate, useLocation } from 'react-router-dom';


const defaultTheme = MUI.createTheme();
const EMAIL_REGEX =  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const LOGIN_URL = '/auth';

export default function Login() {
  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from  = location.state?.from?.pathname || '/';
  const [errMsg, setErrMsg] = useState('');
  const { register, control, handleSubmit, formState: { errors }, getValues } = useForm();

  const onSubmit = async (data, event) => {
    try {
      const data = getValues();
      const config  = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const postData = {
        email_address: data.email_address,
        password: data.password,
      };
      console.log(postData);
      const response  = await axios.post(
        "http://gjjsp-backend/api/login",
        JSON.stringify(postData),
        config
      );
      console.log(response.data);
        const responseData = response.data.data;
        set(() => ({
          userData: {
            first_name: responseData.user.first_name,
            middle_name: responseData.user.middle_name,
            last_name: responseData.user.last_name,
            user_mobile_num: responseData.user.user_mobile_num,
            role: responseData.user.role_id,
            user_status: responseData.user.user_status,
          },
          isAuthenticated: true,
        }));
        console.log(response.data);
        const accessToken = response?.data?.accessToken;
        const roles = response?.data?.roles;
        setAuth({postData, accessToken, roles});
        navigate(from, {replace: true});
    }
    catch(error) {
      console.log(error.response.data)

      if(!error?.response) {
        setErrMsg('No Server Response');
      }
      else if (error.response?.status === 400) {
        setErrMsg('Missing Email or Password');
      }
      else if (error.response?.status === 401) {
        setErrMsg('Unauthorized');
      }
      else{
        setErrMsg('Login Failed')
      }
    }
  }
  // const onSubmit = async (data) => {
    //const { email_address, password } = data;

    //if (!EMAIL_REGEX.test(email_address) || !PWD_REGEX.test(password)) {
    //  setErrMsg('Invalid Entry');
   //   return;
  //  }
   // setErrMsg('');

    //try {
   //   const response = await axios.post(
    //    LOGIN_URL,
    //    JSON.stringify({
    //      email_address,
    //      password,
    //    }),
     //   {
    //      headers: {
   //         'Content-Type': 'application/json',
    //      },
   //       withCredentials: true, // Include this line if needed
  //      }
  //    );

      // Handle the login response as needed
 //     console.log(response.data);
 //     console.log(response.accessToken);
 //     console.log(JSON.stringify(response))
 //   }
 //   catch (err) {
     // Handle errors specific to the login logic
 //     if(!err?.response) {
  //      setErrMsg('No Server Response');
  //    }
  //    else if(err.response?.status === 409) {
 //     setErrMsg('Email Address already been taken');
 //     }
 //     else if(err.response?.status === 500) {
 //       setErrMsg('Server Error');
 //     }
//      else {
//        setErrMsg('Login failed. Please check your credentials and try again.');
 //     }
 //   }
//  };


  {/* Show Password using Use State this is for the Icon  */}
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  {/* When its size to a Tablet mode the Left Grid display none  */}
  const isMobile = MUI.useMediaQuery('(max-width:768px)');


  return (
    <MUI.ThemeProvider theme={defaultTheme}>

    {/*  Right Grid is the Picture Grid  */}
    <MUI.Grid container component="main" sx={{ height: '100vh' }}>
      <MUI.CssBaseline />
      {!isMobile && (
      <MUI.Grid
        container 
        alignItems='center' 
        justifyContent='center'
        item
        xs={false}
        sm={12}
        md={7}
        sx={{
            display: 'flex', // Use flex container
            flexDirection: 'column', // Stack items vertically
            alignItems: 'center', // Center items horizontally
            justifyContent: 'center', // Center items vertically
            backgroundImage: `url(${BGIMG})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            textAlign: 'center',
            padding: '2rem', // Add padding to the content
          }}
      >
      <br />
      <MUI.Typography variant="h2" color="background.paper" paragraph>
        Welcome to Gado and Jess <br/> Jalandoni Scholarship Program
      </MUI.Typography>
      <MUI.Typography variant="h5" color="background.paper" paragraph>
        Empowering dreams through education.
      </MUI.Typography>
      </MUI.Grid>
      )}

      {/* Left Grid is the Login Form  */}
      <MUI.Grid item xs={12} sm={12} md={5} component={MUI.Paper} elevation={6} square container 
        alignItems='center' 
        justifyContent='center'
        sx={{
          p: 3,
        }}>
        
        {errMsg && (
        <p id="errMsg" style={{ color: 'red' }}>
          {' '}
          <MUI.InfoIcon className="infoErr" /> {errMsg}
        </p>
      )}

        <MUI.Box
          sx={{
            my: 1,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            width: '100%', 
          }}>
            <img src='https://raw.githubusercontent.com/TianMeds/image--stocks-for-coding/main/Scholarlink%20Logos.png' alt="Logo" style={{ width: '200px', height: '150px' }} />
            <MUI.Typography component="h3" variant="h4" sx={{ textAlign: 'left', fontWeight: 'bold'  }}>
              Login
            </MUI.Typography>

            <MUI.Typography>
              Welcome back! Please enter your details.
            </MUI.Typography>
          <br/>
          {/* Email Textfield  */}
              <MUI.Box component="form" sx={{ mt: 1,  width: '100%', }} onSubmit={onSubmit}>
                <MUI.Grid item>
                  <Controller
                    name="email_address"
                    control={control}
                    rules={{ required: true, pattern: EMAIL_REGEX  }}
                    render={({ field }) => (
                    <MUI.TextField
                      margin="dense"
                      fullWidth
                      id="email_address"
                      name='email_address'
                      placeholder='Email'
                      autoFocus
                      variant="standard"
                      {...field}
                    />
                    )}
                  />
                    {errors?.email_address?.type === 'required' && (
                      <p id="errMsg">
                        {' '}
                        <MUI.InfoIcon className="infoErr" /> Email address is required
                      </p>
                    )}
                    {errors?.email_address?.type === 'pattern' && (
                      <p id="errMsg">
                        {' '}
                        <MUI.InfoIcon className="infoErr" /> Email Address is not valid
                      </p>
                    )}
                </MUI.Grid>
                <br/> <br/>
                {/* Password Textfield  */}
                <MUI.Grid item>
                  <Controller
                    name="password"
                    control={control}
                    rules={{ required: true, pattern: PWD_REGEX  }}
                    render={({ field }) => (
                  <MUI.TextField
                    variant='standard'
                    margin="dense"
                    fullWidth
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    placeholder='Password'
                    {...field}
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
                  />
                )}
                />
                        {errors?.password?.type === 'required' && (
                      <p id="errMsg">
                        {' '}
                        <MUI.InfoIcon className="infoErr" /> This field is required
                      </p>
                    )}
                    {errors?.password?.type === 'pattern' && (
                      <p id="errMsg">
                        {' '}
                        <MUI.InfoIcon className="infoErr" /> Must include uppercase and lowercase letters, a
                        number.
                      </p>
                    )}
                </MUI.Grid>

            <br/>

            {/* Remember Me Checkbox  */}
            <MUI.FormControlLabel
              control={<MUI.Checkbox value="remember" color="primary" />}
              label="Remember me"
            />

            {/* Login Button  */}
            <MUI.Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, color: 'white', backgroundColor: '#311b92', borderRadius: '10px' }}
            >
              Sign In
            </MUI.Button>

            {/* Forgot Password Link  */}
            <MUI.Grid container>
              <MUI.Grid item xs>
                <MUI.Link href="#" variant="body2" style={{ textDecoration: 'none' }}>
                  Forgot password?
                </MUI.Link>
              </MUI.Grid>
            </MUI.Grid>
          </MUI.Box>
        </MUI.Box>
      </MUI.Grid>
    </MUI.Grid>
  </MUI.ThemeProvider>
  )
}
