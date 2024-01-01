import { create } from 'zustand'
import { v4 as uuidv4 } from 'uuid';

const useNotificationStore = create((set) => ({
    notifWithIndex: [],
    notifs: [],
    openDialog: false,
    notification: false,
    editNotif: false,
    setEditNotif: (newEditNotif) => set({editNotif: newEditNotif}),
    event: '',
    recipient: '',
    editedEmail: '',
    email: 'gadojessjalandoni@gmail.com',
    setEvent: (newEvent) => set({ event: newEvent }),
    setRecipient: (newRecipient) => set({ recipient: newRecipient }),
    selectedNotif: null,
    setSelectedNotif: (selectedNotif) => set({ selectedNotif }),
 
    /* Function for Opening Edit Email Dialog */
    handleOpenDialog: () => set({openDialog: true}),
    handleCloseDialog: () => set({openDialog: false, editedEmail: ''}),
 
    /* Function for Opening Add Notification Dialog */
    handleOpenNotif: () => set({ notification: true }),
    handleCloseNotif: () => set({ notification: false }),
 
    addNotif: (event, recipient) =>
      set((store) => ({
        notifs: [
          ...store.notifs,
          { id: uuidv4(),event, recipient },
        ],
        usersWithIndex: [
          ...store.notifWithIndex,
          { event, recipient, originalIndex: store.notifs.length }, 
        ],
    })),

    updateNotif: (notifId, event, recipient) => 
    set((store) => ({
      notifs: store.notifs.map((notification) => 
        notification.id === notifId
        ? { ...notification, event, recipient}
        : notification
      ),
    })),

    deleteNotif: (notifId) => 
      set((store) => ({
        notifs: store.notifs.filter((notification) => notification.id !== notifId),
        notifWithIndex: store.notifWithIndex.filter((notification) => notification.id !== notifId),
    })),


}))

export default useNotificationStore;