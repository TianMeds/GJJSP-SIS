import React from 'react'
import * as MUI from '../../import';
import Layout from '../../component/Layout/SidebarNavbar/Layout';
import { Search, SearchIconWrapperV2,StyledInputBaseV2 } from '../../component/Layout/SidebarNavbar/Styles';
import theme from '../../context/theme';
import useUserStore from '../../store/UserStore';
import {useForm, Controller } from 'react-hook-form';
import { DevTool } from "@hookform/devtools";
import { Form, Link } from 'react-router-dom';

const USER_REGEX = /^[A-Za-z.-]+(\s*[A-Za-z.-]+)*$/;
const EMAIL_REGEX =  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

const FormValues = {
  userName: "",
  emailAddress: "",
  role: "",
  userStatus: "",
}

export default function User({state}) {

  const form  = useForm();
  const { register, control, handleSubmit, formState, reset, validate} = form
  const { errors } = formState;

  const onSubmit = (data) => {
    console.log('Form submitted',data);  

    if(editUser) {
      updateUser(selectedUser.id, data.userName, data.emailAddress, data.role, data.userStatus);
      setEditUser(false);
      form.reset(FormValues); 
    }
    else{
      addUser(data.userName, data.emailAddress, data.role, data.userStatus);
    }
    form.reset();
    handleCloseUser();
    
  }

  const {
    user,
    handleOpenUser,
    handleCloseUser,
    filteredRole,
    setFilteredRole,
    editUser,
    setEditUser,
    updateUser,
    searchQuery,
    handleSearch,
    selectedUser,
    setSelectedUser,
    addUser = ((store) => store.addUser),
    deleteUser = ((store) => store.deleteRow),
    users = ((store) => store.users.filter((user) => user.state === state)),
  } = useUserStore();
  
  const handleEditUser = (userId) => {
    const selectedUser = users.find((user) => user.id === userId);
    if (selectedUser) {
      setSelectedUser(selectedUser);
      reset({
        userName: selectedUser.userName,
        emailAddress: selectedUser.emailAddress,
        role: selectedUser.role,
        userStatus: selectedUser.userStatus,
      });
      setEditUser(true);
      handleOpenUser();
    }
  };

  const handleDeleteUser = (userId) => {
    const selectedUser = users.find((user) => user.id === userId);
    if (selectedUser) {
      deleteUser(selectedUser.id);
    }
  }

  const handleCancelUser = () => {
    form.reset(FormValues); // Reset the form fields
    setEditUser(false);
    handleCloseUser(); // Close the dialog
  }
  
  return (
  <Layout>
    <MUI.ThemeProvider theme={theme}>
    <MUI.Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <MUI.Grid container spacing={3}>
      
        <MUI.Grid item xs={12}>
          <MUI.Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} alignItems={{xs: 'left', md: 'center'}} margin={2} justifyContent="space-between">
            <MUI.Typography variant="h1" id="tabsTitle" sx={{color: 'black'}}>Users</MUI.Typography>
                      
              {/* Add User Button */}
              <MUI.Button variant="contained" id='addButton' onClick={handleOpenUser}>
                <MUI.PersonAddAltOutlinedIcon sx={{mr: 1}}/>
                <MUI.Typography variant='body2'>Add Users</MUI.Typography>
              </MUI.Button> 

            </MUI.Box>
        </MUI.Grid>

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
          <MUI.TableContainer sx={{ backgroundColor: '#fbf3f2', margin: '2rem 0 0 1rem' }}>
            <MUI.Table> 
              <MUI.TableHead>
                <MUI.TableRow>
                  <MUI.TableCell>Name</MUI.TableCell>
                  <MUI.TableCell>Email</MUI.TableCell>
                  <MUI.TableCell>Role</MUI.TableCell>
                  <MUI.TableCell>Status</MUI.TableCell>
                  <MUI.TableCell>Action</MUI.TableCell>
                </MUI.TableRow>
              </MUI.TableHead>
                <MUI.TableBody>
                  {users
                    .filter((user) => filteredRole === "All" || user.role === filteredRole)
                    .filter((user) => 
                    (user.userName && user.userName.toLowerCase().includes(searchQuery?.toLowerCase())) ||
                    (user.emailAddress && user.emailAddress.toLowerCase().includes(searchQuery?.toLowerCase()))
                    )
                    .reverse()
                    .map((user) => (
                    (user.userName || user.emailAddress || user.role) && (
                    <MUI.TableRow key={user.id} className='user' >
                      <MUI.TableCell sx={{border: 'none'}}  className='name'>{user.userName}</MUI.TableCell>
                      <MUI.TableCell sx={{border: 'none'}}  className='email'>{user.emailAddress}</MUI.TableCell>
                      <MUI.TableCell sx={{border: 'none'}}  className='role'>{user.role}</MUI.TableCell>
                      <MUI.TableCell sx={{border: 'none'}}  className='status'>{user.userStatus}</MUI.TableCell>
                      <MUI.TableCell sx={{border: 'none', color: '#2684ff' }}>

                        <MUI.IconButton color="inherit" component={Link} to="/profile">
                          <MUI.TableChartIcon sx={{transform: 'rotate(90deg)'}}/>
                        </MUI.IconButton>

                        <MUI.IconButton
                          color="inherit"
                          onClick={() => handleEditUser(user.id)}
                        >
                          <MUI.BorderColorIcon />

                        </MUI.IconButton>


                        <MUI.IconButton
                          color="inherit"
                          onClick={() => handleDeleteUser(user.id)}
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

          {/* ------------------ Dialog Box of the  Users ---------------*/ }

          {/* Add User Dialog */}
          <MUI.Dialog open={user} onClose={handleCloseUser} fullWidth maxWidth="xs" component='form' onSubmit={handleSubmit(onSubmit)} noValidate>
            {/* Content of the Dialog */}
            <MUI.DialogTitle id="dialogTitle">New Users</MUI.DialogTitle>
            <MUI.Typography variant='body2' id="dialogLabel">Required fields are marked with an asterisk *</MUI.Typography>
              <MUI.DialogContent>
                {/* Form Fields of New User*/}
                <MUI.Grid id="userNameGrid">
                  <MUI.InputLabel htmlFor="userName" id="userNameLabel">Name</MUI.InputLabel>
                    <MUI.TextField 
                      type='text'
                      id='userName'
                      placeholder='Name' 
                      fullWidth 
                      
                      {...register("userName", {
                        required: {
                          value: true,
                          message: 'Full name is required',
                        },
                        pattern: {
                          value: USER_REGEX,
                          message: 'Names should only contain letters, periods, and hypens, with no leading or hanging spaces.',
                        }
                      })}
                    />
                    {errors.userName && (
                     <p id='errMsg'> 
                      <MUI.InfoIcon className='infoErr'/> 
                      {errors.userName?.message}  
                     </p>
                    )}
                </MUI.Grid>

                <MUI.Grid id="emailAddressGrid">
                  <MUI.InputLabel htmlFor="emailAddress" id="emailAddressLabel">Email</MUI.InputLabel>
                  <MUI.TextField 
                    type='email'
                    id='emailAddress'
                    placeholder='Email Address' 
                    fullWidth 
                    {...register("emailAddress", {
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
                  {errors.emailAddress && (
                    <p id='errMsg'> <MUI.InfoIcon className='infoErr'/> {errors.emailAddress?.message}</p>
                  )}
                </MUI.Grid>

                <MUI.Grid id="roleGrid">
                  <MUI.InputLabel htmlFor="role" id='roleLabel'>Role</MUI.InputLabel>
                  <Controller
                    name="role"
                    control={control}
                    defaultValue=''
                    rules={{ 
                      required: 'Role is required', 
                      validate: (value) => value !== '' || 'Please select a role' 
                    }}
                    render={({ field }) => (
                      
                      <MUI.FormControl sx={{ width: '100%', borderRadius: '8px' }}>
                        <MUI.Select
                          id='role'
                          native
                          {...field}
                        >
                          <option value="" disabled>Select Role</option>
                          <option value="Administrator">Scholarship Administrator</option>
                          <option value="Scholar Manager">Scholar Manager</option>
                          <option value="Scholar">Scholar</option>
                        </MUI.Select>
                      </MUI.FormControl>
                    )}
                  />
                  {errors.role && (
                    <p id='errMsg'> <MUI.InfoIcon className='infoErr'/> {errors.role?.message}</p>
                  )} 
                </MUI.Grid>

                <MUI.Grid id="userStatusGrid">
                  <MUI.InputLabel htmlFor="userStatus" id='userStatusLabel'>Status</MUI.InputLabel>
                  <Controller
                    name="userStatus"
                    control={control}
                    defaultValue=''
                    rules={{ 
                      required: 'Status is required', 
                      validate: (value) => value !== '' || 'Please select a status' 
                    }}
                    render={({ field }) => (
                      
                      <MUI.FormControl sx={{ width: '100%', borderRadius: '8px' }}>
                        <MUI.Select
                          id='userStatus'
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
                  {errors.userStatus && (
                    <p id='errMsg'> <MUI.InfoIcon className='infoErr'/> {errors.userStatus?.message}</p>
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
                    id='Button'
                    >
                    {editUser ? 'Save Changes' : 'Add user'}
                  </MUI.Button>
              </MUI.DialogActions>
          </MUI.Dialog>

          <DevTool control={control} />
      </MUI.Grid>
    </MUI.Container>
  </MUI.ThemeProvider>
  </Layout>
  )
}
