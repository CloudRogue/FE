"use client";

import { useFilterStore } from "@/src/features/filter-announcements/model/use-filter-store";
import { RegionFilter } from "@/src/features/filter-announcements/ui/region-filter";
import { PublisherFilter } from "@/src/features/filter-announcements/ui/publisher-filter";
import { HousingTypeFilter } from "@/src/features/filter-announcements/ui/housing-filter";
import Button from "@/src/shared/ui/button";

export function AnnouncementFilter() {
  const { activeTab, applyFilters, resetFilters } = useFilterStore();

  return (
    <div className="w-full bg-white shadow-lg ">
      <div className="p-5 h-[280px] overflow-y-auto">
        {activeTab === "region" && <RegionFilter />}
        {activeTab === "publisher" && <PublisherFilter />}
        {activeTab === "housingType" && <HousingTypeFilter />}
      </div>

      <div className="p-4 flex justify-end gap-2">
        <Button
          onClick={resetFilters}
          className="px-6 py-3 bg-[#E2E8F0] text-[#64748B] rounded-xl font-bold h-auto"
        >
          초기화
        </Button>
        <Button
          onClick={applyFilters}
          className="px-8 py-3 bg-[#3B82F6] text-white rounded-xl font-bold h-auto"
        >
          결과 적용
        </Button>
      </div>
    </div>
  );
}
