"use client";
import cn from "@/src/shared/lib/cn";
import { useFilterStore } from "@/src/features/filter-announcements";
import { SearchBar } from "@/src/features/search-announcements";
import { FilterTriggerBar } from "@/src/features/filter-announcements";
import { SortSelector } from "@/src/features/filter-announcements";
import { RecommendationToggle } from "@/src/features/toggle-recommend";
import { AnnouncementFilter } from "@/src/features/filter-announcements";

export function AnnouncementHeader() {
  const { statusTab, setStatusTab, isFilterOpen, closeFilter } =
    useFilterStore();

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

        <div className="flex items-center justify-between px-4 border-t border-slate-50">
          <RecommendationToggle />
          <SortSelector />
        </div>

        {isFilterOpen && (
          <div className="absolute top-full left-0 w-full bg-white z-40 animate-in fade-in slide-in-from-top-2 duration-200 shadow-xl">
            <AnnouncementFilter />
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
