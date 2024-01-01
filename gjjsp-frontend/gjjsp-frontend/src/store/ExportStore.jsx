import { create } from 'zustand'
import { v4 as uuidv4 } from 'uuid';

const useExportStore = create((set) => ({
    exportData: false,
    openExportAlert: false,
    exportSchedule: 'None',
    allUserData: true,
    accountDetails: true,
    scholarshipData: true,
    submissionData: true,
    backendSuccess: true,
    setAllUserData: (newAllUserData) => set({allUserData: newAllUserData}),
    setAccountDetails: (newAccountDetails) => set({accountDetails: newAccountDetails}),
    setScholarshipData: (newScholarshipData) => set({scholarshipData: newScholarshipData}),
    setSubmissionData: (newSubmissionData) => set({submissionData: newSubmissionData}), 
    setExportSchedule: (newExportSchedule) => set({exportSchedule: newExportSchedule}),
    setBackendSuccess: (newBackendSuccess) => set({ backendSuccess: newBackendSuccess }), 
    setOpenExportAlert: (newOpenExportAlert) => set({openExportAlert: newOpenExportAlert}),
    handleOpenExport: () => set({exportData: true}),
    handleCloseExport: () => set({exportData: false}),
    
}))

export default useExportStore;