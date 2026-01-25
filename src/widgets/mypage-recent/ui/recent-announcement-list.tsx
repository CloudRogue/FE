"use client";

import { useRecentViewedAnnouncements } from "@/src/entities/announcement";
import { ROUTES } from "@/src/shared/constants/routes";
import { useIntersection } from "@/src/shared/hooks/use-intersection";
import { formatToDotDate } from "@/src/shared/lib/date";
import Card from "@/src/shared/ui/card";
import { RecentCardSkeleton } from "@/src/widgets/mypage-recent";
import Link from "next/link";

export function RecentAnnouncementList() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
    isError,
  } = useRecentViewedAnnouncements();

  const observerRef = useIntersection(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  });

  const allItems = data?.pages.flatMap((page) => page.items) ?? [];

  if (isLoading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <RecentCardSkeleton key={`init-skeleton-${i}`} />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="py-20 text-center">데이터를 불러오지 못했습니다.</div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {allItems.length > 0 ? (
        allItems.map((item, idx) => (
          <Link
            key={`${item.announcementId}-${idx}`}
            href={ROUTES.ANNOUNCEMENT_DETAIL(String(item.announcementId))}
          >
            <Card className="flex justify-between gap-3 active:scale-[0.98]">
              <div className="flex-1 flex flex-col justify-between">
                <h2 className="text-h3 text-ellipsis-2">{item.title}</h2>
                <div className="text-body1 text-gray-700 font-normal">
                  열람 일시 {formatToDotDate(item.viewedAt)}
                </div>
              </div>
              <div className="relative w-20 h-20 bg-slate-100 rounded-xl overflow-hidden shrink-0">
                <span className="w-full h-full flex items-center justify-center text-[10px] text-slate-300">
                  No Image
                </span>
              </div>
            </Card>
          </Link>
        ))
      ) : (
        <div className="py-20 text-center text-slate-400">
          최근에 본 공고가 없습니다.
        </div>
      )}

      {/* 무한 스크롤 관찰 대상 */}
      <div ref={observerRef} className="h-20 flex items-center justify-center">
        {isFetchingNextPage && <Card isLoading className="bg-transparent" />}
      </div>
    </div>
  );
}
