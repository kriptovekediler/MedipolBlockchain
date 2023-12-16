import { create } from "zustand";

export const useGlobalStore = create((set) => ({
  loading: true,
  setLoading: (loading) => set({ loading }),
  profileDetail: {},
  address: String,
  setProfileDetail: (profileDetail) => set({ profileDetail, loading: false }),
  setAddress: (address) => set({ address }),
}));
