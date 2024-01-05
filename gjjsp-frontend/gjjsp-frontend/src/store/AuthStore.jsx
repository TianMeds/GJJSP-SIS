import {create} from 'zustand';

const useAuthStore = create((set) => ({
authToken: null,

setAuthToken: (newAuthToken) => set({authToken: newAuthToken}),
getAuthToken: () => {
    return useAuthStore.getState().authToken;
}

}));

export default useAuthStore;