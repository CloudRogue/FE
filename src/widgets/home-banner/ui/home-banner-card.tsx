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
        "rounded-lg",
        "p-5 shadow-none border-none text-gray-white relative overflow-hidden flex flex-col justify-between",
        "bg-[linear-gradient(135deg,var(--color-primary-blue)_0%,var(--color-blue-900)_100%)]",
        className,
      )}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "rgba(255,255,255,0.18)",
          clipPath: "polygon(0 0, 53% 0, 0 60%)",
        }}
      />

      <div className="flex justify-end items-start">
        <Badge
          variant="dDay"
          className="bg-gray-white/20 text-gray-white backdrop-blur-sm border-none font-semibold"
        >
          D-{dDay}
        </Badge>
      </div>

      <div className="z-10 flex flex-col items-start text-left">
        <p className="text-body2 opacity-90 mb-1">{endDate} 까지</p>

        <h3 className="text-hero leading-tight mb-2 whitespace-pre-wrap tracking-tight">
          {title}
        </h3>

        <p className="text-caption2 opacity-80 line-clamp-1 leading-snug">
          {description}
        </p>
      </div>

      <LogoIcon className="absolute -right-4 -bottom-9 w-[182px] h-[160px] opacity-15 pointer-events-none text-gray-white" />
    </Card>
  );
};
