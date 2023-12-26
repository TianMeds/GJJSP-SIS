import React, { useState, useEffect } from 'react'
import * as MUI from '../../import';
import Layout from '../Components/Layout';
import { Search, SearchIconWrapperV2,StyledInputBaseV2 } from '../Components/Styles';
import useSchoolStore from '../Store/SchoolStore';
import {useForm, Controller } from 'react-hook-form';
import { DevTool } from "@hookform/devtools";
import { Form } from 'react-router-dom';


const FormValues = {
  schoolName: '',
  schoolAddress: '',
  schoolType: '',
  schoolPeriod: '',
}

export default function School({state}) {

  const form = useForm();
  const { register, control, handleSubmit, formState, reset, validate} = form
  const { errors } = formState;

  const onSubmit = (data) => {
    console.log("Form submitted", data);

    if(editSchool) {
      updateSchool(selectedSchool.id, data.schoolName, data.schoolAddress, data.schoolType, data.schoolPeriod);
      setEditSchool(false);
    }
    else{
      addSchool(data.schoolName, data.schoolAddress, data.schoolType, data.schoolPeriod);
    }
    form.reset(FormValues);
    handleCloseSchool();
  }

  const {
    school,
    setSchoolName,
    setSchoolAddress,
    setSchoolType,
    setSchoolPeriod,
    handleOpenSchool,
    handleCloseSchool,
    editSchool,
    setEditSchool,
    selectedSchool,
    setSelectedSchool,
    updateSchool,
    filteredType,
    setFilteredType,
    searchQuery,
    handleSearch,
    addSchool = ((store) => store.addSchool), 
    deleteSchool = ((store) => store.deleteRow),
    schools = ((store) => store.schools.filter((school) => school.state === state)),
  } = useSchoolStore();

  const handleEditSchool = (schoolId) => {
    const selectedSchool = schools.find((school) => school.id === schoolId);
    if (selectedSchool) {
      setSelectedSchool(selectedSchool);
      reset({
        schoolName: selectedSchool.schoolName,
        schoolAddress: selectedSchool.schoolAddress,
        schoolType: selectedSchool.schoolType,
        schoolPeriod: selectedSchool.schoolPeriod,
      })
      setEditSchool(true);
      handleOpenSchool();
    }
  }

  const handleDeleteSchool = (schoolId) => {
    const selectedSchool = schools.find((school) => school.id === schoolId);
    if (selectedSchool) {
      deleteSchool(selectedSchool.id);
    }
  }

  const handleCancelSchool = () => {
    form.reset(FormValues);
    setEditSchool(false);
    handleCloseSchool();
  }

  const YearOption = () => {
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: currentYear - 2007 }, (_, index) => 2008 + index).reverse();
    return years.map((year) => <option key={year} value={`SY. ${year}-${year + 1}`}>{`SY. ${year}-${year + 1}`}</option>);
  }


  return (
    <Layout>
     <MUI.Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <MUI.Grid container spacing={3}>

        <MUI.Grid item xs={12}>
          <MUI.Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} alignItems={{xs: 'left', md: 'center'}} margin={2} justifyContent="space-between">
            <MUI.Typography variant="h1" id="tabsTitle">School</MUI.Typography>
                      
              {/* Add User Button */}
              <MUI.Button variant="contained" color="primary" id="addButton" sx={{width: {xs: '100px'}}} onClick={handleOpenSchool}>
                Add Schools
              </MUI.Button>

            </MUI.Box>
          </MUI.Grid>

          <MUI.Container sx={{mt: 4, display: 'flex', alignItems: 'center' }}>
            <Search>
              <SearchIconWrapperV2>
                <MUI.SearchIcon />
              </SearchIconWrapperV2>
              <StyledInputBaseV2
                placeholder="Search for School Name or Address"
                inputProps={{ 'aria-label': 'search' }}
                value={searchQuery}
                onChange={handleSearch}
              />
            </Search>
                          

            <MUI.IconButton aria-label="filter">
              <MUI.FilterListIcon />
            </MUI.IconButton>

            <MUI.FormControl id="filterControl">
              <MUI.Select
                value={filteredType}
                onChange={(e) => setFilteredType(e.target.value)}
                native
              >
                <option value="All">All University</option>
                <option value="State University">State University</option>
                <option value="Private University">Private University</option>
              </MUI.Select>
            
            </MUI.FormControl>
          </MUI.Container>

        {/* -------- Table Section  ----------*/}
        <MUI.TableContainer sx={{ backgroundColor: '#fbf3f2', margin: '2rem 0 0 1rem' }}>
          <MUI.Table> 
            <MUI.TableHead>
              <MUI.TableRow>
                  <MUI.TableCell>Name</MUI.TableCell>
                  <MUI.TableCell>Address</MUI.TableCell>
                  <MUI.TableCell>Type</MUI.TableCell>
                  <MUI.TableCell>Current Period</MUI.TableCell>
                  <MUI.TableCell>Action</MUI.TableCell>
              </MUI.TableRow>
            </MUI.TableHead>
              <MUI.TableBody>
                {schools
                  .filter((school) => filteredType === "All" || school.schoolType === filteredType)
                  .filter((school) => 
                  (school.schoolName && school.schoolName.toLowerCase().includes(searchQuery?.toLowerCase())) || 
                  (school.schoolAddress && school.schoolAddress.toLowerCase().includes(searchQuery?.toLowerCase())))
                  .map((school) => (
                    (school.schoolName || school.schoolAddress || school.schoolType || school.schoolPeriod) && (
                    <MUI.TableRow key={school.id}  className='user' >
                      <MUI.TableCell sx={{border: 'none'}}  className='schoolName'>{school.schoolName}</MUI.TableCell>
                      <MUI.TableCell sx={{border: 'none'}}  className='Address'>{school.schoolAddress}</MUI.TableCell>
                      <MUI.TableCell sx={{border: 'none'}}  className='Type'>{school.schoolType}</MUI.TableCell>
                      <MUI.TableCell sx={{border: 'none'}}  className='CurrentPeriod'>{school.schoolPeriod}</MUI.TableCell>
                      <MUI.TableCell sx={{border: 'none'}}>
                        <MUI.IconButton
                          color="inherit"
                          onClick={() => handleEditSchool(school.id)}
                          sx={{ marginLeft: -1}}
                        >
                          <MUI.BorderColorOutlinedIcon  />

                        </MUI.IconButton>

                        <MUI.IconButton
                          color="inherit"
                          onClick={() => handleDeleteSchool(school.id)}
                          sx={{ textTransform: 'capitalize', marginLeft: -1 }}
                        >
                          <MUI.DeleteOutlineOutlinedIcon  />

                        </MUI.IconButton>
                      </MUI.TableCell>
                    </MUI.TableRow>
                    )
                    ))}
              </MUI.TableBody>
          </MUI.Table>
          <MUI.Divider sx={{width:'100%'}}/>
        </MUI.TableContainer>   
      

          {/* -------- Add School Dialog ----------*/}
        <MUI.Dialog open={school} onClose={handleCloseSchool} fullWidth maxWidth="xs" component='form' onSubmit={handleSubmit(onSubmit)} noValidate>
          {/* Content of the Dialog */}
          <MUI.DialogTitle id="dialogTitle"> New School</MUI.DialogTitle>
          <MUI.Typography variant='body2' id="dialogLabel">Required fields are marked with an asterisk *</MUI.Typography>
          <MUI.DialogContent>
            {/* Form Fields of New User*/}
            <MUI.Grid id="schoolNameGrid">
              <MUI.InputLabel htmlFor="name" id="schoolNameLabel">Name</MUI.InputLabel>
                <MUI.TextField 
                  type='text'
                  id="schoolName"
                  placeholder='School Name' 
                  fullWidth

                  {...register('schoolName', { 
                    required: {
                      value: true,
                      message: 'School Name is required'
                    },
                  })}
                />
                {errors.schoolName && (
                  <p id='errMsg'> 
                  <MUI.InfoIcon className='infoErr'/> 
                  {errors.schoolName?.message}  
                  </p>
                )}
            </MUI.Grid>

            <MUI.Grid id="schoolAddressGrid">
              <MUI.InputLabel htmlFor="schoolAddress" id="schoolAddressLabel">School Address</MUI.InputLabel>
              <MUI.TextField 
                type='text'
                id="schoolAddress"
                placeholder='School Address' 
                fullWidth
                
                {...register('schoolAddress', {
                  required: {
                    value: true,
                    message: 'School Address is required'
                  },
                })}
              />
              {errors.schoolAddress && (
                <p id='errMsg'> 
                  <MUI.InfoIcon className='infoErr'/> 
                  {errors.schoolAddress?.message}  
                </p>
              )}
            </MUI.Grid>

            <MUI.Grid id="schoolTypeGrid">
              <MUI.InputLabel htmlFor="schoolType" id="schoolTypeLabel">Type</MUI.InputLabel>
              <Controller
                name='schoolType'
                control={control}
                defaultValue=''
                rules={{ 
                  required: "School type is required",
                  validate: (value) => value !== '' || 'Please select a  school type' 
                }}
                render={({ field }) => (
                  <MUI.FormControl sx={{  width: '100%', borderRadius: '8px',}} >
                    <MUI.Select
                      {...field}
                      native
                    >
                      <option value="" disabled>Select School Type</option>
                      <option value="State University">State University</option>
                      <option value="Private University">Private University</option>
                    </MUI.Select>
                  </MUI.FormControl>
                )}
              />
              {errors.schoolType && (
                <p id='errMsg'> 
                  <MUI.InfoIcon className='infoErr'/> 
                  {errors.schoolType?.message}  
                </p>
              )}
            </MUI.Grid>

            <MUI.Grid id="schoolPeriodGrid">
                <MUI.InputLabel htmlFor="schoolPeriod" id="schoolPeriodLabel">Current Period</MUI.InputLabel>
                <Controller
                  name='schoolPeriod'
                  control={control}
                  defaultValue=''
                  rules={{ 
                    required: "School period is required",
                    validate: (value) => value !== '' || 'Please select a school period' 
                  }}
                  render={({ field }) => (
                    <MUI.FormControl sx={{  width: '100%', borderRadius: '8px',}} >
                      <MUI.Select
                        {...field}
                        native
                      >
                        <option value="" disabled>Select School Year</option>
                        {YearOption()}
                      </MUI.Select>
                    </MUI.FormControl>
                  )}
                />
                {errors.schoolPeriod && (
                  <p id='errMsg'> 
                    <MUI.InfoIcon className='infoErr'/> 
                    {errors.schoolPeriod?.message}  
                  </p>
                )}
            </MUI.Grid>

          </MUI.DialogContent>

          <MUI.DialogActions>
            {/* Add action buttons, e.g., Save Changes and Cancel */}
            <MUI.Button onClick={handleCancelSchool} color="primary" id="Button">
              Cancel
            </MUI.Button>
              <MUI.Button 
                type="submit"
                id="Button"
                variant='contained'
                color="primary">
                {editSchool ? 'Save Changes' : 'Add School'}
              </MUI.Button>
          </MUI.DialogActions>
        </MUI.Dialog>
        <DevTool control={control} />
      </MUI.Grid>
    </MUI.Container>
  </Layout>
  )
} 
