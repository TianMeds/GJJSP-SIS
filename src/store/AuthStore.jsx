import {create} from 'zustand';


const useAuthStore = create((set) => ({
authToken: null,

setAuthToken: (newAuthToken) => set({authToken: newAuthToken}),
getAuthToken: () => {
    return useAuthStore.getState().authToken;
},
resetAuthToken: () => {
    set({ authToken: null });
},

//Check Functions 
openDialog: true,
setOpenDialog: (newOpenDialog) => set({openDialog: newOpenDialog}),
openPrivacyDialog: true,
setOpenPrivacyDialog: (newOpenPrivacyDialog) => set({openPrivacyDialog: newOpenPrivacyDialog}),
openPrivacyNotice: false,
setOpenPrivacyNotice: (newOpenPrivacyNotice) => set({openPrivacyNotice: newOpenPrivacyNotice}),

//Alert Functions 
alertOpen: true,
setAlertOpen: (newAlertOpen) => set({alertOpen: newAlertOpen}),
alertMessage: '',
setAlertMessage: (newAlertMessage) => set({alertMessage: newAlertMessage}),
errorOpen: true,
setErrorOpen: (newErrorOpen) => set({errorOpen: newErrorOpen}),
errorMessage: '',
setErrorMessage: (newErrorMessage) => set({errorMessage: newErrorMessage}),


}));

export default useAuthStore;