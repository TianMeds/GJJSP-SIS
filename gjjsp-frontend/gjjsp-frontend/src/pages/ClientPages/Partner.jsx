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
  const { register, control, handleSubmit, formState, reset, watch, validate} = form
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
    schools, 
    setSchools,
    categories,
    setCategories, modalPartner, setPartnerModal, handleOpenModalPartner, handleCloseModalPartner, deleteModalPartner, setDeleteModalPartner,  partnerIdToDelete, setPartnerIdToDelete
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

  useEffect(() => {
    const fetchSchoolData = async () => {
      try {
        const authToken = useAuthStore.getState().getAuthToken();
        const response = await axios.get('/api/schools', {
          headers: {
            'Authorization': `Bearer ${authToken}`
          }
        });

        if (response.status === 200) {
          setSchools(response.data.data);
        }
        else{
          setErrorOpen(true);
          setErrorMessage('Failed to fetch scholarship data');
        }

        const categoryResponse = await axios.get('/api/scholarships', {
          headers: {
            'Authorization': `Bearer ${authToken}`
          }
        });

        if (categoryResponse.status === 200) {
          setCategories(categoryResponse.data.data);
        }
        else{
          setErrorOpen(true);
          setErrorMessage('Failed to fetch scholarship data');
        }
      }
      catch(err){
        if(err.response?.status === 401){
          setErrorOpen(true)
          setErrorMessage("You've been logout");
          navigate('/login')
        }
      }
    }
    fetchSchoolData();
  },[]);


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

        let updatedPartnerData = {
          ...data,
          scholarship_categ_id: parseInt(data.scholarship_categ_id),
          project_partner_name: data.project_partner_name,
          project_partner_mobile_num: data.project_partner_mobile_num,
        };

        if(data.school_id === 'other'){
          const response = await axios.post('/api/schools', {
            school_name: data.school_name,
            school_type: data.school_type,
            school_address: data.school_address
          }, config);
          updatedPartnerData.school_id = parseInt(response.data.data.id);
        }
        else if (Array.isArray(data.school_id)) {
          updatedPartnerData.school_id = parseInt(data.school_id[0]);
        }

        const response = await axios.put(`/api/project-partners/${selectedPartner.id}`, updatedPartnerData, config)
        handleClosePartner();
        handleCloseModalPartner();
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

        let updatedPartnerData = {
          ...data,
          scholarship_categ_id: parseInt(data.scholarship_categ_id),
          project_partner_name: data.project_partner_name,
          project_partner_mobile_num: data.project_partner_mobile_num,
        };

        if(data.school_id === 'other'){
          const response = await axios.post('/api/schools', {
            school_name: data.school_name,
            school_type: data.school_type,
            school_address: data.school_address
          }, config);
          updatedPartnerData.school_id = parseInt(response.data.data.id);
        }
        else if (Array.isArray(data.school_id)) {
          updatedPartnerData.school_id = parseInt(data.school_id[0]);
        }

        const response = await axios.post('/api/project-partners', updatedPartnerData, config)
        setAlertOpen(true);
        setAlertMessage('Adding partner please wait');
        setLoading(false);
        handleClosePartner();
        handleCloseModalPartner();
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

  const handleOpenDeleteModalPartner = (id, project_partner_name) => {
    setPartnerIdToDelete(id);
    setSelectedPartner({project_partner_name: project_partner_name});
    setDeleteModalPartner(true);
  }

  const handleCloseDeleteModalPartner = () => {
    setPartnerIdToDelete(null);
    setDeleteModalPartner(false);
  }

  const deletePartner = async (event) => {

    if(partnerIdToDelete) {
      try{
        const authToken = getAuthToken();
        setLoading(true);
        setLoadingMessage('Deleting partner');
        setAlertOpen(true);
        setAlertMessage('Please wait while deleting partner');

        await axios.delete(`/api/project-partners/${partnerIdToDelete}`, {
          headers: {
            'Authorization': `Bearer ${authToken}`
          }
        });

        const response = await axios.get('/api/project-partners', {
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
        setAlertOpen(true);
        setAlertMessage('Partner deleted');

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
  handleCloseDeleteModalPartner()
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

            <MUI.Grid item xs={12} mb={4}>
              <MUI.Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} alignItems={{xs: 'left', md: 'center'}} margin={2} justifyContent="space-between">
              <MUI.Typography variant="h1" id="tabsTitle" sx={{color: 'black'}}>Partners</MUI.Typography>
                        
                {/* Add User Button */}
                <MUI.Button variant="contained" id='addButton' onClick={handleOpenPartner}>
                  <MUI.PersonAddAltOutlinedIcon sx={{mr: 1}}/>
                  <MUI.Typography variant='body2'>Add Partners</MUI.Typography>
                </MUI.Button> 

              </MUI.Box>
            </MUI.Grid>

            <MUI.Grid sx={{ borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', width: '100%' }}>

            <MUI.Container sx={{mt: 4, mb: 4,  display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Search>
                <SearchIconWrapperV2>
                  <MUI.SearchIcon />
                </SearchIconWrapperV2>
                <StyledInputBaseV2
                  placeholder="Search for Project Partner and School"
                  inputProps={{ 'aria-label': 'search' }}
                  value={searchQuery}
                  onChange={handleSearch}
                />
              </Search>

              <MUI.FormControl variant="outlined" sx={{ minWidth: 120 }}>
                <MUI.Select
                  value={filteredPartner}
                  onChange={(e) => setFilteredPartner(e.target.value)}
                  displayEmpty
                  inputProps={{ 'aria-label': 'Filter' }}
                  startAdornment={
                    <MUI.InputAdornment position="start">
                      <MUI.FilterListIcon
                        viewBox="0 0 24 24"
                        sx={{ width: 20, height: 20, color: 'rgba(0, 0, 0, 0.54)' }}
                      />
                    </MUI.InputAdornment>
                  }
                  sx={{ borderRadius: '12px' }}
                >
                  <MUI.MenuItem value="All">All</MUI.MenuItem>
                  {schools.map((school) => (
                    <MUI.MenuItem key={school.id} value={school.id}>
                      {school.school_name}
                    </MUI.MenuItem>
                  ))}
                </MUI.Select>
              </MUI.FormControl>

              
            </MUI.Container>

            {/* -------- Table Section  ----------*/}
          <MUI.TableContainer>
            <MUI.Table> 
              <MUI.TableHead>
                <MUI.TableRow>
                  <MUI.TableCell sx={{fontWeight: 'bold', fontSize: '0.8rem'}}>Name</MUI.TableCell>
                  <MUI.TableCell sx={{fontWeight: 'bold', fontSize: '0.8rem'}}>Mobile Number</MUI.TableCell>
                  <MUI.TableCell sx={{fontWeight: 'bold', fontSize: '0.8rem'}}>School</MUI.TableCell>
                  <MUI.TableCell sx={{fontWeight: 'bold', fontSize: '0.8rem'}}>Action</MUI.TableCell>
                </MUI.TableRow>
              </MUI.TableHead>
                <MUI.TableBody>
                  {partners
                    .filter((partner) => {
                      const matchSearchQuery = partner.project_partner_name.toLowerCase().includes(searchQuery.toLowerCase());
                      const matchSchool = filteredPartner === 'All' || partner.school_id === parseInt(filteredPartner);
                      return matchSearchQuery && matchSchool;
                    })
                    .map((partner, index) => (
                    <MUI.TableRow key={index} className='partner' sx={{backgroundColor: index % 2 === 0 ? '#fbf3f2' : '#e0e0e0'}}>
                      <MUI.TableCell sx={{ borderBottom: '1px solid rgba(224, 224, 224, 1)', borderRight: '1px solid rgba(224, 224, 224, 1)', fontStyle: 'italic' }}  className='partnerName'>{partner.project_partner_name}</MUI.TableCell>
                      <MUI.TableCell sx={{ borderBottom: '1px solid rgba(224, 224, 224, 1)', borderRight: '1px solid rgba(224, 224, 224, 1)', fontStyle: 'italic' }}  className='partnerMobileNum'>{partner.project_partner_mobile_num}</MUI.TableCell>
                      <MUI.TableCell sx={{ borderBottom: '1px solid rgba(224, 224, 224, 1)', borderRight: '1px solid rgba(224, 224, 224, 1)', fontStyle: 'italic' }} className='partnerSchool'>
                        {schools.find(school => school.id === partner.school_id)?.school_name || 'School Not Found'}
                      </MUI.TableCell>
                      <MUI.TableCell sx={{ border: 'none', color: '#2684ff', display: 'flex', gap: '8px' }}>

                        <MUI.Button onClick={() => updatePartner(partner.id)} variant='contained' sx={{backgroundColor: '#0C66E4'}}>
                          Edit
                        </MUI.Button>

                        <MUI.Button onClick={(event) => handleOpenDeleteModalPartner(partner.id, partner.project_partner_name)} variant='contained' color='error'>
                          Delete
                        </MUI.Button>

                      </MUI.TableCell>
                    </MUI.TableRow>
                  ))}
                </MUI.TableBody>
            </MUI.Table>
            <MUI.Divider sx={{width:'100%'}}/>
          </MUI.TableContainer>   

          </MUI.Grid>


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

              <MUI.Grid id="scholarshipCategoryGrid">
                <MUI.InputLabel htmlFor="scholarship_categ_id" id="scholarshipCategoryLabel">Scholarship Category</MUI.InputLabel>
                <Controller
                  name="scholarship_categ_id"
                  control={control}
                  rules={{
                    required: "Scholarship Category is required",
                    validate: (value) => value !== '' || 'Please select a scholarship category'
                  }}
                  render={({ field }) =>  (
                    <MUI.FormControl sx={{  width: '100%', borderRadius: '8px' }}>
                      <MUI.Select
                        native
                        {...field}
                        id='scholarship_categ_id'
                        sx={{ mb: 2 }}
                      >
                        <option value="">Select Scholarship Category</option>
                        {categories.map((category) => (
                          <option key={category.id} value={category.id}>{category.scholarship_categ_name}</option>
                        ))}
                      </MUI.Select>
                    </MUI.FormControl>
                  )}
                />
                {errors.scholarship_categ_id && (
                  <p id='errMsg'> <MUI.InfoIcon className='infoErr'/>{errors.scholarship_categ_id?.message}</p>
                )}
              </MUI.Grid>

              <MUI.Grid id="schoolGrid">
                <MUI.InputLabel htmlFor="school_id" id="schoolLabel">School</MUI.InputLabel>
                <Controller
                  name="school_id"
                  control={control}
                  defaultValue={null}
                  rules={{
                    required: "School is required",
                    validate: (value) => value !== '' || 'Please select a school'
                  }}
                  render={({ field }) =>  (
                    <MUI.FormControl sx={{  width: '100%', borderRadius: '8px' }}>
                      <MUI.Select
                        native
                        {...field}
                        id='school_id'
                        sx={{ mb: 2 }}
                      >
                        <option value="" disabled>Select School</option>
                        {schools.map((schoolItem) => (
                          <option key={schoolItem.id} value={schoolItem.id}>{schoolItem.school_name}</option>
                        ))}
                        <option value="other">Other</option>
                      </MUI.Select>
                    </MUI.FormControl>
                  )}
                />
                {errors.school_id && (
                  <p id='errMsg'> <MUI.InfoIcon className='infoErr'/>{errors.school_id?.message}</p>
                )}
              </MUI.Grid>

              {watch('school_id') === 'other' && (
                  <MUI.Grid id="addSchoolGrid">
                    <MUI.InputLabel htmlFor="school_name" id="addSchoolLabel">Add School</MUI.InputLabel>
                    <MUI.TextField
                      id="school_name"
                      type="text"
                      {...register('school_name', {
                        required: 'School is required',
                      })}
                      sx={{ width: '100%', borderRadius: '8px', mb: 2 }}
                    />
                    {errors.school_name && (
                      <p id='errMsg'> <MUI.InfoIcon className='infoErr'/>{errors.school_name?.message}</p>
                    )}
                  </MUI.Grid>
                )}

                {watch('school_id') === 'other' && (
                  <MUI.Grid id="addSchoolGrid">
                    <MUI.InputLabel htmlFor="school_type" id="addSchoolLabel">School Type</MUI.InputLabel>
                    <MUI.TextField
                      id="school_type"
                      type="text"
                      {...register('school_type', {
                        required: 'School is required',
                      })}
                      sx={{ width: '100%', borderRadius: '8px', mb: 2 }}
                    />
                    {errors.school_type && (
                      <p id='errMsg'> <MUI.InfoIcon className='infoErr'/>{errors.school_type?.message}</p>
                    )}
                  </MUI.Grid>
                )}

                {watch('school_id') === 'other' && (
                  <MUI.Grid id="addressSchoolGrid">
                    <MUI.InputLabel htmlFor="school_address" id="addressSchoolLabel">School Address</MUI.InputLabel>
                    <MUI.TextField
                      id="school_address"
                      type="text"
                      {...register('school_address', {
                        required: 'School is required',
                      })}
                      sx={{ width: '100%', borderRadius: '8px', mb: 2 }}
                    />
                    {errors.school_address && (
                      <p id='errMsg'> <MUI.InfoIcon className='infoErr'/>{errors.school_address?.message}</p>
                    )}
                  </MUI.Grid>
                )}
               
            </MUI.DialogContent>

            <MUI.DialogActions>
              <MUI.Button onClick={handleCancelPartner} id="cancelButton">Cancel</MUI.Button>
              <MUI.Button onClick={handleOpenModalPartner} variant='contained' id="submitButton">{editPartner ? "Save Changes" : 'Add Partner'}</MUI.Button>
            </MUI.DialogActions>
          </MUI.Dialog>

          {/* -------- Add and Update Partner Dialog ----------*/}
          <MUI.Dialog open={modalPartner} onClose={handleCloseModalPartner}>
            <MUI.DialogTitle id="dialogTitle">{editPartner ? 'Heads up!' : 'New Project Partner Alert!'}</MUI.DialogTitle>

            <MUI.DialogContent>
              <MUI.Typography variant='h5' ml={1} sx={{color: '#44546F'}}>
                {editPartner ? "You're about to make some changes to a user's information. Everything look good?" : "Ready to add a new scholarship category? Make sure all the details are correct."}
              </MUI.Typography>
            </MUI.DialogContent>

            <MUI.DialogActions>
              <MUI.Button onClick={handleCloseModalPartner} id="cancelButton">Cancel</MUI.Button>
              <MUI.Button 
                onClick={handleSubmit(onSubmit)} 
                variant='contained' 
                id="submitButton"
                sx={{backgroundColor: '#0C66E4', borderRadius: '5px', mb: 2, mt: 2 }}
              >
                {editPartner ? 'Yes, Update Partner' : 'Yes, Add Partner'}
              </MUI.Button>
            </MUI.DialogActions>
          </MUI.Dialog>

          {/* -------- Delete Partner Dialog ----------*/}
          <MUI.Dialog open={deleteModalPartner} onClose={handleCloseDeleteModalPartner}>
            <MUI.DialogTitle 
              id="dialogTitle" 
              mt={2}>
              <MUI.WarningIcon 
              sx={{
                color: '#CA3521', 
                fontSize: '1.2rem'}}
            /> 
              Deleting {selectedPartner ? `${selectedPartner.project_partner_name}` : ''}
            </MUI.DialogTitle>

            <MUI.DialogContent>
              <MUI.Typography variant='h5' ml={1} sx={{color: '#44546F'}}>
              Heads up! This will permanently delete's <b>{selectedPartner ? `${selectedPartner.project_partner_name}` : ''}  </b> account. Are you sure you want to proceed?
              </MUI.Typography>
            </MUI.DialogContent>

            <MUI.DialogActions>
              <MUI.Button onClick={handleCloseDeleteModalPartner} id="cancelButton">Cancel</MUI.Button>
              <MUI.Button
                onClick={deletePartner}
                variant='contained'
                color='error'
                sx={{
                  backgroundColor: '#CA3521', 
                  borderRadius: '5px', 
                  mb: 2, 
                  mt: 2,
                  '&:hover': {
                    backgroundColor: '#CA3521', // Override hover color to stay red
                  }
                }}
              >
                Yes, Delete Partner
              </MUI.Button>
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
