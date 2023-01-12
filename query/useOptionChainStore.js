import create from "zustand";
import { persist, devtools } from "zustand/middleware";

export const useOptionChainStore = create((set, get) => ({
  contracts: "NIFTY",
  addContracts: (value) => set((state) => ({ contracts: value })),
}));

