"use client";

import { useState } from "react";
import { useFilterStore } from "@/src/features/filter-announcements";
import { useAnnouncements } from "@/src/entities/announcement/api/use-announcements";
import AnnouncementCard from "@/src/entities/announcement/ui/announcement-card";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

export function AnnouncementList() {
  const [isPersonalized, setIsPersonalized] = useState(false);

  const appliedFilters = useFilterStore((state) => state.appliedFilters);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useAnnouncements(appliedFilters, isPersonalized);

  const { ref, inView } = useInView();

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
        {data?.pages.map((page) =>
          page.data.map((item) => (
            <AnnouncementCard
              key={item.announcementId}
              {...item}
              period={{
                start: item.startDate,
                end: item.endDate,
              }}
              isScrapped={false}
              externalApplyUrl={item.externalApplyUrl || ""}
              fullAdres="" // 상세 조회 API 연동 시 업데이트 가능
            />
          )),
        )}
      </div>

      <div ref={ref} className="h-20 flex items-center justify-center">
        {isFetchingNextPage && <p className="text-slate-400">불러오는 중...</p>}
      </div>
    </div>
  );
}
