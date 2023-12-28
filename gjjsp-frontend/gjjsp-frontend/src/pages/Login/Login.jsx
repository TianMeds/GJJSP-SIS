import React from 'react';
import * as MUI from '../../import';
import axios from '../../api/axios';
import BGIMG from '../../assets/SchoolBG1.jpg';
import useAuth from '../../hooks/useAuth';
import useLoginStore from '../Store/LoginStore'
import { useForm, Controller } from 'react-hook-form';
import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation} from 'react-router-dom';
import { DevTool } from '@hookform/devtools';


const defaultTheme = MUI.createTheme();
const EMAIL_REGEX =  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const LOGIN_URL = '/api/login'

export default function Login() {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const {
    errMsg,
    setErrMsg,
    loading,
    setLoading,
    showPassword,
    setShowPassword,
    authenticated,
    setAuthenticated,
    handleTogglePassword,
  } = useLoginStore();
  
  const form = useForm();
  const { register, handleSubmit, control, formState } = form;
  const { errors } = formState;
 
  //Accepted Domains for the email
  const isSupportedDomain = (email) => {
    const supportedDomains = ['yahoo.com', 'gmail.com', 'outlook.com'];
    const educationalDomainRegex = /@[a-zA-Z0-9.-]+\.(edu(\.[a-zA-Z]{2})?|[a-zA-Z]{2}\.[a-zA-Z]{2})$/;
    const domain = email.split('@')[1];
    return supportedDomains.includes(domain) || educationalDomainRegex.test(email);
  };
  
  const csrf = () => axios.get("/sanctum/csrf-cookie")

  const onSubmit = async (data, event) => {
    event.preventDefault(); // Prevent default form submission behavior
    setLoading(true);
    await csrf()
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        }
      };
      const postData = {
        email_address: data.email_address,
        password: data.password,
      };
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify(postData),
        config
      ); 

      const { remember_token, user, roles_name } = response.data;
      console.log(JSON.stringify(response?.data));
      
      const role_id = response?.data?.user?.role_id;

      setLoading(false);

      // Set the authenticated user state using setAuth from your useAuth hook
      setAuth({ user, remember_token, roles_name, role_id});

      const rolePath = role_id === 1  ? '/'  : role_id === 2 ? '/' : role_id === 3 ? '/scholar-dashboard' : '/login';
  
      // Navigate the user to the intended route (from variable contains the intended route)
      navigate(rolePath);
      
    } catch (err) {
      setLoading(false);
      if(err.response?.status === 422){
        setErrMsg('Email address and password are required');
      }
      else if(err.response?.status === 409){
        setErrMsg('Email Address already been taken');
      }
      else if(err.response?.status === 500){
        setErrMsg('Server Error');
      }
      else if (err.response?.status === 401) {
        setErrMsg('Login failed. Please check your credentials and try again.');
      }
      else{
        setErrMsg('Network error occurred. Please try again.');
      }
    }
  }


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

        {loading && (
            <MUI.Backdrop
            open={loading}
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            >
              <MUI.Box
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  zIndex: (theme) => theme.zIndex.drawer + 2,
                }}
              >
                <MUI.CircularProgress />
              </MUI.Box>
            </MUI.Backdrop>
          )}
        
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
              <MUI.Box component="form" sx={{ mt: 1,  width: '100%', }}  onSubmit={(event) => handleSubmit((data) => onSubmit(data, event))(event)} method='post' >
                <MUI.Grid item>
                  <MUI.TextField
                    variant='standard'
                    margin="dense"
                    fullWidth
                    type='email'
                    id="email_address"
                    autoComplete='off'
                    placeholder='Email Address'
                    {...register('email_address', { 
                      pattern: {
                        value: EMAIL_REGEX,
                        message: 'Invalid email address'
                      },
                      validate: 
                        value => isSupportedDomain(value) || 'Email domain not supported',
                      required: {
                        value: true,
                        message: 'Email address is required'
                      },
                    })}
                  />
                  {errors.email_address &&(
                    <p id="errMsg">
                      <MUI.InfoIcon className="infoErr" /> 
                      {errors.email_address.message}
                    </p>
                  )}
                </MUI.Grid>
                <br/> <br/>
                {/* Password Textfield  */}
                <MUI.Grid item>
                  <MUI.TextField
                    variant='standard'
                    margin="dense"
                    fullWidth
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    placeholder='Password'
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
                    {...register('password', { 
                      required: {
                        value: true,
                        message: 'Password is required'
                      },
                    })}
                  />
                  {errors.password &&(
                    <p id="errMsg">
                      <MUI.InfoIcon className="infoErr" /> 
                      {errors.password.message}
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
      <DevTool control={control} />
    </MUI.Grid>
  </MUI.ThemeProvider>
  )
}
