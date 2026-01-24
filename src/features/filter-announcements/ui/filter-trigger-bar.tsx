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
      label: appliedFilters.regionName
        ? appliedFilters.regionName.split(" ")[1]
        : "희망지역",
      hasValue: !!appliedFilters.regionName,
    },
    {
      id: "publisher" as const,
      label: appliedFilters.publisher || "공급 유형",
      hasValue: !!appliedFilters.publisher,
    },
  ];

  return (
    <div className="flex gap-2 p-4 pb-2 overflow-x-auto scrollbar-hide">
      {!filterTabs && <div>데이터를 불러올 수 없습니다.</div>}
      {filterTabs.map((tab) => {
        const isSelected = isFilterOpen && activeTab === tab.id;
        const isActive = tab.hasValue;
        return (
          <Button
            key={tab.id}
            variant="secondary"
            onClick={() => toggleFilter(tab.id)}
            className={cn(
              "flex items-center justify-between gap-1 h-10 px-4 py-2 transition-all duration-200",
              "rounded-lg border shadow-none",
              isActive || isSelected
                ? "bg-primary-50 border-primary-blue"
                : "bg-white border-gray-100",
            )}
          >
            <span
              className={cn(
                "text-body2 font-medium transition-colors",
                isActive || isSelected ? "text-primary-blue" : "text-gray-700",
              )}
            >
              {tab.label}
            </span>
            <ChevronDown
              size={18}
              strokeWidth={2.5}
              className={cn(
                "transition-transform duration-200",
                isActive || isSelected ? "text-primary-blue" : "text-gray-400",
                isSelected && "rotate-180",
              )}
            />
          </Button>
        );
      })}
    </div>
  );
}
