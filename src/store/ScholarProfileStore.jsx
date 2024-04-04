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

    highschoolAcadDetails: [],
    setHighschoolAcadDetails: (highschoolAcadDetails) => set({highschoolAcadDetails}),
    editHighschoolAcadDetails: false,
    setEditHighschoolAcadDetails: (newEditHighschoolAcadDetails) => set({editHighschoolAcadDetails: newEditHighschoolAcadDetails}),

    undergradAcadDetails: [],
    setUndergradAcadDetails: (undergradAcadDetails) => set({undergradAcadDetails}),
    editUndergradAcadDetails: false,
    setEditUndergradAcadDetails: (newEditUndergradAcadDetails) => set({editUndergradAcadDetails: newEditUndergradAcadDetails}),

    yearsInProgram: 0,
    setYearsInProgram: (newYearsInProgram) => set({yearsInProgram: newYearsInProgram}),

    handleOpenScholarProfile: () => set({scholarProfile: true}),
    handleCloseScholarProfile: () => set({scholarProfile: false}),

    
    scholarPhoto: null,
    setScholarPhoto: (scholarPhoto) => set({ scholarPhoto }),


    editScholarProfile: false,
    setEditScholarProfile: (newEditScholarProfile) => set({editScholarProfile: newEditScholarProfile}),

    selectedScholarProfile: null,
    setSelectedScholarProfile: (selectedScholarProfile) => set({selectedScholarProfile}),   
    selectedScholarFamMember: null,
    setSelectedScholarFamMember: (selectedScholarFamMember) => set({selectedScholarFamMember}),
    selectedHighschoolAcadDetail: null,
    setSelectedHighschoolAcadDetail: (selectedHighschoolAcadDetail) => set({selectedHighschoolAcadDetail}),
    selectedUndergradAcadDetail: null,
    setSelectedUndergradAcadDetail: (selectedUndergradAcadDetail) => set({selectedUndergradAcadDetail}),
}));

export default useScholarProfileStore;