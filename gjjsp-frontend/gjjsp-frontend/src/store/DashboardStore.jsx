import { create } from "zustand";

const useDashboardStore = create((set) => ({

    //Get Data from Scholar Status 
    scholarStatus: [],
    scholarStatuses: false,
    setScholarStatus: (scholarStatus) => set({scholarStatus}),

}))

export default useDashboardStore;