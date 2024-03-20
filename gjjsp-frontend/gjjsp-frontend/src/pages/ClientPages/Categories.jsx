import React, {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import * as MUI from '../../import';
import Layout from '../../component/Layout/SidebarNavbar/Layout';
import { Search, SearchIconWrapperV2,StyledInputBaseV2 } from '../../component/Layout/SidebarNavbar/Styles';
import theme from '../../context/theme';
import {useForm, Controller } from 'react-hook-form';
import { Form } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import axios from '../../api/axios';

// Zustand Imports 
import useAuthStore from '../../store/AuthStore';
import useLoginStore from '../../store/LoginStore';
import useScholarshipStore from '../../store/ScholarshipStore';
import usePartnerStore from '../../store/PartnerStore';

//Debugger
import { DevTool } from "@hookform/devtools";

const FormValues ={
  scholarship_categ_name: '',
  alias: '',
  benefactor: '',
  scholarship_categ_status: '',
}

export default function Scholarship({state}) {

  const form = useForm();
  const { register, control, handleSubmit, formState, reset, validate} = form
  const { errors } = formState;
  const navigate = useNavigate();
  const {auth} = useAuth();
  const role_id = auth?.user?.role_id || '';

  const {getAuthToken, alertOpen, setAlertOpen, alertMessage, setAlertMessage, errorOpen, setErrorOpen,errorMessage,setErrorMessage} = useAuthStore();

  const {setLoading, setLoadingMessage} = useLoginStore();

  const { projects, setProjects, project, searchQuery, handleSearch, filteredStatus, setFilteredStatus, handleOpenScholarship, handleCloseScholarship, selectedCategories,setSelectedCategories,editCategories,setEditCategories, currentProjectId, setCurrentProjectId, modalCateg, handleOpenModalCateg, handleCloseModalCateg, setModalCateg, deleteModal, setDeleteModal, projectIdToDelete, setProjectIdToDelete, projectIdToRestore, setProjectIdToRestore, restoreModal, setRestoreModal, filterModal, setFilterModal, handleOpenFilterModal, handleCloseFilterModal, filteredDeleted, setFilteredDeleted } = useScholarshipStore();

  const {partners, partner, setPartners, selectedProjectPartner, setSelectedProjectPartner, selectedProjectPartnerId, setSelectedProjectPartnerId} = usePartnerStore();

  // Get Project Partners Data 
  useEffect(() => {
    const fetchProjectPartners = async () => {
      try {
        const authToken = useAuthStore.getState().getAuthToken();
        const response = await axios.get('/api/project-partners', {
          headers: {
            'Authorization': `Bearer ${authToken}`
          }
        });
        if (response.status === 200) {
          setPartners(response.data.data)
        }
        else{
          setErrorOpen(true);
          setErrorMessage('Failed to fetch project partners data');
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
    fetchProjectPartners();
  },[]);
-
  
  //GET CATEGORIES DATA 
  useEffect(() => {
    setAlertOpen(true);
    setErrorOpen(false)
    setAlertMessage("Please wait updating scholarship list");
    const fetchScholarship = async () => {
      try {
        const authToken = useAuthStore.getState().getAuthToken();
        const response = await axios.get('/api/scholarships', {
          headers: {
            'Authorization': `Bearer ${authToken}`
          }
        });
      if (response.status === 200) {
        setProjects(response.data.data)
        setAlertOpen(true);
        setAlertMessage("Scholarship category list updated");
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
    fetchScholarship();
  },[]);

  const handleOpenDeleteModal = (id, first_name, last_name) => {
    setProjectIdToDelete(id);
    setSelectedCategories({first_name, last_name});
    setDeleteModal(true);
  }

  const handleCloseDeleteModal = () => {
    setProjectIdToDelete(null);
    setDeleteModal(false);
  }

  //POST CATEGORIES DATA
  const onSubmit = async (data, event) => {
    event.preventDefault();
    const authToken = useAuthStore.getState().getAuthToken();

    const config = {
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-type': 'application/json',
      }
    }
    try {
      if(editCategories){
        setAlertOpen(true);
        setAlertMessage("Please wait updating scholarship category");
        setLoading(true);
        setLoadingMessage('Updating category')
        const response = await axios.put(`/api/scholarships/${selectedCategories.id}`,{...data}, config)
        handleCloseScholarship();
        handleCloseModalCateg();
        setEditCategories(false);
        setSelectedCategories(null);
        setLoading(false);
        setAlertOpen(true);
        setAlertMessage("Scholarship category updated");
      }
      else{
        setAlertOpen(true);
        setAlertMessage("Please wait adding scholarship category");
        setLoading(true);
        setLoadingMessage('Adding category')
        const response = await axios.post('/api/scholarships',{
          scholarship_categ_name: data.scholarship_categ_name,
          alias: data.alias,
          benefactor: data.benefactor,
          scholarship_categ_status: data.scholarship_categ_status,
        }, config)
        setAlertOpen(true);
        setAlertMessage("Scholarship category added");
        setLoading(false);
        handleCloseScholarship();
        handleCloseModalCateg();
      }

      const response = await axios.get('/api/scholarships', {
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      });
      if (response.status === 200) {
        setProjects(response.data.data);
        setAlertOpen(true);
        setAlertMessage("Scholarship category list updated");
      }
      else{
        setAlertOpen(true);
        setAlertMessage("Failed to fetch scholarship category data");
      }
      form.reset(FormValues);
      setLoading(false);
    }
    catch(error){
      if(error.response?.status === 422){
        setErrorOpen(true)
        setErrorMessage("Please fill up all the required fields");
      }
      else if(error.response?.status === 500){
        setErrorMessage("Server Error");
      }
      else if(error.response?.status === 401){
        setErrorOpen(true)
        setErrorMessage("You've been logout");
        navigate('/login')
      }
      else{
        console.error('Unhandled error:', error);
        setErrorOpen(true);
        setErrorMessage("Something went wrong");
      }
      setLoading(false);
    }
  };


  //Update Scholarship categories data
  const updateCategories = (projectId) => {
    const selectedCategories = projects.find((project) => project.id === projectId );
    setEditCategories(true);
    setSelectedCategories(selectedCategories);
    setCurrentProjectId(projectId)
    handleOpenScholarship();
    form.reset(selectedCategories);
  }

  const handleOpenRestoreModal = (projectId) => {
    setProjectIdToRestore(projectId); // Set the projectIdToRestore state
    setRestoreModal(true); // Open the restore modal
  };

  const handleCloseRestoreModal = () => {
    setProjectIdToRestore(null); // Reset the projectIdToRestore state
    setRestoreModal(false); // Close the restore modal
  };

  const restoreCategories = async (projectId) => {
    setLoading(true);
    setLoadingMessage('Restoring category')
    setAlertOpen(true);
    setAlertMessage('Restoring category...');
    try {
      const authToken = getAuthToken();
      const restoreResponse = await axios.get(`/api/restoreScholarships/${projectId}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      if (restoreResponse.status === 200) {
        setAlertMessage('Category restored');
        setAlertOpen(true);
      } else {
        setErrorOpen(true);
        setErrorMessage('Failed to restore category');
      }

      const response = await axios.get('/api/scholarships', {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (response.status === 200) {
        setProjects(response.data.data);
      } else {
        setErrorOpen(true);
        setErrorMessage('Failed to fetch data');
      }
      
      setLoading(false);
    } catch (error) {
      if (error.response?.status === 401) {
        setErrorOpen(true);
        setErrorMessage("You've been logged out");
        navigate('/login');
      } else if (error.response?.status === 404) {
        setErrorOpen(true);
        setErrorMessage('Category not found');
      } else if (error.response?.status === 403) {
        setErrorOpen(true);
        setErrorMessage('Unauthorized access');
      } else if (error.response?.status === 500) {
        setErrorOpen(true);
        setErrorMessage('Server Error');
      } else if (!error.response) {
        setErrorOpen(true);
        setErrorMessage('Network Error: Failed to reach the server');
      } else {
        setErrorOpen(true);
        setErrorMessage('An unexpected error occurred');
      }
      setLoading(false);
    }
  };


  //DELETE CATEGORIES DATA
  const deleteCategories = async (event, id) => {
    event.preventDefault();
    setLoading(true);
    setLoadingMessage("Deleting category")
    setAlertOpen(true);
    setAlertMessage('Deleting category...');
    const authToken = useAuthStore.getState().getAuthToken();
  
    try {
      await axios.delete(`/api/scholarships/${id}`, {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      });
  
      const response = await axios.get('/api/scholarships', {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      });
  
      if (response.status === 200) {
       setProjects(response.data.data);
       handleCloseScholarship();
        handleCloseDeleteModal();
      }
      else {
        setErrorOpen(true);
        setErrorMessage('Failed to fetch data');
      }
  
      setAlertOpen(true)
      setAlertMessage('Category Deleted');
      setLoading(false);
    } catch (error) {
      if (error.response?.status === 401) {
        setErrorOpen(true);
        setErrorMessage("You've been logged out");
      } else if (error.response?.status === 404) {
        setErrorOpen(true);
        setErrorMessage('Category not found');
      } else if (error.response?.status === 403) {
        setErrorOpen(true);
        setErrorMessage('Unauthorized access');
      } else if (error.response?.status === 500) {
        setErrorOpen(true);
        setErrorMessage('Server Error');
      } else if (!error.response) {
        setErrorOpen(true);
        setErrorMessage('Network Error: Failed to reach the server');
      } else {
        setErrorOpen(true);
        setErrorMessage('An unexpected error occurred');
      }
    }
    setLoading(false);
  };

  const handleCancelEdit = () => {
    form.reset(FormValues);
    setEditCategories(false);
    handleCloseScholarship();
  };


  
  return (
    <Layout>
    <MUI.ThemeProvider theme={theme}>
      <MUI.Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <MUI.Grid container spacing={3}>

        <MUI.Grid item xs={12}>
          <MUI.Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} alignItems={{xs: 'left', md: 'center'}}  margin={2} justifyContent="space-between">
            <MUI.Typography variant="h1" id="tabsTitle">Categories</MUI.Typography>
                      
              {/* Add User Button */}
              <MUI.Button variant="contained" color="primary" id="addButton" onClick={handleOpenScholarship} disabled={role_id !== 1}>
                <MUI.AddCircleOutlineIcon sx={{mr: 1}}/>
                <MUI.Typography variant='body2'>Add Categories</MUI.Typography>
              </MUI.Button>
          </MUI.Box>
        </MUI.Grid>


        <MUI.Container sx={{mt: 4, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
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
                        
          <MUI.Grid>
        <MUI.FormControl sx={{ minWidth: 120, mr: 2 }}>
          <MUI.Button variant="outlined" onClick={handleOpenFilterModal} startIcon={<MUI.FilterListIcon />}>
            Add Filter
          </MUI.Button>
        </MUI.FormControl>
      </MUI.Grid>

        </MUI.Container>

       
        <MUI.Grid container spacing={3} sx={{ margin: 5 }}>
          {projects
            .filter((project) => {
              if (filteredDeleted === 'All') return true;
              if (filteredDeleted === 'Deleted') return project.deleted_at !== null;
              if (filteredDeleted === 'Not Deleted') return project.deleted_at === null;
              return true; // default case
            })
            .filter((project) => {
              return filteredStatus === 'All' ? true : (
                project.scholarship_categ_status === filteredStatus
              )
            })
            .filter((project) => 
              project.scholarship_categ_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              project.benefactor.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .sort((a, b) => {
              // First, sort by deleted status (non-deleted projects come first)
              if (a.deleted_at !== null && b.deleted_at === null) return 1;
              if (a.deleted_at === null && b.deleted_at !== null) return -1;
              
              // If both projects have the same deleted status, sort by updated_at
              return new Date(b.updated_at) - new Date(a.updated_at);
            }) 
            .map((project, index) => (
              <MUI.Grid key={index} item xs={12} sm={6} md={4}>
                <MUI.Card sx={{ maxWidth: 345 }}>
                  <MUI.CardContent sx={{ textAlign: 'center', alignItems: 'center' }}>
                    <MUI.SchoolOutlinedIcon sx={{ fontSize: 100, color: '#1e88e5' }} />
                    <MUI.Typography gutterBottom variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
                      {project.scholarship_categ_name}
                    </MUI.Typography>
                    <MUI.Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic', fontSize: '16px', margin: 2 }}>
                      {project.benefactor}
                    </MUI.Typography>
                    <MUI.Typography variant="body2" color="text.secondary" sx={{ fontSize: '18px' }}>
                      {project.scholarship_categ_status}
                    </MUI.Typography>

                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                      <div style={{ marginRight: '10px', flexGrow: 1 }}>
                        <MUI.Button
                          variant="contained"
                          sx={{
                            borderRadius: '10px',
                            borderColor: 'primary.main',
                            textTransform: 'capitalize',
                            width: '100%', // Set width to 100%
                          }}
                          onClick={() => updateCategories(project.id)}
                        >
                          <MUI.Typography variant='h5'>
                            See for Information
                          </MUI.Typography>
                        </MUI.Button>
                      </div>
                      {project.deleted_at !== null && role_id === 1 && (
                        <div style={{ flexGrow: 1 }}>
                          <MUI.Button
                            variant="contained"
                            sx={{
                              borderRadius: '10px',
                              borderColor: 'primary.main',
                              textTransform: 'capitalize',
                              width: '100%', 
                              backgroundColor: '#43a047',
                              '&:hover': {
                                backgroundColor: '#43a047', // Change color on hover
                              },
                            }}
                            onClick={() => handleOpenRestoreModal(project.id)}
                          >
                            <MUI.Typography variant='h5'>
                              Restore Category
                            </MUI.Typography>
                          </MUI.Button>
                        </div>
                      )}
                    </div>
                  </MUI.CardContent>
                </MUI.Card>
              </MUI.Grid>
            ))}
        </MUI.Grid>

         {/* Add User Dialog */}
         <MUI.Dialog open={project} onClose={handleCloseScholarship} fullWidth maxWidth="xs" component='form' onSubmit={handleSubmit(onSubmit)} noValidate>
          {/* Content of the Dialog */}
          <MUI.DialogTitle id="dialogTitle">{editCategories ?  'Edit ' + selectedCategories.scholarship_categ_name: 'New Categories'}</MUI.DialogTitle>
          <MUI.Typography variant='body2' id="dialogLabel">Required fields are marked with an asterisk *</MUI.Typography>
            <MUI.DialogContent>
              {/* Form Fields of New User*/}
              <MUI.Grid id="projectNameGrid">
                <MUI.InputLabel htmlFor="scholarship_categ_name" id="projectNameLabel">Name</MUI.InputLabel>
                  <MUI.TextField 
                    type='text'
                    id="scholarship_categ_name"
                    placeholder='Project Name'
                    disabled={role_id === 2}
                    fullWidth 

                    {...register('scholarship_categ_name', {
                      required: 'Scholarship Name is required',
                      maxLength: {
                        value: 100,
                        message: 'Scholarship Name should not exceed 100 characters'
                      }
                    })}
                  />
                  {errors.scholarship_categ_name && (
                    <p id='errMsg'> 
                      <MUI.InfoIcon className='infoErr'/> 
                      {errors.scholarship_categ_name.message}
                    </p>
                  )}
              </MUI.Grid>
              <MUI.Grid id="aliasGrid">
                <MUI.InputLabel htmlFor="alias" id="aliasLabel">Alias</MUI.InputLabel>
                <MUI.TextField 
                  type='text'
                  id="alias"
                  placeholder='Project Alias (e.g., Formal Educ)' 
                  fullWidth 
                  disabled={role_id === 2}

                  {...register('alias', {
                    required: 'Project Alias is required',
                    maxLength: {
                      value: 100,
                      message: 'Project Alias should not exceed 100 characters'
                    }
                  })}
                />
                {errors.alias && (
                  <p id='errMsg'> 
                    <MUI.InfoIcon className='infoErr'/> 
                    {errors.alias.message}
                  </p>
                )}
              </MUI.Grid>

              <MUI.Grid id="benefactorGrid">
                <MUI.InputLabel htmlFor="benefactor" id="benefactorLabel">Benefactor</MUI.InputLabel>
                <Controller
                  name="benefactor"
                  control={control}
                  defaultValue=''
                  rules={{
                    required: 'Benefactor is required',
                    validate: (value) => value !== '' || "Please select a benefactor"
                  }}
                  render={({ field }) => (
                    <MUI.FormControl sx={{  width: '100%', borderRadius: '8px',}}>
                      <MUI.Select
                        {...field}
                        id='benefactor'
                        native
                        disabled={role_id === 2}
                      >
                        <option value="" disabled>Select Benefactor</option>
                        <option value="Gado (Ganet Management Corporation)">Gado (Ganet Management Corporation)</option>
                      </MUI.Select>
                    </MUI.FormControl>
                  )}
                />
                {errors.benefactor && (
                  <p id='errMsg'> 
                    <MUI.InfoIcon className='infoErr'/> 
                    {errors.benefactor.message}
                  </p>
                )}
              </MUI.Grid>

              <MUI.Grid id="projectStatusGrid">
                <MUI.InputLabel htmlFor="scholarship_categ_status" id="projectStatusLabel">Status</MUI.InputLabel>
                <Controller
                  name="scholarship_categ_status"
                  control={control}
                  defaultValue=''
                  rules={{
                    required: 'Scholarship Status is required',
                    validate: (value) => value !== '' || "Please select a scholarship status"
                  }}
                  render={({ field }) => (
                    <MUI.FormControl sx={{  width: '100%', borderRadius: '8px',}}>
                      <MUI.Select
                        {...field}
                        id='scholarship_categ_status'
                        native
                        disabled={role_id === 2}
                      >
                        <option value="" disabled>Select Project Status</option>
                        {editCategories && <option value="Closed for Application">Closed for Application</option>}
                        <option value="Open for Application">Open for Application</option>
                      </MUI.Select>
                    </MUI.FormControl>
                  )}
                />
                {errors.projectStatus && (
                  <p id='errMsg'> 
                    <MUI.InfoIcon className='infoErr'/> 
                    {errors.projectStatus.message}
                  </p>
                )}
              </MUI.Grid>

              {editCategories && role_id === 1 && (
                <MUI.Grid>
                    <MUI.Typography id="deleteLabel" sx={{ color: 'red' }}>Danger Zone</MUI.Typography>
                        <MUI.Grid id="deleteGrid">
                            <MUI.Button
                                variant="contained"
                                color="error"
                                sx={{
                                    borderRadius: '5px',
                                    borderColor: 'primary.main',
                                    textTransform: 'capitalize',
                                }}
                                onClick={handleOpenDeleteModal}
                            >
                                <MUI.Typography variant='h6' sx={{ color: 'white' }}>
                                    Delete Category
                                </MUI.Typography>
                            </MUI.Button>
                            <MUI.Typography sx={{ fontSize: '12px', mt: 2 }}>
                                This will permanently delete this category and may affect other data.
                            </MUI.Typography>
                        </MUI.Grid>
                </MUI.Grid>
              )}

            </MUI.DialogContent>

              <MUI.DialogActions>
                {/* Add action buttons, e.g., Save Changes and Cancel */}

                {role_id !== 2 && (
                  <MUI.Button onClick={handleCancelEdit} 
                  color="primary"
                  id='Button'
                  >
                    Cancel
                  </MUI.Button>
                )}
                  <MUI.Button 
                    color="primary"
                    variant='contained'
                    id='Button'
                    onClick={handleOpenModalCateg}
                  >
                   {role_id === 2 ? 'Close' :  (editCategories ? 'Save Changes' : 'Add')}
                  </MUI.Button>
              </MUI.DialogActions>

        </MUI.Dialog>

        {/* Modal for Restore Partner */}

        <MUI.Dialog open={restoreModal} onClose={handleCloseRestoreModal}>
          <MUI.DialogTitle id="dialogTitle">Heads Up!</MUI.DialogTitle>
          <MUI.DialogContent>
            <MUI.Typography  variant='h5' ml={1} sx={{color: '#44546F'}}>
              You're about to restore this scholarship category. Are you sure you want to proceed?
            </MUI.Typography>
          </MUI.DialogContent>
          <MUI.DialogActions>
            <MUI.Button onClick={handleCloseRestoreModal} color="primary">
              Cancel
            </MUI.Button>
            <MUI.Button
              onClick={() => {
                // Call restoreCategories function passing projectIdToRestore
                restoreCategories(projectIdToRestore); 
                handleCloseRestoreModal(); // Close the modal
              }}
              color="primary"
              variant='contained'
              sx={{
                backgroundColor: '#43a047',
                  '&:hover': {
                        backgroundColor: '#43a047', // Change color on hover
                    },
              }}
            >
              Yes, Restore Category
            </MUI.Button>
          </MUI.DialogActions>
        </MUI.Dialog>
        

        {/* Modal for Add and Update Users */}
        <MUI.Dialog open={modalCateg} onClose={handleCloseModalCateg}>
          <MUI.DialogTitle id="dialogTitle" mt={2}>{editCategories ? 'Heads Up!' : 'New Categories Alert'}</MUI.DialogTitle>

          <MUI.DialogContent>
            <MUI.Typography  variant='h5' ml={1} sx={{color: '#44546F'}}>
              {editCategories ? "You're about to make some changes to a user's information. Everything look good?" : "Ready to add a new scholarship category? Make sure all the details are correct."} 
            </MUI.Typography>
          </MUI.DialogContent>

          <MUI.DialogActions>
            <MUI.Button onClick={handleCloseModalCateg} color="primary">
              Cancel
            </MUI.Button>

            <MUI.Button 
             onClick={role_id === 2 ? handleCancelEdit : handleSubmit(onSubmit)} 
              color="primary" 
              variant='contained'
              sx={{backgroundColor: '#0C66E4', borderRadius: '5px', mb: 2, mt: 2 }}
            >
              {role_id === 2 ? 'Close' :  (editCategories ? 'Save Changes' : 'Yes, Add Categories')}
            </MUI.Button>
          </MUI.DialogActions>

        </MUI.Dialog>

        {/* Modal for Delete Users */}

        <MUI.Dialog open={deleteModal} onClose={handleCloseDeleteModal}>
          <MUI.DialogTitle id="dialogTitle" mt={2}  >
            <MUI.WarningIcon sx={{color: '#CA3521', fontSize: '1.2rem'}}/>  Delete Category
          </MUI.DialogTitle>
          
          <MUI.DialogContent>
            <MUI.Typography  variant='h5' ml={1} sx={{color: '#CA3521'}}>
              Heads up! This will permanently delete's {selectedCategories?.scholarship_categ_name} category. Are you sure you want to proceed?
            </MUI.Typography>
          </MUI.DialogContent>

          <MUI.DialogActions >
            <MUI.Button onClick={handleCloseDeleteModal} color="primary" sx={{mb: 2}}>
              Cancel
            </MUI.Button>

            <MUI.Button
            onClick={(event) => deleteCategories(event, currentProjectId)}
            color="error"
            variant='contained'
            sx={{mb: 2}}
            >
              Yes, Delete Category
            </MUI.Button>
          
        </MUI.DialogActions>
            

        </MUI.Dialog>

          {/* Modal for Filter */}
          <MUI.Dialog open={filterModal} onClose={handleCloseFilterModal}>
            <MUI.DialogTitle id="dialogTitle">Filter Categories</MUI.DialogTitle>
            <MUI.DialogContent dividers>
              <MUI.Grid container spacing={2}>
                <MUI.Grid item xs={12} sm={6}>
                <MUI.FormControl fullWidth sx={{ minWidth: 120 }}>
                <MUI.InputLabel id="status-filter-label">Categories Filter</MUI.InputLabel>

                  <MUI.Select
                    value={filteredStatus}
                    onChange={(e) => setFilteredStatus(e.target.value)}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Categories Filter' }}
                    label="Categories Filter"
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
                    <MUI.MenuItem value="Closed for Application">Closed Application</MUI.MenuItem>
                    <MUI.MenuItem value="Open for Application">Open Application</MUI.MenuItem>
                  </MUI.Select>
                </MUI.FormControl>
                </MUI.Grid> 
                
                {/* New Select component for filtering deleted status */}
            <MUI.Grid item xs={12} sm={6}>
              <MUI.FormControl fullWidth sx={{ minWidth: 120 }}>
                <MUI.InputLabel id="deleted-filter-label">Deleted Filter</MUI.InputLabel>
                <MUI.Select
                  value={filteredDeleted}
                  onChange={(e) => setFilteredDeleted(e.target.value)}
                  displayEmpty
                  inputProps={{ 'aria-label': 'Deleted Filter' }}
                  label="Deleted Filter"
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
                  <MUI.MenuItem value="Deleted">Deleted</MUI.MenuItem>
                  <MUI.MenuItem value="Not Deleted">Not Deleted</MUI.MenuItem>
                </MUI.Select>
              </MUI.FormControl>
            </MUI.Grid>



              </MUI.Grid>
            </MUI.DialogContent>
            <MUI.DialogActions>
              <MUI.Button onClick={handleCloseFilterModal}>Apply</MUI.Button>
            </MUI.DialogActions>
          </MUI.Dialog>


        <DevTool control={control} />

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
