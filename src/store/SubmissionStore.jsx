import { create } from 'zustand'
import { v4 as uuidv4 } from 'uuid';

const useSubmissionStore = create((set) => ({
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

    //Renewal Form 
    copyOfReportCard: null,
    setCopyOfReportCard: (copyOfReportCard) => set({copyOfReportCard}),
    copyOfRegistrationForm: null,
    setCopyOfRegistrationForm: (copyOfRegistrationForm) => set({copyOfRegistrationForm}),
    scannedWrittenEssay: null,
    setScannedWrittenEssay: (scannedWrittenEssay) => set({scannedWrittenEssay}),
    letterOfGratitude: null,
    setLetterOfGratitude: (letterOfGratitude) => set({letterOfGratitude}),

    //Graduating Form
    copyOfReportCardGraduating: null,
    setCopyOfReportCardGraduating: (copyOfReportCardGraduating) => set({copyOfReportCardGraduating}),
    copyOfRegistrationFormGraduating: null,
    setCopyOfRegistrationFormGraduating: (copyOfRegistrationFormGraduating) => set({copyOfRegistrationFormGraduating}),
    scannedWrittenEssayGraduating: null,
    setScannedWrittenEssayGraduating: (scannedWrittenEssayGraduating) => set({scannedWrittenEssayGraduating}),
    letterOfGratitudeGraduating: null,
    setLetterOfGratitudeGraduating: (letterOfGratitudeGraduating) => set({letterOfGratitudeGraduating}),
    statementOfAccount: null,
    setStatementOfAccount: (statementOfAccount) => set({statementOfAccount}),
    graduationPicture: null,
    setGraduationPicture: (graduationPicture) => set({graduationPicture}),
    transcriptOfRecords: null,
    setTranscriptOfRecords: (transcriptOfRecords) => set({transcriptOfRecords}),



    //Table Values and Status before viewing
    renewalForms: [],
    renewalForm: false,
    setRenewalForms: (newRenewalForms) => set({renewalForms: newRenewalForms}),

    //Forms and Table Values
    renewalValues: [],
    setRenewalValues: (newRenewalValues) => set({renewalValues: newRenewalValues}),

    //Table Values for Graduating
    graduatingForms: [],
    graduatingForm: false,
    setGraduatingForms: (newGraduatingForms) => set({graduatingForms: newGraduatingForms}),

    modalGraduating: false,
    setModalGraduating: (modalGraduating) => set({ modalGraduating }),
    graduatingIdToSend: null,
    setGraduatingIdToSend: (graduatingIdToSend) => set({ graduatingIdToSend }),


    //Get Values of the Submission
    submissionValues: [],
    submissionValue: false,
    setSubmissionValues: (submissionValues) => set({submissionValues}),
    selectedSubmission: null,
    setSelectedSubmission: (selectedSubmission) => set({selectedSubmission}),

    //Values of the Submissions 
    renewalScholarData: [],
    setRenewalScholarData: (newRenewalScholarData) => set({renewalScholarData: newRenewalScholarData}),


    // Submission Form
    file: '',
    setFile: (newFile) => set({file: newFile}),
    submissions: [],
    submission: false,
    setSubmissions: (newSubmissions) => set({submissions: newSubmissions}),

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

    //Submission Form
    renewalSubmission: [],
    setRenewalSubmission: (newRenewalSubmission) => set({renewalSubmission: newRenewalSubmission}),
    
    modalRenewal: false,
    setModalRenewal: (modalRenewal) => set({ modalRenewal }),

    renewalIdToSend: null,
    setRenewalIdToSend: (renewalIdToSend) => set({ renewalIdToSend }),


}))

export default useSubmissionStore;