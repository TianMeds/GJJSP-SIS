import React from 'react'
import * as MUI from '../../import';
import Layout from '../Components/Layout';
import { Search, SearchIconWrapperV2,StyledInputBaseV2 } from '../Components/Styles';
import useDialogStore from '../Components/store';
import {useForm, Controller } from 'react-hook-form';
import { useState, useEffect } from 'react';

export default function User({state}) {
 
  const {
    anchorEl,
    setAnchorEl,
    user,
    handleOpenUser,
    handleCloseUser,
    name,
    emailAddress,
    role,
    setName,
    setEmailAddress,
    setRole,
    filteredRole,
    setFilteredRole,
    addUser = ((store) => store.addUser),
    deleteRow = ((store) => store.deleteRow),
  } = useDialogStore();
  
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors }
  } = useForm();
  const users = useDialogStore((store) => store.users.filter((user) => user.state === state));

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
};

  const handleClose = () => {
    setAnchorEl(null);
};
useEffect(() =>{
  console.log(filteredRole)
  console.log(role)
},[filteredRole, role])

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


        {/* Add User Dialog */}
        <MUI.Dialog open={user} onClose={handleCloseUser} fullWidth maxWidth="sm">
          {/* Content of the Dialog */}
          <MUI.DialogTitle>Add Users</MUI.DialogTitle>
            <MUI.DialogContent>
              {/* Form Fields of New User*/}
                <MUI.InputLabel htmlFor="name">Name</MUI.InputLabel>
                  <MUI.TextField 
                    placeholder='Name' 
                    value={name}
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
                <MUI.Button onClick={handleCloseUser} color="primary">
                  Cancel
                </MUI.Button>
                  <MUI.Button onClick={() => { 
                      addUser(name, emailAddress, role);
                      setName('')
                      setEmailAddress('')
                      setRole('')
                      handleCloseUser();
                    }}
                    color="primary">
                    Add
                  </MUI.Button>
              </MUI.DialogActions>

        </MUI.Dialog>
        <MUI.Container sx={{mt: 4, display: 'flex', alignItems: 'center' }}>
          <Search>
            <SearchIconWrapperV2>
              <MUI.SearchIcon />
            </SearchIconWrapperV2>
            <StyledInputBaseV2
              placeholder="Search for names, groups, or email addresses"
              inputProps={{ 'aria-label': 'search' }}
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
                        .reverse()
                        .map((user, index) => (
                          (user.name || user.emailAddress || user.role) && (
                      <MUI.TableRow key={index} className='user' >
                      <MUI.TableCell sx={{border: 'none'}}  className='name'>{user.name}</MUI.TableCell>
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
                          getContentAnchorEl=""
                          >
                          <MUI.MenuItem onClick="">
                              Update
                          </MUI.MenuItem>
                          <MUI.MenuItem onClick={() => {
                               deleteRow(users.length - 1);
                          }}>
                              Delete
                          </MUI.MenuItem>
                          {/* Add more options as needed */}
                          </MUI.Menu>
                      </MUI.TableCell>
                      </MUI.TableRow>
                       )
                       ))}
                    </MUI.TableBody>
                  </MUI.Table>
                  <MUI.Divider sx={{width:'100%'}}/>
                </MUI.TableContainer>   
      </MUI.Grid>
      </MUI.Container>
  </Layout>
  )
}
