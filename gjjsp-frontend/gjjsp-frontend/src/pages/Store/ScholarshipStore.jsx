import { create } from 'zustand'
import { v4 as uuidv4 } from 'uuid';

const useScholarshipStore = create((set) => ({
    projects: [],
    editMode: false,
    setEditMode: (newEditMode) => set({ editMode: newEditMode }),
    project: false,
    projectName: '',
    alias: '',
    benefactor: '',
    projectStatus: '',
    projectPartner: '',
    selectedProject: null,
    filteredStatus: 'All',
    filteredProjectName: '',
    setFilteredProjectName: (newFilteredProjectName) => set({filteredProjectName: newFilteredProjectName}),
    setSelectedProject: (selectedProject) => set({ selectedProject }),
    setProjectName: (newProjectName) => set({projectName: newProjectName}),
    setAlias: (newAlias) => set({alias: newAlias}),
    setBenefactor: (newBenefactor) => set({benefactor: newBenefactor}),
    setProjectStatus: (newProjectStatus) => set({projectStatus: newProjectStatus}),  
    setProjectPartner: (newProjectPartner) => set({projectPartner: newProjectPartner}),
    setFilteredStatus: (newFilteredStatus) => set({filteredStatus: newFilteredStatus}),
 
   /* Function for Opening Add Project Dialog */
    handleOpenScholarship: () => set({project: true}),
    handleCloseScholarship: () => set({project: false}),
 
   /* Storing of Projects  */
   addProject: (projectName, alias, benefactor, projectStatus, projectPartner) =>
   set((store) => ({
     projects: [
       ...store.projects,
       { id: uuidv4(), projectName, alias, benefactor, projectStatus, projectPartner },
     ],
   })),
 
 updateProject: (projectId, projectName, alias, benefactor, projectStatus, projectPartner) =>
   set((store) => ({
     projects: store.projects.map((project) =>
       project.id === projectId
         ? { ...project, projectName, alias, benefactor, projectStatus, projectPartner }
         : project
     ),
   })),

   searchQuery: '',
   setSearchQuery: (query) => set({ searchQuery: query }),
   handleSearch: (e) => set({ searchQuery: e.target.value }),

   
}))

export default useScholarshipStore;