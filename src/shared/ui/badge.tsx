import type { HTMLAttributes, KeyboardEvent, MouseEvent } from "react";
import cn from "@/src/shared/lib/cn";

const badgeVariants = {
  base: [
    "inline-flex",
    "items-center",
    "justify-center",
    "h-[24px]",
    "px-2",
    "gap-[10px]",
    "rounded-xs",
    "text-caption1",
    "w-fit",
    "transition-colors",
  ].join(" "),

  variants: {
    default: "bg-gray-bg text-gray-700",
    recommend: "bg-primary-50 text-blue-900",
    dDayUrgent: "bg-red-50 text-red-900",
    dDay: "bg-gray-100 text-gray-700",
    scheduled: "bg-gray-100 text-gray-400",
    closed: "bg-gray-700 text-gray-white",
  },
};

export interface BadgeProps extends HTMLAttributes<HTMLDivElement> {
  variant?: keyof typeof badgeVariants.variants;
}

export const Badge = ({
  className,
  variant = "default",
  onKeyDown,
  ...props
}: BadgeProps) => {
  const isClickable = !!props.onClick;

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (isClickable && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      props.onClick?.(e as unknown as MouseEvent<HTMLDivElement>);
    }
    onKeyDown?.(e);
  };

  return (
    <div
      role={isClickable ? "button" : undefined}
      tabIndex={isClickable ? 0 : undefined}
      onKeyDown={isClickable ? handleKeyDown : onKeyDown}
      className={cn(
        badgeVariants.base,
        badgeVariants.variants[variant],
        isClickable && "cursor-pointer select-none active:opacity-80",
        className,
      )}
      {...props}
    />
  );
};
