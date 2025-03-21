// src/store/useDataStore.ts
import { create } from "zustand";

type GraphData = {
  nodes: { id: string; label: string }[];
  edges: { from: string; to: string }[];
};

type DataType = string | number[] | GraphData | null; // Can be a string, array, graph, or null

type Store = {
  data: DataType;
  setData: (value: DataType) => void;
};

export const useDataStore = create<Store>((set) => ({
  data: null, // Default value
  setData: (value) => set({ data: value }),
}));
