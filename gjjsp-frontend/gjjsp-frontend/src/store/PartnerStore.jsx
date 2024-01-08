import { create } from 'zustand'
import { v4 as uuidv4 } from 'uuid';

const usePartnerStore = create((set) => ({
    //Hook for get partner 
    partners: [],
    partner: false,
    setPartners: (partners) => set({ partners }),

    //Hook for edit partner
    editPartner: false,
    setEditPartner: (newEditPartner) => set({editPartner: newEditPartner}),
    selectedPartner: null,
    setSelectedPartner: (selectedPartner) => set({ selectedPartner}),
    
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

    searchQuery: '',
    setSearchQuery: (query) => set({ searchQuery: query }),
    handleSearch: (e) => set({ searchQuery: e.target.value }),
}));

export default usePartnerStore;