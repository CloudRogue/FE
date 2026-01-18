"use client";
import cn from "@/src/shared/lib/cn";
import { useFilterStore } from "@/src/features/filter-announcements";
import { SearchBar } from "@/src/features/search-announcements";
import { FilterTriggerBar } from "@/src/features/filter-announcements";
import { SortSelector } from "@/src/features/filter-announcements";
import { RecommendationToggle } from "@/src/features/toggle-recommend";
import { AnnouncementFilter } from "@/src/features/filter-announcements";

export function AnnouncementHeader() {
  const { statusTab, setStatusTab, isFilterOpen, closeFilter, setSort } =
    useFilterStore();

  const handleTabChange = (status: "OPEN" | "CLOSED") => {
    setStatusTab(status);

    if (status === "CLOSED") {
      setSort("LATEST");
    }
  };

  return (
    <>
      <header className="sticky top-0 z-30 flex flex-col bg-white shadow-sm">
        <SearchBar />

        <div className="flex border-b border-slate-100 mt-1">
          <button
            onClick={() => setStatusTab("OPEN")}
            className={cn(
              "flex-1 py-4 text-center text-[15px] font-bold transition-colors relative",
              statusTab === "OPEN" ? "text-slate-900" : "text-slate-400",
            )}
          >
            접수 가능
            {statusTab === "OPEN" && (
              <div className="absolute bottom-0 left-0 w-full h-[2px] bg-slate-900" />
            )}
          </button>
          <button
            onClick={() => setStatusTab("CLOSED")}
            className={cn(
              "flex-1 py-4 text-center text-[15px] font-bold transition-colors relative",
              statusTab === "CLOSED" ? "text-slate-900" : "text-slate-400",
            )}
          >
            접수 마감
            {statusTab === "CLOSED" && (
              <div className="absolute bottom-0 left-0 w-full h-[2px] bg-slate-900" />
            )}
          </button>
        </div>

        <FilterTriggerBar />

        {!isFilterOpen && (
          <div className="flex items-center justify-between px-4 border-t border-slate-50 py-2 min-h-[44px]">
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
          className="fixed inset-0 bg-black/20 z-20 transition-opacity"
          onClick={closeFilter}
        />
      )}
    </>
  );
}
