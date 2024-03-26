import { create } from 'zustand'
import { v4 as uuidv4 } from 'uuid';

const useSubmissionStore = create((set) => ({
    attachmentOpen: false,
    submissionFormOpen: false,
    submissionStatusOpen: false,
    submissionManage: '',
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

    userData: [],
    setUserData: (newUserData) => set({userData: newUserData}),



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

    alumniForms: [],
    setAlumniForms: (newAlumniForms) => set({alumniForms: newAlumniForms}),

    renewalMap: [],
    setRenewalMap: (newRenewalMap) => set({renewalMap: newRenewalMap}),

    
    modalGraduating: false,
    setModalGraduating: (modalGraduating) => set({ modalGraduating }),
    graduatingIdToSend: null,
    setGraduatingIdToSend: (graduatingIdToSend) => set({ graduatingIdToSend }),

    modalAlumni: false,
    setModalAlumni: (modalAlumni) => set({ modalAlumni }),
    alumniIdToSend: null,
    setAlumniIdToSend: (alumniIdToSend) => set({ alumniIdToSend }),


    //Get Values of the Submission
    submissionValues: [],
    submissionValue: false,
    setSubmissionValues: (submissionValues) => set({submissionValues}),
    selectedSubmission: null,
    setSelectedSubmission: (selectedSubmission) => set({selectedSubmission}),

    passYear : null,
    setPassYear: (passYear) => set({passYear}),
    passTerm : null,
    setPassTerm: (passTerm) => set({passTerm}),

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

    //Submission Form
    renewalSubmission: [],
    setRenewalSubmission: (newRenewalSubmission) => set({renewalSubmission: newRenewalSubmission}),
    
    modalRenewal: false,
    setModalRenewal: (modalRenewal) => set({ modalRenewal }),

    renewalIdToSend: null,
    setRenewalIdToSend: (renewalIdToSend) => set({ renewalIdToSend }),

    searchQuery: '',
    setSearchQuery: (query) => set({ searchQuery: query }),
    handleSearch: (e) => set({ searchQuery: e.target.value }),

    filteredSubmission: "All",
    setFilteredSubmission: (newFilteredSubmission) => set({filteredSubmission: newFilteredSubmission}),

    modalRemarks: false,
    setModalRemarks: (modalRemarks) => set({ modalRemarks }),
    remarksIdToSend: null,
    setRemarksIdToSend: (remarksIdToSend) => set({ remarksIdToSend }),


    //Renewal Submission Modal
    modalConfirmation: false,
    setModalConfirmation: (modalConfirmation) => set({ modalConfirmation }),
    handleOpenConfirmationModal: () => set({modalConfirmation: true}),
    handleCloseConfirmationModal: () => set({modalConfirmation: false}),

    //Renewal Submission History Modal
    modalHistory: false,
    setModalHistory: (modalHistory) => set({ modalHistory }),
    handleOpenHistoryModal: () => set({modalHistory: true}),
    handleCloseHistoryModal: () => set({modalHistory: false}),

    //Submission Status Modal
    modalStatus: false,
    setModalStatus: (modalStatus) => set({ modalStatus }),
    handleOpenStatusModal: () => set({modalStatus: true}),
    handleCloseStatusModal: () => set({modalStatus: false}),

    disapprovalRemarks: '',
    setDisapprovalRemarks: (disapprovalRemarks) => set({disapprovalRemarks}),

    editAlumni: false,
    setEditAlumni: (newEditAlumni) => set({editAlumni: newEditAlumni}),

    updateData: [],
    setUpdateData: (newUpdateData) => set({updateData: newUpdateData}),

}))

export default useSubmissionStore;