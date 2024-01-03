import React from 'react'
import * as MUI from '../../import'
import theme from '../../context/theme';
import { useForm, Controller } from 'react-hook-form';
import { LoaderAnimation } from '../../component/LoadingAnimation/LoaderAnimation';

const EMAIL_REGEX =  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

export default function ForgotPassword() {

    const form = useForm();
    const { register, handleSubmit, control, formState } = form;
    const { errors } = formState;
 
    
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
        maxWidth: '400px',
        margin: 'auto',
        mt: '50px',
        width: '100%',
        maxWidth: '500px'
      }}
      component='form'
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
      />
      <MUI.Button variant="contained" color="primary" fullWidth>
        Reset Password
      </MUI.Button>
    </MUI.Box>
        <MUI.Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}> 
            <MUI.Typography variant='body2'>Remember your password?</MUI.Typography>
            <MUI.Link href="/login">
               <MUI.Typography variant='h6' sx={{fontSize: '0.9rem', ml: 1, cursor: 'pointer'}}> Back to login</MUI.Typography>
            </MUI.Link>
        </MUI.Box>
    </MUI.Grid>
    </MUI.ThemeProvider>
  )
}
