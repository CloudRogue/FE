"use client";

import { getPublisherFilters } from "@/src/features/filter-announcements/api/housing.action";
import { useFilterStore } from "@/src/features/filter-announcements/model/use-filter-store";
import cn from "@/src/shared/lib/cn";
import Button from "@/src/shared/ui/button";
import { useEffect, useState } from "react";

export function PublisherFilter() {
  const { tempFilters, setTempFilter } = useFilterStore();
  const [publishers, setPublishers] = useState<string[]>([]);

  useEffect(() => {
    getPublisherFilters().then((res) => {
      setPublishers(res.publishers);
    });
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <section>
        {publishers.length === 0 && <>데이터를 불러올 수 없습니다.</>}
        <div className="grid grid-cols-4 gap-2 overflow-y-auto max-h-75 pb-2 scrollbar-hide">
          {publishers.map((pub) => {
            const isSelected = tempFilters.publisher === pub;

            return (
              <Button
                key={pub}
                variant="secondary"
                onClick={() =>
                  setTempFilter("publisher", isSelected ? undefined : pub)
                }
                className={cn(
                  "inline-flex items-center justify-center py-1.5 px-3 min-h-8 rounded-lg text-caption2",
                  isSelected
                    ? "bg-primary-blue text-gray-white border border-transparent"
                    : "bg-gray-white text-gray-black border border-gray-100",
                )}
              >
                <span className="truncate w-full inline-block text-center px-1 text-caption2">
                  {pub}
                </span>
              </Button>
            );
          })}
        </div>
      </section>
    </div>
  );
}
