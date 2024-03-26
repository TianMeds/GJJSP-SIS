import { create } from 'zustand'
import { v4 as uuidv4 } from 'uuid';

const useUserStore = create((set) => ({
    usersWithIndex: [], 

    //Hook For the Filter of Table 
    filteredRole: 'All',
    setFilteredRole: (newFilteredRole) => set({filteredRole: newFilteredRole}),

    filteredStatus: 'All',
    setFilteredStatus: (newFilteredStatus) => set({filteredStatus: newFilteredStatus}),
    searchQuery: '',
    setSearchQuery: (query) => set({ searchQuery: query }),
    handleSearch: (e) => set({ searchQuery: e.target.value }),


    modalUsers: false,
    setModalUsers: (modalUsers) => set({ modalUsers }),
    handleOpenModalUsers: () => set({modalUsers: true}),
    handleCloseModalUsers: () => set({modalUsers: false}),

    deleteModal: false,
    setDeleteModal: (deleteModal) => set({ deleteModal }),
    handleOpenDeleteModal: () => set({deleteModal: true}),
    handleCloseDeleteModal: () => set({deleteModal: false}),

    restoreModal: false,
    setRestoreModal: (restoreModal) => set({ restoreModal }),

    filterModal: false,
    setFilterModal: (filterModal) => set({ filterModal }),
    handleOpenFilterModal: () => set({filterModal: true}),
    handleCloseFilterModal: () => set({filterModal: false}),

    userIdToDelete: null,
    setUserIdToDelete: (userIdToDelete) => set({ userIdToDelete }),

    userIdToRestore: null,
    setUserIdToRestore: (userIdToRestore) => set({ userIdToRestore }),
    
    //Hooks for Get User Data
    users: [],
    user: false,
    setUsers: (users) => set({ users }),

    //Hooks for Update User Data
    editUser:  false,
    setEditUser: (newEditUser) => set({editUser: newEditUser}),
    selectedUser: null,
    setSelectedUser: (selectedUser) => set({ selectedUser}),

    //Hook for View Profile Avatar
    avatarInitial: '',
    setAvatarInitial: (newAvatarInitial) => set({avatarInitial: newAvatarInitial}),

    //Hooks for User Form
    first_name: '',
    middle_name: '',
    last_name: '',
    user_mobile_num: '',
    email_address: '',
    password: '',
    role_id: '',
    user_status: '',
    setFirstName: (newFirstName) => set({ first_name: newFirstName }),
    setMiddleName: (newMiddleName) => set({ middle_name: newMiddleName }),
    setLastName: (newLastName) => set({ last_name: newLastName }),
    setUserMobileNum: (newUserMobileNum) => set({ user_mobile_num: newUserMobileNum }),
    setEmailAddress: (newEmailAddress) => set({ email_address: newEmailAddress }),
    setPassword: (newPassword) => set({ password: newPassword }),
    setRoleId: (newRoleId) => set({ role_id: newRoleId }),
    setUserStatus: (newUserStatus) => set({ user_status: newUserStatus }),
 
    //Hooks for opening & closing user form
    handleOpenUser: () => set({user: true}),
    handleCloseUser: () => set({user: false}),
    
}))

export default useUserStore;
