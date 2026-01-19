"use client";

import { OverviewRow } from "@/src/entities/announcement-detail";
import Button from "@/src/shared/ui/button";
import { useState } from "react";

interface RegionOverviewRowProps {
  regions: string[] | string;
}

export function RegionOverviewRow({ regions }: RegionOverviewRowProps) {
  const [isOpen, setIsOpen] = useState(false);

  const isArrayRegions = Array.isArray(regions) ? regions : [];
  const displayRegion =
    regions.length > 0
      ? `${regions[0]}${regions.length > 1 ? ` 외 ${regions.length - 1}개` : ""}`
      : "전국";

  return (
    <OverviewRow
      label="지역"
      value={displayRegion}
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
    >
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h4 className="text-lg font-bold text-gray-900">
            전체 지역 ({regions.length}개)
          </h4>
        </div>

        <div className="grid grid-cols-4 gap-2">
          {isArrayRegions.map((region, idx) => (
            <span
              key={`${region}-${idx}`}
              className="px-3 py-2 bg-[#EBF2FF] text-[#437CFF] text-[13px] font-bold rounded-full text-center"
            >
              {region}
            </span>
          ))}
        </div>

        <Button
          onClick={() => setIsOpen(false)}
          className="w-full mt-2 py-4 bg-[#437CFF] text-white font-bold rounded-2xl active:bg-blue-700 transition-colors"
        >
          확인
        </Button>
      </div>
    </OverviewRow>
  );
}
