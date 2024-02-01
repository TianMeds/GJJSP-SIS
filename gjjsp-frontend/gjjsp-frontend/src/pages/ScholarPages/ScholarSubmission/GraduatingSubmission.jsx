import React, {useState} from 'react';
import * as MUI from '../../../import';
import Layout from '../../../component/Layout/SidebarNavbar/Layout';
import { Link } from 'react-router-dom';
import theme from '../../../context/theme';
import HistoryIcon from '@mui/icons-material/History';

import {useForm, Controller } from 'react-hook-form';
import { DevTool } from "@hookform/devtools";

export default function GraduatingSubmission() {

      //React Hook form 
      const form  = useForm();
      const { register, control, handleSubmit, formState, reset, watch, validate, setValue} = form
      const { errors } = formState;

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  return (
    <Layout>
    <MUI.ThemeProvider theme={theme}>
      <MUI.Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <MUI.Grid container spacing={3}>

        <MUI.Grid item xs={12}>
          <MUI.Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} alignItems={{xs: 'left', md: 'center'}} margin={2} justifyContent="space-between">
            <MUI.Typography variant="h1" id="tabsTitle" sx={{ color: 'black' }}>
              Renewal Submission
            </MUI.Typography>
            
            <MUI.Grid sx={{display: 'flex', alignItems: 'center'}} gap={4} xs={6}>
              <MUI.FormControl>
                <MUI.Select
                  native
                  sx={{border: '1px solid rgba(0,0,0,0.2)',
                  boxShadow: '11px 7px 15px -3px rgba(0,0,0,0.1)', borderRadius: '15px', height: '50px'}}
                >
                  <option value="All">SY 2023-2024</option>
                  <option value="New">SY 2022-2023</option>
                  <option value="For Renewal">SY 2021-2022</option>
                </MUI.Select>
              </MUI.FormControl>



              <MUI.FormControl>
                <MUI.Select
                  native
                  sx={{border: '1px solid rgba(0,0,0,0.2)',
                  boxShadow: '11px 7px 15px -3px rgba(0,0,0,0.1)', borderRadius: '15px', height: '50px'}}
                >
                  <option value="All">Term 1</option>
                  <option value="New">Term 2</option>
                  <option value="For Renewal">Term 3</option>
                </MUI.Select>
              </MUI.FormControl>

            </MUI.Grid>

            {/* Submission History button */}
            <MUI.Button variant="contained" component={Link} to="" id="addButton">
              <HistoryIcon sx={{ mr: 1 }} />
              <MUI.Typography variant="body2">Submission history</MUI.Typography>
            </MUI.Button>

          </MUI.Box>
        </MUI.Grid>


              <MUI.Grid item xs={12}>
                <MUI.Typography variant='h3' sx={{fontWeight: 'bold'}}>
                  Graduating Form
                </MUI.Typography>
              </MUI.Grid>

            <MUI.Grid component="form">
           
              <MUI.Grid container item xs={12} sx={{mt: 5, ml: 2, display: 'flex'}}>

              <MUI.Grid item xs={12}>
                <MUI.InputLabel htmlFor="future_company_name" id="futureCompanyNameLabel">1. Future Company Name</MUI.InputLabel>
                
                <MUI.TextField
                  id="future_company_name"
                  placeholder="Future Company Name"
                  fullWidth // Make the text field take up the full width
                  margin="normal" // Adjust spacing as needed
                  sx={{
                    background: '#f5f5f5',
                    color: '#00000',
                    marginLeft: 2,
                    height: 'auto',
                    marginBottom: 2,
                  }}
                  {...register("future_company_name", {
                    required: {
                        value: true,
                        message: 'Future Company Name is required',
                    }
                  })}
                />

                  {errors.future_company_name && (
                    <p id='errMsg'>
                        <MUI.InfoIcon className='infoErr' />
                        {errors.company_name?.message}
                    </p>
                  )}
              </MUI.Grid>

            <MUI.Grid item xs={12}>
              <MUI.InputLabel htmlFor="future_company_location" id="futureCompanyLocationLabel">2. Future Company Location</MUI.InputLabel>
              
              <MUI.TextField
                id="future_company_location"
                placeholder="Future Company Location"
                fullWidth // Make the text field take up the full width
                margin="normal" // Adjust spacing as needed
                sx={{
                  background: '#f5f5f5',
                  color: '#00000',
                  marginLeft: 2,
                  height: 'auto',
                  marginBottom: 2,
                }}
                {...register("future_company_location", {
                  required: {
                      value: true,
                      message: 'Future Company Location is required',
                  }
                })}
              />

                {errors.future_company_location && (
                  <p id='errMsg'>
                      <MUI.InfoIcon className='infoErr' />
                      {errors.future_company_location?.message}
                  </p>
                )}
            </MUI.Grid>

            <MUI.Grid item xs={12}>
              <MUI.InputLabel htmlFor="future_position" id="futureJobLabel">3. Future Job Position</MUI.InputLabel>
              
              <MUI.TextField
                id="future_position"
                placeholder="Future Job Position"
                fullWidth // Make the text field take up the full width
                margin="normal" // Adjust spacing as needed
                sx={{
                  background: '#f5f5f5',
                  color: '#00000',
                  marginLeft: 2,
                  height: 'auto',
                  marginBottom: 2,
                }}
                {...register("future_position", {
                  required: {
                      value: true,
                      message: 'Future Job Position is required',
                  }
                })}
              />

                {errors.future_position && (
                  <p id='errMsg'>
                      <MUI.InfoIcon className='infoErr' />
                      {errors.future_position?.message}
                  </p>
                )}
            </MUI.Grid>


            <MUI.Grid item xs={4}>
              <MUI.InputLabel htmlFor="meeting_benefactor_sched" id="meetingDateLabel">4. Meeting with benefactor schedule</MUI.InputLabel>
              
              <MUI.TextField
                  id="meeting_benefactor_sched"
                  type='date'
                  defaultValue=""
                  fullWidth // Make the text field take up the full width
                  sx={{
                    background: '#f5f5f5',
                    color: '#00000',
                    marginLeft: 2,
                    height: 'auto',
                    marginBottom: 2,
                  }}
                  {...register("meeting_benefactor_sched", {
                    required: {
                        value: true,
                        message: 'Meeting with benefactor schedule is required',
                    }
                  })}
              />

                {errors.meeting_benefactor_sched && (
                  <p id='errMsg'>
                      <MUI.InfoIcon className='infoErr' />
                      {errors.meeting_benefactor_sched?.message}
                  </p>
                )}

            </MUI.Grid>

            </MUI.Grid>

            <MUI.Grid item xs={12}>
              <MUI.Typography variant='h3' sx={{fontWeight: 'bold'}}>
                Documentary Requirements
              </MUI.Typography>
            </MUI.Grid>

            <MUI.Grid item xs={12} sm={12}>
              <MUI.TableContainer sx={{ backgroundColor: '#fbf3f2', margin: '2rem 0 0 1rem' }}>
                <MUI.Table>
                  <MUI.TableHead>
                    <MUI.TableRow>
                      <MUI.TableCell>Description</MUI.TableCell>
                      <MUI.TableCell>File</MUI.TableCell>
                    </MUI.TableRow>
                  </MUI.TableHead>
                  <MUI.TableBody>

                    <MUI.TableRow>
                      <MUI.TableCell sx={{ border: 'none', display: 'flex', alignItems: 'flex-start', marginLeft: '-8px' }}>
                        <MUI.Typography variant='h4'>Copy of Report Card of the previous semester</MUI.Typography> <MUI.ErrorOutlineOutlinedIcon />
                      </MUI.TableCell>
                      <MUI.TableCell sx={{ border: 'none' }}>

                        <MUI.Grid sx={{ display: 'flex', alignItems: 'center' }}>

                          <MUI.Paper elevation={1} sx={{ padding: '10px', width: '150px', borderRadius: '5px', background: 'transparent', border: '1px solid #AAAAAA', mr:2,}}>
                            <MUI.Typography sx={{ color: '#777777' }}>{selectedFile ? selectedFile.name : 'Browse File'}</MUI.Typography>
                          </MUI.Paper>

                          <label htmlFor="fileInput" sx={{ cursor: 'pointer' }}>
                            <MUI.Button variant="contained" component="div" sx={{ backgroundColor: '#007bff', color: '#fff', borderRadius: '5px', cursor: 'pointer',padding: '10px', width: '100px' }}>
                              <MUI.AddIcon/> Add File
                            </MUI.Button>
                            <input
                              type="file"
                              id="fileInput"
                              style={{ display: 'none' }}
                              onChange={handleFileChange}
                            />
                          </label>
                        </MUI.Grid>

                      </MUI.TableCell>
                    </MUI.TableRow>

                    <MUI.TableRow >
                      <MUI.TableCell sx={{ border: 'none', display: 'flex', alignItems: 'flex-start', marginLeft: '-8px' }}>
                        <MUI.Typography variant='h4'>Copy of School Registration Form (RF)</MUI.Typography> <MUI.ErrorOutlineOutlinedIcon />
                      </MUI.TableCell>
                      <MUI.TableCell sx={{border: 'none'}}>

                        <MUI.Grid sx={{ display: 'flex', alignItems: 'center' }}>

                          <MUI.Paper elevation={1} sx={{ padding: '10px', width: '150px', borderRadius: '5px', background: 'transparent', border: '1px solid #AAAAAA', mr:2,}}>
                            <MUI.Typography sx={{ color: '#777777' }}>{selectedFile ? selectedFile.name : 'Browse File'}</MUI.Typography>
                          </MUI.Paper>

                          <label htmlFor="fileInput" sx={{ cursor: 'pointer' }}>
                            <MUI.Button variant="contained" component="div" sx={{ backgroundColor: '#007bff', color: '#fff', borderRadius: '5px', cursor: 'pointer',padding: '10px', width: '100px' }}>
                              <MUI.AddIcon/> Add File
                            </MUI.Button>
                            <input
                              type="file"
                              id="fileInput"
                              style={{ display: 'none' }}
                              onChange={handleFileChange}
                            />
                          </label>
                        </MUI.Grid>

                      </MUI.TableCell>  
                    </MUI.TableRow>

                    <MUI.TableRow >
                      <MUI.TableCell sx={{ border: 'none', display: 'flex', alignItems: 'flex-start', marginLeft: '-8px' }}>
                        <MUI.Typography variant='h4'>Scanned Written Essay</MUI.Typography> <MUI.ErrorOutlineOutlinedIcon sx={{ml: 9}}/>
                      </MUI.TableCell>
                      <MUI.TableCell sx={{border: 'none'}}>
                        
                      <MUI.Grid sx={{ display: 'flex', alignItems: 'center' }}>

                        <MUI.Paper elevation={1} sx={{ padding: '10px', width: '150px', borderRadius: '5px', background: 'transparent', border: '1px solid #AAAAAA', mr:2,}}>
                          <MUI.Typography sx={{ color: '#777777' }}>{selectedFile ? selectedFile.name : 'Browse File'}</MUI.Typography>
                        </MUI.Paper>

                        <label htmlFor="fileInput" sx={{ cursor: 'pointer' }}>
                          <MUI.Button variant="contained" component="div" sx={{ backgroundColor: '#007bff', color: '#fff', borderRadius: '5px', cursor: 'pointer',padding: '10px', width: '100px' }}>
                            <MUI.AddIcon/> Add File
                          </MUI.Button>
                          <input
                            type="file"
                            id="fileInput"
                            style={{ display: 'none' }}
                            onChange={handleFileChange}
                          />
                        </label>
                      </MUI.Grid>

                      </MUI.TableCell>
                    </MUI.TableRow>

                    <MUI.TableRow >
                    <MUI.TableCell sx={{ border: 'none', display: 'flex', alignItems: 'flex-start', marginLeft: '-8px' }}>
                        <MUI.Typography variant='h4'> Letter of gratitude to benefactor</MUI.Typography> <MUI.ErrorOutlineOutlinedIcon />
                      </MUI.TableCell>
                      <MUI.TableCell sx={{border: 'none'}}>

                      <MUI.Grid sx={{ display: 'flex', alignItems: 'center' }}>

                        <MUI.Paper elevation={1} sx={{ padding: '10px', width: '150px', borderRadius: '5px', background: 'transparent', border: '1px solid #AAAAAA', mr:2,}}>
                          <MUI.Typography sx={{ color: '#777777' }}>{selectedFile ? selectedFile.name : 'Browse File'}</MUI.Typography>
                        </MUI.Paper>

                        <label htmlFor="fileInput" sx={{ cursor: 'pointer' }}>
                          <MUI.Button variant="contained" component="div" sx={{ backgroundColor: '#007bff', color: '#fff', borderRadius: '5px', cursor: 'pointer',padding: '10px', width: '100px' }}>
                            <MUI.AddIcon/> Add File
                          </MUI.Button>
                          <input
                            type="file"
                            id="fileInput"
                            style={{ display: 'none' }}
                            onChange={handleFileChange}
                          />
                        </label>
                      </MUI.Grid>

                      </MUI.TableCell>
                    </MUI.TableRow>

                    <MUI.TableRow >
                    <MUI.TableCell sx={{ border: 'none', display: 'flex', alignItems: 'flex-start', marginLeft: '-8px' }}>
                        <MUI.Typography variant='h4'>Statement of account issued by the school</MUI.Typography> <MUI.ErrorOutlineOutlinedIcon />
                      </MUI.TableCell>
                      <MUI.TableCell sx={{border: 'none'}}>

                      <MUI.Grid sx={{ display: 'flex', alignItems: 'center' }}>

                        <MUI.Paper elevation={1} sx={{ padding: '10px', width: '150px', borderRadius: '5px', background: 'transparent', border: '1px solid #AAAAAA', mr:2,}}>
                          <MUI.Typography sx={{ color: '#777777' }}>{selectedFile ? selectedFile.name : 'Browse File'}</MUI.Typography>
                        </MUI.Paper>

                        <label htmlFor="fileInput" sx={{ cursor: 'pointer' }}>
                          <MUI.Button variant="contained" component="div" sx={{ backgroundColor: '#007bff', color: '#fff', borderRadius: '5px', cursor: 'pointer',padding: '10px', width: '100px' }}>
                            <MUI.AddIcon/> Add File
                          </MUI.Button>
                          <input
                            type="file"
                            id="fileInput"
                            style={{ display: 'none' }}
                            onChange={handleFileChange}
                          />
                        </label>
                      </MUI.Grid>

                      </MUI.TableCell>
                    </MUI.TableRow>

                    <MUI.TableRow >
                    <MUI.TableCell sx={{ border: 'none', display: 'flex', alignItems: 'flex-start', marginLeft: '-8px' }}>
                        <MUI.Typography variant='h4'> Graduation Picture</MUI.Typography> <MUI.ErrorOutlineOutlinedIcon />
                      </MUI.TableCell>
                      <MUI.TableCell sx={{border: 'none'}}>

                      <MUI.Grid sx={{ display: 'flex', alignItems: 'center' }}>

                        <MUI.Paper elevation={1} sx={{ padding: '10px', width: '150px', borderRadius: '5px', background: 'transparent', border: '1px solid #AAAAAA', mr:2,}}>
                          <MUI.Typography sx={{ color: '#777777' }}>{selectedFile ? selectedFile.name : 'Browse File'}</MUI.Typography>
                        </MUI.Paper>

                        <label htmlFor="fileInput" sx={{ cursor: 'pointer' }}>
                          <MUI.Button variant="contained" component="div" sx={{ backgroundColor: '#007bff', color: '#fff', borderRadius: '5px', cursor: 'pointer',padding: '10px', width: '100px' }}>
                            <MUI.AddIcon/> Add File
                          </MUI.Button>
                          <input
                            type="file"
                            id="fileInput"
                            style={{ display: 'none' }}
                            onChange={handleFileChange}
                          />
                        </label>
                      </MUI.Grid>

                      </MUI.TableCell>
                    </MUI.TableRow>

                    <MUI.TableRow >
                    <MUI.TableCell sx={{ border: 'none', display: 'flex', alignItems: 'flex-start', marginLeft: '-8px' }}>
                        <MUI.Typography variant='h4'>Transcript of records</MUI.Typography> <MUI.ErrorOutlineOutlinedIcon />
                      </MUI.TableCell>
                      <MUI.TableCell sx={{border: 'none'}}>

                      <MUI.Grid sx={{ display: 'flex', alignItems: 'center' }}>

                        <MUI.Paper elevation={1} sx={{ padding: '10px', width: '150px', borderRadius: '5px', background: 'transparent', border: '1px solid #AAAAAA', mr:2,}}>
                          <MUI.Typography sx={{ color: '#777777' }}>{selectedFile ? selectedFile.name : 'Browse File'}</MUI.Typography>
                        </MUI.Paper>

                        <label htmlFor="fileInput" sx={{ cursor: 'pointer' }}>
                          <MUI.Button variant="contained" component="div" sx={{ backgroundColor: '#007bff', color: '#fff', borderRadius: '5px', cursor: 'pointer',padding: '10px', width: '100px' }}>
                            <MUI.AddIcon/> Add File
                          </MUI.Button>
                          <input
                            type="file"
                            id="fileInput"
                            style={{ display: 'none' }}
                            onChange={handleFileChange}
                          />
                        </label>
                      </MUI.Grid>

                      </MUI.TableCell>
                    </MUI.TableRow>

                  </MUI.TableBody>
                </MUI.Table>
                <MUI.Divider sx={{width:'100%'}}/>
              </MUI.TableContainer>
            </MUI.Grid>


            <MUI.Grid item xs={12} sx={{mt: 3, display: 'flex', justifyContent: 'flex-end'}}>

              <MUI.Box sx={{ ml: 1 }}>  

              <MUI.Button variant='contained' sx={{ mb: { xs: 1, sm: 0 } }}
                type='submit'
              >
                Submit
              </MUI.Button>


                <MUI.Button variant='text' sx={{color: '#091E42', ml: { xs: 2, sm: 2 }, mb: { xs: 1, sm: 0 } }}>
                  Save for now
                </MUI.Button>

              </MUI.Box>
              </MUI.Grid>
          </MUI.Grid>
        </MUI.Grid>

        <DevTool control={control} />
      </MUI.Container>
    </MUI.ThemeProvider>
  </Layout>
  )
}
