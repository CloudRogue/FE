"use client";

import cn from "@/src/shared/lib/cn";
import { useFilterStore } from "@/src/features/filter-announcements/model/use-filter-store";
import { MOCK_PUBLISHERS } from "@/src/features/filter-announcements/model/constants";
import Button from "@/src/shared/ui/button";

export function PublisherFilter() {
  const { tempFilters, setTempFilter } = useFilterStore();

  return (
    <div className="grid grid-cols-5 gap-2">
      {MOCK_PUBLISHERS.map((publisher) => {
        const isSelected = tempFilters.publisher === publisher;

        return (
          <Button
            key={publisher}
            onClick={() =>
              setTempFilter("publisher", isSelected ? undefined : publisher)
            }
            className={cn(
              "h-auto py-2.5 px-1 rounded-full text-[13px] border transition-all shadow-none",
              isSelected
                ? "bg-[#3B82F6] border-[#3B82F6] text-white font-bold hover:bg-[#2563EB]"
                : "bg-white border-[#E2E8F0] text-[#64748B] hover:bg-slate-50",
            )}
          >
            <span className="truncate w-full inline-block text-center">
              {publisher}
            </span>
          </Button>
        );
      })}
    </div>
  );
}
