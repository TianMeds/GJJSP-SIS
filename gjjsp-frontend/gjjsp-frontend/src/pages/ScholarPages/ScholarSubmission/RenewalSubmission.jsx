import React, {useState} from 'react';
import * as MUI from '../../../import';
import Layout from '../../../component/Layout/SidebarNavbar/Layout';
import { Link, useNavigate } from 'react-router-dom';
import theme from '../../../context/theme';
import useSubmissionStore from '../../../store/SubmissionStore';
import HistoryIcon from '@mui/icons-material/History';
import axios from '../../../api/axios';

import useLoginStore from '../../../store/LoginStore';
import useAuthStore from '../../../store/AuthStore';

import {useForm, Controller } from 'react-hook-form';
import { DevTool } from "@hookform/devtools";

const FormValues = {
  gwa_value: '',
  gwa_remarks: '',
}

export default function RenewalSubmission() {


  
  // Zustand Store
  const {getAuthToken, alertOpen, alertMessage, setAlertOpen, setAlertMessage, errorOpen, setErrorOpen, setErrorMessage, errorMessage} = useAuthStore();
  const {setLoading, setLoadingMessage} = useLoginStore();

  //React Hook form 
  const form  = useForm();
  const { register, control, handleSubmit, formState, reset, watch, validate, setValue} = form
  const { errors } = formState;

  const navigate = useNavigate();

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const onSubmitRenewalForm = async (data, event) => {
    event.preventDefault();
    setLoading(true);
    setLoadingMessage('Submitting renewal form...');
    const authToken = getAuthToken();

    try{
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        }
      };

      const renewalFormData = {
        gwa_value: data.gwa_value,
        gwa_remarks: data.gwa_remarks,
      };

      const renewalResponse = await axios.post(
        '/api/term-gwa',
        JSON.stringify(renewalFormData),
        config
      );

      setLoading(false);
      form.reset(FormValues);
      }
      catch(error){
        setLoading(false);
        navigate('/login')
      }
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
                  
                  <MUI.Grid item sx={{display: 'flex', alignItems: 'center'}} gap={4} xs={6}>
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
                    Renewal Form
                </MUI.Typography>
              </MUI.Grid>


            <MUI.Grid component="form"  method='post' noValidate container spacing={3} sx={{ mt: 2, ml: 2, display: 'flex' }} 
            onSubmit={handleSubmit(onSubmitRenewalForm)}>

              <MUI.Grid container item xs={12} sx={{mt: 5, ml: 2, display: 'flex'}}>

                <MUI.Grid item xs={12}>
                  <MUI.InputLabel htmlFor="gwa_value" id="gwaLabel">1. General Weighted Average</MUI.InputLabel>
                  
                  <MUI.TextField
                    id="gwa_value"
                    placeholder="Enter GWA this term"
                    fullWidth // Make the text field take up the full width
                    margin="normal" // Adjust spacing as needed
                    sx={{
                      background: '#f5f5f5',
                      color: '#00000',
                      marginLeft: 2,
                      height: 'auto',
                      marginBottom: 2,
                    }}
                    {...register("gwa_value", {
                      required: {
                          value: true,
                          message: 'GWA is required',
                      }
                    })}
                  />

                  {errors.gwa_value && (
                    <p id='errMsg'>
                        <MUI.InfoIcon className='infoErr' />
                        {errors.gwa_value?.message}
                    </p>
                  )}
                    
                </MUI.Grid>

                <MUI.Grid item xs={12}>
                  <MUI.InputLabel htmlFor="gwa_remarks" id="remarksLabel">2. Add remarks about GWA</MUI.InputLabel>
                  
                  <MUI.TextField
                    id="gwa_remarks"
                    placeholder="Add remark"
                    fullWidth // Make the text field take up the full width
                    margin="normal" // Adjust spacing as needed
                    sx={{
                      background: '#f5f5f5',
                      color: '#00000',
                      marginLeft: 2,
                      height: 'auto',
                      marginBottom: 2,
                    }}
                    {...register("gwa_remarks", {
                      required: {
                          value: true,
                          message: 'Remarks is required',
                      }
                    })}
                  />

                  {errors.gwa_remarks && (
                    <p id='errMsg'>
                        <MUI.InfoIcon className='infoErr' />
                        {errors.gwa_remarks?.message}
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

                    </MUI.TableBody>
                  </MUI.Table>
                  <MUI.Divider sx={{width:'100%'}}/>
                </MUI.TableContainer>
              </MUI.Grid>

              <MUI.Grid item xs={12} sx={{mt: 3, display: 'flex', justifyContent: 'flex-end'}}>

                <MUI.Box sx={{ ml: 1 }}>  

                <MUI.Button 
                variant='contained' 
                sx={{ mb: { xs: 1, sm: 0 } }}
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
