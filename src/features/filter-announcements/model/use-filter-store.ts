import { create } from "zustand";

interface FilterState {
  appliedFilters: {
    regionCode?: string;
    publisher?: string;
    housingType?: string;
  };
  tempFilters: {
    regionCode?: string;
    publisher?: string;
    housingType?: string;
  };
  setTempFilter: (
    key: "regionCode" | "publisher" | "housingType",
    value: string | undefined,
  ) => void;
  applyFilters: () => void;
  resetFilters: () => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  appliedFilters: {},
  tempFilters: {},
  setTempFilter: (key, value) =>
    set((state) => ({
      tempFilters: { ...state.tempFilters, [key]: value },
    })),
  applyFilters: () =>
    set((state) => ({
      appliedFilters: state.tempFilters,
    })),
  resetFilters: () =>
    set({
      appliedFilters: {},
      tempFilters: {},
    }),
}));
