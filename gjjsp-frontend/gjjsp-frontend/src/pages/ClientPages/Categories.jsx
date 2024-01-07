import React, {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import * as MUI from '../../import';
import Layout from '../../component/Layout/SidebarNavbar/Layout';
import { Search, SearchIconWrapperV2,StyledInputBaseV2 } from '../../component/Layout/SidebarNavbar/Styles';
import theme from '../../context/theme';
import {useForm, Controller } from 'react-hook-form';
import { Form } from 'react-router-dom';
import axios from '../../api/axios';

// Zustand Imports 
import useAuthStore from '../../store/AuthStore';
import useLoginStore from '../../store/LoginStore';
import useScholarshipStore from '../../store/ScholarshipStore';

//Debugger
import { DevTool } from "@hookform/devtools";

const projectPartners = [
  '1',
  '2',
  '3',
  '4',
]

// const projectPartners = [
//   "BACPAT Youth Development Foundation Inc.",
//   "Welcome Home Foundation Inc. (BACPAT Scholars)",
//   "Education for Former OSY",
//   "Bahay Maria Children Center Formal",
//   "Canossian Sisters – Endorsed Grantees c/o Sr. Elizabeth Tolentino",
//   "Canossian Sisters – Endorsed Grantees c/o Sr. Elizabeth Tolentino & Sr. Mila Reyes",
//   "Canossian Sisters – Endorsed Scholars",
//   "Canossian Sisters – Educational Scholars by Sister Milagros Reyes",
//   "WHFI Formal Education for Former Out of School Youth",
//   "WHFI Formal Education for former OSY",
//   "WHFI Bacpat Youth Development Foundation, Inc.",
//   "WHFI- Literacy Program, Bacolod",
//   "WHFI- Literacy Program, Malaybalay",
//   "WHFI – Literacy Program",
//   "Benefactors Endorsed Applicant",
//   "Benefactors & Secretariat Endorsed",
//   "Benefactors Endorsed Scholars & GJJS Secretariat",
//   "Archdiocese of Jaro Youth Ministry & Balay ni Maria Foundation",
//   "Cara & Matthew Financial Aid for Out of School Youth (Urban Poor and Youth with Disabilities)",
//   "Outreach Project to help DEAF of Malaybay for Skills Training & Spiritual Formation Sessions",
//   "Jeri Jalandoni – Education for the Youth Diocese",
//   "Jeri Jalandoni – Education for the Island of Samar",
//   "A & A Catechetical Project",
//   "Volunteer Program B37 – 5th Year for College Graduates",
//   "Formal Education for Former Out of School Youth",
//   "Saint Vincent Ferrer Parish / Fr. Jomar Valdevieso"
// ];

const FormValues ={
  scholarship_categ_name: '',
  alias: '',
  benefactor: '',
  scholarship_categ_status: '',
  project_partner_id: '',
}

export default function Scholarship({state}) {

  const form = useForm();
  const { register, control, handleSubmit, formState, reset, validate} = form
  const { errors } = formState;
  const navigate = useNavigate();

  const {getAuthToken, alertOpen, setAlertOpen, alertMessage, setAlertMessage, errorOpen, setErrorOpen,errorMessage,setErrorMessage} = useAuthStore();
  const {setLoading, setLoadingMessage} = useLoginStore();

  const { projects, setProjects, project, searchQuery, handleSearch, filteredStatus, setFilteredStatus,
    handleOpenScholarship,
    handleCloseScholarship,
    selectedCategories,
    setSelectedCategories,
    editCategories,
    setEditCategories,
  } = useScholarshipStore();


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
        setLoadingMessage('Updating scholarship please wait')
        const response = await axios.put(`/api/scholarships/${selectedCategories.id}`,{...data}, config)
        handleCloseScholarship();
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
        setLoadingMessage('Adding scholarship please wait')
        const response = await axios.post('/api/scholarships',{
          scholarship_categ_name: data.scholarship_categ_name,
          alias: data.alias,
          benefactor: data.benefactor,
          scholarship_categ_status: data.scholarship_categ_status,
          project_partner_id: data.project_partner_id,
        }, config)
        setAlertOpen(true);
        setAlertMessage("Scholarship category added");
        setLoading(false);
        handleCloseScholarship();
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
    }
  };

  //Update Scholarship categories data
  const updateCategories = (projectId) => {
    const selectedCategories = projects.find(project => project.id === projectId );
    setEditCategories(true);
    setSelectedCategories(selectedCategories);
    handleOpenScholarship();
    form.reset(selectedCategories);
  }

  //DELETE CATEGORIES DATA
  const deleteScholarship = async (event, id) => {
    event.preventDefault();
    setLoading(true);
    setLoadingMessage('Deleting user please wait')
    setAlertOpen(true);
    setAlertMessage('Deleting user...');
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
        setAlertOpen(true);
        setAlertMessage('Updated Scholarship List');
      }
      else {
        setErrorOpen(true);
        setErrorMessage('Failed to fetch data');
      }
  
      setAlertOpen(true)
      setAlertMessage('Scholarship Category Deleted');
      setLoading(false);
    } catch (error) {
      if (error.response?.status === 401) {
        setErrorOpen(true);
        setErrorMessage("You've been logged out");
      } else if (error.response?.status === 404) {
        setErrorOpen(true);
        setErrorMessage('Scholarship Category not found');
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
              <MUI.Button variant="contained" color="primary" id="addButton" onClick={handleOpenScholarship}>
                <MUI.AddCircleOutlineIcon sx={{mr: 1}}/>
                <MUI.Typography variant='body2'>Add Categories</MUI.Typography>
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
              value={filteredStatus}
              onChange={(e) => setFilteredStatus(e.target.value)}
              native
              sx={{width: '100px', border: '1px solid rgba(0,0,0,0.2)',
              boxShadow: '11px 7px 15px -3px rgba(0,0,0,0.1)', borderRadius: '15px', height: '50px'}}
            >
              <option value="All">All</option>
              <option value="Closed for Application">Closed Application</option>
              <option value="Open for Application">Open Application</option>
            </MUI.Select>
          </MUI.FormControl>
        </MUI.Container>

       
        <MUI.Grid container spacing={3} sx={{ margin: 5 }}>
          {projects
            .filter((project) => {
              return filteredStatus === 'All' ? true : (
                project.scholarship_categ_status === filteredStatus
              )
            })
            .filter((project) => 
              project.scholarship_categ_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              project.benefactor.toLowerCase().includes(searchQuery.toLowerCase())
            )
           .map((project, index) => (
            <MUI.Grid key={index} item xs={12} sm={6} md={4}>
              <MUI.Card sx={{ maxWidth: 345, flex: '1 1 30%' }}>
                <MUI.CardContent sx={{textAlign: 'center', alignItems: 'center' }}>
                  
                  <MUI.SchoolOutlinedIcon sx={{fontSize: 100, color: '#1e88e5'}}/>
                  <MUI.Typography gutterBottom variant="h4" component="div" sx={{fontWeight: 'bold'}}>
                    {project.scholarship_categ_name}
                  </MUI.Typography>

                  <MUI.Typography variant="body2" color="text.secondary" sx={{fontStyle: 'italic', fontSize: '16px', margin: 2}}>
                    {project.benefactor}
                  </MUI.Typography>

                  <MUI.Typography variant="body2" color="text.secondary" sx={{fontSize: '18px'}}>
                    {project.scholarship_categ_status}
                  </MUI.Typography>

                  <MUI.Button
                  variant="contained"
                  sx={{
                    borderRadius: '10px', 
                    borderColor: 'primary.main',
                    textTransform: 'capitalize',  
                    m: 3,
                  }}
                  onClick={() => updateCategories(project.id)}
                >
                  <MUI.Typography variant='h5'>
                  See for Information
                  </MUI.Typography>
                </MUI.Button>

                </MUI.CardContent>
              </MUI.Card>
            </MUI.Grid>
            )
          )}
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
                      >
                        <option value="" disabled>Select Project Status</option>
                        <option value="Closed for Application">Closed for Application</option>
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
                
              <MUI.Grid id="projectPartnerGrid">
              <MUI.InputLabel htmlFor="project_partner_id" id="projectPartnerLabel">Project Partner/s</MUI.InputLabel>
                <Controller
                  name="project_partner_id"
                  control={control}
                  defaultValue=''
                  rules={{
                    required: 'Project Partner is required',
                    validate: (value) => value !== '' || "Please select a project partner"
                  }}
                  render={({ field }) => (
                    <MUI.FormControl sx={{  width: '100%', borderRadius: '8px',}}>
                      <MUI.Select
                        {...field}
                        id="project_partner_id"
                        native
                      >
                        <option value="" disabled>Select Project Partner</option>
                        {projectPartners.map((p, index) => (
                          <option key={index} value={p}>
                            {p}
                          </option>
                        ))}
                      </MUI.Select>
                    </MUI.FormControl>
                  )}
                />
                {errors.project_partner_id && (
                  <p id='errMsg'> 
                    <MUI.InfoIcon className='infoErr'/> 
                    {errors.projectPartner.message}
                  </p>
                )}
              </MUI.Grid>
                    
                    {/* Add more form fields as needed */}
            </MUI.DialogContent>

              <MUI.DialogActions>
                {/* Add action buttons, e.g., Save Changes and Cancel */}
                <MUI.Button onClick={handleCancelEdit} 
                color="primary"
                id='Button'
                >
                  Cancel
                </MUI.Button>
                  <MUI.Button 
                    color="primary"
                    variant='contained'
                    type='submit'
                    id='Button'
                  >
                    {editCategories ? 'Save Changes' : 'Add'}
                  </MUI.Button>
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
