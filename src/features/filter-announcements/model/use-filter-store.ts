import { create } from "zustand";
import type { FilterState } from "@/src/features/filter-announcements/model/filter.types";

const initialFilterState = {
  regionName: undefined,
  publisher: undefined,
  keyword: undefined,
};

export const useFilterStore = create<FilterState>((set) => ({
  isFilterOpen: false,
  activeTab: "region",
  statusTab: "OPEN",
  isPersonalized: false,

  tempFilters: initialFilterState,
  appliedFilters: {
    sort: "DEADLINE",
    keyword: undefined,
  },

  toggleFilter: (tab) =>
    set((state) => {
      if (state.isFilterOpen && state.activeTab === tab) {
        return { isFilterOpen: false };
      }
      return { isFilterOpen: true, activeTab: tab };
    }),

  closeFilter: () => set({ isFilterOpen: false }),
  setActiveTab: (activeTab) => set({ activeTab }),
  setStatusTab: (statusTab) => set({ statusTab }),
  setIsPersonalized: (isPersonalized) => set({ isPersonalized }),

  setSort: (sort) =>
    set((state) => ({
      appliedFilters: { ...state.appliedFilters, sort },
    })),

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
      },
      isFilterOpen: false,
    })),

  resetFilters: () =>
    set({
      tempFilters: initialFilterState,
      appliedFilters: {
        sort: "DEADLINE",
        keyword: undefined,
      },
      isFilterOpen: false,
      activeTab: "region",
      statusTab: "OPEN",
      isPersonalized: false,
    }),
}));
