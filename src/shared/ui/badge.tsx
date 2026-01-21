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
    "rounded-[4px]",
    "text-[13px]",
    "font-semibold",
    "leading-[1.4]",
    "w-fit",
    "transition-colors",
  ].join(" "),

  variants: {
    /** type=기본 */
    default: "bg-[#FCFCFC] text-[#54647A]",

    /** type=추천 */
    recommend: "bg-[#E3F3FF] text-[#2942CD]",

    /** type=디데이-마감임박 */
    dDayUrgent: "bg-[#FFEAEF] text-[#C80018]",

    /** type=디데이-보통 */
    dDay: "bg-[#ECEFF1] text-[#54647A]",

    /** type=예정 */
    scheduled: "bg-[#ECEFF1] text-[#90A4AE]",

    /** type=마감 */
    closed: "bg-[#54647A] text-white",
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
