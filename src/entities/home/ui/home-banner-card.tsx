"use client";

import type { FC } from "react";
import cn from "@/src/shared/lib/cn";
import Card from "@/src/shared/ui/card";
import { Badge } from "@/src/shared/ui/badge";
import LogoIcon from "@/src/shared/ui/icons/logo.svg";

interface HomeBannerCardProps {
  title: string;
  description: string;
  endDate?: string; 
  dDay?: number; 
  variant?: "blue" | "violet";
  className?: string;
}

const gradientMap = {
  blue: "linear-gradient(135deg, var(--color-primary-blue) 0%, var(--color-blue-900) 100%)",
  violet: "linear-gradient(135deg, #A83FFB 0%, #7B09CE 100%)",
};

export const HomeBannerCard: FC<HomeBannerCardProps> = ({
  title,
  description,
  endDate,
  dDay,
  variant = "blue",
  className,
}) => {
  return (
    <Card
      className={cn(
        "relative flex h-[180px] w-[280px] min-w-[280px] flex-col justify-between overflow-hidden border-none text-gray-white transition-all duration-300",
        "rounded-lg !p-5 !shadow-none",
        className,
      )}
      style={{ background: gradientMap[variant] }}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: "rgba(255,255,255,0.18)",
          clipPath: "polygon(0 0, 37% 0, 0 60%)",
        }}
      />

      <div className="flex items-start justify-end">
        {dDay !== undefined && (
          <Badge
            variant="dDay"
            className="border-none !bg-white/20 font-semibold !text-white backdrop-blur-sm"
          >
            D-{dDay}
          </Badge>
        )}
      </div>

      <div className="z-10 flex flex-col items-start text-left">
        {endDate && (
          <p className="mb-1 text-body2 font-medium opacity-90">
            {endDate} 까지
          </p>
        )}
        <h3 className="mb-2 whitespace-pre-wrap text-h1 font-bold leading-tight tracking-tight">
          {title}
        </h3>
        <p className="line-clamp-1 text-caption2 leading-snug opacity-80">
          {description}
        </p>
      </div>

      <LogoIcon
        className="pointer-events-none absolute -right-4 -bottom-9 h-auto w-[182px] opacity-15"
        style={{ color: "var(--color-gray-white)" }}
      />
    </Card>
  );
};
