"use client";

import { useState } from "react";
import cn from "@/src/shared/lib/cn";

type TooltipProps = {
  content: React.ReactNode;
  children: React.ReactNode;
  className?: string;
};

export default function Tooltip({
  content,
  children,
  className,
}: TooltipProps) {
  const [open, setOpen] = useState(false);

  return (
    <span
      className="relative inline-flex"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
    >
      {children}

      {open && (
        <span
          role="tooltip"
          className={cn(
            "absolute left-1/2 bottom-full mb-2 -translate-x-1/2",
            "min-w-max whitespace-nowrap",
            "rounded-sm bg-gray-white px-3 py-2",
            "text-caption1 text-gray-black",
            "shadow-[0_4px_4px_rgba(0,0,0,0.25)]",
            className,
          )}
        >
          {content}

          <span
            className={cn(
              "absolute left-1/2 top-full -translate-x-1/2",
              "h-0 w-0",
              // 말풍선꼬리 부분 왼쪽 + 오른쪽해서 14px
              "border-l-[7px] border-r-[7px] border-t-8",
              "border-l-transparent border-r-transparent border-t-gray-white",
            )}
          />
        </span>
      )}
    </span>
  );
}
