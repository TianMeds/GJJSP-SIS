import React, {useEffect, useState} from 'react'
import * as MUI from '../../import';
import Layout from '../../component/Layout/SidebarNavbar/Layout';
import { Link } from 'react-router-dom';
import useSubmissionStore from '../../store/SubmissionStore';
import StatusProgress from '../Components/StatusProgress';
import classNames from 'classnames';
import axios from '../../api/axios';

//React Hook Form
import {useForm, Controller } from 'react-hook-form';
import { DevTool } from "@hookform/devtools";

export default function ViewSubmission() {

  //React Hook form 
  const form  = useForm();
  const { register, control, handleSubmit, formState, reset, watch, validate, setValue} = form
  const { errors } = formState;
  

  return (
    <Layout>
      <MUI.Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <MUI.Grid container spacing={3}>

        <MUI.Grid container alignItems="center" sx={{display: 'flex', justifyContent: 'space-between'}}>
          <MUI.Grid item>
              <MUI.Button variant='contained' component={Link} to="/submitted-alumni">
                  Close
              </MUI.Button>
          </MUI.Grid>

          <MUI.Grid item>
              <MUI.Typography>Scholar Name: Christian Medallada</MUI.Typography>
          </MUI.Grid>

          <MUI.Grid item>
              <MUI.Typography>Renewal Form: For Renewal</MUI.Typography>
          </MUI.Grid>

          <MUI.Grid item>
              <MUI.Typography>SY 2022-2023</MUI.Typography>
          </MUI.Grid>


          <MUI.Grid item>
              <MUI.Button variant='contained'>Approve</MUI.Button>

              <MUI.Button>Disapprove</MUI.Button>
          </MUI.Grid>
      </MUI.Grid>

        <MUI.Grid component="form"  method='post' noValidate container spacing={3} sx={{ mt: 2, ml: 2, display: 'flex' }}> 
           
           <MUI.Grid item xs={12} md={4} mt={5}>

             <MUI.Grid container spacing={3}>

               <MUI.Grid item xs={12}>
                 <MUI.InputLabel htmlFor="company_name" id="currentCompanyLabel">1. Current Company Name</MUI.InputLabel>
                 
                 <MUI.TextField
                   id='company_name'
                   placeholder="Company Name"
                   fullWidth 
                   margin="normal" 
                   sx={{
                     background: '#f5f5f5',
                     color: '#00000',
                     marginLeft: 2,
                     height: 'auto',
                     marginBottom: 2,
                   }}
                   {...register("company_name", {
                     required: {
                         value: true,
                         message: 'Company Name is required',
                     }
                   })}
                 />
                 {errors.company_name && (
                   <p id='errMsg'>
                       <MUI.InfoIcon className='infoErr' />
                       {errors.company_name?.message}
                   </p>
                 )}
               </MUI.Grid>

               <MUI.Grid item xs={12}>
                 <MUI.InputLabel htmlFor="company_location" id="currentCompanyLocationLabel">2. Current Company Location</MUI.InputLabel>
                 
                 <MUI.TextField
                   id='company_location'
                   placeholder="Company Full Address"
                   fullWidth 
                   margin="normal" 
                   sx={{
                     background: '#f5f5f5',
                     color: '#00000',
                     marginLeft: 2,
                     height: 'auto',
                     marginBottom: 2,
                   }}
                   {...register("company_location", {
                     required: {
                         value: true,
                         message: 'Company Location is required',
                     }
                   })}
                 />

                 {errors.company_location && (
                   <p id='errMsg'>
                       <MUI.InfoIcon className='infoErr' />
                       {errors.company_location?.message}
                   </p>
                 )}
               </MUI.Grid>

               <MUI.Grid item xs={12}>
                 <MUI.InputLabel htmlFor="position_in_company" id="currentJobLabel">3. Current Job Position</MUI.InputLabel>
                 
                 <MUI.TextField
                   id='position_in_company'
                   placeholder="Job Position"
                   fullWidth 
                   margin="normal"
                   sx={{
                     background: '#f5f5f5',
                     color: '#00000',
                     marginLeft: 2,
                     height: 'auto',
                     marginBottom: 2,
                   }}
                   {...register("position_in_company", {
                     required: {
                         value: true,
                         message: 'Job Position is required',
                     }
                   })}
                 />

                 {errors.position_in_company && (
                   <p id='errMsg'>
                       <MUI.InfoIcon className='infoErr' />
                       {errors.position_in_company?.message}
                   </p>
                 )}
               </MUI.Grid>

               <MUI.Grid item xs={12}>
                 <MUI.InputLabel htmlFor="licensure_exam_type" id="licensureExamLabel">4. Licensure Exam Type</MUI.InputLabel>
                 
                 <MUI.TextField
                   id='licensure_exam_type'
                   placeholder="BAR, CPA, Board, and etc."
                   fullWidth 
                   margin="normal" 
                   sx={{
                     background: '#f5f5f5',
                     color: '#00000',
                     marginLeft: 2,
                     height: 'auto',
                     marginBottom: 2,
                   }}
                   {...register("licensure_exam_type", {
                     required: {
                         value: false,
                         message: 'Licensure Exam Type is required',
                     }
                   })}
                 />

                 {errors.licensure_exam_type && (
                   <p id='errMsg'>
                       <MUI.InfoIcon className='infoErr' />
                       {errors.licensure_exam_type?.message}
                   </p>
                 )}
               </MUI.Grid>

             </MUI.Grid>

           </MUI.Grid>

         <MUI.Grid item xs={12} md={4}>

         <MUI.Grid container spacing={3} mt={2}>
           <MUI.Grid item xs={12}>
             <MUI.InputLabel htmlFor="exam_passed_date" id="examDateLabel">5. Exam  Passed Date</MUI.InputLabel>
             
            <MUI.TextField
               id='exam_passed_date'
               type='date'
               fullWidth 
               margin="normal" 
               sx={{
                 background: '#f5f5f5',
                 color: '#00000',
                 marginLeft: 2,
                 height: 'auto',
                 marginBottom: 2,
               }}
               {...register("exam_passed_date", {
                 required: {
                     value: false,
                     message: 'Exam Passed Date is required',
                 }
               })}
             />

             {errors.exam_passed_date && (
               <p id='errMsg'>
                   <MUI.InfoIcon className='infoErr' />
                   {errors.exam_passed_date?.message}
               </p>
             )}
           </MUI.Grid>

           <MUI.Grid item xs={12}>
             <MUI.InputLabel htmlFor="volunteer_group_name" id="volunteerGroupLabel">6. Volunteer Group Name (Optional)</MUI.InputLabel>
             
             <MUI.TextField
               id='volunteer_group_name'
               placeholder="GJJSP Volunteer Group"
               fullWidth // Make the text field take up the full width
               margin="normal" // Adjust spacing as needed
               sx={{
                 background: '#f5f5f5',
                 color: '#00000',
                 marginLeft: 2,
                 height: 'auto',
                 marginBottom: 2,
               }}

               {...register("volunteer_group_name", {
                 required: {
                     value: false,
                 }
               })}
             />

             {errors.volunteer_group_name && (
               <p id='errMsg'>
                   <MUI.InfoIcon className='infoErr' />
                   {errors.volunteer_group_name?.message}
               </p>
             )}
           </MUI.Grid>

           <MUI.Grid item xs={12}>
             <MUI.InputLabel htmlFor="yr_volunteered" id="yearVolunteerLabel">7. Year Volunteered (Optional)</MUI.InputLabel>
             
             <MUI.TextField
               id='yr_volunteered'
               placeholder="2024"
               fullWidth // Make the text field take up the full width
               margin="normal" // Adjust spacing as needed
               sx={{
                 background: '#f5f5f5',
                 color: '#00000',
                 marginLeft: 2,
                 height: 'auto',
                 marginTop: 2,
               }}
               {...register("yr_volunteered", {
                 required: {
                     value: false,
                 }
               })}
             />
           </MUI.Grid>

           </MUI.Grid>

         </MUI.Grid>

        </MUI.Grid>

        </MUI.Grid>
      </MUI.Container>
    </Layout>
  )
}
