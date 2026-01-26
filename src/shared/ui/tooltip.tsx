"use client";

import { useState } from "react";
import cn from "@/src/shared/lib/cn";

type TooltipProps = {
  content: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  alwaysOpen?: boolean;
};

export default function Tooltip({
  content,
  children,
  className,
  alwaysOpen = false,
}: TooltipProps) {
  const [open, setOpen] = useState(false);

  const isOpen = alwaysOpen || open;

  return (
    <div
      className="w-full"
      onMouseEnter={() => {
        if (alwaysOpen) return;
        setOpen(true);
      }}
      onMouseLeave={() => {
        if (alwaysOpen) return;
        setOpen(false);
      }}
      onFocus={() => {
        if (alwaysOpen) return;
        setOpen(true);
      }}
      onBlur={() => {
        if (alwaysOpen) return;
        setOpen(false);
      }}
    >
      {isOpen && (
        <div className={cn("mb-3 flex w-full justify-center", className)}>
          <div
            role="tooltip"
            className={cn(
              "relative",
              "min-w-max whitespace-nowrap",
              "rounded-sm bg-gray-white px-3 py-2",
              "text-sm text-gray-black",
              "shadow-[0_4px_4px_rgba(0,0,0,0.25)]",
            )}
          >
            {content}

            <span
              className={cn(
                "absolute left-1/2 top-full -translate-x-1/2",
                "h-0 w-0",
                "border-l-[7px] border-r-[7px] border-t-8",
                "border-l-transparent border-r-transparent border-t-gray-white",
              )}
            />
          </div>
        </div>
      )}

      {children}
    </div>
  );
}
