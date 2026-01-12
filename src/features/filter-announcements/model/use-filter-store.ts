import { create } from "zustand";
import type { AnnouncementFilterParams } from "@/src/entities/announcement";

interface FilterState {
  activeTab: "region" | "publisher" | "housingType";
  tempFilters: {
    regionCode?: string;
    publisher?: string;
    housingType?: string;
    keyword?: string; 
  };
  appliedFilters: AnnouncementFilterParams;

  setActiveTab: (tab: "region" | "publisher" | "housingType") => void;
  setTempFilter: (
    key: keyof FilterState["tempFilters"],
    value: string | undefined,
  ) => void;

  setFilter: (key: keyof AnnouncementFilterParams, value: any) => void;

  applyFilters: () => void;
  resetFilters: () => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  activeTab: "region",
  tempFilters: {},
  appliedFilters: {},

  setActiveTab: (activeTab) => set({ activeTab }),

  setTempFilter: (key, value) =>
    set((state) => ({
      tempFilters: { ...state.tempFilters, [key]: value },
    })),


  setFilter: (key, value) =>
    set((state) => ({
      appliedFilters: { ...state.appliedFilters, [key]: value },
      tempFilters: { ...state.tempFilters, [key]: value },
    })),

  applyFilters: () =>
    set((state) => ({
      appliedFilters: {
        ...state.appliedFilters,
        ...state.tempFilters,
        sort: "DEADLINE",
      },
    })),

  resetFilters: () =>
    set({
      tempFilters: {},
      appliedFilters: {},
    }),
}));
