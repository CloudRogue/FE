"use client";

import { SortSelector } from "@/src/features/filter-announcements";
import { useFilterStore } from "@/src/features/filter-announcements/model/use-filter-store";
import { AnnouncementCard } from "@/src/widgets/announcement-card";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { getScrappedAnnouncements } from "../api/quries";

export function ScrapList() {
  const { appliedFilters } = useFilterStore();

  const { data } = useQuery({
    queryKey: ["mypage", "scrap", { page: 0, size: 20 }],
    queryFn: () => getScrappedAnnouncements({ page: 0, size: 20 }),
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
        return result.reverse();
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
          sortedItems.map((item) => (
            <AnnouncementCard
              key={item.announcementId}
              announcementId={item.announcementId}
              title={item.title}
              publisher={item.publisher}
              status="OPEN"
              period={{
                start: "접수 중",
                end: item.endDate,
              }}
              dDay={null}
              isScrapped={true}
              housingType={item.provider}
              fullAdres={null}
              startDate={null as unknown as string}
              endDate={item.endDate}
              publishedAt={null as unknown as string}
              externalApplyUrl=""
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
