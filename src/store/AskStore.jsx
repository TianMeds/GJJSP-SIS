import { create } from "zustand";

const useAskStore = create((set) => ({
    searchResult: null,
    setSearchResult: (newSearchResult) => set({ searchResult: newSearchResult }),
}));

export default useAskStore;