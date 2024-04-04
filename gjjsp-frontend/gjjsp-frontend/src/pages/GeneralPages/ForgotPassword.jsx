import React from 'react'
import * as MUI from '../../import'
import theme from '../../context/theme';
import { useForm, Controller } from 'react-hook-form';
import axios from '../../api/axios';
import useLoginStore from '../../store/LoginStore';
import useAuthStore from '../../store/AuthStore';
import LoaderAnimation from '../../component/LoadingAnimation/LoaderAnimation';
import {useNavigate} from 'react-router-dom';

const EMAIL_REGEX =  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const FORGOT_PASSWORD_URL = '/api/forgot';


export default function ForgotPassword() {

    const form = useForm();
    const { register, handleSubmit, control, formState } = form;
    const { errors } = formState;
    const {setErrMsg, loading, setLoading, showPassword, expirationTime, setExpirationTime, handleTogglePassword, setLoadingMessage, email, setEmail} = useLoginStore();
    const { alertOpen, setAlertOpen, alertMessage, setAlertMessage, errorOpen, setErrorOpen, errorMessage, setErrorMessage} = useAuthStore();
    const navigate = useNavigate();
 

    //Accepted Domains for the email
    const isSupportedDomain = (email) => {
      const supportedDomains = ['yahoo.com', 'gmail.com', 'outlook.com'];
      const educationalDomainRegex = /@[a-zA-Z0-9.-]+\.(edu(\.[a-zA-Z]{2})?|[a-zA-Z]{2}\.[a-zA-Z]{2})$/;
      const domain = email.split('@')[1];
      return supportedDomains.includes(domain) || educationalDomainRegex.test(email);
    };

    const onSubmit = async (data,event) => {
      event.preventDefault(); 
        try {
          
          setLoading(true);
          setLoadingMessage('Sending password reset link...');
          const config = {
            headers: {
              "Content-type": "application/json",
            }
          };

          const postData = {
            email_address: data.email_address,
          };

          const response = await axios.post(
            FORGOT_PASSWORD_URL,
            JSON.stringify(postData),
            config,
          );
          
          if (response.status === 200) {
            setLoading(false);
            setErrMsg('A password reset link has been sent to your email address');
            setEmail(data.email_address);
            navigate('/reset-password');
          
          } else {
            setLoading(false);
            setErrMsg('An error occured. Please try again later');
        
          }
        }
        catch (error) {
          if(error.response?.status === 422){
            setErrorOpen(true)
            setErrorMessage("Email is invalid or no such email in the system");
            setLoading(false);
          }
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
          Forgot your password?
        </MUI.Typography>

        <MUI.Typography variant="body1" align="center" sx={{ mb: '20px', width: '400px' }}>
            Enter your email address below and we'll send you a link to reset your password.
        </MUI.Typography>
      <MUI.TextField
        type="email"
        label="Enter Email"
        variant="outlined"
        fullWidth
        autoComplete='off'
        sx={{ mb: '20px' }}
        {...register('email_address', {
          pattern: {
            value: EMAIL_REGEX,
            message: 'Please enter a valid email address',
          },
          validate: 
            value => isSupportedDomain(value) || 'Email domain not supported',
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

      <MUI.Button variant="contained" color="primary" type='submit' fullWidth>
        Reset Password
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
