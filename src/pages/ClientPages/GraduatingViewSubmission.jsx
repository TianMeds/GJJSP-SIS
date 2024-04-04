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
              <MUI.Button variant='contained' component={Link} to="/submitted-graduating">
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

      <MUI.Grid container item xs={12} sx={{mt: 5, ml: 2, display: 'flex'}}>
        <MUI.Grid item xs={12}>
          
            <MUI.InputLabel htmlFor="future_company_name" id="futureCompanyNameLabel">1. Future Company Name</MUI.InputLabel>    
                <MUI.TextField
                    id="future_company_name"
                    placeholder="Future Company Name"
                    fullWidth // Make the text field take up the full width
                    margin="normal" // Adjust spacing as needed
                    sx={{
                    background: '#f5f5f5',
                    color: '#00000',
                    marginLeft: 2,
                    height: 'auto',
                    marginBottom: 2,
                    }}
                    {...register("future_company_name", {
                    required: {
                        value: true,
                        message: 'Future Company Name is required',
                    }
                    })}
                />

                {errors.future_company_name && (
                <p id='errMsg'>
                    <MUI.InfoIcon className='infoErr' />
                    {errors.company_name?.message}
                </p>
                )}
            </MUI.Grid>

            <MUI.Grid item xs={12}>
              <MUI.InputLabel htmlFor="future_company_location" id="futureCompanyLocationLabel">2. Future Company Location</MUI.InputLabel>
              
              <MUI.TextField
                id="future_company_location"
                placeholder="Future Company Location"
                fullWidth // Make the text field take up the full width
                margin="normal" // Adjust spacing as needed
                sx={{
                  background: '#f5f5f5',
                  color: '#00000',
                  marginLeft: 2,
                  height: 'auto',
                  marginBottom: 2,
                }}
                {...register("future_company_location", {
                  required: {
                      value: true,
                      message: 'Future Company Location is required',
                  }
                })}
              />

                {errors.future_company_location && (
                  <p id='errMsg'>
                      <MUI.InfoIcon className='infoErr' />
                      {errors.future_company_location?.message}
                  </p>
                )}
            </MUI.Grid>

            <MUI.Grid item xs={12}>
              <MUI.InputLabel htmlFor="future_position" id="futureJobLabel">3. Future Job Position</MUI.InputLabel>
              
              <MUI.TextField
                id="future_position"
                placeholder="Future Job Position"
                fullWidth // Make the text field take up the full width
                margin="normal" // Adjust spacing as needed
                sx={{
                  background: '#f5f5f5',
                  color: '#00000',
                  marginLeft: 2,
                  height: 'auto',
                  marginBottom: 2,
                }}
                {...register("future_position", {
                  required: {
                      value: true,
                      message: 'Future Job Position is required',
                  }
                })}
              />

                {errors.future_position && (
                  <p id='errMsg'>
                      <MUI.InfoIcon className='infoErr' />
                      {errors.future_position?.message}
                  </p>
                )}
            </MUI.Grid>


            <MUI.Grid item xs={4}>
              <MUI.InputLabel htmlFor="meeting_benefactor_sched" id="meetingDateLabel">4. Meeting with benefactor schedule</MUI.InputLabel>
              
              <MUI.TextField
                  id="meeting_benefactor_sched"
                  type='date'
                  defaultValue=""
                  fullWidth // Make the text field take up the full width
                  sx={{
                    background: '#f5f5f5',
                    color: '#00000',
                    marginLeft: 2,
                    height: 'auto',
                    marginBottom: 2,
                  }}
                  {...register("meeting_benefactor_sched", {
                    required: {
                        value: true,
                        message: 'Meeting with benefactor schedule is required',
                    }
                  })}
              />

                {errors.meeting_benefactor_sched && (
                  <p id='errMsg'>
                      <MUI.InfoIcon className='infoErr' />
                      {errors.meeting_benefactor_sched?.message}
                  </p>
                )}

            </MUI.Grid>

      </MUI.Grid>

            <MUI.Grid item xs={12}>
                <MUI.Typography variant='h6' sx={{fontWeight: 'bold'}}>
                  Documentary Requirements
                </MUI.Typography>
              </MUI.Grid>

              <MUI.Grid item xs={12} sm={12}>
              <MUI.TableContainer sx={{ backgroundColor: '#fbf3f2', margin: '2rem 0 0 1rem' }}>
                <MUI.Table>
                  <MUI.TableHead>
                    <MUI.TableRow>
                      <MUI.TableCell>Description</MUI.TableCell>
                      <MUI.TableCell>File</MUI.TableCell>
                    </MUI.TableRow>
                  </MUI.TableHead>
                  <MUI.TableBody>

                    <MUI.TableRow>
                      <MUI.TableCell sx={{ border: 'none', display: 'flex', alignItems: 'flex-start', marginLeft: '-8px' }}>
                        <MUI.Typography variant='body1'>Copy of Report Card of the previous semester</MUI.Typography> <MUI.ErrorOutlineOutlinedIcon />
                      </MUI.TableCell>
                      <MUI.TableCell sx={{ border: 'none' }}>

                        <MUI.Grid sx={{ display: 'flex', alignItems: 'center' }}>
                            <MUI.Typography variant='body1'>Graduating_CopyOfReportCard</MUI.Typography>
                        </MUI.Grid>

                      </MUI.TableCell>
                    </MUI.TableRow>

                    <MUI.TableRow >
                      <MUI.TableCell sx={{ border: 'none', display: 'flex', alignItems: 'flex-start', marginLeft: '-8px' }}>
                        <MUI.Typography variant='body1'>Copy of School Registration Form (RF)</MUI.Typography> <MUI.ErrorOutlineOutlinedIcon />
                      </MUI.TableCell>
                      <MUI.TableCell sx={{border: 'none'}}>

                        <MUI.Grid sx={{ display: 'flex', alignItems: 'center' }}>
                            <MUI.Typography variant='body1'>Graduating_CopyOfRegistrationForm</MUI.Typography>
                        </MUI.Grid>

                      </MUI.TableCell>  
                    </MUI.TableRow>

                    <MUI.TableRow >
                      <MUI.TableCell sx={{ border: 'none', display: 'flex', alignItems: 'flex-start', marginLeft: '-8px' }}>
                        <MUI.Typography variant='body1'>Scanned Written Essay</MUI.Typography> <MUI.ErrorOutlineOutlinedIcon sx={{ml: 9}}/>
                      </MUI.TableCell>
                      <MUI.TableCell sx={{border: 'none'}}>
                        
                      <MUI.Grid sx={{ display: 'flex', alignItems: 'center' }}>
                        <MUI.Typography variant='body1'>Graduating_ScannedWrittenEssay</MUI.Typography>
                      </MUI.Grid>

                      </MUI.TableCell>
                    </MUI.TableRow>

                    <MUI.TableRow >
                    <MUI.TableCell sx={{ border: 'none', display: 'flex', alignItems: 'flex-start', marginLeft: '-8px' }}>
                        <MUI.Typography variant='body1'> Letter of gratitude to benefactor</MUI.Typography> <MUI.ErrorOutlineOutlinedIcon />
                      </MUI.TableCell>
                      <MUI.TableCell sx={{border: 'none'}}>

                      <MUI.Grid sx={{ display: 'flex', alignItems: 'center' }}>
                        <MUI.Typography variant='body1'>Graduating_LetterOfGratitude</MUI.Typography>
                      </MUI.Grid>

                      </MUI.TableCell>
                    </MUI.TableRow>

                    <MUI.TableRow >
                    <MUI.TableCell sx={{ border: 'none', display: 'flex', alignItems: 'flex-start', marginLeft: '-8px' }}>
                        <MUI.Typography variant='body1'>Statement of account issued by the school</MUI.Typography> <MUI.ErrorOutlineOutlinedIcon />
                      </MUI.TableCell>
                      <MUI.TableCell sx={{border: 'none'}}>

                      <MUI.Grid sx={{ display: 'flex', alignItems: 'center' }}>
                        <MUI.Typography variant='body1'>Graduating_StatementOfAccount</MUI.Typography>
                      </MUI.Grid>

                      </MUI.TableCell>
                    </MUI.TableRow>

                    <MUI.TableRow >
                    <MUI.TableCell sx={{ border: 'none', display: 'flex', alignItems: 'flex-start', marginLeft: '-8px' }}>
                        <MUI.Typography variant='body1'> Graduation Picture</MUI.Typography> <MUI.ErrorOutlineOutlinedIcon />
                      </MUI.TableCell>
                      <MUI.TableCell sx={{border: 'none'}}>

                      <MUI.Grid sx={{ display: 'flex', alignItems: 'center' }}>
                        <MUI.Typography variant='body1'>Graduating_GraduationPicture</MUI.Typography>
                      </MUI.Grid>

                      </MUI.TableCell>
                    </MUI.TableRow>

                    <MUI.TableRow >
                    <MUI.TableCell sx={{ border: 'none', display: 'flex', alignItems: 'flex-start', marginLeft: '-8px' }}>
                        <MUI.Typography variant='body1'>Transcript of records</MUI.Typography> <MUI.ErrorOutlineOutlinedIcon />
                      </MUI.TableCell>
                      <MUI.TableCell sx={{border: 'none'}}>

                      <MUI.Grid sx={{ display: 'flex', alignItems: 'center' }}>
                        <MUI.Typography variant='body1'>Graduating_TranscriptOfRecords</MUI.Typography>
                      </MUI.Grid>

                      </MUI.TableCell>
                    </MUI.TableRow>

                  </MUI.TableBody>
                </MUI.Table>
                <MUI.Divider sx={{width:'100%'}}/>
              </MUI.TableContainer>
            </MUI.Grid>

            </MUI.Grid>
      </MUI.Container>
    </Layout>
  )
}
