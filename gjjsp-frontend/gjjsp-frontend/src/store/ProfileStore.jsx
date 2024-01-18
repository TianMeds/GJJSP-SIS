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
}));

export default useProfileStore;