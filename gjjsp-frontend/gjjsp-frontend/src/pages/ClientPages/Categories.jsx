import React from 'react'
import * as MUI from '../../import';
import Layout from '../../component/Layout/SidebarNavbar/Layout';
import { Search, SearchIconWrapperV2,StyledInputBaseV2 } from '../../component/Layout/SidebarNavbar/Styles';
import useScholarshipStore from '../../store/ScholarshipStore';
import {useForm, Controller } from 'react-hook-form';
import { DevTool } from "@hookform/devtools";
import { Form } from 'react-router-dom';

const projectPartners = [
  "BACPAT Youth Development Foundation Inc.",
  "Welcome Home Foundation Inc. (BACPAT Scholars)",
  "Education for Former OSY",
  "Bahay Maria Children Center Formal",
  "Canossian Sisters – Endorsed Grantees c/o Sr. Elizabeth Tolentino",
  "Canossian Sisters – Endorsed Grantees c/o Sr. Elizabeth Tolentino & Sr. Mila Reyes",
  "Canossian Sisters – Endorsed Scholars",
  "Canossian Sisters – Educational Scholars by Sister Milagros Reyes",
  "WHFI Formal Education for Former Out of School Youth",
  "WHFI Formal Education for former OSY",
  "WHFI Bacpat Youth Development Foundation, Inc.",
  "WHFI- Literacy Program, Bacolod",
  "WHFI- Literacy Program, Malaybalay",
  "WHFI – Literacy Program",
  "Benefactors Endorsed Applicant",
  "Benefactors & Secretariat Endorsed",
  "Benefactors Endorsed Scholars & GJJS Secretariat",
  "Archdiocese of Jaro Youth Ministry & Balay ni Maria Foundation",
  "Cara & Matthew Financial Aid for Out of School Youth (Urban Poor and Youth with Disabilities)",
  "Outreach Project to help DEAF of Malaybay for Skills Training & Spiritual Formation Sessions",
  "Jeri Jalandoni – Education for the Youth Diocese",
  "Jeri Jalandoni – Education for the Island of Samar",
  "A & A Catechetical Project",
  "Volunteer Program B37 – 5th Year for College Graduates",
  "Formal Education for Former Out of School Youth",
  "Saint Vincent Ferrer Parish / Fr. Jomar Valdevieso"
];

const FormValues ={
  projectName: '',
  alias: '',
  benefactor: '',
  projectStatus: '',
  projectPartner: '',
}

export default function Scholarship({state}) {

  const form = useForm();
  const { register, control, handleSubmit, formState, reset, validate} = form
  const { errors } = formState;

  const onSubmit = (data) => {
    console.log("Form submitted", data);

    if (editMode) {
      // Handle update logic
      updateProject(selectedProject.id, data.projectName, data.alias, data.benefactor, data.projectStatus, data.projectPartner);
      setEditMode(false);
    } else {
      // Handle add logic
      addProject(data.projectName, data.alias, data.benefactor, data.projectStatus, data.projectPartner);
    }
    form.reset(FormValues);
    handleCloseScholarship();
  }

  const {
    handleOpenScholarship,
    handleCloseScholarship,
    project,
    filteredStatus,
    setFilteredStatus,
    setSelectedProject,
    selectedProject,
    editMode,
    setEditMode,
    updateProject,
    searchQuery,
    handleSearch,
    addProject = ((store) => store.addProject), 
    projects = ((store) => store.projects.filter((project) => project.state === state)),
  } = useScholarshipStore();

  const handleEditClick = (index) => {
    const selectedProject = projects[index];
    if(selectedProject) {
    setSelectedProject(selectedProject);
    reset({
      projectName: selectedProject.projectName,
      alias: selectedProject.alias,
      benefactor: selectedProject.benefactor,
      projectStatus: selectedProject.projectStatus,
      projectPartner: selectedProject.projectPartner,
    })
    setEditMode(true);
    handleOpenScholarship(); 
    }
  };

  const handleCancelEdit = () => {
    form.reset(FormValues);
    setEditMode(false);
    handleCloseScholarship();
  };
  
  return (
    <Layout>
      <MUI.Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <MUI.Grid container spacing={3}>

        <MUI.Grid item xs={12}>
          <MUI.Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} alignItems={{xs: 'left', md: 'center'}}  margin={2} justifyContent="space-between">
            <MUI.Typography variant="h1" id="tabsTitle">Scholarships</MUI.Typography>
                      
              {/* Add User Button */}
              <MUI.Button variant="contained" color="primary" id="addButton" sx={{width: {xs: '100px'} }} onClick={handleOpenScholarship}>
                Add Projects 
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

          <MUI.FormControl id="filterControl">
            <MUI.Select
              value={filteredStatus}
              onChange={(e) => setFilteredStatus(e.target.value)}
              native
            >
              <option value="All">All</option>
              <option value="Closed for Application">Closed Application</option>
              <option value="Open for Application">Open Application</option>
            </MUI.Select>
          </MUI.FormControl>
        </MUI.Container>

       
        <MUI.Grid container spacing={3} sx={{ margin: 5 }}>
          {projects
           .filter((project) => filteredStatus === "All" || project.projectStatus === filteredStatus)
           .filter((project) => project.projectName && project.projectName.toLowerCase().includes(searchQuery?.toLowerCase() || ''))
           .map((project, index) => (
           (project.projectName || project.benefactor || project.projectStatus) && (
            <MUI.Grid key={index} item xs={12} sm={6} md={4}>
              <MUI.Card sx={{ maxWidth: 345, flex: '1 1 30%' }}>
                <MUI.CardContent sx={{textAlign: 'center', alignItems: 'center' }}>
                  
                  <MUI.SchoolOutlinedIcon sx={{fontSize: 100, color: '#1e88e5'}}/>
                  <MUI.Typography gutterBottom variant="h4" component="div" sx={{fontWeight: 'bold'}}>
                    {project.projectName}
                  </MUI.Typography>

                  <MUI.Typography variant="body2" color="text.secondary" sx={{fontStyle: 'italic', fontSize: '16px', margin: 2}}>
                    {project.benefactor}
                  </MUI.Typography>

                  <MUI.Typography variant="body2" color="text.secondary" sx={{fontSize: '18px'}}>
                    {project.projectStatus}
                  </MUI.Typography>

                  <MUI.Button
                  variant="contained"
                  sx={{
                    borderRadius: '10px', 
                    borderColor: 'primary.main',
                    textTransform: 'capitalize',  
                    m: 3,
                  }}
                  onClick={() => handleEditClick(index)}
                >
                  <MUI.Typography>
                  See for Information
                  </MUI.Typography>
                </MUI.Button>

                </MUI.CardContent>
              </MUI.Card>
            </MUI.Grid>
            )
          ))}
        </MUI.Grid>

         {/* Add User Dialog */}
         <MUI.Dialog open={project} onClose={handleCloseScholarship} fullWidth maxWidth="xs" component='form' onSubmit={handleSubmit(onSubmit)} noValidate>
          {/* Content of the Dialog */}
          <MUI.DialogTitle id="dialogTitle">{editMode ?  'Edit ' + selectedProject.projectName: 'New Project'}</MUI.DialogTitle>
          <MUI.Typography variant='body2' id="dialogLabel">Required fields are marked with an asterisk *</MUI.Typography>
            <MUI.DialogContent>
              {/* Form Fields of New User*/}
              <MUI.Grid id="projectNameGrid">
                <MUI.InputLabel htmlFor="projectName" id="projectNameLabel">Name</MUI.InputLabel>
                  <MUI.TextField 
                    type='text'
                    id="projectName"
                    placeholder='Project Name'
                    fullWidth 

                    {...register('projectName', {
                      required: 'Project Name is required',
                      maxLength: {
                        value: 100,
                        message: 'Project Name should not exceed 50 characters'
                      }
                    })}
                  />
                  {errors.projectName && (
                    <p id='errMsg'> 
                      <MUI.InfoIcon className='infoErr'/> 
                      {errors.projectName.message}
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
                      message: 'Project Alias should not exceed 50 characters'
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
                <MUI.InputLabel htmlFor="projectStatus" id="projectStatusLabel">Status</MUI.InputLabel>
                <Controller
                  name="projectStatus"
                  control={control}
                  defaultValue=''
                  rules={{
                    required: 'Project Status is required',
                    validate: (value) => value !== '' || "Please select a project status"
                  }}
                  render={({ field }) => (
                    <MUI.FormControl sx={{  width: '100%', borderRadius: '8px',}}>
                      <MUI.Select
                        {...field}
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
              <MUI.InputLabel htmlFor="projectPartner" id="projectPartnerLabel">Project Partner/s</MUI.InputLabel>
                <Controller
                  name="projectPartner"
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
                {errors.projectPartner && (
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
                    {editMode ? 'Save Changes' : 'Add'}
                  </MUI.Button>
              </MUI.DialogActions>

        </MUI.Dialog>
        <DevTool control={control} />
      </MUI.Grid>
      </MUI.Container>
  </Layout>
  )
}
