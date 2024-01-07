import { create } from 'zustand'
import { v4 as uuidv4 } from 'uuid';

const useScholarshipStore = create((set) => ({

    //Hooks for the Filter of Scholarship Categories
    filteredStatus: 'All',
    setFilteredStatus: (newFilteredStatus) => set({filteredStatus: newFilteredStatus}),
    searchQuery: '',
    setSearchQuery: (query) => set({ searchQuery: query }),
    handleSearch: (e) => set({ searchQuery: e.target.value }),

    // Hooks for Get Scholarship data
    projects: [],
    project: false,
    setProjects: (projects) => set({ projects }),

    //Hooks for  Update Scholarship Categories Data
    editCategories: false,
    setEditCategories: (newEditCategories) => set({editCategories: newEditCategories}),
    selectedCategories: null,
    setSelectedCategories: (selectedCategories) => set({ selectedCategories}),

    // Hooks for Update Scholarship Data
    projectName: '',
    alias: '',
    benefactor: '',
    projectStatus: '',
    projectPartner: '',
    setProjectName: (newProjectName) => set({projectName: newProjectName}),
    setAlias: (newAlias) => set({alias: newAlias}),
    setBenefactor: (newBenefactor) => set({benefactor: newBenefactor}),
    setProjectStatus: (newProjectStatus) => set({projectStatus: newProjectStatus}),  
    setProjectPartner: (newProjectPartner) => set({projectPartner: newProjectPartner}),
 
   /* Function for Opening Add Project Dialog */
    handleOpenScholarship: () => set({project: true}),
    handleCloseScholarship: () => set({project: false}),
   
}))

export default useScholarshipStore;