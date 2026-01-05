import cn from "@/src/shared/lib/cn";

// style은 shadcn 기준으로 정의함
const badgeVariants = {
  base: "inline-flex items-center justify-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 w-fit",
  variants: {
    default:
      "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
    secondary:
      "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
    destructive:
      "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
    outline: "text-foreground border-border",
  },
};

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: keyof typeof badgeVariants.variants;
}

export const Badge = ({
  className,
  variant = "default",
  onKeyDown,
  ...props
}: BadgeProps) => {
  const isClickable = !!props.onClick;

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (isClickable && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      props.onClick?.(e as unknown as React.MouseEvent<HTMLDivElement>);
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
