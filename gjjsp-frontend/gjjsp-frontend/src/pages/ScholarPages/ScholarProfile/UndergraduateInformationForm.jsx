import React, {lazy, Suspense, useEffect, useState} from "react";
import axios from "../../../api/axios";
import {Link, useNavigate} from "react-router-dom";

import * as MUI from '../../../import'
import Layout from '../../../component/Layout/SidebarNavbar/Layout'

//Zustand Componentns
import useProfileStore from '../../../store/ProfileStore';
import useUserStore from '../../../store/UserStore';
import useAuthStore from '../../../store/AuthStore';
import useLoginStore from '../../../store/LoginStore';
import useScholarProfileStore from '../../../store/ScholarProfileStore';
import useAddressStore from '../../../store/AddressStore';

//React Hook Form
import {useForm, Controller } from 'react-hook-form';
import { DevTool } from "@hookform/devtools";

//Custom Components
import theme from '../../../context/theme';
import useAuth from '../../../hooks/useAuth';

export default function UndergraduateInformationForm() {

  const form  = useForm();
  const { register, control, handleSubmit, formState, reset, watch, validate, setValue} = form
  const { errors } = formState;
  const password = watch("password");
  const {auth} = useAuth();

  //REGEX Validation
  const FBLINK_REGEX = /^(https?:\/\/)?(www\.)?facebook\.com\/@?[A-Za-z0-9_.-]+$/i;
  const CONTACT_REGEX = /^\d{10}$/;


  return (
    <MUI.ThemeProvider theme={theme}> 
      <MUI.Grid>
        <MUI.Grid container direction="row" marginTop={15} justifyContent="center" style={{ minHeight: '50vh' }}>

          <MUI.Grid item xs={12}>
            <MUI.Grid id="undergradSyGrid">
                    <MUI.InputLabel htmlFor="undergrad_sy" id="undergradSyLabel">School Year</MUI.InputLabel>
                    <Controller
                      name="undergrad_sy"
                      control={control}
                      defaultValue=""
                      rules={{
                        validate: {
                          checkSchoolYear: () => {
                            const started = watch("school_yr_started");
                            const graduated = watch("school_yr_graduated");
                            const currentSchoolYear = watch("undergrad_sy");
                            
                            if (!started || !graduated) {
                              return "Please input School Year Started and School Year Graduated first";
                            } else if (!currentSchoolYear) {
                              return "School Year is required";
                            }
                    
                            return true;
                          },
                        },
                      }}
                      render={({ field }) => (
                        <MUI.FormControl sx={{ width: '100%', borderRadius: '8px' }}>
                          <MUI.Select
                            id="undergrad_sy"
                            native
                            {...field}
                            value={field.value || ""}
                            onChange={field.onChange}
                            disabled={!watch("school_yr_started") || !watch("school_yr_graduated")} // Disable if either field is empty
                          >
                            <option value="" disabled>Select Current School Year</option>
                            {/* Generate options based on the School Year Started and Graduated */}
                            {Array.from(
                              { length: parseInt(watch("school_yr_graduated") || 0) - parseInt(watch("school_yr_started") || 0) + 1 },
                              (_, i) => {
                                const year = parseInt(watch("school_yr_started") || 0) + i;
                                return (
                                  <option key={year} value={year}>
                                    {year}
                                  </option>
                                );
                              }
                            )}
                          </MUI.Select>
                        </MUI.FormControl>
                      )}
                    />
                    {errors.undergrad_sy && (
                      <p id='errMsg'>
                        <MUI.InfoIcon className='infoErr' />
                        {errors.undergrad_sy?.message}
                      </p>
                    )}
            </MUI.Grid>

            <MUI.Grid id="currentYrLevelGrid">
              <MUI.InputLabel htmlFor="current_yr_level" id="currentYrLevelLabel">Current Year Level</MUI.InputLabel>
              <Controller
                name='current_yr_level'
                control={control}
                defaultValue=""
                rules={{
                  required: 'Current Year Level is required',
                  validate: (value) => value !== '' || 'Please select a Current Year Level'
                }}
                render={({ field }) => (
                  <MUI.FormControl sx={{ width: '100%', borderRadius: '8px' }}>
                    <MUI.Select
                      id="current_yr_level"
                      native
                      {...field}
                    >
                      <option value="" disabled>Select Current Year Level</option>
                      <option value="1st Year">1st Year</option>
                      <option value="2nd Year">2nd Year</option>
                      <option value="3rd Year">3rd Year</option>
                      <option value="4th Year">4th Year</option>
                      <option value="5th Year">5th Year</option>
                    </MUI.Select>
                  </MUI.FormControl>
                )}
              />
              {errors.current_yr_level && (
                <p id='errMsg'>
                  <MUI.InfoIcon className='infoErr' />
                  {errors.current_yr_level?.message}
                </p>
              )}
            </MUI.Grid>

            <MUI.Grid id="undergradGwaGrid">
              <MUI.InputLabel htmlFor="gwa_current_school_yr" id="undergradGwaLabel">GWA Current School year</MUI.InputLabel>
              <MUI.TextField
                  type='text'
                  id='gwa_current_school_yr'
                  placeholder='GWA Current School year'
                  fullWidth
                  defaultValue=""
                  {...register("gwa_current_school_yr", {
                      required: {
                          value: true,
                          message: 'GWA Current School year is required',
                      }
                  })}
              />
              {errors.gwa_current_school_yr && (
                  <p id='errMsg'>
                      <MUI.InfoIcon className='infoErr' />
                      {errors.gwa_current_school_yr?.message}
                  </p>
              )}
            </MUI.Grid> 
          </MUI.Grid>


        </MUI.Grid>
      </MUI.Grid>
    </MUI.ThemeProvider>
  )
}
