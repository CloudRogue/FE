"use client";

import cn from "@/src/shared/lib/cn";
import React, { ElementType, PropsWithChildren } from "react";

export interface CardProps extends React.HTMLAttributes<HTMLElement> {
  as?: ElementType;
  isLoading?: boolean;
}

export default function Card({
  as: Component = "div",
  isLoading = false,
  className,
  children,
  ...props
}: PropsWithChildren<CardProps>) {
  return (
    <Component
      className={cn(
        "p-4 rounded-lg bg-white transition-all shadow-card duration-200 hover:shadow-card-hover cursor-pointer",
        isLoading && "opacity-60 pointer-events-none",
        className,
      )}
      aria-busy={isLoading}
      {...props}
    >
      {isLoading ? (
        <div className="flex items-center justify-center min-h-25">
          <span>로딩 중...</span>
        </div>
      ) : (
        children
      )}
    </Component>
  );
}
