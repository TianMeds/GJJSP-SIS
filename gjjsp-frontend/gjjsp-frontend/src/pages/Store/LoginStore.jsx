import { create } from 'zustand'
import { v4 as uuidv4 } from 'uuid';

const useLoginStore = create((set) => ({
    loading: false,
    showPassword: false,
    authenticated: false,
    errMsg: '',
    setAuthenticated: (newAuthenticated) => set({authenticated: newAuthenticated}),
    setShowPassword: (newShowPassword) => set({showPassword: newShowPassword}),
    setLoading: (newLoading) => set({ loading: newLoading }),
    setErrMsg: (newErrMsg) => set({ errMsg: newErrMsg }),

    handleTogglePassword: () => {
        set((state) => ({ showPassword: !state.showPassword })); // Toggle showPassword state
      },
}))

export default useLoginStore;