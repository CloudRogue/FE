"use client";

import { useFilterStore } from "@/src/features/filter-announcements";
import cn from "@/src/shared/lib/cn";

export function RecommendationToggle() {
  const isPersonalized = useFilterStore((state) => state.isPersonalized);
  const setIsPersonalized = useFilterStore((state) => state.setIsPersonalized);

  const isSearchActive = useFilterStore(
    (state) =>
      !!state.appliedFilters.keyword &&
      state.appliedFilters.keyword.trim() !== "",
  );

  const handleToggle = () => {
    if (isSearchActive) return;
    setIsPersonalized(!isPersonalized);
  };

  return (
    <div
      className={cn(
        "flex items-center gap-2 py-3 bg-white transition-all duration-200",
        isSearchActive &&
          "opacity-40 pointer-events-none select-none grayscale",
      )}
    >
      <button
        type="button"
        onClick={handleToggle}
        disabled={isSearchActive} 
        className={cn(
          "relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full transition-colors duration-200 ease-in-out focus:outline-none",
          isPersonalized ? "bg-[#3B82F6]" : "bg-slate-200",
        )}
        aria-pressed={isPersonalized}
      >
        <span
          className={cn(
            "pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
            isPersonalized ? "translate-x-4" : "translate-x-1",
          )}
        />
      </button>

      <span
        className="text-[13px] font-bold text-[#3B82F6] cursor-pointer"
        onClick={handleToggle}
      >
        추천 공고만 보기
      </span>
    </div>
  );
}
