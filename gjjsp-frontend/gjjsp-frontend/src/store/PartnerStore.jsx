import { create } from 'zustand'
import { v4 as uuidv4 } from 'uuid';

const usePartnerStore = create((set) => ({

    partnersWithIndex: [],
    partners: [],
    partner: false,
    editPartner: false,
    partnerName: '',
    partnerMobileNum: '',
    partnerSchool: '',
    selectedPartner: null,
    filteredPartner: 'All',
    setEditPartner: (newEditPartner) => set({editPartner: newEditPartner}),
    setPartnerName:  (newPartnerName) => set({partnerName: newPartnerName}),
    setPartnerMobileNum: (newPartnerMobileNum) => set({partnerMobileNum: newPartnerMobileNum}),
    setPartnerSchool: (newPartnerSchool) => set({partnerSchool: newPartnerSchool}),
    setSelectedPartner: (selectedPartner) => set({ selectedPartner}),
    setFilteredPartner: (newFilteredPartner) => set({filteredPartner: newFilteredPartner}),

    handleOpenPartner: () => set({partner: true}),
    handleClosePartner: () => set({partner: false}),


    addPartner: (partnerName, partnerMobileNum, partnerSchool) =>
    set((store) => ({
      partners: [
        ...store.partners,
        { id: uuidv4(), partnerName, partnerMobileNum, partnerSchool },
      ],
      partnersWithIndex: [
        ...store.partnersWithIndex,
        { partnerName, partnerMobileNum, partnerSchool, originalIndex: store.partners.length },
      ],
    })),

    updatePartner: (partnerId, partnerName, partnerMobileNum, partnerSchool ) =>
    set((store) => ({
        partners: store.partners.map((partner) =>
        partner.id === partnerId
        ? { ...partner, partnerName, partnerMobileNum, partnerSchool }
        : partner
        ),
    })),
    deletePartner: (partnerId) =>
        set((store) => ({
        partners: store.partners.filter((partner) => partner.id !== partnerId),
        partnersWithIndex: store.partnersWithIndex.filter((partner) => partner.id !== partnerId),
    })),

    searchQuery: '',
    setSearchQuery: (query) => set({ searchQuery: query }),
    handleSearch: (e) => set({ searchQuery: e.target.value }),
}));

export default usePartnerStore;