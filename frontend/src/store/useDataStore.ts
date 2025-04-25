// src/store/useDataStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { DataType, properties } from "@/types/algorithm-context";

type Store = {
  data: DataType;
  setData: (value: DataType) => void;
  meta: {
    description: string;
    properties: properties;
  } | null;
  setMeta: (value: { description: string; properties: properties }) => void;
};

// Persist only `meta`, not `data`
export const useDataStore = create<Store>()(
  persist(
    (set) => ({
      data: null,
      setData: (value) => set({ data: value }),
      meta: null,
      setMeta: (value) => set({ meta: value }),
    }),
    {
      name: "meta-storage", // localStorage key
      partialize: (state) => ({ meta: state.meta }), // Only persist meta
    }
  )
);
