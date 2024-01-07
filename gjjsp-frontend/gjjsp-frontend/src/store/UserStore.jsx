import { create } from 'zustand'
import { v4 as uuidv4 } from 'uuid';

const useUserStore = create((set) => ({
    usersWithIndex: [], 

    //Hook For the Filter of Table 
    filteredRole: 'All',
    setFilteredRole: (newFilteredRole) => set({filteredRole: newFilteredRole}),
    searchQuery: '',
    setSearchQuery: (query) => set({ searchQuery: query }),
    handleSearch: (e) => set({ searchQuery: e.target.value }),

    //Hooks for Get User Data
    users: [],
    user: false,
    setUsers: (users) => set({ users }),

    //Hooks for Update User Data
    editUser:  false,
    setEditUser: (newEditUser) => set({editUser: newEditUser}),
    selectedUser: null,
    setSelectedUser: (selectedUser) => set({ selectedUser}),


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
    
    addUser: (userName, emailAddress, role, userStatus) =>
      set((store) => ({
        users: [
          ...store.users,
          { id: uuidv4(), userName, emailAddress, role, userStatus },
        ],
        usersWithIndex: [
          ...store.usersWithIndex,
          { userName, emailAddress, role, userStatus, originalIndex: store.users.length },
        ],
    })),

    updateUser: (userId, userName, emailAddress, role, userStatus) => 
    set((store) => ({
      users: store.users.map((user) => 
        user.id === userId
        ? { ...user, userName, emailAddress, role, userStatus }
        : user
      ),
    })),

    deleteUser: (userId) => 
      set((store) => ({
        users: store.users.filter((user) => user.id !== userId),
        usersWithIndex: store.usersWithIndex.filter((user) => user.id !== userId),
    })),
    
}))

export default useUserStore;
