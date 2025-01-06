import { create } from "zustand";

interface StoreInterface {
    apiCalling: boolean;
    setApiCalling: (value: boolean) => void;
  }
const useStore = create<StoreInterface>((set) => ({
    apiCalling: false,
    setApiCalling: (value) => set({ apiCalling: value })
}));

export default useStore;