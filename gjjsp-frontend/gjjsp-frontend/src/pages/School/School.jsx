import React, { useState, useEffect } from 'react'
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

  const handleAddSchool = () => {
    if(editSchool) {
      updateSchool(selectedSchool.id, schoolName, schoolAddress, schoolType, schoolPeriod);
      setEditSchool(false);
    }
    else{
      addSchool(schoolName, schoolAddress, schoolType, schoolPeriod);
    }
    setSchoolName('');
    setSchoolAddress('');
    setSchoolType('');
    setSchoolPeriod('');
    handleCloseSchool();
  }

  const handleEditSchool = (schoolId) => {
    const selectedSchool = schools.find((school) => school.id === schoolId);
    if (selectedSchool) {
      setSelectedSchool(selectedSchool);
      setSchoolName(selectedSchool.schoolName);
      setSchoolAddress(selectedSchool.schoolAddress);
      setSchoolType(selectedSchool.schoolType);
      setSchoolPeriod(selectedSchool.schoolPeriod);
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
    handleCloseSchool();
    setSchoolName('');
    setSchoolAddress('');
    setSchoolType('');
    setSchoolPeriod('');
    setEditSchool(false);
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
          <MUI.Typography variant="h1" sx={{ fontWeight: 'bold', fontSize: '1.5rem', mb: 2 }}>Schools</MUI.Typography>
                    
            {/* Add User Button */}
            <MUI.Button variant="contained" color="primary" sx={{ textTransform: 'none', width: {xs: '100px', md: '200px'}, whiteSpace: 'nowrap' }} onClick={handleOpenSchool}>
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

        <MUI.FormControl sx={{  width: '180px', border: '2px solid #032539', borderRadius: '8px'}}>
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
                        <option value="" disabled>Select School Type</option>
                        <option value="State University">State University</option>
                        <option value="Private University">Private University</option>
                      </MUI.Select>
                    
                    </MUI.FormControl>
                    

                    <MUI.InputLabel htmlFor="schoolPeriod">Current Period</MUI.InputLabel>
                    <MUI.FormControl sx={{  width: '100%', borderRadius: '8px',}}>
                      <MUI.Select
                        value={schoolPeriod}
                        onChange={(e) => setSchoolPeriod(e.target.value)} 
                        native
                      >
                        <option value="" disabled>Select School Year</option>
                        {YearOption()}
                      </MUI.Select>
                    
                    </MUI.FormControl>

              </MUI.DialogContent>

                <MUI.DialogActions>
                  {/* Add action buttons, e.g., Save Changes and Cancel */}
                  <MUI.Button onClick={handleCancelSchool} color="primary">
                    Cancel
                  </MUI.Button>
                    <MUI.Button onClick={handleAddSchool}
                      color="primary">
                      {editSchool ? 'Save Changes' : 'Add'}
                    </MUI.Button>
                </MUI.DialogActions>

          </MUI.Dialog>
      </MUI.Grid>
      </MUI.Container>
  </Layout>
  )
}
