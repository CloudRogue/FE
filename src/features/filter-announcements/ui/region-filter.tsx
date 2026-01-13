"use client";

import cn from "@/src/shared/lib/cn";
import { useFilterStore } from "@/src/features/filter-announcements/model/use-filter-store";
import { MOCK_REGIONS } from "@/src/features/filter-announcements/model/constants";
import Button from "@/src/shared/ui/button";

export function RegionFilter() {
  const { tempFilters, setTempFilter } = useFilterStore();

  return (
    <div className="grid grid-cols-5 gap-2">
      {MOCK_REGIONS.map((region) => {
        const isSelected = tempFilters.regionCode === region.value;

        return (
          <Button
            key={region.value}
            onClick={() =>
              setTempFilter("regionCode", isSelected ? undefined : region.value)
            }
            className={cn(
              "h-auto py-2.5 px-1 rounded-full text-[13px] border transition-all shadow-none",
              isSelected
                ? "bg-[#3B82F6] border-[#3B82F6] text-white font-bold hover:bg-[#2563EB]"
                : "bg-white border-[#E2E8F0] text-[#64748B] hover:bg-slate-50",
            )}
          >
            <span className="truncate w-full inline-block text-center">
              {region.label}
            </span>
          </Button>
        );
      })}
    </div>
  );
}
