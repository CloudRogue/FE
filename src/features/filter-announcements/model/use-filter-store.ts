import { create } from "zustand";
import type { AnnouncementFilterParams } from "@/src/entities/announcement/model/types";

type SortType = "DEADLINE" | "LATEST" | "RELEVANCE";
type FilterTab = "region" | "publisher" | "housingType";
type StatusType = "OPEN" | "CLOSED";

interface FilterState {
  activeTab: FilterTab; 
  statusTab: StatusType;
  isPersonalized: boolean; 

  tempFilters: {
    regionCode?: string;
    publisher?: string;
    housingType?: string;
    keyword?: string;
  };
  appliedFilters: AnnouncementFilterParams; 

  setActiveTab: (tab: FilterTab) => void;
  setStatusTab: (status: StatusType) => void;
  setIsPersonalized: (enabled: boolean) => void;

  setTempFilter: (
    key: keyof FilterState["tempFilters"],
    value: string | undefined,
  ) => void;

  setFilter: <K extends keyof AnnouncementFilterParams>(
    key: K,
    value: AnnouncementFilterParams[K],
  ) => void;

  setSort: (sort: SortType) => void;
  applyFilters: () => void;
  resetFilters: () => void;
}

const initialState = {
  activeTab: "region" as const,
  statusTab: "OPEN" as const,
  isPersonalized: false,
  tempFilters: {},
  appliedFilters: { sort: "DEADLINE" as const },
};

export const useFilterStore = create<FilterState>((set) => ({
  ...initialState,

  setActiveTab: (activeTab) => set({ activeTab }),

  setStatusTab: (statusTab) =>
    set((state) => ({
      statusTab,
      appliedFilters: { ...state.appliedFilters, status: statusTab },
    })),

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
    })),

  resetFilters: () => set(initialState),
}));
