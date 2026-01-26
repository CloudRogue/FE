"use client";

import { SortSelector } from "@/src/features/filter-announcements";
import { useFilterStore } from "@/src/features/filter-announcements/model/use-filter-store";
import { ROUTES } from "@/src/shared/constants/routes";
import Button from "@/src/shared/ui/button";
import {
  AnnouncementCard,
  AnnouncementCardSkeleton,
} from "@/src/widgets/announcement-card";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useMemo } from "react";
import { getScrappedAnnouncements } from "../api/mypage-scrap.quries";

export function ScrapList() {
  const { appliedFilters } = useFilterStore();

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["mypage", "scrap", { limit: 20 }],
    queryFn: () => getScrappedAnnouncements({ limit: 20 }),
    retry: 1,
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

  if (isError) {
    return (
      <div className="py-20 text-center">
        <div className="mb-3 text-sm">목록을 불러오지 못했습니다.</div>
        <Button
          type="button"
          onClick={() => refetch()}
          className="rounded-md border px-3 py-2 text-sm"
        >
          다시 시도
        </Button>
      </div>
    );
  }
  return (
    <>
      <div className="text-right mb-4">
        <SortSelector />
      </div>

      <div className="flex flex-col gap-4">
        {isLoading ? (
          Array.from({ length: 5 }).map((_, i) => (
            <AnnouncementCardSkeleton key={`skeleton-${i}`} />
          ))
        ) : sortedItems.length > 0 ? (
          sortedItems.map((item, index) => (
            <Link
              href={ROUTES.ANNOUNCEMENT_DETAIL(String(item.announcementId))}
            >
              <AnnouncementCard
                isAboveTheImage={true}
                key={`${item.announcementId}-${index}`}
                {...item}
              />
            </Link>
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
