import { create } from 'zustand'
import { v4 as uuidv4 } from 'uuid';

const useExportStore = create((set) => ({
    exportData: false,
    handleOpenExport: () => set({exportData: true}),
    handleCloseExport: () => set({exportData: false}),
    
}))

export default useExportStore;