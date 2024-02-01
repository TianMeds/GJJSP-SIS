import React, {useEffect, useState} from 'react'
import * as MUI from '../../import';
import Layout from '../../component/Layout/SidebarNavbar/Layout';
import theme from '../../context/theme';
import { Link, useNavigate } from 'react-router-dom';
import { Search, SearchIconWrapperV2,StyledInputBaseV2 } from '../../component/Layout/SidebarNavbar/Styles';
import useScholarStore from '../../store/ScholarStore';
import useUserStore from '../../store/UserStore';
import useLoginStore from '../../store/LoginStore';
import { DevTool } from "@hookform/devtools";
import {useForm, Controller } from 'react-hook-form';
import axios from '../../api/axios';
import useAuthStore from '../../store/AuthStore';

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
  const navigate = useNavigate();
  
  //Zustand hooks 
  const {getAuthToken,alertOpen, setAlertOpen, errorOpen, setErrorOpen,alertMessage, setAlertMessage, errorMessage, setErrorMessage} = useAuthStore();
  const {scholars, setScholars,setSelectedScholar} = useScholarStore();
  const [scholarsData, setScholarsData] = useState([]);
  const { setLoading, setLoadingMessage} = useLoginStore();
  const {setAvatarInitial, users, setUsers, setSelectedUser} = useUserStore();

  const onSubmit = (data) => {
    console.log("Form submitted", data)
  }


//Fetch Scholar Details
useEffect(() => {
  setAlertOpen(true);
  setErrorOpen(false);
  setAlertMessage('Please wait updating scholar list');
  
  const fetchScholarData = async () => {
    try {
      const authToken = useAuthStore.getState().getAuthToken();
      const response = await axios.get('/api/scholars', {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      });

      if (response.status === 200) {
        setScholarsData(response.data.data); // Make sure this line is updating the scholars state
        setAlertOpen(false);
        setAlertMessage("Updated Scholars List")
      } else {
        setErrorOpen(true);
        setErrorMessage("Error updating scholars list")
      }
    } catch (err) {
      if (response.status === 401) {
        setErrorOpen(true);
        setErrorMessage("Session expired. Please login again.")
        navigate('/login')
      }
    }
  }

  fetchScholarData();
}, []);

  // Delete Profile Scholar
  const deleteScholar = async (event, id) => {
    event.preventDefault();
    setLoading(true);
    setLoadingMessage("Deleting Scholar")
    setAlertOpen(true);
    setAlertMessage('Deleting Scholar...');
    try {
      const authToken = getAuthToken();
      const response = await axios.delete(`/api/scholars/${id}`, {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      });

      if (response.status === 200) {
        setAlertOpen(true);
        setAlertMessage("Successfully deleted scholar")
        setScholarsData(scholarsData.filter((scholar) => scholar.id !== id));
      } else {
        setErrorOpen(true);
        setErrorMessage("Error deleting scholar")
      }
    } catch (err) {
      if (response.status === 401) {
        setErrorOpen(true);
        setErrorMessage("Session expired. Please login again.")
        navigate('/login')
      }
    }
  };

  // View Profile Scholar 
  const viewScholarProfile = (scholarId) => {
    const selectedUser = scholars.find((scholar) => scholar.id === scholarId);
    
    if (selectedUser) {
      const { role_id, first_name, last_name } = selectedUser; // Accessing role_id from selectedUser 
    
      setSelectedUser(selectedUser)
      setAvatarInitial(`${first_name.charAt(0).toUpperCase()}${last_name.charAt(0).toUpperCase()}`);

      const rolePath = role_id === 1 || role_id === 2 ? '/profile' : role_id === 3 ? '/scholar-profile' : '/*';
      navigate(rolePath);
    } else {
      // Handle the case when selectedUser is not found
      // For example, show an error message or handle the navigation differently
      console.error('User not found');
    }
  };

  const {
    handleOpenScholar,
    handleCloseScholar,
    filteredScholar,
    setFilteredScholar,
    searchQuery,
    handleSearch,
    editScholar,
    setEditScholar,
  } = useScholarStore();

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

                <MUI.Button variant="contained" id='addButton' >
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
                  {scholarsData.map((scholar, index) => (
                    <MUI.TableRow key={index} className='scholar'>
                      <MUI.TableCell sx={{border: 'none'}} className='scholarName'>
                        {`${scholar.user_first_name} ${scholar.user_middle_name || ""} ${scholar.user_last_name}`}
                      </MUI.TableCell>
                      <MUI.TableCell sx={{border: 'none'}} className='scholarEmail'>
                        {scholar.user_email_address}
                      </MUI.TableCell>
                      <MUI.TableCell sx={{border: 'none'}} className='scholarCatergory'>
                        {scholar.scholarship_categ_name}
                      </MUI.TableCell>
                      <MUI.TableCell sx={{border: 'none'}} className='scholarStatus'>
                        {scholar.scholar_status_name}
                      </MUI.TableCell>
                      <MUI.TableCell sx={{border: 'none', color: '#2684ff' }}>
                        <MUI.IconButton color="inherit" onClick={() => viewScholarProfile(scholar.id)}>
                          <MUI.TableChartIcon sx={{transform: 'rotate(90deg)'}} />
                        </MUI.IconButton>
                        <MUI.IconButton color="inherit">
                          <MUI.BorderColorIcon />
                        </MUI.IconButton>
                        <MUI.IconButton
                          color="inherit"
                          sx={{ textTransform: 'capitalize' }}
                          onClick={(event) => deleteScholar(event, scholar.id)}
                        >
                          <MUI.DeleteIcon />
                        </MUI.IconButton>
                      </MUI.TableCell>
                    </MUI.TableRow>
                  ))}
                </MUI.TableBody>
            </MUI.Table>
            <MUI.Divider sx={{width:'100%'}}/>
          </MUI.TableContainer>   

           {/* Add Scholar Dialog */}
           {/* <MUI.Dialog  fullWidth maxWidth="xs" component='form' onSubmit={handleSubmit(onSubmit)} noValidate>
                <MUI.DialogTitle variant='h3' sx={{fontWeight: 'bold'}}>Add Scholar</MUI.DialogTitle>
                <MUI.Typography variant='body2' id="dialogLabel">Required fields are marked with an asterisk *</MUI.Typography>
                <MUI.DialogContent>
                
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
                    
                </MUI.DialogContent>

                  <MUI.DialogActions>
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

              </MUI.Dialog> */}

          
        </MUI.Grid>

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


        <DevTool control={control} />
      </MUI.Container>
    </MUI.ThemeProvider>
  </Layout>
  )
}
