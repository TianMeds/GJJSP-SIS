import React, {useEffect} from 'react'
import * as MUI from '../../import'
import Layout from '../../component/Layout/SidebarNavbar/Layout'
import theme from '../../context/theme';
import { Link, Form } from 'react-router-dom';
import { DevTool } from "@hookform/devtools";
import {useForm, Controller } from 'react-hook-form';
import usePartnerStore from '../../store/PartnerStore';
import { Search, SearchIconWrapperV2,StyledInputBaseV2 } from '../../component/Layout/SidebarNavbar/Styles';
import {useNavigate} from 'react-router-dom';
import axios from '../../api/axios';
import useLoginStore from '../../store/LoginStore';
import useAuthStore from '../../store/AuthStore';

const USER_REGEX = /^[A-Za-z.-]+(\s*[A-Za-z.-]+)*$/;

const FormValues = {
  project_partner_name: '',
  project_partner_mobile_num: '',
  school_id: '',
}

export default function Partner({state}) {

  const form  = useForm();
  const { register, control, handleSubmit, formState, reset, validate} = form
  const { errors } = formState;
  const navigate = useNavigate();
  
  const { 
    partners,
    partner,
    setPartners,
    searchQuery,
    handleSearch,
    setEditPartner, 
    editPartner, 
    handleClosePartner, 
    handleOpenPartner, 
    selectedPartner, 
    setSelectedPartner, 
    filteredPartner, 
    setFilteredPartner, 
  } = usePartnerStore();  

  const {setLoading, setLoadingMessage} = useLoginStore();
  const {getAuthToken, alertOpen, setAlertOpen, alertMessage, setAlertMessage, errorOpen, setErrorOpen,errorMessage,setErrorMessage} = useAuthStore();


  //Get Partners Data
  useEffect(() => {
    setAlertOpen(true);
    setErrorOpen(false);
    setAlertMessage("Please wait updating Partners List");

    const fetchPartner = async () => {
      try {
        const authToken = useAuthStore.getState().getAuthToken();
        const response = await axios.get('/api/project-partners', {
          headers: {
            'Authorization' : `Bearer ${authToken}`
          }
        });
        if (response.status === 200) {
          setPartners(response.data.data)
          setAlertOpen(true);
          setAlertMessage('Project partners list updated');
        }
        else{
          setErrorOpen(true);
          setErrorMessage('Something went wrong while fetching project partners list');
        }
      }
      catch(err){
        if(err.response?.status === 401){
          setErrorOpen(true);
          setErrorMessage('Unauthorized Access');
          navigate('/login')
        }
      }
    }
    fetchPartner();
  }, []);


  //Add Partner
  const onSubmit = async (data, event) => {
    event.preventDefault();
    const authToken = useAuthStore.getState().getAuthToken();

    const config = {
      headers: {
        'Authorization' : `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      }
    }

    try{
      if(editPartner) {
        setAlertOpen(true);
        setAlertMessage('Please wait while updating partner');
        setLoading(true);
        setLoadingMessage('Updating partner');
        const response = await axios.put(`/api/project-partners/${selectedPartner.id}`, {...data}, config)
        handleClosePartner();
        setEditPartner(false);
        setLoading(false)
        setAlertOpen(true);
        setAlertMessage('Partner updated');
      }
      else{
        setAlertOpen(true);
        setAlertMessage('Please wait while adding partner');
        setLoading(true);
        setLoadingMessage('Adding partner');
        const response = await axios.post('/api/project-partners', {
          project_partner_name: data.project_partner_name,
          project_partner_mobile_num: data.project_partner_mobile_num,
          school_id: data.school_id,
        }, config)
        setAlertOpen(true);
        setAlertMessage('Adding partner please wait');
        setLoading(false);
        handleClosePartner();
      }
      const response = await axios.get('/api/project-partners',{
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      });
      if (response.status === 200) {
        setPartners(response.data.data);
        setAlertOpen(true);
        setAlertMessage('Project partners list updated');
      }
      else{
        setAlertOpen(true);
        setAlertMessage('Something went wrong while fetching project partners list');
      }
      form.reset(FormValues);
    }
    catch(err){
      if(err.response?.status === 401){
        setErrorOpen(true);
        setErrorMessage("You've been logout");
        navigate('/login')
      }
      else if(err.response?.status === 422){
        setErrorOpen(true);
        setErrorMessage('Please fill up all the required fields');
      }
      else{
        setErrorOpen(true);
        setErrorMessage('Something went wrong');
      }
    }
  }

  //Update function for partner
  const updatePartner = (partnerId) => {
    const selectedPartner = partners.find((partner) => partner.id === partnerId);
    setEditPartner(true);
    setSelectedPartner(selectedPartner);
    handleOpenPartner();
    form.reset(selectedPartner);
  }

  //Delete function for partner
  const deletePartner = async (event, id) => {
    event.preventDefault();
    setLoading(true);
    setLoadingMessage('Deleting partner');
    setAlertOpen(true);
    setAlertMessage('Please wait while deleting partner');
    const authToken = useAuthStore.getState().getAuthToken();

    try{
      await axios.delete(`/api/project-partners/${id}`, {
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      });
      const response = await axios.get('/api/project-partners',{
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      });
      if (response.status === 200) {
        setPartners(response.data.data);
        setAlertOpen(true);
        setAlertMessage('Project partners list updated');
      }
      else{
        setAlertOpen(true);
        setAlertMessage('Something went wrong while fetching project partners list');
      }
      setLoading(false);
    }
    catch(err){
      if(err.response?.status === 401){
        setErrorOpen(true);
        setErrorMessage("You've been logout");
        navigate('/login')
      }
      else{
        setErrorOpen(true);
        setErrorMessage('Something went wrong');
      }
    }
  }
  
  const handleCancelPartner = () => {
    form.reset(FormValues);
    setEditPartner(false);
    handleClosePartner();
  }


  return (
    <Layout>
        <MUI.ThemeProvider theme={theme}>
        <MUI.Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <MUI.Grid container spacing={3}>

            <MUI.Grid item xs={12}>
              <MUI.Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} alignItems={{xs: 'left', md: 'center'}} margin={2} justifyContent="space-between">
              <MUI.Typography variant="h1" id="tabsTitle" sx={{color: 'black'}}>Partners</MUI.Typography>
                        
                {/* Add User Button */}
                <MUI.Button variant="contained" id='addButton' onClick={handleOpenPartner}>
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
                  value={searchQuery}
                  onChange={handleSearch}
                />
              </Search>
                            

              <MUI.IconButton aria-label="filter">
                <MUI.FilterListIcon />
              </MUI.IconButton>

              <MUI.FormControl>
                <MUI.Select
                  value={filteredPartner}
                  onChange={(e) => setFilteredPartner(e.target.value)}
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
                  {partners
                    .map((partner, index) => (
                    <MUI.TableRow key={index} className='partner' >
                      <MUI.TableCell sx={{border: 'none'}}  className='partnerName'>{partner.project_partner_name}</MUI.TableCell>
                      <MUI.TableCell sx={{border: 'none'}}  className='partnerMobileNum'>{partner.project_partner_mobile_num}</MUI.TableCell>
                      <MUI.TableCell sx={{border: 'none'}}  className='partnerSchool'>{partner.school_id}</MUI.TableCell>
                      <MUI.TableCell sx={{border: 'none',  color: '#2684ff' }}>

                        <MUI.IconButton color="inherit" onClick={() => updatePartner(partner.id)}>
                          <MUI.BorderColorIcon />
                        </MUI.IconButton>

                        <MUI.IconButton color="inherit" sx={{ textTransform: 'capitalize' }} onClick={(event) => deletePartner(event, partner.id)}>
                          <MUI.DeleteIcon />
                        </MUI.IconButton>

                      </MUI.TableCell>
                    </MUI.TableRow>
                  ))}
                </MUI.TableBody>
            </MUI.Table>
            <MUI.Divider sx={{width:'100%'}}/>
          </MUI.TableContainer>   


          {/* -------- Add Partner Dialog ----------*/}
          <MUI.Dialog open={partner} onClose={handleClosePartner} fullWidth maxWidth="xs" component='form' onSubmit={handleSubmit(onSubmit)} noValidate>
            <MUI.DialogTitle id="dialogTitle">{editPartner ? 'Edit Partner' : 'Add Partner'}</MUI.DialogTitle>
            <MUI.Typography variant='body2' id="dialogLabel">Required fields are marked with an asterisk *</MUI.Typography>
            <MUI.DialogContent>
              
              <MUI.Grid id="partnerNameGrid">
                <MUI.InputLabel htmlFor="project_partner_name" id="partnerNameLabel">Name</MUI.InputLabel>
                <MUI.TextField
                  type='text'
                  id="project_partner_name"
                  placeholder='Christian Medallada'
                  fullWidth

                  {...register('project_partner_name', {
                    required: {
                      value: true,
                      message: 'Partner Name is required'
                    },
                    pattern: {
                      value: USER_REGEX,
                      message: 'Names should only contain letters, periods, and hypens, with no leading or hanging spaces.'
                    }
                  })}
                />
                {errors.project_partner_name && (
                  <p id='errMsg'>
                    <MUI.InfoIcon className='infoErr'/>
                    {errors.project_partner_name.message}
                  </p>
                )}   
              </MUI.Grid>

              <MUI.Grid id="partnerMobileNumGrid">
                <MUI.InputLabel htmlFor="project_partner_mobile_num" id="partnerMobileNumLabel">Mobile Number</MUI.InputLabel>
                <MUI.TextField
                  type='text'
                  id="project_partner_mobile_num"
                  placeholder='09123456789'
                  fullWidth

                  {...register('project_partner_mobile_num', {
                    required: {
                      value: true,
                      message: 'Mobile Number is required'
                    },
                  })}
                />
                {errors.project_partner_mobile_num && (
                  <p id='errMsg'>
                    <MUI.InfoIcon className='infoErr'/>
                    {errors.project_partner_mobile_num?.message}
                  </p>
                )}
              </MUI.Grid>

              <MUI.Grid id="partnerSchoolGrid">
                <MUI.InputLabel htmlFor="school_id" id="partnerSchoolLabel">School</MUI.InputLabel>
                <MUI.TextField
                  type='text'
                  id="school_id"
                  placeholder='school'
                  fullWidth

                  {...register('school_id', {
                    required: {
                      value: true,
                      message: 'School is required'
                    },
                  })}
                />
                {errors.school_id && (
                  <p id='errMsg'>
                    <MUI.InfoIcon className='infoErr'/>
                    {errors.school_id?.message}
                  </p>
                )}
              </MUI.Grid>
               
            </MUI.DialogContent>

            <MUI.DialogActions>
              <MUI.Button onClick={handleCancelPartner} id="cancelButton">Cancel</MUI.Button>
              <MUI.Button type='submit' variant='contained' id="submitButton">{editPartner ? "Save Changes" : 'Add Partner'}</MUI.Button>
            </MUI.DialogActions>
          </MUI.Dialog>

          <MUI.Snackbar
            open={alertOpen}
            autoHideDuration={5000}
            onClose={() => setAlertOpen(false)}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            <MUI.MuiAlert onClose={() => setAlertOpen(false)} variant="filled" severity="success" sx={{ width: '100%' }}>
              {alertMessage}
            </MUI.MuiAlert>
          </MUI.Snackbar>

          <MUI.Snackbar
            open={errorOpen}
            autoHideDuration={5000}
            onClose={() => setErrorOpen(false)}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            <MUI.MuiAlert onClose={() => setErrorOpen(false)} variant='filled' severity='error' sx={{width: '100%'}}>
              {errorMessage}
            </MUI.MuiAlert>
          </MUI.Snackbar>

          </MUI.Grid>
        </MUI.Container>
        </MUI.ThemeProvider>
    </Layout>
  )
}
