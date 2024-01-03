import React from 'react'
import * as MUI from '../../import'
import { useState } from 'react'
import Layout from '../../component/Layout/SidebarNavbar/Layout'
import theme from '../../context/theme';
import { Link } from 'react-router-dom';
import { Search, SearchIconWrapperV2,StyledInputBaseV2 } from '../../component/Layout/SidebarNavbar/Styles';

export default function Partner() {
  return (
    <Layout>
        <MUI.ThemeProvider theme={theme}>
        <MUI.Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <MUI.Grid container spacing={3}>

            <MUI.Grid item xs={12}>
              <MUI.Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} alignItems={{xs: 'left', md: 'center'}} margin={2} justifyContent="space-between">
              <MUI.Typography variant="h1" id="tabsTitle" sx={{color: 'black'}}>Partners</MUI.Typography>
                        
                {/* Add User Button */}
                <MUI.Button variant="contained" id='addButton'>
                  <MUI.PersonAddAltOutlinedIcon sx={{mr: 1}}/>
                  <MUI.Typography variant='body2'>Add Partners</MUI.Typography>
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

              <MUI.FormControl>
                <MUI.Select
                  native
                  sx={{width: '100px', border: '1px solid rgba(0,0,0,0.2)',
                  boxShadow: '11px 7px 15px -3px rgba(0,0,0,0.1)', borderRadius: '15px', height: '50px'}}
                >
                  <option value="All">All</option>
                  <option value="Holy Spirit National College">Holy Spirit National College</option>
                  <option value="Asia Pacific College">Asia Pacific College</option>
                </MUI.Select>
              </MUI.FormControl>
            </MUI.Container>

            {/* -------- Table Section  ----------*/}
          <MUI.TableContainer sx={{ backgroundColor: '#fbf3f2', margin: '2rem 0 0 1rem' }}>
            <MUI.Table> 
              <MUI.TableHead>
                <MUI.TableRow>
                  <MUI.TableCell>Name</MUI.TableCell>
                  <MUI.TableCell>Mobile Number</MUI.TableCell>
                  <MUI.TableCell>School</MUI.TableCell>
                  <MUI.TableCell>Action</MUI.TableCell>
                </MUI.TableRow>
              </MUI.TableHead>
                <MUI.TableBody>
                    <MUI.TableRow className='user' >
                      <MUI.TableCell sx={{border: 'none'}}  className='partnerName'>Christian Medallada</MUI.TableCell>
                      <MUI.TableCell sx={{border: 'none'}}  className='partnerMobileNum'>09452395356</MUI.TableCell>
                      <MUI.TableCell sx={{border: 'none'}}  className='partnerSchool'>Asia Pacific College</MUI.TableCell>
                      <MUI.TableCell sx={{border: 'none',  color: '#2684ff' }}>

                        <MUI.IconButton color="inherit">
                          <MUI.BorderColorIcon />
                        </MUI.IconButton>

                        <MUI.IconButton color="inherit" sx={{ textTransform: 'capitalize' }}>
                          <MUI.DeleteIcon />
                        </MUI.IconButton>

                      </MUI.TableCell>
                    </MUI.TableRow>
                </MUI.TableBody>
            </MUI.Table>
            <MUI.Divider sx={{width:'100%'}}/>
          </MUI.TableContainer>   

          
          </MUI.Grid>
        </MUI.Container>
        </MUI.ThemeProvider>
    </Layout>
  )
}
