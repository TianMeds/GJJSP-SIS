import { create } from "zustand";

const useDashboardStore = create((set) => ({

    selectedScholarProfile: null,
    setSelectedScholarProfile: (selectedScholarProfile) => set({selectedScholarProfile}),   

    //Get Data from Scholar Status 
    scholarStatus: [],
    scholarStatuses: false,
    setScholarStatus: (scholarStatus) => set({scholarStatus}),

    //Get Data from Scholar Status
    scholarStatusCount: [],
    setScholarStatusCount: (scholarStatusCount) => set({scholarStatusCount}),

    //Get Total of Users
    totalUsers: [],
    setTotalUsers: (totalUsers) => set({ totalUsers}),

    //Get Total of Scholars
    totalScholars: [],
    setTotalScholars: (totalScholars) => set({totalScholars}),

    //Get Total of Scholarships Categories
    totalScholarshipCategories: [],
    setTotalScholarshipCategories: (totalScholarshipCategories) => set({totalScholarshipCategories}),

    //Get Total of Project Partners
    totalProjectPartners: [],
    setTotalProjectPartners: (totalProjectPartners) => set({totalProjectPartners}),

    //Get Scholars List of Submission 
    scholarSubmission: [],
    setScholarSubmission: (scholarSubmission) => set({scholarSubmission}),

    graduatingSubmission: [],
    setGraduatingSubmission: (graduatingSubmission) => set({graduatingSubmission}),

    alumniSubmission: [],
    setAlumniSubmission: (alumniSubmission) => set({alumniSubmission}),


    //Bar Chart
    term1Data: [],
    setTerm1Data: (term1Data) => set({term1Data}),

    term2Data: [],
    setTerm2Data: (term2Data) => set({term2Data}),

    term3Data: [],
    setTerm3Data: (term3Data) => set({term3Data}),

    scholarProfiles: [],
    setScholarProfiles: (scholarProfiles) => set({scholarProfiles}),

    schoolsData: [],
    setSchoolsData: (schoolsData) => set({schoolsData}),

    undergraduateData: [],
    setUndergraduateData: (undergraduateData) => set({undergraduateData}),

    renewalData: [],
    setRenewalData: (renewalData) => set({renewalData}),

    graduatingData: [],
    setGraduatingData: (graduatingData) => set({graduatingData}),

    alumniData: [],
    setAlumniData: (alumniData) => set({alumniData}),

    viewModal: false,
    setViewModal: (viewModal) => set({ viewModal }),
    handleOpenViewModal: () => set({viewModal: true}),
    handleCloseViewModal: () => set({viewModal: false}),

    selectedUser: null,
    setSelectedUser: (selectedUser) => set({ selectedUser}),

}))

export default useDashboardStore;