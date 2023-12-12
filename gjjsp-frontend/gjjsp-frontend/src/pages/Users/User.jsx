import React from 'react'
import * as MUI from '../../import';
import Layout from '../Components/Layout';
import { Search, SearchIconWrapperV2,StyledInputBaseV2 } from '../Components/Styles';
import useDialogStore from '../Components/store';
import useUserStore from '../Store/UserStore';
import {useForm, Controller } from 'react-hook-form';
import { useEffect, useState } from 'react';

export default function User({state}) {

  const {
    anchorEl,
    handleClose,
    handleClick,
    user,
    handleOpenUser,
    handleCloseUser,
    userName,
    emailAddress,
    role,
    setName,
    setEmailAddress,
    setRole,
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
    deleteRow = ((store) => store.deleteRow),
    users = ((store) => store.users.filter((user) => user.state === state)),
  } = useUserStore();
  
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors }
  } = useForm();


  
  const handleAddUser = () => {

    if(editUser) {
      updateUser(selectedUser.id, userName, emailAddress, role);
      setEditUser(false);
    }
    else{
      addUser(userName, emailAddress, role);
    }
     setName('');
    setEmailAddress('');
    setRole('');
    handleCloseUser();
  };

  const handleEditUser = (index) => {
    const selectedUser = users[index];
    setSelectedUser(selectedUser);
    setName(selectedUser.userName);
    setEmailAddress(selectedUser.emailAddress);
    setRole(selectedUser.role);
    setEditUser(true);
    handleOpenUser();
  };

  const handleCancelUser = () => {
    handleCloseUser();
    setName('');
    setEmailAddress('');
    setRole('');
    setEditUser(false);
  }

  useEffect(() => {
    console.log(selectedUser)
  }, [userName, emailAddress, role]
  )
  return (
  <Layout>
    <MUI.Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <MUI.Grid container spacing={3}>
      
        <MUI.Grid item xs={12}>
          <MUI.Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} alignItems="center" justifyContent="space-between">
            <MUI.Typography variant="h1" sx={{ fontWeight: 'bold', fontSize: '1.5rem' }}>Users</MUI.Typography>
                      
              {/* Add User Button */}
              <MUI.Button variant="contained" color="primary" sx={{ textTransform: 'none' }} onClick={handleOpenUser}>
                Add Users 
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

          <MUI.FormControl sx={{  width: '180px', border: '2px solid #032539', borderRadius: '8px'}}>
                    <MUI.Select
                      value={filteredRole}
                      onChange={(e) => setFilteredRole(e.target.value)} 
                      native
                    >
                      <option value="All">All</option>
                      <option value="Administrator">Scholarship Administrator</option>
                      <option value="Scholar Manager">Scholar Manager</option>
                      <option value="Scholar">Scholar</option>
                    </MUI.Select>
                  {errors?.roles?.type === "required" && <p id='errMsg'> <MUI.InfoIcon className="infoErr"/> This field is required</p>}
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
                    <MUI.TableCell>Action</MUI.TableCell>
                      </MUI.TableRow>
                      </MUI.TableHead>
                      <MUI.TableBody>
                        {users
                          .filter((user) => filteredRole === "All" || user.role === filteredRole)
                          .map((user, index) => (
                          (user.userName || user.emailAddress || user.role) && (
                          <MUI.TableRow key={index} className='user' >
                            <MUI.TableCell sx={{border: 'none'}}  className='name'>{user.userName}</MUI.TableCell>
                            <MUI.TableCell sx={{border: 'none'}}  className='email'>{user.emailAddress}</MUI.TableCell>
                            <MUI.TableCell sx={{border: 'none'}}  className='role'>{user.role}</MUI.TableCell>
                            <MUI.TableCell sx={{border: 'none'}}>
                              <MUI.IconButton
                                color="inherit"
                                onClick={handleClick}
                                sx={{ textTransform: 'capitalize' }}
                              >
                                <MUI.MoreHorizIcon />

                              </MUI.IconButton>


                                <MUI.Menu
                                  anchorEl={anchorEl}
                                  open={Boolean(anchorEl)}
                                  onClose={handleClose}
                                  anchorOrigin={{
                                      vertical: 'bottom',
                                      horizontal: 'right',
                                  }}
                                  transformOrigin={{
                                      vertical: 'top',
                                      horizontal: 'right',
                                  }}
                                 
                                >

                                  <MUI.MenuItem onClick={() => handleEditUser(index)}>
                                    Update
                                  </MUI.MenuItem>

                                  <MUI.MenuItem onClick={() => {
                                    deleteRow(users.length - 1);
                                  }}
                                  >
                                    Delete
                                  </MUI.MenuItem>

                                </MUI.Menu>
                                
                            </MUI.TableCell>
                          </MUI.TableRow>
                        )))}
                      </MUI.TableBody>
              </MUI.Table>
              <MUI.Divider sx={{width:'100%'}}/>
            </MUI.TableContainer>   

          {/* ------------------ Dialog Box of the  Users ---------------*/ }

          {/* Add User Dialog */}
          <MUI.Dialog open={user} onClose={handleCloseUser} fullWidth maxWidth="sm">
            {/* Content of the Dialog */}
            <MUI.DialogTitle>Add Users</MUI.DialogTitle>
              <MUI.DialogContent>
                {/* Form Fields of New User*/}
                  <MUI.InputLabel htmlFor="name">Name</MUI.InputLabel>
                    <MUI.TextField 
                      placeholder='Name' 
                      value={userName}
                      onChange={(e) => setName(e.target.value)} 
                      fullWidth 
                    />

                    <MUI.InputLabel htmlFor="emailAddress">Email</MUI.InputLabel>
                    <MUI.TextField 
                      placeholder='Email Address' 
                      value={emailAddress}
                      onChange={(e) => setEmailAddress(e.target.value)} 
                      fullWidth 
                    />

                    <MUI.InputLabel htmlFor="role">Role</MUI.InputLabel>
                    <MUI.FormControl sx={{  width: '100%', borderRadius: '8px',}}>
                      <MUI.Select
                        value={role}
                        onChange={(e) => setRole(e.target.value)} 
                        native
                      >
                        <option value="" disabled>Select Role</option>
                        <option value="Administrator">Scholarship Administrator</option>
                        <option value="Scholar Manager">Scholar Manager</option>
                        <option value="Scholar">Scholar</option>
                      </MUI.Select>
                      {errors?.role?.type === "required" && <p id='errMsg'> <MUI.InfoIcon className="infoErr"/> This field is required</p>}
                    </MUI.FormControl>
                      
                      {/* Add more form fields as needed */}
              </MUI.DialogContent>

                <MUI.DialogActions>
                  {/* Add action buttons, e.g., Save Changes and Cancel */}
                  <MUI.Button onClick={handleCancelUser} color="primary">
                    Cancel
                  </MUI.Button>
                    <MUI.Button onClick={handleAddUser}
                      color="primary">
                        {editUser ? 'Save Changes' : 'Add'}
                    </MUI.Button>
                </MUI.DialogActions>

          </MUI.Dialog>
      </MUI.Grid>
    </MUI.Container>
  </Layout>
  )
}
