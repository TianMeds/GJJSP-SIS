import { create } from 'zustand'
import { v4 as uuidv4 } from 'uuid';

const useUserStore = create((set) => ({
    usersWithIndex: [], 

    users: [],
    editUser:  false,
    setEditUser: (newEditUser) => set({editUser: newEditUser}),
    user: false,
    userName: '',
    emailAddress: '',
    role: '',
    filteredRole: 'All',
    selectedUser: null,
    setSelectedUser: (selectedUser) => set({ selectedUser}),
    setName: (newName) => set({userName: newName}),
    setEmailAddress: (newEmailAddress) => set({emailAddress: newEmailAddress}),
    setRole: (newRole) => set({role: newRole}),
    setFilteredRole: (newFilteredRole) => set({filteredRole: newFilteredRole}),
 
     /* Function for Opening Add User Dialog */
    handleOpenUser: () => set({user: true}),
    handleCloseUser: () => set({user: false}),
    
    addUser: (userName, emailAddress, role) =>
  set((store) => ({
    users: [
      ...store.users,
      { id: uuidv4(), userName, emailAddress, role },
    ],
    usersWithIndex: [
      ...store.usersWithIndex,
      { userName, emailAddress, role, originalIndex: store.usersWithIndex.length },
    ],
  })),

  deleteRow: (originalIndex) =>
  set((store) => ({
    users: store.users.filter((_, i) => i !== originalIndex),
    usersWithIndex: store.usersWithIndex.filter((_, i) => i !== originalIndex),
  })),

    updateUser: (userId, userName, emailAddress, role) => 
    set((store) => ({
      users: store.users.map((user) => 
        user.id === userId
        ? { ...user, userName, emailAddress, role }
        : user
      ),
    })),

    anchorEl: null,
    setAnchorEl: (newAnchorEl) => set({ anchorEl: newAnchorEl }),
    handleClose: () => set({ anchorEl: null }),
    handleClick: (event) => set({ anchorEl: event.currentTarget }),

    
}))

export default useUserStore;
