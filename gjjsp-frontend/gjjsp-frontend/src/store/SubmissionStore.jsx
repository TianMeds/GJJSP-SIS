import { create } from 'zustand'
import { v4 as uuidv4 } from 'uuid';

const useSubmissionStore = create((set) => ({
    submissions: [],
    submission: false,
    attachmentOpen: false,
    submissionFormOpen: false,
    submissionStatusOpen: false,
    submissionManage: '',
    filteredSubmission: "All",
    scholarshipType: 'Gado - FORMAL Education',
    submissionType: 'New Application',
    submissionSent: '12/01/2023',
    submissionStatus: 'SAVED',
    submissionRespond: 'Respond',
    setSubmission: (newSubmission) => set({submission: newSubmission}),
    setSubmissionManage: (newSubmissionManage) => set({submissionManage: newSubmissionManage}),
    setSubmissionStatusOpen: (newSubmissionStatusOpen) => set({submissionStatusOpen: newSubmissionStatusOpen}),
    setSubmissionFormOpen: (newSubmissionFormOpen) => set({submissionFormOpen: newSubmissionFormOpen}),
    setAttachmentOpen: (newAttachmentOpen) => set({attachmentOpen: newAttachmentOpen}),
    setScholarshipType: (newScholarshipType) => set({scholarshipType: newScholarshipType}),
    setSubmissionType: (newSubmissionType) => set({submissionType: newSubmissionType}),
    setSubmissionSent: (newSubmissionSent) => set({submissionSent: newSubmissionSent}),
    setSubmissionStatus: (newSubmissionStatus) => set({submissionStatus: newSubmissionStatus}),
    setFilteredSubmission: (newFilteredSubmission) => set({filteredSubmission: newFilteredSubmission}),

    searchQuery: '',
    setSearchQuery: (query) => set({ searchQuery: query }),
    handleSearch: (e) => set({ searchQuery: e.target.value }),
}))

export default useSubmissionStore;