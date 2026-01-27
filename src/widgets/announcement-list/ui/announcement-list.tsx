"use client";

import { useAnnouncements } from "@/src/entities/announcement/api/use-announcements.queries";
import type { Announcement } from "@/src/entities/announcement/model/announcement.types";
import { calculateDDay } from "@/src/entities/announcement-search/lib/calculate-dDay";
import { useFilterStore } from "@/src/features/filter-announcements/model/use-filter-store";
import { AnnouncementCardSkeleton } from "@/src/widgets/announcement-card/";
import { AnnouncementCard } from "@/src/widgets/announcement-card/ui/announcement-card";
import Link from "next/link";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

export function AnnouncementList() {
  const isPersonalized = useFilterStore((state) => state.isPersonalized);
  const appliedFilters = useFilterStore((state) => state.appliedFilters);

  const getQueryType = () => {
    if (isPersonalized) return "personalized";
    if (appliedFilters.regionName) return "region";
    if (appliedFilters.publisher) return "publisher";
    if (appliedFilters.housingType) return "housing-type";
    return "open";
  };

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useAnnouncements(getQueryType(), appliedFilters);

  const { ref, inView } = useInView();

  const announcements: Announcement[] =
    data?.pages.flatMap((page) => page.data) ?? [];

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isLoading) {
    return (
      <>
        {Array.from({ length: 5 }).map((_, index) => (
          <AnnouncementCardSkeleton
            key={`skeleton-${index}`}
            className="mb-4"
          />
        ))}
      </>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <p className="text-center text-red-500 text-lg font-semibold">
          데이터를 가져오는데 실패했습니다.
        </p>
        <p className="text-center text-gray-500 text-sm">
          잠시 후 다시 시도해주세요.
        </p>
      </div>
    );
  }

  if (announcements.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4 px-5">
        <div className="text-center">
          <p className="text-lg font-semibold text-gray-700 mb-2">
            조회된 공고가 없습니다
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="flex flex-col gap-4">
        {announcements.map((item, index) => (
          <Link
            key={`${item.announcementId}-${index}`}
            href={`/announcement/${item.announcementId}`}
            className="block active:opacity-70 transition-opacity"
          >
            <AnnouncementCard
              {...item}
              dDay={calculateDDay(item.endDate)}
              isScrapped={false}
              externalApplyUrl=""
              fullAdres=""
            />
          </Link>
        ))}
      </div>

      <div ref={ref} className="h-20 flex items-center justify-center">
        {isFetchingNextPage && <p className="text-slate-400">불러오는 중...</p>}
      </div>
    </div>
  );
}
