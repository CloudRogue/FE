"use client";

import {
  AnnouncementFilter,
  FilterTriggerBar,
  SortSelector,
  useFilterStore,
} from "@/src/features/filter-announcements";
import { RecommendationToggle } from "@/src/features/toggle-recommend";
import cn from "@/src/shared/lib/cn";

export function AnnouncementHeader() {
  const { statusTab, setStatusTab, isFilterOpen, closeFilter, setSort } =
    useFilterStore();

  const handleTabChange = (status: "OPEN" | "CLOSED") => {
    setStatusTab(status);
    if (status === "CLOSED") {
      setSort("DEADLINE");
    }
  };

  return (
    <>
      <header className="sticky top-0 flex flex-col bg-white z-30">
        <div className="flex">
          {(["OPEN", "CLOSED"] as const).map((status) => (
            <button
              key={status}
              onClick={() => handleTabChange(status)}
              className={cn(
                "flex-1 py-4 text-center text-h3 transition-colors relative bg-white",
                statusTab === status
                  ? "border-primary-blue text-primary-blue font-bold"
                  : "border-transparent text-gray-700 font-medium",
              )}
            >
              {status === "OPEN" ? "접수 가능" : "접수 마감"}
              {statusTab === status && (
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary-blue" />
              )}
            </button>
          ))}
        </div>

        <FilterTriggerBar />
        {isFilterOpen && (
          <div className="absolute top-full left-0 w-full ">
            <AnnouncementFilter />
          </div>
        )}

        {!isFilterOpen && (
          <div className="flex items-center justify-between p-4">
            {statusTab === "OPEN" ? (
              <>
                <RecommendationToggle />
                <SortSelector />
              </>
            ) : (
              <div className="flex items-center justify-end w-full">
                <span className="text-[13px] text-slate-400 font-medium">
                  마감순 정렬
                </span>
              </div>
            )}
          </div>
        )}
      </header>

      {isFilterOpen && (
        <div
          className="fixed inset-0 transition-opacity z-20"
          onClick={closeFilter}
        />
      )}
    </>
  );
}
