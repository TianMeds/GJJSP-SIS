import React, {useEffect,lazy, Suspense} from 'react'
import axios from '../../api/axios';

//Components
import * as MUI from '../../import';
import Layout from '../../component/Layout/SidebarNavbar/Layout';
import { Search, SearchIconWrapperV2,StyledInputBaseV2 } from '../../component/Layout/SidebarNavbar/Styles';
import theme from '../../context/theme';

//Zustand Components
import useUserStore from '../../store/UserStore';
import useLoginStore from '../../store/LoginStore';
import useAuthStore from '../../store/AuthStore';

//React Hook Form
import {useForm, Controller } from 'react-hook-form';
import { DevTool } from "@hookform/devtools";
import {useNavigate} from 'react-router-dom';
import classNames from 'classnames';
const LazyErrMsg = lazy(() => import('../../component/ErrorMsg/ErrMsg'));

//Regex Validations 
const USER_REGEX = /^[A-Za-z.-]+(\s*[A-Za-z.-]+)*$/;
const EMAIL_REGEX =  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const CONTACT_REGEX = /^\+?63\d{10}$/

//Reseting Form Values 
const FormValues = {
  first_name: "",
  middle_name: "",
  last_name: "",
  user_mobile_num: "",
  email_address: "",
  password: "",
  role_id: "",
  user_status: "",
}

export default function User({state}) {

  const form  = useForm();
  const { register, control, handleSubmit, formState, reset, validate} = form
  const { errors } = formState;

  const {users, setUsers, user, handleOpenUser, handleCloseUser, filteredRole, setFilteredRole, editUser, setEditUser, searchQuery, handleSearch, 
    selectedUser, setSelectedUser, setAvatarInitial
  } = useUserStore();

  const { showPassword, handleTogglePassword, setLoading, setLoadingMessage, setErrMsg} = useLoginStore();

  const {getAuthToken, alertOpen, setAlertOpen, alertMessage, setAlertMessage, errorOpen, setErrorOpen, errorMessage, setErrorMessage} = useAuthStore();

  const navigate = useNavigate();

  // Post Data to API 
  const onSubmit = async (data, event) => {
    event.preventDefault();
    const authToken = useAuthStore.getState().getAuthToken();
  
    const config = {
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      },
    };
  
  try {
    if(editUser) {
      setAlertOpen(true);
      setAlertMessage('Updating user...');
      setLoading(true);
      setLoadingMessage("Updating user")
      const response  = await axios.put(`/api/users/${selectedUser.id}`, {...data}, config)
      handleCloseUser(); // Call the hook after successful submission
      setEditUser(false)
      setSelectedUser(null);
      setLoading(false);
      setAlertOpen(true);
      setAlertMessage('User Updated');
    }
    else{
      setAlertOpen(true);
      setAlertMessage('Adding user...');
      setLoading(true)
      setLoadingMessage("Adding user")
      const response = await axios.post('/api/register', {
        first_name: data.first_name,
        middle_name: data.middle_name,
        last_name: data.last_name,
        user_mobile_num: data.user_mobile_num,
        email_address: data.email_address,
        password: data.password,
        role_id: data.role_id,
        user_status: data.user_status,
      }, config)
        setAlertOpen(true);
        setAlertMessage('User Added');
        setLoading(false)
        handleCloseUser(); // Call the hook after successful submission
    }
    const response = await axios.get('/api/users', {
      headers: {
        'Authorization': `Bearer ${authToken}`
      }
    });
    if (response.status === 200) {
      setUsers(response.data.data)
      setAlertOpen(true);
      setAlertMessage('Users list has been updated');
    } else {
      setErrorOpen(true);
      setAlertMessage('Failed to fetch data');
    }
    form.reset(FormValues);
  } 
  catch (error) {

    if(error.response?.status === 422){
      setErrorOpen(true)
      setErrorMessage("Please fill up all the required fields");
    }
    else if(error.response?.status === 409){
      setErrorOpen(true)
      setErrorMessage("Email already been taken");
    }
    else if(error.response?.status === 500){
      setErrorMessage("Server Error");
      setLoading(false);
    }
    else if(error.response?.status === 401){
      setErrorOpen(true)
      setErrorMessage("You've been logout");
      navigate('/login')
    }
    else{
      setErrorOpen(true);
      setErrorMessage("Something went wrong");
    }
  } 
};

  // Get Function Data
  useEffect(() => {
    setAlertOpen(true);
    setErrorOpen(false);
    setAlertMessage('Please wait updating users list');
    const fetchUsers = async () => {
      try {
        const authToken = useAuthStore.getState().getAuthToken();
        const response = await axios.get('/api/users',{
          headers: {
            'Authorization': `Bearer ${authToken}`
          }
        });

        if (response.status === 200) {
          setUsers(response.data.data);
          setAlertOpen(true);
          setAlertMessage('Updated Users List');
        } else {
          setErrorOpen(true);
          setErrorMessage('Failed to fetch data');
        }
      
      } catch (error) {
        if(error.response?.status === 401){
          setErrorOpen(true)
          setErrorMessage("You've been logout");
          navigate('/login')
        }
      }
    };

    fetchUsers();
  }, []);

  // Update Function Data
  const updateUser = (userId) => {
    const selectedUser = users.find(user => user.id === userId);
    setEditUser(true);
    setSelectedUser(selectedUser)
    handleOpenUser();
    form.reset(selectedUser);
  }

  // Delete Function Data
  const deleteUser = async (event, id) => {
    event.preventDefault();
    setLoading(true);
    setLoadingMessage("Deleting user")
    setAlertOpen(true);
    setAlertMessage('Deleting user...');
    const authToken = useAuthStore.getState().getAuthToken();
  
    try {
      await axios.delete(`/api/users/${id}`, {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      });
  
      const response = await axios.get('/api/users', {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      });
  
      if (response.status === 200) {
        const filteredUsers = response.data.data.map(user => {
          const { password, ...filteredUser } = user;
          return filteredUser;
        });
  
        setUsers(filteredUsers);
      }
      else {
        setErrorOpen(true);
        setErrorMessage('Failed to fetch data');
      }
  
      setAlertOpen(true)
      setAlertMessage('User Deleted');
      setLoading(false);
    } catch (error) {
      if (error.response?.status === 401) {
        setErrorOpen(true);
        setErrorMessage("You've been logged out");
      } else if (error.response?.status === 404) {
        setErrorOpen(true);
        setErrorMessage('User not found');
      } else if (error.response?.status === 403) {
        setErrorOpen(true);
        setErrorMessage('Unauthorized access');
      } else if (error.response?.status === 500) {
        setErrorOpen(true);
        setErrorMessage('Server Error');
      } else if (!error.response) {
        setErrorOpen(true);
        setErrorMessage('Network Error: Failed to reach the server');
      } else {
        setErrorOpen(true);
        setErrorMessage('An unexpected error occurred');
      }
    }
  };

  //View Profile Function
  const viewProfile = (userId) => {
    const selectedUser = users.find((user) => user.id === userId);
    
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


  const handleCancelUser = () => {
    form.reset(FormValues); // Reset the form fields
    setEditUser(false);
    handleCloseUser(); // Close the dialog
  }

  const roleMapping = { 
    'Administrator': 1,
    'Scholar Manager': 2,
    'Scholar': 3,
  };


  
  return (
  <Layout>
    <MUI.ThemeProvider theme={theme}>
    <MUI.Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <MUI.Grid container spacing={3}>
      
        <MUI.Grid item xs={12} mb={4}>
          <MUI.Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} alignItems={{xs: 'left', md: 'center'}} margin={2} justifyContent="space-between">
            <MUI.Typography variant="h1" id="tabsTitle" sx={{color: 'black'}}>Users</MUI.Typography>
                      
              {/* Add User Button */}
              <MUI.Button variant="contained" id='addButton' onClick={handleOpenUser}>
                <MUI.PersonAddAltOutlinedIcon sx={{mr: 1}}/>
                <MUI.Typography variant='body2'>Add Users</MUI.Typography>
              </MUI.Button> 

            </MUI.Box>
        </MUI.Grid>

        <MUI.Grid sx={{ borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', overflow: 'auto', width: '100%' }}>

        <MUI.Container sx={{mt: 4, mb: 4,  display: 'flex', alignItems: 'center' }}>
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
              value={filteredRole}
              onChange={(e) => setFilteredRole(e.target.value)} 
              native
              sx={{width: '100px', border: '1px solid rgba(0,0,0,0.2)',
              boxShadow: '11px 7px 15px -3px rgba(0,0,0,0.1)', borderRadius: '15px', height: '50px'}}
            >
              <option value="All">All</option>
              <option value="Administrator">Scholarship Administrator</option>
              <option value="Scholar Manager">Scholar Manager</option>
              <option value="Scholar">Scholar</option>
            </MUI.Select>
          </MUI.FormControl>
          </MUI.Container>


          {/* -------- Table Section  ----------*/}
          <MUI.TableContainer>
            <MUI.Table> 
              <MUI.TableHead>
                <MUI.TableRow>
                  <MUI.TableCell sx={{fontWeight: 'bold', fontSize: '1rem'}}>Name</MUI.TableCell>
                  <MUI.TableCell sx={{fontWeight: 'bold', fontSize: '1rem'}}>Email</MUI.TableCell>
                  <MUI.TableCell sx={{fontWeight: 'bold', fontSize: '1rem'}}>Role</MUI.TableCell>
                  <MUI.TableCell sx={{fontWeight: 'bold', fontSize: '1rem'}}>Status</MUI.TableCell>
                  <MUI.TableCell sx={{fontWeight: 'bold', fontSize: '1rem'}}>Action</MUI.TableCell>
                </MUI.TableRow>
              </MUI.TableHead>
                <MUI.TableBody>
                  {users
                    .filter((user) => {
                      return filteredRole === 'All' ? true : (
                        user.role_id === (roleMapping[filteredRole] || null)
                      );
                    })
                    .filter((user) => 
                      (user.email_address && user.email_address.toLowerCase().includes(searchQuery?.toLowerCase())) ||
                      ((`${user.first_name} ${user.middle_name} ${user.last_name}`).toLowerCase().includes(searchQuery?.toLowerCase()))
                    )
                    .map((user, index) => (
                    <MUI.TableRow key={index} className='user' sx={{backgroundColor: index % 2 === 0 ? '#eeeeee' : 'inherit'}}>
                      <MUI.TableCell sx={{ borderBottom: '1px solid rgba(224, 224, 224, 1)' }}  className='name'>{`${user.first_name} ${user.middle_name ? user.middle_name : ''} ${user.last_name}`}</MUI.TableCell>
                      <MUI.TableCell sx={{ borderBottom: '1px solid rgba(224, 224, 224, 1)' }}  className='email'>{user.email_address}</MUI.TableCell>
                      <MUI.TableCell
                        sx={{ borderBottom: '1px solid rgba(224, 224, 224, 1)' }}
                        className="userRoles"
                      >
                        {user.role_id === 1 ? (
                          <span className="Scholarship_Administrator">Scholarship Administrator</span>
                        ) : user.role_id === 2 ? (
                          <span className="Scholar_Manager">Scholar Manager</span>
                        ) : (
                          <span className="Scholar">Scholar</span>
                        )}
                      </MUI.TableCell>
                      <MUI.TableCell sx={{ border: 'none' }}>
                        <span
                          className={classNames({
                            Active: user.user_status === 'Active',
                            Inactive: user.user_status === 'Inactive',
                            Revoked: user.user_status === 'Revoked',
                          })}
                        >
                          {user.user_status}
                        </span>
                      </MUI.TableCell>

                      <MUI.TableCell sx={{border: 'none', color: '#2684ff' }}>

                        <MUI.IconButton color="inherit" onClick={() => viewProfile(user.id)}>
                          <MUI.TableChartIcon sx={{transform: 'rotate(90deg)'}}/>
                        </MUI.IconButton>

                        <MUI.IconButton
                          color="inherit"
                          onClick={() => updateUser(user.id)}
                        >
                          <MUI.BorderColorIcon />

                        </MUI.IconButton>


                        <MUI.IconButton
                          type='button'
                          color="inherit"
                          onClick={(event) => deleteUser(event, user.id)}
                          sx={{ textTransform: 'capitalize' }}
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

          </MUI.Grid>

          {/* ------------------ Dialog Box of the  Users ---------------*/ }

          {/* Add User Dialog */}
          <MUI.Dialog open={user} onClose={handleCloseUser} fullWidth maxWidth="xs" onSubmit={handleSubmit(onSubmit)} component='form' method='post' noValidate>
            {/* Content of the Dialog */}
            <MUI.DialogTitle id="dialogTitle">{editUser ? "Edit User" : "New User"}</MUI.DialogTitle>
            <MUI.Typography variant='body2' id="dialogLabel">Required fields are marked with an asterisk *</MUI.Typography>
              <MUI.Grid sx={{marginLeft: 3}}>
                <Suspense fallback="Scholarlink Loading...">
                  <LazyErrMsg/>
                </Suspense>
              </MUI.Grid>
              <MUI.DialogContent>
                
                {/* Form Fields of New User*/}
                <MUI.Grid id="userNameGrid">
                  <MUI.InputLabel htmlFor="first_name" id="userNameLabel">First Name</MUI.InputLabel>
                    <MUI.TextField 
                      type='text'
                      id='first_name'
                      placeholder='Name' 
                      fullWidth 
                      
                      {...register("first_name", {
                        required: {
                          value: true,
                          message: 'First name is required',
                        },
                        pattern: {
                          value: USER_REGEX,
                          message: 'Names should only contain letters, periods, and hypens, with no leading or hanging spaces.',
                        }
                      })}
                    />
                    {errors.first_name && (
                     <p id='errMsg'> 
                      <MUI.InfoIcon className='infoErr'/> 
                      {errors.first_name?.message}  
                     </p>
                    )}
                </MUI.Grid>

                <MUI.Grid id="userNameGrid">
                  <MUI.InputLabel htmlFor="middle_name" id="middleNameLabel">Middle Name</MUI.InputLabel>
                    <MUI.TextField 
                      type='text'
                      id='middle_name'
                      placeholder='Name' 
                      fullWidth 

                      {...register("middle_name", {
                        pattern: {
                          value: USER_REGEX,
                          message: 'Names should only contain letters, periods, and hypens, with no leading or hanging spaces.',
                        }
                      })}
                    />
                    {errors.middle_name && (
                     <p id='errMsg'> 
                      <MUI.InfoIcon className='infoErr'/> 
                      {errors.middle_name?.message}  
                     </p>
                    )}
                </MUI.Grid>

                <MUI.Grid id="userNameGrid">
                  <MUI.InputLabel htmlFor="last_name" id="userNameLabel">Last Name</MUI.InputLabel>
                    <MUI.TextField 
                      type='text'
                      id='last_name'
                      placeholder='Name' 
                      fullWidth 
                      
                      {...register("last_name", {
                        required: {
                          value: true,
                          message: 'Last name is required',
                        },
                        pattern: {
                          value: USER_REGEX,
                          message: 'Names should only contain letters, periods, and hypens, with no leading or hanging spaces.',
                        }
                      })}
                    />
                    {errors.last_name && (
                     <p id='errMsg'> 
                      <MUI.InfoIcon className='infoErr'/> 
                      {errors.last_name?.message}  
                     </p>
                    )}
                </MUI.Grid>

                <MUI.Grid id="userMobileNumGrid">
                  <MUI.InputLabel htmlFor="user_mobile_num" id="userMobileNumLabel">Mobile Number</MUI.InputLabel>
                  <MUI.TextField 
                    type='text'
                    id='user_mobile_num'
                    placeholder='63XXX-XXXX-XXX' 
                    fullWidth 
                    {...register("user_mobile_num", {
                      required: {
                        value: true,
                        message: 'Mobile Number is required',
                      },
                      pattern: {
                        value: CONTACT_REGEX,
                        message: 'Enter your mobile number in 63 format with no spaces and symbol',
                      }
                    })}
                  />
                  {errors.user_mobile_num && (
                    <p id='errMsg'> <MUI.InfoIcon className='infoErr'/> {errors.user_mobile_num?.message}</p>
                  )}
                </MUI.Grid>

                <MUI.Grid id="emailAddressGrid">
                  <MUI.InputLabel htmlFor="email_address" id="emailAddressLabel">Email</MUI.InputLabel>
                  <MUI.TextField 
                    type='email'
                    id='email_address'
                    placeholder='Email Address' 
                    fullWidth 
                    {...register("email_address", {
                      required: {
                        value: true,
                        message: 'Email Address is required',
                      },
                      pattern: {
                        value: EMAIL_REGEX,
                        message: 'Please enter a valid email address',
                      }
                    })}
                  />
                  {errors.email_address && (
                    <p id='errMsg'> <MUI.InfoIcon className='infoErr'/> {errors.email_address?.message}</p>
                  )}
                </MUI.Grid>

                {!editUser && (
                <MUI.Grid id="passwordGrid">
                  <MUI.InputLabel htmlFor="password" id="passwordLabel">Password</MUI.InputLabel>
                  <MUI.TextField
                    type={showPassword ? 'text' : 'password'}
                    id='password'
                    placeholder='Password'
                    fullWidth
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
                    {...register("password", {
                      required: {
                        value: true,
                        message: 'Password is required',
                      }
                    })}
                  />
                  {errors.password && (
                    <p id='errMsg'> <MUI.InfoIcon className='infoErr'/> {errors.password?.message}</p>
                  )}
                </MUI.Grid>
                )}


                <MUI.Grid id="roleGrid">
                  <MUI.InputLabel htmlFor="role_id" id='roleLabel'>Role</MUI.InputLabel>
                  <Controller
                    name="role_id"
                    control={control}
                    defaultValue=''
                    rules={{ 
                      required: 'Role is required', 
                      validate: (value) => value !== '' || 'Please select a role' 
                    }}
                    render={({ field }) => (
                      
                      <MUI.FormControl sx={{ width: '100%', borderRadius: '8px' }}>
                        <MUI.Select
                          id='role_id'
                          native
                          {...field}
                        >
                          <option value="" disabled>Select Role</option>
                          <option value="1">Scholarship Administrator</option>
                          <option value="2">Scholar Manager</option>
                          <option value="3">Scholar</option>
                        </MUI.Select>
                      </MUI.FormControl>
                    )}
                  />
                  {errors.role_id && (
                    <p id='errMsg'> <MUI.InfoIcon className='infoErr'/> {errors.role_id?.message}</p>
                  )} 
                </MUI.Grid>

                <MUI.Grid id="userStatusGrid">
                  <MUI.InputLabel htmlFor="user_status" id='userStatusLabel'>Status</MUI.InputLabel>
                  <Controller
                    name="user_status"
                    control={control}
                    defaultValue=''
                    rules={{ 
                      required: 'Status is required', 
                      validate: (value) => value !== '' || 'Please select a status' 
                    }}
                    render={({ field }) => (
                      
                      <MUI.FormControl sx={{ width: '100%', borderRadius: '8px' }}>
                        <MUI.Select
                          id='user_status'
                          native
                          {...field}
                        >
                          <option value="" disabled>Select Status</option>
                          <option value="Active">Active</option>
                          <option value="Inactive">Inactive</option>
                          <option value="Revoked">Revoked</option>
                        </MUI.Select>
                      </MUI.FormControl>
                    )}
                  />
                  {errors.user_status && (
                    <p id='errMsg'> <MUI.InfoIcon className='infoErr'/> {errors.user_status?.message}</p>
                  )} 
                </MUI.Grid>

              </MUI.DialogContent>

              <MUI.DialogActions>
                {/* Add action buttons, e.g., Save Changes and Cancel */}
                <MUI.Button onClick={handleCancelUser} color="primary" id='Button'>
                  Cancel
                </MUI.Button>
                  <MUI.Button
                    color="primary" 
                    type='submit' 
                    variant='contained'
                    id='addUserBtn'
                    >
                    {editUser ? 'Save Changes' : 'Add user'}
                  </MUI.Button>
              </MUI.DialogActions>
          </MUI.Dialog>

          <DevTool control={control} />


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

      </MUI.Grid>
    </MUI.Container>
  </MUI.ThemeProvider>
  </Layout>
  )
}
