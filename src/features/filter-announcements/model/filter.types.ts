import type { AnnouncementFilterParams } from "@/src/entities/announcement";

export type SortType = "DEADLINE" | "LATEST" | "RELEVANCE";
export type FilterTab = "region" | "publisher" | "housingType";
export type StatusType = "OPEN" | "CLOSED";

export interface FilterState {
  isFilterOpen: boolean;
  activeTab: FilterTab;
  statusTab: StatusType;
  isPersonalized: boolean;

  tempFilters: {
    regionName: string | undefined;
    publisher?: string;
    housingType?: string;
    keyword?: string;
  };
  appliedFilters: AnnouncementFilterParams;

  toggleFilter: (tab: FilterTab) => void;
  closeFilter: () => void;
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
