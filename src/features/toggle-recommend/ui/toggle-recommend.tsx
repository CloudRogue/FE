"use client";

import { useFilterStore } from "@/src/features/filter-announcements";
import cn from "@/src/shared/lib/cn";
import { Toggle } from "@/src/shared/ui/toggle";

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
        " bg-white transition-all duration-200",
        isSearchActive && "opacity-40 pointer-events-none grayscale",
      )}
    >
      <Toggle
        label="추천 공고만 보기"
        active={isPersonalized}
        onActiveChange={handleToggle}
        disabled={isSearchActive}
        className="w-fit text-body2"
      />
    </div>
  );
}
