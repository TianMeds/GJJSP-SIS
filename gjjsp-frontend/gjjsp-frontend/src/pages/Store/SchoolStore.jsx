import { create } from 'zustand'
import { v4 as uuidv4 } from 'uuid';


const useSchoolStore = create((set) => ({
    schoolsWithIndex: [],
    schools: [],
    school: false,
    editSchool: false,
    schoolName: '',
    schoolAddress: '',
    schoolType: '',
    schoolPeriod: '',
    selectedSchool: null,
    filteredType: 'All',
    selectedYear: '',
    setYear: (year) => set({ selectedYear: year }),
    setFilteredType: (newFilteredType) => set({filteredType: newFilteredType}),
    setSelectedSchool: (selectedSchool) => set({selectedSchool}),
    setEditSchool: (newEditSchool) => set({editSchool: newEditSchool}),
    setSchoolName: (newSchoolName) => set({schoolName: newSchoolName}),
    setSchoolAddress: (newSchoolAddress) => set({schoolAddress: newSchoolAddress}),
    setSchoolType: (newSchoolType) => set({schoolType: newSchoolType}),
    setSchoolPeriod: (newSchoolPeriod) => set({schoolPeriod: newSchoolPeriod}),

    /* Function for Opening Add School Dialog */
    handleOpenSchool: () => set({school: true}),
    handleCloseSchool: () => set({school: false}),


    addSchool: (schoolName, schoolAddress, schoolType, schoolPeriod) =>
      set((store) => ({
        schools: [
          ...store.schools,
          { id: uuidv4(), schoolName, schoolAddress, schoolType, schoolPeriod },
        ],
        schoolsWithIndex: [
          ...store.schoolsWithIndex,
          { schoolName, schoolAddress, schoolType, schoolPeriod, originalIndex: store.schools.length }, // Use the length as the originalIndex
        ],
    })),

    updateSchool: (schoolId, schoolName, schoolAddress, schoolType, schoolPeriod) =>
    set((store) => ({
      schools: store.schools.map((school) =>
        school.id === schoolId
          ? { ...school, schoolName, schoolAddress, schoolType, schoolPeriod }
          : school
      ),
    })),

    deleteSchool: (schoolId) =>
      set((store) => ({
        schools: store.schools.filter((school) => school.id !== schoolId),
        schoolsWithIndex: store.schoolsWithIndex.filter((school) => school.id !== schoolId),
    })),

    /* --------------------------------------SEARCH BAR ------------------------------------- */
    searchQuery: '',
    setSearchQuery: (query) => set({ searchQuery: query }),
    handleSearch: (e) => set({ searchQuery: e.target.value }),
}))

export default useSchoolStore;
