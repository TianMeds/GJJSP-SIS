import React from 'react'
import * as MUI from '../../import';
import Layout from '../Components/Layout';
import { Search, SearchIconWrapperV2,StyledInputBaseV2 } from '../Components/Styles';
import useDialogStore from '../Components/store';

export default function School() {
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
    addSchool = ((store) => store.addSchool), 
  } = useDialogStore();
  return (
    <Layout>
     <MUI.Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <MUI.Grid container spacing={3}>

      <MUI.Grid item xs={12}>
        <MUI.Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} alignItems="center" justifyContent="space-between">
          <MUI.Typography variant="h1" sx={{ fontWeight: 'bold', fontSize: '1.5rem' }}>Schools</MUI.Typography>
                    
            {/* Add User Button */}
            <MUI.Button variant="contained" color="primary" sx={{ textTransform: 'none' }} onClick="">
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

                      <MUI.TableRow  className='user' >
                      <MUI.TableCell sx={{border: 'none'}}  className='schoolName'></MUI.TableCell>
                      <MUI.TableCell sx={{border: 'none'}}  className='Address'></MUI.TableCell>
                      <MUI.TableCell sx={{border: 'none'}}  className='Type'></MUI.TableCell>
                      <MUI.TableCell sx={{border: 'none'}}  className='CurrentPeriod'></MUI.TableCell>
                      <MUI.TableCell sx={{border: 'none'}}>
                          <MUI.IconButton
                          color="inherit"
                          onClick=""
                          sx={{ textTransform: 'capitalize' }}
                          >
                          <MUI.MoreHorizIcon />
                          </MUI.IconButton>
                          <MUI.Menu
                          anchorEl=""
                          open=""
                          onClose=""
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
                          <MUI.MenuItem >
                              Delete
                          </MUI.MenuItem>
                          {/* Add more options as needed */}
                          </MUI.Menu>
                      </MUI.TableCell>
                      </MUI.TableRow>
                    </MUI.TableBody>
                  </MUI.Table>
                  <MUI.Divider sx={{width:'100%'}}/>
                </MUI.TableContainer>   
      
      </MUI.Grid>
      </MUI.Container>
  </Layout>
  )
}
