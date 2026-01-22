"use client";

import type { Announcement } from "@/src/entities/announcement/model/announcement.types";
import { AnnouncementApplyAction } from "@/src/features/announcement-apply";
import { ScrapButton } from "@/src/features/announcement-scrap";
import cn from "@/src/shared/lib/cn";
import { formatDateSpot } from "@/src/shared/lib/date";
import { Badge } from "@/src/shared/ui/badge";
import Image from "next/image";
import { useMemo } from "react";

interface AnnouncementCardProps extends Announcement {
  imageUrl?: string;
  className?: string;
  fullAdres?: string | null;
  externalApplyUrl?: string | null;
  dDay?: number | null;
  isScrapped?: boolean | null;
  isAboveTheImage?: boolean;
}

export function AnnouncementCard({
  announcementId,
  title,
  housingType,
  publisher,
  status,
  fullAdres,
  externalApplyUrl,
  endDate,
  dDay,
  isScrapped = false,
  isAboveTheImage = false,
  imageUrl = "",
  className,
}: AnnouncementCardProps) {
  const regionBadge = useMemo(
    () => fullAdres?.split(" ")[0]?.substring(0, 2) ?? "전국",
    [fullAdres],
  );

  const publisherShort = useMemo(
    () => publisher?.split(" ")[0] ?? "기관",
    [publisher],
  );

  return (
    <div className={cn("p-4 bg-white rounded-lg", className)}>
      {/* 뱃지 */}
      <div className="flex justify-between items-start mb-3">
        <div className="flex justify-between">
          <div className="flex gap-2 flex-wrap">
            <Badge className="bg-blue-50 text-primary-blue text-caption1!">
              추천
            </Badge>
            {regionBadge && <SecondaryBadge>{regionBadge}</SecondaryBadge>}
            {publisherShort && (
              <SecondaryBadge>{publisherShort}</SecondaryBadge>
            )}
            {housingType && <SecondaryBadge>{housingType}</SecondaryBadge>}
          </div>
        </div>
        <Badge
          className={cn(
            "text-caption1!",
            status === "OPEN" && "bg-red-50 text-red-900",
            status === "DUE_SOON" && "bg-gray-100 text-gray-700",
            status === "UPCOMING" && "bg-gray-100 text-gray-700",
            status === "CLOSED" && "bg-gray-700 text-gray-white",
          )}
        >
          D-{dDay ?? "확인 불가"}
        </Badge>
      </div>

      {/* 공고명, 날짜, 이미지 */}
      <div className="flex justify-between gap-3">
        <div className="flex-1 flex flex-col justify-between">
          <h2 className="text-h2 text-ellipsis-2">{title}</h2>
          <p className="text-body1 text-gray-700 font-normal">
            접수 마감 {formatDateSpot(endDate)}
          </p>
        </div>

        <div className="relative w-20 h-20 bg-slate-100 rounded-xl overflow-hidden shrink-0">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={`${title} 썸네일`}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-[10px] text-slate-300">
              No Image
            </div>
          )}
          {isAboveTheImage && (
            <ScrapButton
              announcementId={announcementId}
              initialIsScrapped={isScrapped ?? false}
              isAboveTheImage={isAboveTheImage}
            />
          )}
        </div>
      </div>

      {/* 공고 상세 전용 버튼들 */}
      {externalApplyUrl && (
        <div className="flex gap-2 mt-4">
          <div
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            <ScrapButton
              announcementId={announcementId}
              initialIsScrapped={isScrapped ?? false}
            />
          </div>
          <AnnouncementApplyAction
            announcementId={announcementId}
            title={title}
            status={status}
            dDay={dDay ?? 0}
          />
        </div>
      )}
    </div>
  );
}

function SecondaryBadge({ children }: { children: React.ReactNode }) {
  return (
    <Badge className="bg-gray-bg text-gray-700 text-caption1!">
      {children}
    </Badge>
  );
}
