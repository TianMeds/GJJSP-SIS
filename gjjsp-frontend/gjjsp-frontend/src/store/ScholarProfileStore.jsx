import { create } from "zustand";

const useScholarProfileStore = create((set) => ({

    scholarProfiles: [],
    scholarProfile: false,
    setScholarProfiles: (scholarProfiles) => set({ scholarProfiles }),

    handleOpenScholarProfile: () => set({scholarProfile: true}),
    handleCloseScholarProfile: () => set({scholarProfile: false}),


    editScholarProfile: false,
    setEditScholarProfile: (newEditScholarProfile) => set({editScholarProfile: newEditScholarProfile}),
    selectedScholarProfile: null,
    setSelectedScholarProfile: (selectedScholarProfile) => set({selectedScholarProfile}),   
}));

export default useScholarProfileStore;