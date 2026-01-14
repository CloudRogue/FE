"use client";

import type { Announcement } from "@/src/entities/announcement/model/types";
import { OutboundAction } from "@/src/features/announcement-outbound";
import { ScrapButton } from "@/src/features/announcement-scrap";
import cn from "@/src/shared/lib/cn";
import { Badge } from "@/src/shared/ui/badge";
import Image from "next/image";
import { useMemo } from "react";

const STATUS_MAP = {
  OPEN: "접수 중",
  DUE_SOON: "마감 임박",
  UPCOMING: "접수 예정",
  CLOSED: "마감",
} as const;

interface AnnouncementCardProps extends Announcement {
  period: {
    start: string;
    end: string;
  };
  imageUrl?: string;
  className?: string;
}

export function AnnouncementCard({
  announcementId,
  title,
  housingType,
  publisher,
  status,
  fullAdres,
  externalApplyUrl,
  dDay,
  isScrapped = false,
  period,
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
    <div
      className={cn(
        "p-5 bg-white border-b border-slate-100 last:border-none",
        className,
      )}
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex gap-2 flex-wrap">
          <Badge
            className={cn(
              "border-none px-2 py-0.5 rounded-md text-[13px] font-bold text-white",
              status === "OPEN" && "bg-red-500",
              status === "DUE_SOON" && "bg-orange-500",
              status === "UPCOMING" && "bg-blue-500",
              status === "CLOSED" && "bg-gray-400",
            )}
          >
            {STATUS_MAP[status] ?? "확인 불가"}
          </Badge>
          {regionBadge && <SecondaryBadge>{regionBadge}</SecondaryBadge>}
          {publisherShort && <SecondaryBadge>{publisherShort}</SecondaryBadge>}
          {housingType && <SecondaryBadge>{housingType}</SecondaryBadge>}
        </div>

        <ScrapButton
          announcementId={announcementId}
          initialIsScrapped={isScrapped ?? false} // null 대응
        />
      </div>

      <div className="flex justify-between gap-4 mb-4">
        <div className="flex-1 flex flex-col justify-between">
          <h2 className="text-[18px] font-bold text-slate-800 leading-tight break-keep">
            {title}
          </h2>
          <p className="text-slate-500 mt-3 text-sm tracking-wide">
            {period.start} ~ {period.end}
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
        </div>
      </div>

      {externalApplyUrl && (
        <OutboundAction
          announcementId={announcementId}
          externalApplyUrl={externalApplyUrl}
          status={status}
          dDay={dDay ?? 0}
        />
      )}
    </div>
  );
}

function SecondaryBadge({ children }: { children: React.ReactNode }) {
  return (
    <Badge className="bg-slate-100 hover:bg-slate-100 text-slate-500 border-none px-2 py-0.5 rounded-md text-[12px] font-medium shadow-none">
      {children}
    </Badge>
  );
}
