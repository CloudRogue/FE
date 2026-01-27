"use client";

import type { Announcement } from "@/src/entities/announcement/model/announcement.types";
import { AnnouncementApplyAction } from "@/src/features/announcement-apply";
import { ScrapButton } from "@/src/features/announcement-scrap";
import cn from "@/src/shared/lib/cn";
import { formatDateSpot } from "@/src/shared/lib/date";
import { Badge } from "@/src/shared/ui/badge";
import Image from "next/image";
import type { FC } from "react";
import { useMemo } from "react";

interface AnnouncementCardProps extends Announcement {
  imageUrl?: string;
  className?: string;
  fullAdres?: string | null;
  externalApplyUrl?: string | null;
  dDay?: number | null;
  isScrapped?: boolean | null;
  isAboveTheImage?: boolean;
  variant?: "large" | "small";
}

export const AnnouncementCard: FC<AnnouncementCardProps> = ({
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
  variant = "large",
}) => {
  const regionBadge = useMemo(
    () => fullAdres?.split(" ")[0]?.substring(0, 2) ?? "전국",
    [fullAdres],
  );

  const publisherShort = useMemo(
    () => publisher?.split(" ")[0] ?? "기관",
    [publisher],
  );

  const publisherLogo = useMemo(() => {
    if (publisher?.includes("LH")) return "/img/Publisher_LH.png";
    if (publisher?.includes("SH")) return "/img/Publisher_SH.png";
    return null;
  }, [publisher]);

  const displayImage = imageUrl || publisherLogo;

  if (variant === "small") {
    return (
      <div
        className={cn(
          "flex flex-col justify-between p-4 bg-white rounded-lg border border-gray-100",
          "h-full w-full shadow-none transition-all active:scale-[0.98]",
          className,
        )}
      >
        <div className="flex flex-col gap-3">
          <div className="flex gap-1.5">
            <Badge className="bg-primary-50 text-primary-blue border-none font-semibold text-caption2!">
              추천
            </Badge>
            <Badge
              className={cn(
                "border-none font-semibold text-caption2!",
                status === "CLOSED"
                  ? "bg-gray-700 text-gray-white"
                  : "bg-red-50 text-red-default",
              )}
            >
              D-{dDay ?? "0"}
            </Badge>
          </div>

          <h2 className="text-h3 font-bold text-gray-black leading-snug line-clamp-3 break-keep">
            {title}
          </h2>
        </div>

        <p className="text-caption2 text-gray-400 font-normal">
          접수마감 {formatDateSpot(endDate ?? "")}
        </p>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "p-4 bg-white rounded-lg border border-gray-100",
        className,
      )}
    >
      <div className="flex justify-between items-start mb-3">
        <div className="flex gap-2 flex-wrap">
          <Badge className="bg-primary-50 text-primary-blue text-caption1!">
            추천
          </Badge>
          {regionBadge && <SecondaryBadge>{regionBadge}</SecondaryBadge>}
          {publisherShort && <SecondaryBadge>{publisherShort}</SecondaryBadge>}
          {housingType && <SecondaryBadge>{housingType}</SecondaryBadge>}
        </div>
        <Badge
          className={cn(
            "text-caption1!",
            status === "OPEN" && "bg-red-50 text-red-default",
            (status === "DUE_SOON" || status === "UPCOMING") &&
              "bg-gray-100 text-gray-700",
            status === "CLOSED" && "bg-gray-700 text-gray-white",
          )}
        >
          {status === "CLOSED" ? "마감" : `D-${dDay ?? "0"}`}
        </Badge>
      </div>

      <div className="flex justify-between gap-3">
        <div className="flex-1 flex flex-col justify-between">
          <h2 className="text-h2 font-bold text-gray-black text-ellipsis-2">
            {title}
          </h2>
          <p className="text-body2 text-gray-700 font-normal">
            접수 마감 {formatDateSpot(endDate ?? "")}
          </p>
        </div>

        <div className="relative w-20 h-20 bg-gray-50 rounded-xl overflow-hidden shrink-0 border border-gray-100">
          {displayImage ? (
            <Image src={displayImage} alt={`${publisherShort} 로고`} fill />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-[10px] text-gray-200">
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
            status={status ?? "OPEN"}
            dDay={dDay ?? 0}
          />
        </div>
      )}
    </div>
  );
};

function SecondaryBadge({ children }: { children: React.ReactNode }) {
  return (
    <Badge className="bg-gray-bg text-gray-700 text-caption1!">
      {children}
    </Badge>
  );
}