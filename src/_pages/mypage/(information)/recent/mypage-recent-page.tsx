"use client";

import Link from "next/link";
import { ROUTES } from "@/src/shared/constants/routes";
import Card from "@/src/shared/ui/card";
import { useIntersection } from "@/src/shared/hooks/use-intersection";
import { useRecentViewedAnnouncements } from "@/src/entities/announcement";

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
          <Card key={i} isLoading padding="medium" />
        ))}
      </div>
    );
  }

  return (
    <div className="min-h-full bg-slate-50 p-4">
      <div className="flex flex-col gap-3">
        {allItems.map((item) => (
          <Link
            key={item.announcementId}
            href={ROUTES.ANNOUNCEMENT_DETAIL(String(item.announcementId))}
          >
            <Card
              padding="medium"
              shadow="sm"
              className="flex items-center gap-4 active:scale-[0.98]"
            >
              <div className="flex-1 min-w-0">
                <h3 className="text-[16px] font-bold text-slate-800 line-clamp-2 leading-snug">
                  {item.title}
                </h3>
                <div className="flex items-center gap-2 mt-2 text-sm text-slate-400">
                  {item.housingType && (
                    <span className="text-[12px] font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                      {item.housingType}
                    </span>
                  )}
                  <span>
                    {item.startDate.replace(/-/g, ".")} ~{" "}
                    {item.endDate.replace(/-/g, ".")}
                  </span>
                </div>
              </div>
              <div className="w-20 h-20 bg-slate-100 rounded-xl flex items-center justify-center shrink-0">
                <span className="text-[10px] text-slate-300">No Image</span>
              </div>
            </Card>
          </Link>
        ))}
      </div>

      <div ref={observerRef} className="h-20 flex items-center justify-center">
        {isFetchingNextPage && (
          <Card
            isLoading
            shadow="none"
            className="bg-transparent border-none"
          />
        )}
      </div>
    </div>
  );
}
