import { create } from "zustand";

const useScholarProfileStore = create((set) => ({

    scholarProfiles: [],
    scholarProfile: false,
    setScholarProfiles: (scholarProfiles) => set({ scholarProfiles }),

    scholarFamMembers: [],
    scholarFamMember: false,
    setScholarFamMembers: (scholarFamMembers) => set({ scholarFamMembers }),
    editScholarFamMembers: false,
    setEditScholarFamMembers: (newEditScholarFamMembers) => set({editScholarFamMembers: newEditScholarFamMembers}),

    handleOpenScholarProfile: () => set({scholarProfile: true}),
    handleCloseScholarProfile: () => set({scholarProfile: false}),


    editScholarProfile: false,
    setEditScholarProfile: (newEditScholarProfile) => set({editScholarProfile: newEditScholarProfile}),
    selectedScholarProfile: null,
    setSelectedScholarProfile: (selectedScholarProfile) => set({selectedScholarProfile}),   

    selectedScholarFamMember: null,
    setSelectedScholarFamMember: (selectedScholarFamMember) => set({selectedScholarFamMember}),
}));

export default useScholarProfileStore;