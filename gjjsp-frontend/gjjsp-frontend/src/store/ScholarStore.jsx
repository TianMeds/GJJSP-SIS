import { create } from 'zustand'
import { v4 as uuidv4 } from 'uuid';

const useScholarStore = create((set) => ({

    //Hook for get function
    scholars: [],
    setScholars: (scholars) => set({scholars}),

    scholar: false,
    setScholar: (newScholar) => set({scholar: newScholar}),
    scholarsData: [],
    setScholarsData: (scholarsData) => set({scholarsData}),

    userScholars: [],
    setUserScholars: (userScholars) => set({userScholars}),
    
    scholarsWithIndex: [],
    editScholar: false,
    scholarName: '',
    scholarEmailAddress: '',
    scholarStatus: '',
    scholarCategory: '',
    selectedScholar: null,

    filteredScholar: 'All',
    setEditScholar: (newEditScholar) => set({editScholar: newEditScholar}),

    filteredStatus: 'All',
    setFilteredStatus: (newFilteredStatus) => set({filteredStatus: newFilteredStatus}),
    
    setScholarName:  (newScholarName) => set({scholarName: newScholarName}),
    setScholarEmailAddress: (newScholarEmailAddress) => set({scholarEmailAddress: newScholarEmailAddress}),
    setScholarStatus: (newScholarStatus) => set({scholarStatus: newScholarStatus}),
    setScholarCategory: (newScholarCategory) => set({scholarCategory: newScholarCategory}),
    setSelectedScholar: (selectedScholar) => set({ selectedScholar}),
    setFilteredScholar: (newFilteredScholar) => set({filteredScholar: newFilteredScholar}),

    handleOpenScholar: () => set({scholar: true}),
    handleCloseScholar: () => set({scholar: false}),

    scholarshipCateg: [],
    setScholarshipCateg: (scholarshipCateg) => set({scholarshipCateg}),

    projectPartner: [],
    setProjectPartner: (projectPartner) => set({projectPartner}),

    school: [],
    setSchool: (school) => set({school}),

    searchQuery: '',
    setSearchQuery: (query) => set({ searchQuery: query }),
    handleSearch: (e) => set({ searchQuery: e.target.value }),

    modalScholars: false,
    setModalScholars: (modalScholars) => set({ modalScholars }),
    handleOpenModalScholars: () => set({modalScholars: true}),
    handleCloseModalScholars: () => set({modalScholars: false}),

    deleteModal: false,
    setDeleteModal: (deleteModal) => set({ deleteModal }),
    handleOpenDeleteModal: () => set({deleteModal: true}),
    handleCloseDeleteModal: () => set({deleteModal: false}),

    scholarIdToDelete: null,
    setScholarIdToDelete: (scholarIdToDelete) => set({ scholarIdToDelete }),

    restoreModal: false,
    setRestoreModal: (restoreModal) => set({ restoreModal }),

    filterModal: false,
    setFilterModal: (filterModal) => set({ filterModal }),
    handleOpenFilterModal: () => set({filterModal: true}),
    handleCloseFilterModal: () => set({filterModal: false}),

    scholarIdToRestore: null,
    setScholarIdToRestore: (scholarIdToRestore) => set({ scholarIdToRestore }),

}));

export default useScholarStore;