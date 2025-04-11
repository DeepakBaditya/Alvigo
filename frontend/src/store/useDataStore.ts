// src/store/useDataStore.ts
import { DataType } from "@/types/algorithm-context";
import { create } from "zustand";

type GraphData = {
  nodes: { id: string; label: string }[];
  edges: { from: string; to: string }[];
};

type Store = {
  data: DataType;
  setData: (value: DataType) => void;
};

export const useDataStore = create<Store>((set) => ({
  data: null, // Default value
  setData: (value) => set({ data: value }),
}));
