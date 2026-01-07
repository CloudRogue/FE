import cn from "@/src/shared/lib/cn";
import { Badge } from "@/src/shared/ui/badge";
import { Heart } from "lucide-react";
import Image from "next/image";
import { useMemo } from "react";
import { AnnouncementDetail } from "../model/announcement.types";

const STATUS_MAP = {
  OPEN: "접수 중",
  DUE_SOON: "마감 임박",
  UPCOMING: "접수 예정",
  CLOSED: "마감",
};

interface AnnouncementCardProps extends Pick<
  AnnouncementDetail,
  "title" | "housingType" | "publisher" | "status" | "fullAdres"
> {
  period: {
    start: string;
    end: string;
  };
  imageUrl?: string; // 공고 이미지 - 기본 이미지 생기면 로직 변경 필요
}

export default function AnnouncementCard({
  title,
  period,
  housingType,
  publisher,
  status,
  fullAdres,
  imageUrl = "",
}: AnnouncementCardProps) {
  const regionBadge = useMemo(
    () => fullAdres?.split(" ")[0].substring(0, 2),
    [fullAdres],
  );

  return (
    <div className="p-5 bg-white">
      <div className="flex justify-between items-start mb-4">
        <div className="flex gap-2">
          <Badge
            className={cn(
              "border-none px-2 py-0.5 rounded-md text-[13px] font-bold text-white",
              status === "OPEN" && "bg-red-500",
              status === "DUE_SOON" && "bg-orange-500",
              status === "UPCOMING" && "bg-blue-500",
              status === "CLOSED" && "bg-gray-400",
            )}
          >
            {STATUS_MAP[status as keyof typeof STATUS_MAP]}
          </Badge>
          {regionBadge && <SecondaryBadge>{regionBadge}</SecondaryBadge>}
          <SecondaryBadge>{publisher.split(" ")[0]}</SecondaryBadge>
          <SecondaryBadge>{housingType}</SecondaryBadge>
        </div>
        <button className="text-gray-300 hover:text-red-400 transition-colors">
          <Heart size={24} />
        </button>
      </div>

      <div className="flex justify-between gap-4">
        <div className="flex-1">
          <h2 className="text-[18px] font-bold text-[#1E293B] leading-tight break-keep">
            {title}
          </h2>
          <p className="text-[#64748B] mt-3 text-md tracking-wide">
            {period.start} ~ {period.end}
          </p>
        </div>

        {/* 공고 이미지 - 기본 이미지 생기면 로직 변경 필요 */}
        <div className="w-20 h-20 bg-gray-400 rounded-xl">
          {imageUrl && (
            <Image
              src={imageUrl}
              alt={`${title}의 썸네일`}
              width={80}
              height={80}
              className="w-full h-full object-cover"
            />
          )}
        </div>
      </div>
    </div>
  );
}

function SecondaryBadge({ children }: { children: React.ReactNode }) {
  return (
    <Badge className="bg-slate-100 hover:bg-slate-200 text-slate-500 border-none px-2 py-0.5 rounded-md text-[13px] font-medium">
      {children}
    </Badge>
  );
}
