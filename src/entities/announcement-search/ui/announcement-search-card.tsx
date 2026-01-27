"use client";

import {
  AnnouncementSearch,
  calculateDDay,
} from "@/src/entities/announcement-search";
import cn from "@/src/shared/lib/cn";
import { formatDateSpot } from "@/src/shared/lib/date";
import { Badge } from "@/src/shared/ui/badge";

export function AnnouncementSearchCard({
  title,
  housingType,
  publisher,
  regionName,
  endDate,
}: AnnouncementSearch) {
  const dDay = calculateDDay(endDate);

  return (
    <div className="p-4 mb-4 bg-white rounded-xl border border-gray-100 active:scale-[0.99] transition-transform">
      {/* 상단 배지 영역 */}
      <div className="flex justify-between items-start mb-3">
        <div className="flex gap-1.5 flex-wrap">
          {regionName && <SecondaryBadge>{regionName}</SecondaryBadge>}
          {publisher && (
            <SecondaryBadge>{publisher.split(" ")[0]}</SecondaryBadge>
          )}
          {housingType && <SecondaryBadge>{housingType}</SecondaryBadge>}
        </div>

        {dDay !== null && (
          <Badge
            className={cn(
              "text-caption1!",
              dDay <= 3 && dDay >= 0
                ? "bg-red-50 text-red-default"
                : "bg-gray-100 text-gray-700",
              dDay < 0 && "bg-gray-700 text-gray-white",
            )}
          >
            {dDay < 0 ? "마감" : dDay === 0 ? "D-Day" : `D-${dDay}`}
          </Badge>
        )}
      </div>

      {/* 본문 영역 */}
      <div className="flex justify-between gap-4">
        <div className="flex-1 flex flex-col gap-1 min-w-0">
          <h2 className="text-h2 font-bold text-gray-black text-ellipsis-2 break-words">
            {title}
          </h2>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-caption1 text-gray-400 font-normal">
              접수마감 {endDate ? formatDateSpot(endDate) : "미정"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function SecondaryBadge({ children }: { children: React.ReactNode }) {
  return (
    <Badge className="bg-gray-bg text-gray-700 text-caption1! border-none font-medium">
      {children}
    </Badge>
  );
}
