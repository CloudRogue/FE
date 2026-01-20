"use client";

import cn from "@/src/shared/lib/cn";
import { useFilterStore } from "@/src/features/filter-announcements/model/use-filter-store";
import { MOCK_HOUSING_TYPES } from "@/src/features/filter-announcements/model/constants";
import Button from "@/src/shared/ui/button";

export function HousingTypeFilter() {
  const { tempFilters, setTempFilter } = useFilterStore();

  return (
    <div className="grid grid-cols-5 gap-2">
      {MOCK_HOUSING_TYPES.map((type) => {
        const isSelected = tempFilters.housingType === type;

        return (
          <Button
            key={type}
            onClick={() =>
              setTempFilter("housingType", isSelected ? undefined : type)
            }
            className={cn(
              "h-auto py-2.5 px-1 rounded-full text-[13px] border transition-all text-center",
              isSelected
                ? "bg-[#3B82F6] border-[#3B82F6] text-white font-bold hover:bg-[#2563EB]"
                : "bg-white border-[#E2E8F0] text-[#64748B] hover:bg-slate-50 shadow-none",
            )}
          >
            <span className="truncate w-full inline-block">{type}</span>
          </Button>
        );
      })}
    </div>
  );
}
