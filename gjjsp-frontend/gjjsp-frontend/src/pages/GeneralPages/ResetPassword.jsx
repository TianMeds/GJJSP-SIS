import React from 'react'
import * as MUI from '../../import'
import theme from '../../context/theme';
import { useForm, Controller } from 'react-hook-form';
import axios from '../../api/axios';
import useLoginStore from '../../store/LoginStore';
import useAuthStore from '../../store/AuthStore';
import LoaderAnimation from '../../component/LoadingAnimation/LoaderAnimation';
import {useNavigate} from 'react-router-dom';
import { DevTool } from "@hookform/devtools";

const RESET_PASSWORD_URL = '/api/reset';
const EMAIL_REGEX =  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

const FormValues ={
    email_address: '',
    token: '',
    password: '',
    password_confirmation: ''
  }

export default function ResetPassword() {

    const form = useForm();
    const { register, handleSubmit, control, formState, watch } = form;
    const { errors } = formState;
    const password = watch('password', '')
    const {setErrMsg, loading, setLoading, showPassword, expirationTime, setExpirationTime, handleTogglePassword, setLoadingMessage, email} = useLoginStore();

    const { alertOpen, setAlertOpen, alertMessage, setAlertMessage, errorOpen, setErrorOpen, errorMessage, setErrorMessage} = useAuthStore();

    const navigate = useNavigate();

    const onSubmit = async (data,event) => {
        event.preventDefault(); 
          try {
            setLoading(true);
            setLoadingMessage('Changing Password Link...');
            const config = {
              headers: {
                "Content-type": "application/json",
              }
            };
  
            const postData = {
                email_address: data.email_address,
                token: data.token,
                password: data.password,
                password_confirmation: data.password_confirmation,
            };
  
            const response = await axios.post(
              RESET_PASSWORD_URL,
              JSON.stringify(postData),
              config,
            );
            
            
            if(response.status === 201) {
                setLoading(false);
                setAlertMessage('Password has been changed successfully');
                setAlertOpen(true);
            }
            else {
                setLoading(false);
                setErrorMessage('An error occured. Please try again later');
                setErrorOpen(true);
            }
            form.reset(FormValues);
          }
          catch (error) {
            setLoading(false);
            setErrorMessage('Your token is invalid or has expired. Please request a new one.');
            setErrorOpen(true);
          }
        };



  return (
    <MUI.ThemeProvider theme={theme}>
    <MUI.Grid>
    <MUI.Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        margin: 'auto',
        mt: '50px',
        width: '100%',
        maxWidth: '500px'
      }}
      component='form'
      onSubmit={handleSubmit(onSubmit)}
      fullWidth 
      maxWidth='xs'
    >
        <MUI.Box >
        <img src="https://raw.githubusercontent.com/TianMeds/image--stocks-for-coding/main/Scholarlink%20Logos.png" alt="Logo" style={{ width: '150px' }} />
        </MUI.Box>
        
        <MUI.Typography variant="h1" align="center" sx={{ mb: '20px', fontSize: '2rem', fontWeight: 'bold' }}>
            Reset Password
        </MUI.Typography>

        <MUI.TextField
            type="email"
            label="Enter Email"
            variant="outlined"
            fullWidth
            autoComplete='off'
            sx={{ mb: '20px' }}
            value={email}
            InputProps={{
                readOnly: true, // Make the field read-only
              }}
            {...register('email_address', {
                pattern: {
                  value: EMAIL_REGEX,
                  message: 'Please enter a valid email address',
                },
                required: {
                  value: true,
                  message: 'Email address is required'
                },
              })}
            />
            {errors.email_address && (
      
              <MUI.Typography variant='body2' sx={{ color: 'red', mb: '20px' }}>
                <MUI.InfoIcon className="infoErr" />
                {errors.email_address.message}
              </MUI.Typography>
            )}

        <MUI.TextField
            type='text'
            label='Enter Code'
            variant='outlined'
            fullWidth
            autoComplete='off'
            sx={{ mb: '20px' }}
            {...register('token', {
            required: {
                value: true,
                message: 'Reset Token is required'
            }
            })}
            
            />
            {errors.token && (

            <MUI.Typography variant='body2' sx={{ color: 'red', mb: '20px' }}>
                <MUI.InfoIcon className="infoErr" />
                {errors.token.message}
            </MUI.Typography>
            )}

        <MUI.TextField
            type={showPassword ? 'text' : 'password'}
            label='New Password'
            variant='outlined'
            fullWidth
            autoComplete='off'
            sx={{ mb: '20px' }}
            InputProps={{
                endAdornment: (
                    <MUI.InputAdornment position="end">
                        <MUI.IconButton onClick={handleTogglePassword} edge="end">
                            {showPassword ?
                                <MUI.VisibilityIcon sx={{ fontSize: '1.2rem' }} /> : <MUI.VisibilityOffIcon sx={{ fontSize: '1.2rem' }} />
                            }
                        </MUI.IconButton>
                    </MUI.InputAdornment>
                ),
            }}
            {...register('password', {
                required: {
                    value: true,
                    message: 'Password is required'
                }
            })}
        />
        {errors.password && (
            <MUI.Typography variant='body2' sx={{ color: 'red', mb: '20px' }}>
                <MUI.InfoIcon className="infoErr" />
                {errors.password.message}
            </MUI.Typography>
        )}

        <MUI.TextField
            type={showPassword ? 'text' : 'password'}
            label='Confirm Password'
            variant='outlined'
            fullWidth
            autoComplete='off'
            sx={{ mb: '20px' }}
            InputProps={{
                endAdornment: (
                    <MUI.InputAdornment position="end">
                        <MUI.IconButton onClick={handleTogglePassword} edge="end">
                            {showPassword ?
                                <MUI.VisibilityIcon sx={{ fontSize: '1.2rem' }} /> : <MUI.VisibilityOffIcon sx={{ fontSize: '1.2rem' }} />
                            }
                        </MUI.IconButton>
                    </MUI.InputAdornment>
                ),
            }}
            {...register('password_confirmation', {
                required: {
                    value: true,
                    message: 'Confirm Password is required'
                },
                validate: (value) => value === password || 'The passwords do not match'
            })}
        />
        {errors.password_confirmation && (
            <MUI.Typography variant='body2' sx={{ color: 'red', mb: '20px' }}>
                <MUI.InfoIcon className="infoErr" />
                {errors.password_confirmation.message}
            </MUI.Typography>
        )}




      <MUI.Button variant="contained" color="primary" type='submit' fullWidth>
            Change Password
      </MUI.Button>

      {loading && <LoaderAnimation />}
    </MUI.Box>
        <MUI.Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}> 
            <MUI.Typography variant='body2'>Remember your password?</MUI.Typography>
            <MUI.Link href="/login">
               <MUI.Typography variant='h6' sx={{fontSize: '0.9rem', ml: 1, cursor: 'pointer'}}> Back to login</MUI.Typography>
            </MUI.Link>
        </MUI.Box>
    </MUI.Grid>


            {/* Snackbar for Success */}
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

          {/* Snackbar for Error */}
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
  )
}
