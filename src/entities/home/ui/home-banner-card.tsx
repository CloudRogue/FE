"use client";

import type { FC } from "react";
import cn from "@/src/shared/lib/cn";
import Card from "@/src/shared/ui/card";
import { Badge } from "@/src/shared/ui/badge";
import LogoIcon from "@/src/shared/ui/icons/logo.svg";

interface HomeBannerCardProps {
  title: string;
  description: string;
  endDate: string;
  dDay: number;
  className?: string;
}

export const HomeBannerCard: FC<HomeBannerCardProps> = ({
  title,
  description,
  endDate,
  dDay,
  className,
}) => {
  return (
    <Card
      className={cn(
        "w-[280px] min-w-[280px] h-[180px]",
        "!rounded-[20px]",
        "!p-5 !shadow-none border-none text-white relative overflow-hidden flex flex-col justify-between",
        "!bg-[linear-gradient(135deg,#1788F0_0%,#2942CD_100%)]",
        className,
      )}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "rgba(255,255,255,0.18)",
          clipPath: "polygon(0 0, 50% 0, 0 60%)",
        }}
      />
      {/* 상단 배지 섹션 */}
      <div className="flex justify-end items-start">
        <Badge
          variant="dDay"
          className="!bg-white/20 !text-white backdrop-blur-sm border-none font-semibold"
        >
          D-{dDay}
        </Badge>
      </div>

      {/* 텍스트 콘텐츠 섹션 */}
      <div className="z-10 flex flex-col items-start text-left">
        <p className="text-sm opacity-90 mb-1 font-medium">{endDate} 까지</p>
        <h3 className="text-[22px] font-bold leading-tight mb-2 whitespace-pre-wrap tracking-tight">
          {title}
        </h3>
        <p className="text-[13px] opacity-80 line-clamp-1 leading-snug">
          {description}
        </p>
      </div>

      <LogoIcon
        className="absolute -right-4 -bottom-9 w-[182px] h-[160px] opacity-15 pointer-events-none"
        style={{ color: "var(--color-gray-white)" }}
      />
    </Card>
  );
};
