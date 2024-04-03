import { create } from 'zustand'
import { v4 as uuidv4 } from 'uuid';
import { persist, createJSONStorage } from 'zustand/middleware'

const useLoginStore = create((set) => ({

    email: '',
    setEmail: (email) => set({ email }),

  //Loading animation hooks
    loading: false,
    setLoading: (newLoading) => set({ loading: newLoading }),
    loadingMessage: '',
    setLoadingMessage: (newLoadingMessage) => set({ loadingMessage: newLoadingMessage }),

    //Hooks for the password icon 
    showPassword: false,
    setShowPassword: (newShowPassword) => set({showPassword: newShowPassword}),
    handleTogglePassword: () => {
      set((state) => ({ showPassword: !state.showPassword })); // Toggle showPassword state
    },

    //Hooks for the login form
    authenticated: false,
    expirationTime: null,
    token: null,
    errMsg: '',
    setToken: (newToken) => set({token: newToken}),
    setExpirationTime: (newExpirationTime) => set({expirationTime: newExpirationTime}),
    setAuthenticated: (newAuthenticated) => set({authenticated: newAuthenticated}),
    setErrMsg: (newErrMsg) => set({ errMsg: newErrMsg }),
}))

export default useLoginStore;