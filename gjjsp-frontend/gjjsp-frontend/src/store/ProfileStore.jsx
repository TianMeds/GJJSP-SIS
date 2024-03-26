import { create } from "zustand";

const useProfileStore = create((set) => ({
    profiles: [],
    profile: false,
    setProfiles: (profiles) => set({ profiles }),

    handleOpenProfile: () => set({profile: true}),
    handleCloseProfile: () => set({profile: false}),

    //Hook for Edit profile
    editProfile:  false,
    setEditProfile: (newEditProfile) => set({editProfile: newEditProfile}),
    selectedProfile: null,
    setSelectedProfile: (selectedProfile) => set({ selectedProfile}),

    //Hook for Change Password in profile
    changePasswords: [],
    changePassword: false,
    setChangePasswords: (changePasswords) => set({changePasswords}),
    editPassword: false,
    setEditPassword: (newEditPassword) => set({editPassword: newEditPassword}),
    selectedPassword: null,
    setSelectedPassword: (selectedPassword) => set({selectedPassword}),

    handleOpenChangePassword: () => set({changePassword: true}),
    handleCloseChangePassword: () => set({changePassword: false}),

    goBack: [],
    setGoBack: (goBack) => set({goBack}),
}));

export default useProfileStore;