import React, { useState, useEffect }  from 'react';
import * as MUI from '../../import';
import axios from '../../api/axios';
import useAuth from '../../hooks/useAuth';
import useLoginStore from '../../store/LoginStore'
import { useForm, Controller } from 'react-hook-form';
import { useNavigate} from 'react-router-dom';
import { DevTool } from '@hookform/devtools';
import { LoaderAnimation } from '../../component/LoadingAnimation/LoaderAnimation';
import { LeftGrid } from './LeftGrid';
import { ErrMsg } from '../../component/ErrorMsg/ErrMsg';
import theme from '../../context/theme';

const EMAIL_REGEX =  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const LOGIN_URL = '/api/login'

export default function Login() {
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const {
    setErrMsg,
    setLoading,
    showPassword,
    expirationTime,
    setExpirationTime,
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
        config,
      ); 

      const { remember_token, user, roles_name, expires_at } = response.data;

      console.log(JSON.stringify(response?.data));
      
      const role_id = response?.data?.user?.role_id;

      // Set the token and expiration time in local storage
      localStorage.setItem('remember_token', remember_token);

      setExpirationTime(new Date(expires_at).getTime());
      
      setLoading(false);

      // Set the authenticated user state using setAuth from your useAuth hook
      setAuth({ user, remember_token, roles_name, role_id, expirationTime});
      setErrMsg("")

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

  return (
    <MUI.ThemeProvider theme={theme}>
    {/*  Right Grid is the Picture Grid  */}
    <MUI.Grid container component="main" sx={{ height: '100vh' }}>
      <LeftGrid/>

      {/* Left Grid is the Login Form  */}
      <MUI.Grid item xs={12} sm={12} md={5} component={MUI.Paper} elevation={6} square container 
        alignItems='center' 
        justifyContent='center'
        sx={{
          p: 3,
        }}>

      {/* Loading Animation  */}
      <LoaderAnimation />

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
            <MUI.Typography variant="h1">
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
                    <MUI.Typography variant='error'>
                      <MUI.InfoIcon className="infoErr" /> 
                      {errors.email_address.message}
                    </MUI.Typography>
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
                    autoComplete='off'
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
                    <MUI.Typography variant="error" >
                      <MUI.InfoIcon className='infoErr'/> 
                      {errors.password.message}
                    </MUI.Typography>
                  )}
                </MUI.Grid>
                <ErrMsg/>
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
                sx={{mt: 5, mb: 2}}
              >
                Sign In
              </MUI.Button>

            {/* Forgot Password Link  */}
              <MUI.Grid container>
                <MUI.Grid item xs>
                  <MUI.Link href="#" variant="body1">
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