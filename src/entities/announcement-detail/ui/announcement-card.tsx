// 공고 상단 정보 카드

import cn from "@/src/shared/lib/cn";
import { Badge } from "@/src/shared/ui/badge";
import { Heart } from "lucide-react";
import Image from "next/image";

const STATUS_MAP = {
  OPEN: "접수 중",
  DUE_SOON: "마감 임박",
  UPCOMING: "접수 예정",
  CLOSED: "마감",
};

interface AnnouncementCardProps {
  title: string;
  period: { start: string; end: string };
  imageUrl: string;
  status: string;
}

export default function AnnouncementCard({
  title,
  period,
  imageUrl,
  status,
}: AnnouncementCardProps) {
  return (
    <div className="p-5 bg-white">
      <div className="flex justify-between items-start mb-4">
        <div className="flex gap-2">
          <Badge
            className={cn(
              "border-none px-2 py-0.5 rounded-md text-[13px] font-bold text-white",
              status === "OPEN" ? "bg-[#EF4444]" : "bg-gray-400",
            )}
          >
            {STATUS_MAP[status as keyof typeof STATUS_MAP] || status}
          </Badge>
          {/* TODO: 태그 정보 필요 */}
          <Badge className="bg-[#F1F5F9] hover:bg-[#F1F5F9] text-[#64748B] border-none px-2 py-0.5 rounded-md text-[13px]">
            지역
          </Badge>
          <Badge className="bg-[#F1F5F9] hover:bg-[#F1F5F9] text-[#64748B] border-none px-2 py-0.5 rounded-md text-[13px]">
            기관
          </Badge>
          <Badge className="bg-[#F1F5F9] hover:bg-[#F1F5F9] text-[#64748B] border-none px-2 py-0.5 rounded-md text-[13px]">
            유형(행복주택)
          </Badge>
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
