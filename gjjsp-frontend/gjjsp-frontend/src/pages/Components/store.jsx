import { create } from 'zustand'
import { v4 as uuidv4 } from 'uuid';

const useDialogStore = create((set) => ({
  /* Menu Item for the Update and Delete Option in my Table */
   anchorEl: null,
   setAnchorEl: (newAnchorEl) => set({ anchorEl: newAnchorEl }),
   handleClose: () => set({ anchorEl: null }),
   handleClick: (event) => set({ anchorEl: event.currentTarget }),

   /* --------------------------------------NOTIFICATION ------------------------------------- */

  /* Options for opening the Notification File */
   openDialog: false,
   notification: false,
   event: '',
   recipients: '',
   editedEmail: '',
   email: 'gadojessjalandoni@gmail.com',
   setEvent: (newEvent) => set({ event: newEvent }),
   setRecipients: (newRecipients) => set({ recipients: newRecipients }),

   /* Function for Opening Edit Email Dialog */
   handleOpenDialog: () => set({openDialog: true}),
   handleCloseDialog: () => set({openDialog: false, editedEmail: ''}),

   /* Function for Opening Add Notification Dialog */
   handleOpenNotif: () => set({ notification: true }),
   handleCloseNotif: () => set({ notification: false }),

    /* Storing Function  */
   addRow: (event, recipients) => 
      set((store) => ({ rows: [...store.rows, { event, recipients }] 
   })),

     /* Function for saving the Edited Changes */
  handleSaveChanges: () => set((state) => ({
    email: state.editedEmail,
    openDialog: false,
    editedEmail: ''
 })),

  /* -------------------------------------- USERS TAB ------------------------------------- */

   /* Function for Adding Users Tab and Opening User Dialog */
   editUser: false,
   setEditUser: (newEditUser) => set({editUser: newEditUser}),
   user: false,
   name: '',
   emailAddress: '',
   role: '',
   filteredRole: 'All',
   selectedUser: null,
   setSelectedUser: (selectedUser) => set({ selectedUser}),
   setName: (newName) => set({name: newName}),
   setEmailAddress: (newEmailAddress) => set({emailAddress: newEmailAddress}),
   setRole: (newRole) => set({role: newRole}),
   setFilteredRole: (newFilteredRole) => set({filteredRole: newFilteredRole}),


  /* Function for Opening Add User Dialog */
   handleOpenUser: () => set({user: true}),
   handleCloseUser: () => set({user: false}),

  /* Storing of Users  */
    addUser: (name, emailAddress, role) =>
      set((store) => ({ 
        users: [
          ...store.users, 
          { id: uuidv4(), name, emailAddress, role },
        ],
  })),
    updateUser: (userId, name, emailAddress, role) => 
    set((store) => ({
      users: store.users.map((user) => 
        user.id === userId
        ? { ...user, name, emailAddress, role }
        : user
      ),
    })),
  
  /* --------------------------------------SCHOLARSHIP TAB ------------------------------------- */

  /* This is for Scholarship tab to edit the added Projects */
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


  /* --------------------------------------SCHOOLS TAB ------------------------------------- */

  school: false,
  schoolName: '',
  schoolAddress: '',
  schoolType: '',
  schoolPeriod: '',
  setSchoolName: (newSchoolName) => set({schoolName: newSchoolName}),
  setSchoolAddress: (newSchoolAddress) => set({schoolAddress: newSchoolAddress}),
  setSchoolType: (newSchoolType) => set({schoolType: newSchoolType}),
  setSchoolPeriod: (newSchoolPeriod) => set({schoolPeriod: newSchoolPeriod}),

  addSchool: (schoolName, schoolAddress, schoolType, schoolPeriod) => 
    set((store) => ({ schools: [...store.schools, {schoolName, schoolAddress, schoolType, schoolPeriod}]
  })),

  /* Function for Opening Add School Dialog */
  handleOpenSchool: () => set({school: true}),
  handleCloseSchool: () => set({school: false}),

  /* DELETE FUNCTION */ 

  deleteRow: (index) =>
  set((store) => ({
    rows: store.rows.filter((_, i) => i !== index),
    users: store.users.filter((_, i) => i !== index),
    schools: store.schools.filter((_, i) => i !== index),
 })),

  /* --------------------------------------SEARCH BAR ------------------------------------- */
  searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query }),
  handleSearch: (e) => set({ searchQuery: e.target.value }),
  /* --------------------------------------ZUSTAND ------------------------------------- */

    /* Function for the storage of zustand   */
    rows: [{selectedEvent: ' ', selectedRecipient: ''}],
    users: [{selectedName: '', selectedEmailAddress: '', selectedRoles: ''}],   
    projects: [{selectedProjectName: '', selectedAlias: '', selectedBenefactor: '', selectedProjectStatus: '', selectedProjectPartner: ''}],
    schools: [{selectedSchoolName: '', selectedSchoolAddress: '', selectedSchoolType: '', selectedSchoolPeriod: ''}],


}));

export default useDialogStore;