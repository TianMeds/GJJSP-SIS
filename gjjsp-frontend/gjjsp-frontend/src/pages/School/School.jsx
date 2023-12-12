import React from 'react'
import * as MUI from '../../import';
import Layout from '../Components/Layout';
import { Search, SearchIconWrapperV2,StyledInputBaseV2 } from '../Components/Styles';
import useDialogStore from '../Components/store';
import useSchoolStore from '../Store/SchoolStore';

export default function School({state}) {
  const {
    school,
    schoolName,
    schoolAddress,
    schoolType,
    schoolPeriod,
    setSchoolName,
    setSchoolAddress,
    setSchoolType,
    setSchoolPeriod,
    handleOpenSchool,
    handleCloseSchool,
    addSchool = ((store) => store.addSchool), 
    deleteSchool = ((store) => store.deleteRow),
    schools = ((store) => store.schools.filter((school) => school.state === state)),
  } = useSchoolStore();

  return (
    <Layout>
     <MUI.Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <MUI.Grid container spacing={3}>

      <MUI.Grid item xs={12}>
        <MUI.Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} alignItems="center" justifyContent="space-between">
          <MUI.Typography variant="h1" sx={{ fontWeight: 'bold', fontSize: '1.5rem' }}>Schools</MUI.Typography>
                    
            {/* Add User Button */}
            <MUI.Button variant="contained" color="primary" sx={{ textTransform: 'none' }} onClick={handleOpenSchool}>
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
              placeholder="Search for Scholarship Project or Benefactor"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
                        

        <MUI.IconButton aria-label="filter">
          <MUI.FilterListIcon />
        </MUI.IconButton>

        <MUI.FormControl sx={{  width: '180px', border: '2px solid #032539', borderRadius: '8px'}}>
                  <MUI.Select
                    value=""

                    native
                  >
                    <option value="All">All</option>
                    <option value="Closed for Application">Closed Application</option>
                    <option value="Open for Application">Open Application</option>
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
                        .map((school, index) => (
                          (school.schoolName || school.schoolAddress || school.schoolType || school.schoolPeriod) && (
                      <MUI.TableRow key={index}  className='user' >
                      <MUI.TableCell sx={{border: 'none'}}  className='schoolName'>{school.schoolName}</MUI.TableCell>
                      <MUI.TableCell sx={{border: 'none'}}  className='Address'>{school.schoolAddress}</MUI.TableCell>
                      <MUI.TableCell sx={{border: 'none'}}  className='Type'>{school.schoolType}</MUI.TableCell>
                      <MUI.TableCell sx={{border: 'none'}}  className='CurrentPeriod'>{school.schoolPeriod}</MUI.TableCell>
                      <MUI.TableCell sx={{border: 'none'}}>
                      <MUI.IconButton
                                color="inherit"
                                onClick={() => handleEditUser(user.id)}
                                sx={{ marginLeft: -2 }}
                              >
                                <MUI.BorderColorOutlinedIcon />

                              </MUI.IconButton>

                              <MUI.IconButton
                                color="inherit"
                                onClick={() => handleDeleteUser(user.id)}
                                sx={{ textTransform: 'capitalize' }}
                              >
                                <MUI.DeleteOutlineOutlinedIcon />

                              </MUI.IconButton>
                          {/* Add more options as needed */}
                      </MUI.TableCell>
                      </MUI.TableRow>
                      )
                       ))}
                    </MUI.TableBody>
                  </MUI.Table>
                  <MUI.Divider sx={{width:'100%'}}/>
                </MUI.TableContainer>   
      

        {/* -------- Add School Dialog ----------*/}
        <MUI.Dialog open={school} onClose={handleCloseSchool} fullWidth maxWidth="sm">
            {/* Content of the Dialog */}
            <MUI.DialogTitle>Add Schools</MUI.DialogTitle>
              <MUI.DialogContent>
                {/* Form Fields of New User*/}
                  <MUI.InputLabel htmlFor="name">Name</MUI.InputLabel>
                    <MUI.TextField 
                      placeholder='School Name' 
                      value={schoolName}
                      onChange={(e) => setSchoolName(e.target.value)} 
                      fullWidth
                      sx={{mb: 2}}
                    />

                    <MUI.InputLabel htmlFor="schoolAddress">School Address</MUI.InputLabel>
                    <MUI.TextField 
                      placeholder='School Address' 
                      value={schoolAddress}
                      onChange={(e) => setSchoolAddress(e.target.value)} 
                      fullWidth 
                      sx={{mb: 2}}
                    />

                    <MUI.InputLabel htmlFor="schoolType">Type</MUI.InputLabel>
                    <MUI.FormControl sx={{  width: '100%', borderRadius: '8px',}}>
                      <MUI.Select
                        value={schoolType}
                        onChange={(e) => setSchoolType(e.target.value)} 
                        native
                        sx={{mb: 2}}
                      >
                        <option value="" disabled>Select Role</option>
                        <option value="Administrator">Scholarship Administrator</option>
                        <option value="Scholar Manager">Scholar Manager</option>
                        <option value="Scholar">Scholar</option>
                      </MUI.Select>
                    
                    </MUI.FormControl>
                    

                    <MUI.InputLabel htmlFor="schoolPeriod">Current Period</MUI.InputLabel>
                    <MUI.FormControl sx={{  width: '100%', borderRadius: '8px',}}>
                      <MUI.Select
                        value={schoolPeriod}
                        onChange={(e) => setSchoolPeriod(e.target.value)} 
                        native
                      >
                        <option value="" disabled>Select Role</option>
                        <option value="Administrator">Scholarship Administrator</option>
                        <option value="Scholar Manager">Scholar Manager</option>
                        <option value="Scholar">Scholar</option>
                      </MUI.Select>
                    
                    </MUI.FormControl>

              </MUI.DialogContent>

                <MUI.DialogActions>
                  {/* Add action buttons, e.g., Save Changes and Cancel */}
                  <MUI.Button onClick={handleCloseSchool} color="primary">
                    Cancel
                  </MUI.Button>
                    <MUI.Button onClick={() => { 
                        addSchool(schoolName, schoolAddress, schoolType, schoolPeriod);
                        setSchoolName(''),
                        setSchoolAddress(''),
                        setSchoolType(''),
                        setSchoolPeriod(''),
                        handleCloseSchool();
                      }}
                      color="primary">
                      Add
                    </MUI.Button>
                </MUI.DialogActions>

          </MUI.Dialog>
      </MUI.Grid>
      </MUI.Container>
  </Layout>
  )
}
