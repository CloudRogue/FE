"use client";

import { useFilterStore } from "@/src/features/filter-announcements/model/use-filter-store";
import { HousingTypeFilter } from "@/src/features/filter-announcements/ui/housing-filter";
import { PublisherFilter } from "@/src/features/filter-announcements/ui/publisher-filter";
import { RegionFilter } from "@/src/features/filter-announcements/ui/region-filter";
import Button from "@/src/shared/ui/button";

export function AnnouncementFilter() {
  const { activeTab, applyFilters, resetFilters } = useFilterStore();

  return (
    <div className="w-full bg-white shadow-lg ">
      <div className="p-5 h-70 overflow-y-auto">
        {activeTab === "region" && <RegionFilter />}
        {activeTab === "publisher" && <PublisherFilter />}
        {activeTab === "housingType" && <HousingTypeFilter />}
      </div>

      <div className="p-4 flex justify-end gap-2">
        <Button
          variant="secondary"
          onClick={resetFilters}
          className="w-16.5px-4 py-3 border-0"
        >
          초기화
        </Button>
        <Button onClick={applyFilters} className="px-4 py-3 border-0">
          결과 적용
        </Button>
      </div>
    </div>
  );
}
