"use client";

import { useAnnouncements } from "@/src/entities/announcement/api/use-announcements.queries";
import type { Announcement } from "@/src/entities/announcement/model/announcement.types";
import { useFilterStore } from "@/src/features/filter-announcements/model/use-filter-store";
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

  if (isLoading)
    return (
      <p className="p-10 text-center">공고 데이터를 불러오고 있습니다...</p>
    );

  if (isError)
    return (
      <p className="p-10 text-center text-red-500">
        데이터를 가져오는데 실패했습니다.
      </p>
    );

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="flex flex-col gap-px bg-slate-200">
        {announcements.map((item, index) => (
          <Link
            key={`${item.announcementId}-${index}`}
            href={`/announcement/${item.announcementId}`}
            className="block active:opacity-70 transition-opacity"
          >
            <AnnouncementCard
              {...item}
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
