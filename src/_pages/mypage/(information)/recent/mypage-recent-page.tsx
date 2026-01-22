"use client";

import { useRecentViewedAnnouncements } from "@/src/entities/announcement";
import { ROUTES } from "@/src/shared/constants/routes";
import { useIntersection } from "@/src/shared/hooks/use-intersection";
import Card from "@/src/shared/ui/card";
import Link from "next/link";

export default function MypageRecentPage() {
  const { data, fetchNextPage, hasNextPage, isLoading, isFetchingNextPage } =
    useRecentViewedAnnouncements();

  const observerRef = useIntersection(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  });

  const allItems = data?.pages.flatMap((page) => page.items) ?? [];

  if (isLoading) {
    return (
      <div className="p-4 space-y-3">
        {[1, 2, 3].map((i) => (
          <Card key={i} isLoading />
        ))}
      </div>
    );
  }

  return (
    <div className="min-h-full bg-slate-50 p-4">
      <div className="flex flex-col gap-3">
        {allItems.map((item, idx) => (
          <Link
            key={`${item.announcementId}-${idx}`}
            href={ROUTES.ANNOUNCEMENT_DETAIL(String(item.announcementId))}
          >
            <Card className="flex justify-between gap-3 active:scale-[0.98]">
              <div className="flex-1 flex flex-col justify-between">
                <h2 className="text-h3 text-ellipsis-2">{item.title}</h2>
                <div className="text-body1 text-gray-700 font-normal">
                  {item.startDate.replace(/-/g, ".")} ~{" "}
                  {item.endDate.replace(/-/g, ".")}
                </div>
              </div>
              <div className="relative w-20 h-20 bg-slate-100 rounded-xl overflow-hidden shrink-0">
                <span className="w-full h-full flex items-center justify-center text-[10px] text-slate-300">
                  No Image
                </span>
              </div>
            </Card>
          </Link>
        ))}
      </div>

      <div ref={observerRef} className="h-20 flex items-center justify-center">
        {isFetchingNextPage && <Card isLoading className="bg-transparent" />}
      </div>
    </div>
  );
}
