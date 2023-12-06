import { create } from 'zustand'

const useDialogStore = create((set) => ({
   openDialog: false,
   editedEmail: '',
   email: 'gadojessjalandoni@gmail.com',
   notification: false,
   rows: [{selectedEvent: 'Event 2 ', selectedRecipient: 'Recipient 2'}],


   addRow: (event, recipients) => 
      set((store) => ({ rows: [...store.rows, { event, recipients }] 
   })),

   deleteRow: (index) =>
    set((store) => ({rows: store.rows.filter((_, i) => i !== index),
   })),

   updateRow: (index, updatedEvent, updatedRecipients) => 
      set((store) => ({
         rows: store.rows.map((row, i) => i === index ? {event: updatedEvent, recipients: updatedRecipients} : row),
      })),

   handleOpenDialog: () => set({openDialog: true}),

   handleCloseDialog: () => set({openDialog: false, editedEmail: ''}),

   setEditedEmail: (email) => set({editedEmail: email}),

   handleSaveChanges: () => set((state) => ({
        email: state.editedEmail,
        openDialog: false,
        editedEmail: ''
     
   })),

   handleOpenNotif: () => set({ notification: true }),
   handleCloseNotif: () => set({ notification: false }),
   handleSelectedEvent: (event) => set({ selectedEvent: event }),
   handleSelectedRecipient: (recipient) => set({ selectedRecipient: recipient }),   


}));

export default useDialogStore;