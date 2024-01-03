import React from 'react'
import * as MUI from '../../import';
import Layout from '../../component/Layout/SidebarNavbar/Layout';
import theme from '../../context/theme';
import { Link } from 'react-router-dom';
import { Search, SearchIconWrapperV2,StyledInputBaseV2 } from '../../component/Layout/SidebarNavbar/Styles';
import useScholarStore from '../../store/ScholarStore';
import { DevTool } from "@hookform/devtools";
import {useForm, Controller } from 'react-hook-form';

const FormValues = {
  scholarName: '',
  scholarEmailAddress: '',
  scholarStatus: '',
  scholarCategory: '',
}

const USER_REGEX = /^[A-Za-z.-]+(\s*[A-Za-z.-]+)*$/;
const EMAIL_REGEX =  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

export default function Scholar({state}) {
  const form  = useForm();
  const { register, control, handleSubmit, formState, reset, validate} = form
  const { errors } = formState;

  const onSubmit = (data) => {
    console.log("Form submitted", data)

    if(editScholar) {
      updateScholar(selectedScholar.id, data.scholarName, data.scholarEmailAddress, data.scholarCategory, data.scholarStatus);
      setEditScholar(false);
      form.reset(FormValues); 
    }
    else {
      addScholar(data.scholarName, data.scholarEmailAddress, data.scholarCategory, data.scholarStatus);
    }
    form.reset();
    handleCloseScholar();
  }

  const {
    scholar,
    handleOpenScholar,
    handleCloseScholar,
    filteredScholar,
    setFilteredScholar,
    searchQuery,
    handleSearch,
    editScholar,
    setEditScholar,
    updateScholar,
    selectedScholar,
    setSelectedScholar,
    addScholar = ((store) => store.addScholar),
    deleteScholar = ((store) => store.deleteScholar),
    scholars = ((store) => store.scholars.filter((scholar) => scholar.state === state)),
  } = useScholarStore();

  const handleEditScholar = (scholarId) => {
    const selectedScholar = scholars.find((scholar) => scholar.id === scholarId);
    if(selectedScholar) {
      setSelectedScholar(selectedScholar);
      reset({
        scholarName: selectedScholar.scholarName,
        scholarEmailAddress: selectedScholar.scholarEmailAddress,
        scholarCategory: selectedScholar.scholarCategory,
        scholarStatus: selectedScholar.scholarStatus,
      });
      setEditScholar(true);
      handleOpenScholar();
    }
  };

  const handleDeleteScholar = (scholarId) => {
    const selectedScholar = scholars.find((scholar) => scholar.id === scholarId);
    if(selectedScholar) {
      deleteScholar(selectedScholar.id);
    }
  };

  const handleCancelScholar = () => {
    form.reset(FormValues);
    setEditScholar(false);
    handleCloseScholar();
  }

  return (
    <Layout>
    <MUI.ThemeProvider theme={theme}>
      <MUI.Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <MUI.Grid container spacing={3}>
          <MUI.Grid item xs={12}>
            <MUI.Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} alignItems={{xs: 'left', md: 'center'}} margin={2} justifyContent="space-between">
              <MUI.Typography variant="h1" id="tabsTitle" sx={{color: 'black'}}>Scholars</MUI.Typography>
                        
              <MUI.Box>     
                {/* Add User Button */}
                <MUI.Button variant="contained" component={Link} to='/notification' id='addButton' sx={{mr:4}} >
                  <MUI.NotificationsIcon  sx={{transform: 'rotate(45deg)', mr: 1}}/>
                  <MUI.Typography variant='body2'>Send reminder</MUI.Typography>
                </MUI.Button>

                <MUI.Button variant="contained" id='addButton' onClick={handleOpenScholar} >
                  <MUI.PersonAddAltOutlinedIcon sx={{mr: 1}}/>
                  <MUI.Typography variant='body2' >{editScholar ? 'Edit Scholar' : 'Add Scholar'}</MUI.Typography>
                </MUI.Button>
              </MUI.Box>  

            </MUI.Box>
          </MUI.Grid>

          {/* Search Bar */}
          <MUI.Container sx={{mt: 4, display: 'flex', alignItems: 'center' }}>
            <Search>
              <SearchIconWrapperV2>
                <MUI.SearchIcon />
              </SearchIconWrapperV2>
              <StyledInputBaseV2
                placeholder="Search for names, groups, or email addresses"
                inputProps={{ 'aria-label': 'search' }}
                value={searchQuery}
                onChange={handleSearch} 
              />
            </Search>

            <MUI.IconButton aria-label="filter">
              <MUI.FilterListIcon />
            </MUI.IconButton>
          
            <MUI.FormControl>
              <MUI.Select
                value={filteredScholar}
                onChange={(e) => setFilteredScholar(e.target.value)}
                native
                sx={{width: '100px', border: '1px solid rgba(0,0,0,0.2)',
                boxShadow: '11px 7px 15px -3px rgba(0,0,0,0.1)', borderRadius: '15px', height: '50px'}}
              >
                <option value="All">All</option>
                <option value="New">New</option>
                <option value="For Renewal">For Renewal</option>
                <option value="Renewed">Renewed</option>
                <option value="Graduating">Graduating</option>
                <option value="Graduated">Graduated</option>
                <option value="Alumni">Alumni</option>
              </MUI.Select>
            </MUI.FormControl>

            <MUI.Button variant='contained' component={Link} to="/export"
            sx={{
              ml: 2,
              borderRadius: '15px',
              height: '50px',
            }}
            >
            <MUI.FileUploadOutlinedIcon sx={{mr: 1}}/>
             <MUI.Typography variant='h5' sx={{fontSize: '0.8rem'}}>Export Data</MUI.Typography>
            </MUI.Button>

          </MUI.Container>

          {/* -------- Table Section  ----------*/}
          <MUI.TableContainer sx={{ backgroundColor: '#fbf3f2', margin: '2rem 0 0 1rem' }}>
            <MUI.Table> 
              <MUI.TableHead>
                <MUI.TableRow>
                  <MUI.TableCell>Name</MUI.TableCell>
                  <MUI.TableCell>Email</MUI.TableCell>
                  <MUI.TableCell>Scholarship Category</MUI.TableCell>
                  <MUI.TableCell>Scholar Status</MUI.TableCell>
                  <MUI.TableCell>Action</MUI.TableCell>
                </MUI.TableRow>
              </MUI.TableHead>
                <MUI.TableBody>
                  {scholars
                    .filter((scholar) => filteredScholar === "All" || scholar.scholarStatus === filteredScholar)
                    .filter((scholar) => (scholar.scholarName.toLowerCase().includes(searchQuery.toLowerCase())) ||
                    (scholar.scholarEmailAddress.toLowerCase().includes(searchQuery.toLowerCase()))
                    )
                    .reverse()
                    .map((scholar) => (
                      (scholar.scholarName || scholar.scholarEmailAddress || scholar.scholarCategory || scholar.scholarStatus) && (
                    <MUI.TableRow  key={scholar.id} className='scholar' >
                      <MUI.TableCell sx={{border: 'none'}}  className='scholarName'>{scholar.scholarName}</MUI.TableCell>
                      <MUI.TableCell sx={{border: 'none'}}  className='scholarEmail'>{scholar.scholarEmailAddress}</MUI.TableCell>
                      <MUI.TableCell sx={{border: 'none'}}  className='scholarCatergory'>{scholar.scholarCategory}</MUI.TableCell>
                      <MUI.TableCell sx={{border: 'none'}}  className='scholarStatus'>{scholar.scholarStatus}</MUI.TableCell>
                      <MUI.TableCell sx={{border: 'none', color: '#2684ff' }}>

                        <MUI.IconButton color="inherit" component={Link} to="/profile">
                          <MUI.TableChartIcon sx={{transform: 'rotate(90deg)'}}/>
                        </MUI.IconButton>

                        <MUI.IconButton
                          color="inherit"
                          onClick={() => handleEditScholar(scholar.id)}
                        >
                          <MUI.BorderColorIcon />

                        </MUI.IconButton>


                        <MUI.IconButton
                          color="inherit"
                          onClick={() => handleDeleteScholar(scholar.id)}
                          sx={{ textTransform: 'capitalize' }}
                        >
                          <MUI.DeleteIcon />

                        </MUI.IconButton>

                      </MUI.TableCell>
                    </MUI.TableRow>
                  )))}
                </MUI.TableBody>
            </MUI.Table>
            <MUI.Divider sx={{width:'100%'}}/>
          </MUI.TableContainer>   

           {/* Add Scholar Dialog */}
           <MUI.Dialog open={scholar} onClose={handleCloseScholar} fullWidth maxWidth="xs" component='form' onSubmit={handleSubmit(onSubmit)} noValidate>
                {/* Content of the Dialog */}
                <MUI.DialogTitle variant='h3' sx={{fontWeight: 'bold'}}>Add Scholar</MUI.DialogTitle>
                <MUI.Typography variant='body2' id="dialogLabel">Required fields are marked with an asterisk *</MUI.Typography>
                <MUI.DialogContent>
                  {/* Form Fields of New Notification */}
                
                <MUI.Grid id="scholarNameGrid">
                  <MUI.InputLabel htmlFor="scholarName" id="scholarNameLabel">Name</MUI.InputLabel>
                    <MUI.TextField 
                      type='text'
                      id='scholarName'
                      placeholder='Scholar Name' 
                      fullWidth 

                      {...register("scholarName",{
                        required: {
                          value: true,
                          message: 'This field is required'
                        },
                        pattern: {
                          value: USER_REGEX,
                          message: 'Names should only contain letters, periods, and hypens, with no leading or hanging spaces.'
                        }
                      })}
                    />
                    {errors.scholarName && (
                      <p id='errMsg'>
                        <MUI.InfoIcon className='infoErr'/>
                        {errors.scholarName?.message}
                      </p>
                    )}
                </MUI.Grid>

                <MUI.Grid id="scholarEmailGrid">
                    <MUI.InputLabel htmlFor="scholarEmail" id="scholarEmailLabel">Email</MUI.InputLabel>
                    <MUI.TextField 
                      type='email'
                      id='scholarEmail'
                      placeholder='Scholar Email' 
                      fullWidth 

                      {...register("scholarEmailAddress",{
                        required: {
                          value: true,
                          message: 'Email is required'
                        },
                        pattern: {
                          value: EMAIL_REGEX,
                          message: 'Please enter a valid email address.'
                        }
                      })}
                    />

                    {errors.scholarEmail && (
                      <p id='errMsg'>
                        <MUI.InfoIcon className='infoErr'/>
                        {errors.scholarEmail?.message}
                      </p>
                    )}
                </MUI.Grid>
                
                <MUI.Grid id="scholarCategoryGrid">
                    <MUI.InputLabel htmlFor="scholarCategory" id="scholarCategoryLabel">Scholarship Category</MUI.InputLabel>
                    <Controller
                      name="scholarCategory"
                      control={control}
                      defaultValue=""
                      rules={{
                        required: "Scholar Category is required",
                        validate: (value) => value !== '' || 'Please select a scholar category'
                      }}
                      render={({ field }) =>  (
                        <MUI.FormControl sx={{  width: '100%', borderRadius: '8px',}}>
                          <MUI.Select
                            native
                            {...field}
                            id='scholarCategory'
                            sx={{mb: 2}}
                          >
                            <option value="" disabled>Select Scholarship Category</option>
                            <option value="GADO - Formal Educ">GADO - Formal Educ</option>
                            <option value="GADO - Techvoc">GADO - Techvoc</option>
                            <option value="JESS - Window of Oppurtunity">JESS - Window of Oppurtunity</option>
                          </MUI.Select>
                        
                        </MUI.FormControl>
                      )}
                    />
                    {errors.scholarCategory && (
                      <p id='errMsg'> <MUI.InfoIcon className='infoErr'/>{errors.scholarCategory?.message}</p>
                    )}
                </MUI.Grid>

                <MUI.Grid id="scholarStatusGrid">
                    <MUI.InputLabel htmlFor="scholarStatus" id="scholarStatusLabel">Scholar Status</MUI.InputLabel>
                    <Controller
                      name='scholarStatus'
                      control={control}
                      defaultValue=""
                      rules={{
                        required: "Scholar Status is required",
                        validate: (value) => value !== '' || 'Please select a scholar status'
                      }}
                      render={({ field }) =>  (
                        <MUI.FormControl sx={{  width: '100%', borderRadius: '8px',}}>
                          <MUI.Select
                            id='scholarStatus'
                            native
                            {...field}
                            sx={{mb: 2}}
                          >
                            <option value="" disabled>Select Scholar Status</option>
                            <option value="New">New Scholar</option>
                            <option value="For Renewal">For Renewal</option>
                            <option value="Renewed">Renewed</option>
                            <option value="Graduating">Graduating</option>
                            <option value="Graduated">Graduated</option>
                            <option value="Alumni">Alumni</option>
                          </MUI.Select>
                        
                        </MUI.FormControl>
                      )}
                    />
                    {errors.scholarStatus && (
                      <p id='errMsg'> <MUI.InfoIcon className='infoErr'/>{errors.scholarStatus?.message}</p>
                    )}
                </MUI.Grid>
                    
                    {/* Add more form fields as needed */}
                </MUI.DialogContent>

                  <MUI.DialogActions>
                    {/* Add action buttons, e.g., Save Changes and Cancel */}
                    <MUI.Button onClick={handleCancelScholar} color="primary">
                      Cancel
                    </MUI.Button>
                    <MUI.Button 
                    type='submit'
                    variant='contained'
                    color="primary">
                      {editScholar ? 'Save Changes' : 'Add Scholar'}
                    </MUI.Button>
                  </MUI.DialogActions>

              </MUI.Dialog>

          
        </MUI.Grid>
        <DevTool control={control} />
      </MUI.Container>
    </MUI.ThemeProvider>
  </Layout>
  )
}
