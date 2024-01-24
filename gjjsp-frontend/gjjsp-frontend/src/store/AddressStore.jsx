import { create } from "zustand";

const useAddressStore = create((set) => ({

    //Hooks for Regions Store
    regions: [],
    setRegions: (regions) => set({ regions }),
    selectedRegion: '',
    setSelectedRegion: (newRegion) => set({ selectedRegion: newRegion }),
    regionsName:[],
    setRegionsName: (regionsName) => set({regionsName}),

    //Hooks for Province Store
    provinces: [],
    setProvinces: (provinces) => set({ provinces }),
    selectedProvince: '',
    setSelectedProvince: (newProvince) => set({ selectedProvince: newProvince }),
    provincesName: [],
    setProvincesName: (provincesName) => set({provincesName}),

    //Hooks for City Store
    cities: [],
    setCities: (cities) => set({ cities }),
    selectedCity: '',
    setSelectedCity: (newCity) => set({ selectedCity: newCity }),
    citiesName: [],
    setCitiesName: (citiesName) => set({citiesName}),

    //Hooks for Barangay Store
    barangays: [],
    setBarangays: (barangays) => set({ barangays }),
    selectedBarangay: '',
    setSelectedBarangay: (newBarangay) => set({selectedBarangay: newBarangay}),
    barangaysName: [],
    setBarangaysName: (barangaysName) => set({barangaysName}),
}));

export default useAddressStore;