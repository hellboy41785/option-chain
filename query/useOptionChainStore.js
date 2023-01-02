import create from "zustand";

export const useOptionChainStore = create((set, get) => ({
  contracts: "NIFTY",
  addContracts: (value) => set((state) => ({ contracts: value })),
}));