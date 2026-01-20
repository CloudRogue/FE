"use client";

import { ChevronDown } from "lucide-react";
import { useFilterStore } from "@/src/features/filter-announcements/model/use-filter-store";
import { Toggle } from "@/src/shared/ui/toggle";
import cn from "@/src/shared/lib/cn";

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
    <div className="flex gap-2 px-4 py-2 bg-white overflow-x-auto no-scrollbar">
      {filterTabs.map((tab) => {
        const isSelected = isFilterOpen && activeTab === tab.id;
        const isActive = isSelected || tab.hasValue;

        return (
          <Toggle
            key={tab.id}
            toggleName={`${tab.id}-filter`}
            variant="outline"
            size="sm"
            active={isActive}
            onClick={() => toggleFilter(tab.id)}
            className={cn(
              "rounded-full border-slate-200 text-slate-600 font-medium whitespace-nowrap gap-1 px-3 py-1.5 h-auto transition-colors",
              isActive && "bg-blue-50 border-blue-200 text-[#3B82F6]",
            )}
          >
            {tab.label}
            <ChevronDown
              size={14}
              className={cn(
                "transition-transform duration-200",
                isSelected && "rotate-180",
              )}
            />
          </Toggle>
        );
      })}
    </div>
  );
}
