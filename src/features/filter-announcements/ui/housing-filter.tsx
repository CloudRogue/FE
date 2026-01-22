"use client";

import { useEffect, useState } from "react";
import cn from "@/src/shared/lib/cn";
import { useFilterStore } from "@/src/features/filter-announcements/model/use-filter-store";
import { getPublisherFilters } from "@/src/features/filter-announcements/api/housing.action";
import Button from "@/src/shared/ui/button";

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
        <div className="grid grid-cols-4 gap-2 overflow-y-auto max-h-[300px] pb-2 scrollbar-hide">
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
                  "inline-flex items-center justify-center py-[6px] px-3 min-h-[32px] rounded-lg text-caption2",
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
