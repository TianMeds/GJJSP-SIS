import { create } from 'zustand'
import { v4 as uuidv4 } from 'uuid';

const useScholarStore = create((set) => ({

    //Hook for get function
    scholars: [],
    setScholars: (newScholars) => set({scholars: newScholars}),

    scholar: false,
    setScholar: (newScholar) => set({scholar: newScholar}),
    scholarsData: [],
    setScholarsData: (newScholarsData) => set({scholarsData: newScholarsData}),
    
    scholarsWithIndex: [],
    editScholar: false,
    scholarName: '',
    scholarEmailAddress: '',
    scholarStatus: '',
    scholarCategory: '',
    selectedScholar: null,
    filteredScholar: 'All',
    setEditScholar: (newEditScholar) => set({editScholar: newEditScholar}),
    setScholarName:  (newScholarName) => set({scholarName: newScholarName}),
    setScholarEmailAddress: (newScholarEmailAddress) => set({scholarEmailAddress: newScholarEmailAddress}),
    setScholarStatus: (newScholarStatus) => set({scholarStatus: newScholarStatus}),
    setScholarCategory: (newScholarCategory) => set({scholarCategory: newScholarCategory}),
    setSelectedScholar: (selectedScholar) => set({ selectedScholar}),
    setFilteredScholar: (newFilteredScholar) => set({filteredScholar: newFilteredScholar}),

    handleOpenScholar: () => set({scholar: true}),
    handleCloseScholar: () => set({scholar: false}),

    addScholar: (scholarName, scholarEmailAddress, scholarCategory, scholarStatus) =>
    set((store) => ({
      scholars: [
        ...store.scholars,
        { id: uuidv4(), scholarName, scholarEmailAddress, scholarCategory, scholarStatus },
      ],
      scholarsWithIndex: [
        ...store.scholarsWithIndex,
        { scholarName, scholarEmailAddress, scholarCategory, scholarStatus, originalIndex: store.scholars.length },
      ],
  })),

    updateScholar: (scholarId, scholarName, scholarEmailAddress, scholarCategory, scholarStatus ) => 
    set((store) => ({
        scholars: store.scholars.map((scholar) => 
        scholar.id === scholarId
        ? { ...scholar, scholarName, scholarEmailAddress, scholarCategory, scholarStatus }
        : scholar
        ),
    })),

    deleteScholar: (scholarId) => 
        set((store) => ({
        scholars: store.scholars.filter((scholar) => scholar.id !== scholarId),
        scholarsWithIndex: store.scholarsWithIndex.filter((scholar) => scholar.id !== scholarId),
    })),

    searchQuery: '',
    setSearchQuery: (query) => set({ searchQuery: query }),
    handleSearch: (e) => set({ searchQuery: e.target.value }),

}));

export default useScholarStore;