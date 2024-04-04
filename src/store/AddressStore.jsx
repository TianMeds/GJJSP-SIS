import { create } from "zustand";

const useAddressStore = create((set) => ({

    //Hooks for Regions Store
    regions: [],
    setRegions: (regions) => set({ regions }),
    selectedRegion: '',
    setSelectedRegion: (newRegion) => set({ selectedRegion: newRegion }),
    regionsCode:[],
    setRegionsCode: (regionsCode) => set({regionsCode}),
    selectedRegionCode: '',
    setSelectedRegionCode: (newRegionCode) => set({selectedRegionCode: newRegionCode}),

    //Hooks for Province Store
    provinces: [],
    setProvinces: (provinces) => set({ provinces }),
    selectedProvince: '',
    setSelectedProvince: (newProvince) => set({ selectedProvince: newProvince }),
    provincesName: [],
    setProvincesName: (provincesName) => set({provincesName}),
    selectedProvinceCode: '',
    setSelectedProvinceCode: (newProvinceCode) => set({selectedProvinceCode: newProvinceCode}),

    //Hooks for City Store
    cities: [],
    setCities: (cities) => set({ cities }),
    selectedCity: '',
    setSelectedCity: (newCity) => set({ selectedCity: newCity }),
    citiesName: [],
    setCitiesName: (citiesName) => set({citiesName}),
    selectedCityCode: '',
    setSelectedCityCode: (newCityCode) => set({selectedCityCode: newCityCode}),

    //Hooks for Barangay Store
    barangays: [],
    setBarangays: (barangays) => set({ barangays }),
    selectedBarangay: '',
    setSelectedBarangay: (newBarangay) => set({selectedBarangay: newBarangay}),
    barangaysName: [],
    setBarangaysName: (barangaysName) => set({barangaysName}),
}));

export default useAddressStore;