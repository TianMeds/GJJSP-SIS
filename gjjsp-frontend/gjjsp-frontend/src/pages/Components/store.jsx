import { create } from 'zustand'
import { v4 as uuidv4 } from 'uuid';

const useDialogStore = create((set) => ({
   anchorEl: null,
   setAnchorEl: (newAnchorEl) => set({ anchorEl: newAnchorEl }),

   openDialog: false,
   event: '',
   recipients: '',
   setEvent: (newEvent) => set({ event: newEvent }),
   setRecipients: (newRecipients) => set({ recipients: newRecipients }),

   editedEmail: '',
   email: 'gadojessjalandoni@gmail.com',
   notification: false,

   user: false,
   name: '',
   emailAddress: '',
   role: '',
   setName: (newName) => set({name: newName}),
   setEmailAddress: (newEmailAddress) => set({emailAddress: newEmailAddress}),
   setRole: (newRole) => set({role: newRole}),

   rows: [{selectedEvent: ' ', selectedRecipient: ''}],
   users: [{selectedName: '', selectedEmailAddress: '', selectedRoles: ''}],   
   projects: [{selectedProjectName: '', selectedAlias: '', selectedBenefactor: '', selectedProjectStatus: '', selectedProjectPartner: ''}],
   schools: [{selectedSchoolName: '', selectedSchoolAddress: '', selectedSchoolType: '', selectedSchoolPeriod: ''}],
   filteredRole: '',
   setFilteredRole: (newFilteredRole) => set({filteredRole: newFilteredRole}),

   filteredStatus: '',
   setFilteredStatus: (newFilteredStatus) => set({filteredStatus: newFilteredStatus}),

   editMode: false,
   setEditMode: (newEditMode) => set({ editMode: newEditMode }),
   project: false,
   projectName: '',
   alias: '',
   benefactor: '',
   projectStatus: '',
   projectPartner: '',
   selectedProject: null,
   setSelectedProject: (selectedProject) => set({ selectedProject }),
   setProjectName: (newProjectName) => set({projectName: newProjectName}),
   setAlias: (newAlias) => set({alias: newAlias}),
   setBenefactor: (newBenefactor) => set({benefactor: newBenefactor}),
   setProjectStatus: (newProjectStatus) => set({projectStatus: newProjectStatus}),
   setProjectPartner: (newProjectPartner) => set({projectPartner: newProjectPartner}),


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

   addUser: (name, emailAddress, role) =>
      set((store) => ({ users: [...store.users, {name, emailAddress, role}]
   })),


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

   addRow: (event, recipients) => 
      set((store) => ({ rows: [...store.rows, { event, recipients }] 
   })),

   deleteRow: (index) =>
    set((store) => ({
      rows: store.rows.filter((_, i) => i !== index),
      users: store.users.filter((_, i) => i !== index),
   })),

   handleSaveChanges: () => set((state) => ({
      email: state.editedEmail,
      openDialog: false,
      editedEmail: ''
   })),

   handleOpenDialog: () => set({openDialog: true}),

   handleCloseDialog: () => set({openDialog: false, editedEmail: ''}),

   setEditedEmail: (email) => set({editedEmail: email}),

   handleOpenNotif: () => set({ notification: true }),
   handleCloseNotif: () => set({ notification: false }),

   handleSelectedEvent: (event) => set({ selectedEvent: event }),
   handleSelectedRecipient: (recipient) => set({ selectedRecipient: recipient }), 

   handleOpenUser: () => set({user: true}),
   handleCloseUser: () => set({user: false}),

   handleOpenScholarship: () => set({project: true}),
   handleCloseScholarship: () => set({project: false}),


}));

export default useDialogStore;