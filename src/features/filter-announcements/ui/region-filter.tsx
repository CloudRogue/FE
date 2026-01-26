"use client";

import { getSeoulSigungu } from "@/src/features/filter-announcements/api/region.action";
import cn from "@/src/shared/lib/cn";
import Button from "@/src/shared/ui/button";
import { useEffect, useState } from "react";
import { useFilterStore } from "../model/use-filter-store";

export function RegionFilter() {
  const { tempFilters, setTempFilter } = useFilterStore();
  const [sigungus, setSigungus] = useState<
    { sigunguCode: string; sigunguName: string }[]
  >([]);

  useEffect(() => {
    getSeoulSigungu().then((res) => setSigungus(res.data));
  }, []);

  const handleSigunguClick = (sigunguName: string) => {
    const fullName = `서울특별시 ${sigunguName}`;
    const isSelected = tempFilters.regionName === fullName;

    setTempFilter("regionName", isSelected ? undefined : fullName);
  };

  return (
    <div className="flex flex-col gap-4">
      <section>
        {sigungus.length === 0 && <>데이터를 불러올 수 없습니다.</>}
        <div className="grid grid-cols-4 gap-2 overflow-y-auto max-h-75 pb-2 scrollbar-hide">
          {sigungus.map((sigungu) => {
            const fullName = `서울특별시 ${sigungu.sigunguName}`;
            const isSelected = tempFilters.regionName === fullName;

            return (
              <Button
                key={sigungu.sigunguCode}
                variant="secondary"
                onClick={() => handleSigunguClick(sigungu.sigunguName)}
                className={cn(
                  "inline-flex items-center justify-center py-1.5 px-3 min-h-8 rounded-lg text-caption2 ",
                  isSelected
                    ? "bg-primary-blue text-gray-white border border-transparent"
                    : "bg-gray-white text-gray-black border  border-gray-100",
                )}
              >
                <span className="truncate w-full inline-block text-center text-caption2 px-1">
                  {sigungu.sigunguName}
                </span>
              </Button>
            );
          })}
        </div>
      </section>
    </div>
  );
}
