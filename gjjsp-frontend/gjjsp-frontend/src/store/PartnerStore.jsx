import { create } from 'zustand'
import { v4 as uuidv4 } from 'uuid';

const usePartnerStore = create((set) => ({
    //Hook for get partner 
    partners: [],
    partner: false,
    setPartners: (partners) => set({ partners }),
    selectedProjectPartner: '',
    setSelectedProjectPartner: (selectedProjectPartner) => set({ selectedProjectPartner}),

    //Hook for edit partner
    editPartner: false,
    setEditPartner: (newEditPartner) => set({editPartner: newEditPartner}),
    selectedPartner: null,
    setSelectedPartner: (selectedPartner) => set({ selectedPartner}),
    selectedProjectPartnerId: '',
    setSelectedProjectPartnerId: (selectedProjectPartnerId) => set({ selectedProjectPartnerId}),
    
    partnersWithIndex: [],
    partnerName: '',
    partnerMobileNum: '',
    partnerSchool: '',
    filteredPartner: 'All',
  
    setPartnerName:  (newPartnerName) => set({partnerName: newPartnerName}),
    setPartnerMobileNum: (newPartnerMobileNum) => set({partnerMobileNum: newPartnerMobileNum}),
    setPartnerSchool: (newPartnerSchool) => set({partnerSchool: newPartnerSchool}),
    setFilteredPartner: (newFilteredPartner) => set({filteredPartner: newFilteredPartner}),

    handleOpenPartner: () => set({partner: true}),
    handleClosePartner: () => set({partner: false}),

    schools: [],
    setSchools: (schools) => set({ schools }),

    categories: [],
    setCategories: (categories) => set({ categories }),

    modalPartner: false,
    setModalPartner: (modalPartner) => set({ modalPartner }),
    handleOpenModalPartner: () => set({modalPartner: true}),
    handleCloseModalPartner: () => set({modalPartner: false}),

    deleteModalPartner: false,
    setDeleteModalPartner: (deleteModalPartner) => set({ deleteModalPartner }),
    handleOpenDeleteModalPartner: () => set({deleteModalPartner: true}),
    handleCloseDeleteModalPartner: () => set({deleteModalPartner: false}),

    restoreModalPartner: false,
    setRestoreModalPartner: (restoreModalPartner) => set({ restoreModalPartner }),
    partnerIdToRestore: null,
    setPartnerIdToRestore: (partnerIdToRestore) => set({ partnerIdToRestore }),

    partnerIdToDelete: null,
    setPartnerIdToDelete: (partnerIdToDelete) => set({ partnerIdToDelete }),
    

    searchQuery: '',
    setSearchQuery: (query) => set({ searchQuery: query }),
    handleSearch: (e) => set({ searchQuery: e.target.value }),

    filterModal: false,
    setFilterModal: (filterModal) => set({ filterModal }),
    handleOpenFilterModal: () => set({filterModal: true}),
    handleCloseFilterModal: () => set({filterModal: false}),

    filteredDeleted: 'All',
    setFilteredDeleted: (newFilteredDeleted) => set({filteredDeleted: newFilteredDeleted}),
}));

export default usePartnerStore;