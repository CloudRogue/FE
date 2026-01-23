"use client";

import {
  PublisherFilter,
  RegionFilter,
  useFilterStore,
} from "@/src/features/filter-announcements";
import Button from "@/src/shared/ui/button";

export function AnnouncementFilter() {
  const { activeTab, applyFilters, resetFilters } = useFilterStore();
  return (
    <div className="w-full bg-white flex flex-col">
      {/* 중앙 컨텐츠 */}
      <div className="p-5 min-h-[250px] max-h-[400px] overflow-y-auto">
        {activeTab === "region" && <RegionFilter />}
        {activeTab === "publisher" && <PublisherFilter />}
        {/* {activeTab === "housingType" && <HousingTypeFilter />} */}
      </div>
      {/* 하단 액션 버튼 */}
      <div className="p-4 flex justify-end gap-2 border-t bg-slate-50">
        <Button
          onClick={resetFilters}
          className="px-6 py-2 bg-slate-200 text-slate-600 rounded-xl font-bold h-auto border-none"
        >
          초기화
        </Button>
        <Button
          onClick={applyFilters}
          className="px-8 py-2 bg-blue-600 text-white rounded-xl font-bold h-auto border-none"
        >
          결과 적용
        </Button>
      </div>
    </div>
  );
}
