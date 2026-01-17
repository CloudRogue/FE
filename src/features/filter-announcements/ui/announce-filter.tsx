"use client";

import { useState } from "react";
import cn from "@/src/shared/lib/cn";
import { useFilterStore } from "@/src/features/filter-announcements/model/use-filter-store";
import { RegionFilter } from "@/src/features/filter-announcements/ui/region-filter";
import { PublisherFilter } from "@/src/features/filter-announcements/ui/publisher-filter";
import { HousingTypeFilter } from "@/src/features/filter-announcements/ui/housing-filter";
import { ChevronDown, ChevronUp } from "lucide-react";
import Button from "@/src/shared/ui/button";

export function AnnouncementFilter() {
  const [activeTab, setActiveTab] = useState<"region" | "publisher" | "type">(
    "region",
  );
  const { applyFilters, resetFilters } = useFilterStore();

  return (
    <div className="w-full bg-white shadow-lg rounded-t-[24px]">
      {/* 탭별 컨텐츠 */}
      <div className="p-5 h-[280px] overflow-y-auto">
        {activeTab === "region" && <RegionFilter />}
        {activeTab === "publisher" && <PublisherFilter />}
        {activeTab === "type" && <HousingTypeFilter />}
      </div>

      <div className="p-4 flex justify-end gap-2 border-t">
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

function TabHeader({
  label,
  isActive,
  onClick,
}: {
  label: string;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <Button
      onClick={onClick}
      className={cn(
        "flex-1 py-4 flex items-center justify-center gap-1 text-[14px] font-bold h-auto bg-transparent hover:bg-transparent shadow-none",
        isActive ? "text-[#1E293B]" : "text-[#94A3B8]",
      )}
    >
      {label}
      {isActive ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
    </Button>
  );
}
