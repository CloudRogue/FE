"use client";

import { SortSelector } from "@/src/features/filter-announcements";
import { useFilterStore } from "@/src/features/filter-announcements/model/use-filter-store";
import { AnnouncementCard } from "@/src/widgets/announcement-card";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { getScrappedAnnouncements } from "../api/mypage-scrap.quries";

export function ScrapList() {
  const { appliedFilters } = useFilterStore();

  const { data } = useQuery({
    queryKey: ["mypage", "scrap", { limit: 20 }],
    queryFn: () => getScrappedAnnouncements({ limit: 20 }),
  });

  const items = data?.items;

  const sortedItems = useMemo(() => {
    if (!items) return [];
    const result = [...items];

    switch (appliedFilters.sort) {
      case "DEADLINE":
        return result.sort(
          (a, b) =>
            new Date(a.endDate).getTime() - new Date(b.endDate).getTime(),
        );
      case "LATEST":
        return result.sort(
          (a, b) =>
            new Date(b.publishedAt).getTime() -
            new Date(a.publishedAt).getTime(),
        );
      default:
        return result;
    }
  }, [items, appliedFilters.sort]);

  return (
    <>
      <div className="text-right mb-2">
        <SortSelector />
      </div>

      <div className="flex flex-col gap-4">
        {sortedItems.length > 0 ? (
          sortedItems.map((item, index) => (
            <AnnouncementCard
              key={`${item.announcementId}-${index}`}
              announcementId={item.announcementId}
              title={item.title}
              publisher={item.publisher}
              status={item.status}
              period={{
                start: item.startDate,
                end: item.endDate,
              }}
              isScrapped={true}
              housingType={item.housingType}
              startDate={item.startDate}
              endDate={item.endDate}
              publishedAt={item.publishedAt}
              className="rounded-2xl"
            />
          ))
        ) : (
          <div className="py-20 text-center text-slate-400">
            관심 공고가 없습니다.
          </div>
        )}
      </div>
    </>
  );
}
