"use client";

import { useFilterStore } from "@/src/features/filter-announcements/model/use-filter-store";
import cn from "@/src/shared/lib/cn";
import Button from "@/src/shared/ui/button";
import { ChevronDown } from "lucide-react";

export function FilterTriggerBar() {
  const { appliedFilters, activeTab, isFilterOpen, toggleFilter } =
    useFilterStore();

  const filterTabs = [
    {
      id: "region" as const,
      label: appliedFilters.regionName || "지역 전체",
      hasValue: !!appliedFilters.regionName,
    },
    {
      id: "publisher" as const,
      label: appliedFilters.publisher || "공급 주체",
      hasValue: !!appliedFilters.publisher,
    },
    {
      id: "housingType" as const,
      label: appliedFilters.housingType || "주택 유형",
      hasValue: !!appliedFilters.housingType,
    },
  ];

  return (
    <div className="flex gap-3 p-4 pb-0">
      {filterTabs.map((tab) => {
        const isSelected = isFilterOpen && activeTab === tab.id;
        const isActive = tab.hasValue;

        return (
          <Button
            key={tab.id}
            variant="secondary"
            onClick={() => toggleFilter(tab.id)}
            className={cn(
              "flex items-center justify-between gap-1 transition-all duration-200 bg-white border-gray-100",
            )}
          >
            <span
              className={cn(
                "text-body2",
                isSelected && "text-gray-black",
                isActive && "text-gray-black",
              )}
            >
              {tab.label}
            </span>
            <ChevronDown
              size={20}
              strokeWidth={2.5}
              className={cn(
                "transition-transform duration-200 text-gray-400",
                isSelected && "rotate-180 text-gray-black",
                isActive && "text-gray-black",
              )}
            />
          </Button>
        );
      })}
    </div>
  );
}
