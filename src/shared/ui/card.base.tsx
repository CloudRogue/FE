"use client";

import { PropsWithChildren, ElementType } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface CardProps extends React.HTMLAttributes<HTMLElement> {
  as?: ElementType;
  padding?: "none" | "small" | "medium" | "large";
  shadow?: "none" | "sm" | "md" | "lg";
  isLoading?: boolean;
}

const paddingMap = {
  none: "p-0",
  small: "p-3",
  medium: "p-5",
  large: "p-8",
};

const shadowMap = {
  none: "shadow-none",
  sm: "shadow-sm",
  md: "shadow-md",
  lg: "shadow-lg",
};

export default function CardBase({
  as: Component = "div",
  padding = "medium",
  shadow = "sm",
  isLoading = false,
  className,
  children,
  ...props
}: PropsWithChildren<CardProps>) {
  return (
    <Component
      className={cn(
        "rounded-xl border border-gray-200 bg-white transition-all",
        paddingMap[padding],
        shadowMap[shadow],
        isLoading && "opacity-60 pointer-events-none",
        className,
      )}
      aria-busy={isLoading}
      {...props}
    >
      {isLoading ? (
        <div className="flex items-center justify-center min-h-[100px]">
          <span>로딩 중...</span>
        </div>
      ) : (
        children
      )}
    </Component>
  );
}
