import React from 'react';
import * as MUI from '../../import';
import Layout from '../../component/Layout/SidebarNavbar/Layout';
import { Link } from 'react-router-dom';
import theme from '../../context/theme';
import HistoryIcon from '@mui/icons-material/History';
import axios from '../../api/axios';

import useLoginStore from '../../store/LoginStore';
import useAuthStore from '../../store/AuthStore';
import { Search, SearchIconWrapperV2,StyledInputBaseV2 } from '../../component/Layout/SidebarNavbar/Styles';

//React Hook Form
import {useForm, Controller } from 'react-hook-form';
import { DevTool } from "@hookform/devtools";

export default function GraduatingSubmitted() {

    //React Hook form 
    const form  = useForm();
    const { register, control, handleSubmit, formState, reset, watch, validate, setValue} = form
    const { errors } = formState;

  return (
    <Layout>
    <MUI.ThemeProvider theme={theme}>
        <MUI.Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <MUI.Grid container spacing={3}>
                <MUI.Grid item xs={12}>
                    <MUI.Grid item sx={{display: 'flex', alignItems: 'center'}} gap={4} xs={12}>

                        <MUI.Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} alignItems={{xs: 'left', md: 'center'}} margin={2} justifyContent="space-between">
                            <MUI.Typography variant="h1" id="tabsTitle" sx={{ color: 'black' }}>
                                Graduating Submission
                            </MUI.Typography>
                        </MUI.Box>

                    
                        <MUI.Grid id="schoolYearGrid">
                            <MUI.InputLabel htmlFor="schoolYear" id="schoolYearLabel"></MUI.InputLabel>
                            <Controller
                                name="schoolYear"
                                control={control}
                                defaultValue=""
                                render={({ field }) => (
                                <MUI.Select
                                    native
                                    {...field}
                                    id='schoolYear'
                                    sx={{border: '1px solid rgba(0,0,0,0.2)',
                                    boxShadow: '11px 7px 15px -3px rgba(0,0,0,0.1)', borderRadius: '15px', height: '50px'}}
                                >
                                    <option value="SY 2023-2024">SY 2023-2024</option>
                                    <option value="SY 2022-2023">SY 2022-2023</option>
                                    <option value="SY 2021-2022">SY 2021-2022</option>
                                    
                                </MUI.Select>
                                )}
                            />
                        </MUI.Grid>

                        <MUI.Grid id="termGrid">
                            <MUI.InputLabel htmlFor="term" id="termLabel"></MUI.InputLabel>
                            <Controller
                                name="term"
                                control={control}
                                defaultValue=""
                                render={({ field }) => (
                                <MUI.Select
                                    native
                                    {...field}
                                    id='term'
                                    sx={{border: '1px solid rgba(0,0,0,0.2)',
                                    boxShadow: '11px 7px 15px -3px rgba(0,0,0,0.1)', borderRadius: '15px', height: '50px'}}
                                >
                                    <option value="Term 1">Term 1</option>
                                    <option value="Term 2">Term 2</option>
                                    <option value="Term 3">Term 3</option>
                                </MUI.Select>
                                )}
                            />
                        </MUI.Grid>
                    </MUI.Grid>
                </MUI.Grid>

                <MUI.Grid container  ml={2} mt={8} mb={8} sx={{display: 'flex'}}>
                    <MUI.Grid item>
                        <Search>
                            <SearchIconWrapperV2>
                                <MUI.SearchIcon />
                            </SearchIconWrapperV2>
                            <StyledInputBaseV2
                                placeholder="Search for names, groups, or email addresses"
                                inputProps={{ 'aria-label': 'search' }}
                            />
                        </Search>
                    </MUI.Grid>

                    <MUI.Grid item>
                        <MUI.IconButton aria-label="filter">
                            <MUI.FilterListIcon />
                        </MUI.IconButton>
                    </MUI.Grid>

                    <MUI.Grid item>
                        <MUI.FormControl>
                            <MUI.Select
                                native
                                sx={{ width: '100%', border: '1px solid rgba(0,0,0,0.2)', boxShadow: '11px 7px 15px -3px rgba(0,0,0,0.1)', borderRadius: '15px', height: '50px' }}
                            >
                                <option value="All">All</option>
                                <option value="For Approval">For Approval</option>
                                <option value="Approved">Approved</option>
                                <option value="For Resubmission">For Resubmission</option>
                                <option value="No Submission">No Submission</option>
                            </MUI.Select>
                        </MUI.FormControl>
                    </MUI.Grid>
                </MUI.Grid>

            </MUI.Grid>

                <MUI.TableContainer sx={{ backgroundColor: '#fbf3f2' }}>
                    <MUI.Table> 
                    <MUI.TableHead>
                        <MUI.TableRow>
                        <MUI.TableCell>Scholar's Name</MUI.TableCell>
                        <MUI.TableCell>Status</MUI.TableCell>
                        <MUI.TableCell>View Submission</MUI.TableCell>
                        <MUI.TableCell>Remarks</MUI.TableCell>
                        <MUI.TableCell>Action</MUI.TableCell>
                        </MUI.TableRow>
                    </MUI.TableHead>
                        <MUI.TableBody>
                        {/* {users
                            .filter((user) => {
                            return filteredRole === 'All' ? true : (
                                user.role_id === (roleMapping[filteredRole] || null)
                            );
                            })
                            .filter((user) => 
                            (user.email_address && user.email_address.toLowerCase().includes(searchQuery?.toLowerCase())) ||
                            ((`${user.first_name} ${user.middle_name} ${user.last_name}`).toLowerCase().includes(searchQuery?.toLowerCase()))
                            )
                            .map((user, index) => ( */}
                            <MUI.TableRow  className='user' >
                            <MUI.TableCell sx={{border: 'none'}}  className='name'>Christian Medallada</MUI.TableCell>
                            <MUI.TableCell sx={{border: 'none'}}  className='email'>For Approval</MUI.TableCell>
                            
                            <MUI.TableCell sx={{border: 'none'}}  className='role'>
                                <MUI.IconButton color="inherit" component={Link} to='/graduating-view' sx={{ml: 2}}>
                                    <MUI.TableChartIcon sx={{transform: 'rotate(90deg)'}}/>
                                </MUI.IconButton>
                            </MUI.TableCell>

                            <MUI.TableCell sx={{border: 'none'}}  className='status'>
                                <MUI.IconButton color="inherit">
                                    <MUI.AddCommentOutlinedIcon />
                                </MUI.IconButton>
                            </MUI.TableCell>

                            <MUI.TableCell sx={{border: 'none', color: '#2684ff' }}>

                                <MUI.Button variant='contained'>
                                    <MUI.NotificationsIcon/>
                                    <MUI.Typography variant='h5'>
                                        Send Reminders
                                    </MUI.Typography>  
                                </MUI.Button>

                            </MUI.TableCell>
                            </MUI.TableRow>
                        {/* ))} */}
                        </MUI.TableBody>
                    </MUI.Table>
                    <MUI.Divider sx={{width:'100%'}}/>
                </MUI.TableContainer>   

        </MUI.Container>
    </MUI.ThemeProvider>
</Layout>
  )
}
