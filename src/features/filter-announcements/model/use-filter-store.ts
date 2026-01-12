import { create } from "zustand";
import type { AnnouncementFilterParams } from "@/src/entities/announcement/model/types";

type SortType = "DEADLINE" | "LATEST" | "RELEVANCE";
type FilterTab = "region" | "publisher" | "housingType";
type StatusType = "OPEN" | "CLOSED";

interface FilterState {
  isFilterOpen: boolean;
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

  // Actions
  toggleFilter: (tab: FilterTab) => void;
  closeFilter: () => void;
  setActiveTab: (tab: FilterTab) => void;
  setStatusTab: (status: StatusType) => void;
  setIsPersonalized: (enabled: boolean) => void;

  // 임시 필터 설정 (칩 선택 시)
  setTempFilter: (
    key: keyof FilterState["tempFilters"],
    value: string | undefined,
  ) => void;

  // 즉시 필터 설정 (검색어 입력 등)
  setFilter: <K extends keyof AnnouncementFilterParams>(
    key: K,
    value: AnnouncementFilterParams[K],
  ) => void;

  setSort: (sort: SortType) => void;
  applyFilters: () => void;
  resetFilters: () => void;
}

const initialFilterState = {
  regionCode: undefined,
  publisher: undefined,
  housingType: undefined,
  keyword: undefined,
};

export const useFilterStore = create<FilterState>((set) => ({
  isFilterOpen: false,
  activeTab: "region",
  statusTab: "OPEN",
  isPersonalized: false,
  tempFilters: {},
  appliedFilters: { sort: "DEADLINE" },

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
    set((state) => ({
      tempFilters: {},
      appliedFilters: { sort: "DEADLINE" as const },
      isFilterOpen: false,
    })),
}));
