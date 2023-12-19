import React from 'react'
import * as MUI from '../../import';
import Layout from '../Components/Layout';
import { Search, SearchIconWrapperV2,StyledInputBaseV2 } from '../Components/Styles';
import useDialogStore from '../Components/store';
import { useEffect } from 'react';
import useScholarshipStore from '../Store/ScholarshipStore';

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

export default function Scholarship({state}) {

  const {
    handleOpenScholarship,
    handleCloseScholarship,
    project,
    projectName,
    alias,
    benefactor,
    projectStatus,
    projectPartner,
    setProjectName,
    setAlias,
    setBenefactor,
    setProjectStatus,
    setProjectPartner,
    filteredStatus,
    setFilteredStatus,
    setSelectedProject,
    selectedProject,
    editMode,
    setEditMode,
    addProject = ((store) => store.addProject), 
    updateProject,
    searchQuery,
    handleSearch,
    projects = ((store) => store.projects.filter((project) => project.state === state)),
  } = useScholarshipStore();

  const handleAddClick = () => {
    if (editMode) {
      // Handle update logic
      updateProject(selectedProject.id, projectName, alias, benefactor, projectStatus, projectPartner);
      setEditMode(false);
    } else {
      // Handle add logic
      addProject(projectName, alias, benefactor, projectStatus, projectPartner);
    }
  
    // Reset form fields and close the dialog
    setProjectName('');
    setAlias('');
    setBenefactor('');
    setProjectStatus('');
    setProjectPartner('');
    handleCloseScholarship();
  };

  const handleEditClick = (index) => {
    const selectedProject = projects[index];
    setSelectedProject(selectedProject);
    setProjectName(selectedProject.projectName);
    setAlias(selectedProject.alias);
    setBenefactor(selectedProject.benefactor);
    setProjectStatus(selectedProject.projectStatus);
    setProjectPartner(selectedProject.projectPartner);
    setEditMode(true);
    handleOpenScholarship(); // Open the dialog
  };

  const handleCancelEdit = () => {
    handleCloseScholarship();
    setProjectName('');
    setAlias('');
    setBenefactor('');
    setProjectStatus('');
    setProjectPartner('');
    setEditMode(false);
  };
  
  return (
    <Layout>
      <MUI.Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <MUI.Grid container spacing={3}>

      <MUI.Grid item xs={12}>
        <MUI.Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} alignItems={{xs: 'left', md: 'center'}}  margin={2} justifyContent="space-between">
          <MUI.Typography variant="h1" sx={{ fontWeight: 'bold', fontSize: '1.5rem', mb: 2 }}>Scholarships</MUI.Typography>
                    
            {/* Add User Button */}
            <MUI.Button variant="contained" color="primary" sx={{ textTransform: 'none', width: {xs: '100px', md: '200px'}, whiteSpace: 'nowrap' }} onClick={handleOpenScholarship}>
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

        <MUI.FormControl sx={{  width: '180px', border: '2px solid #032539', borderRadius: '8px'}}>
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
         <MUI.Dialog open={project} onClose={handleCloseScholarship} fullWidth maxWidth="sm">
          {/* Content of the Dialog */}
          <MUI.DialogTitle>Add Project</MUI.DialogTitle>
            <MUI.DialogContent>
              {/* Form Fields of New User*/}
              
                <MUI.InputLabel htmlFor="projectName">Name</MUI.InputLabel>
                  <MUI.TextField 
                    value={projectName}
                    placeholder='Project Name'
                    onChange={(e) => setProjectName(e.target.value)}  
                    fullWidth 
                  />

                  <MUI.InputLabel htmlFor="alias">Alias</MUI.InputLabel>
                  <MUI.TextField 
                    value={alias}
                    onChange={(e) => setAlias(e.target.value)}
                    placeholder='Project Alias (e.g., Formal Educ)' 
                    fullWidth 
                  />

                  <MUI.InputLabel htmlFor="benefactor">Benefactor</MUI.InputLabel>
                  <MUI.FormControl sx={{  width: '100%', borderRadius: '8px',}}>
                    <MUI.Select
                      value={benefactor}
                      onChange={(e) => setBenefactor(e.target.value)}
                      native
                    >
                      <option value="" disabled>Select Benefactor</option>
                      <option value="Gado (Ganet Management Corporation)">Gado (Ganet Management Corporation)</option>
                    </MUI.Select>

                  </MUI.FormControl>

              <MUI.InputLabel htmlFor="projectStatus">Status</MUI.InputLabel>
                  <MUI.FormControl sx={{  width: '100%', borderRadius: '8px',}}>
                  <MUI.Select
                    value={projectStatus}
                    onChange={(e) => setProjectStatus(e.target.value)}
                    native
                  >
                    <option value="" disabled>Set Project Status</option>
                    <option value="Closed for Application">Closed for Application</option>
                    <option value="Open for Application">Open for Application</option>
                  </MUI.Select>

              </MUI.FormControl>

              <MUI.InputLabel htmlFor="projectPartner">Project Partner/s</MUI.InputLabel>
                  <MUI.FormControl sx={{  width: '100%', borderRadius: '8px',}}>
                  <MUI.Select
                    value={projectPartner}
                    onChange={(e) => setProjectPartner(e.target.value)} 
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
                    
                    {/* Add more form fields as needed */}
            </MUI.DialogContent>

              <MUI.DialogActions>
                {/* Add action buttons, e.g., Save Changes and Cancel */}
                <MUI.Button onClick={
                handleCancelEdit
                } color="primary">
                  Cancel
                </MUI.Button>
                  <MUI.Button 
                    color="primary"
                    onClick={handleAddClick}>
                    {editMode ? 'Save Changes' : 'Add'}
                  </MUI.Button>
              </MUI.DialogActions>

        </MUI.Dialog>
        
      </MUI.Grid>
      </MUI.Container>
  </Layout>
  )
}
