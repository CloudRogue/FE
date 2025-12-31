import cn from "@/src/shared/lib/cn";

interface ProgressProps {
  value: number;
  max?: number;
  className?: string;
  indicatorClassName?: string;
}

export const Progress = ({
  value,
  max = 100,
  className,
  indicatorClassName,
}: ProgressProps) => {
  return (
    <div
      className={cn(
        "relative h-2 w-full overflow-hidden rounded-full bg-slate-200",
        className,
      )}
    >
      <div
        className={cn(
          "h-full w-full flex-1 bg-slate-900 transition-all",
          indicatorClassName,
        )}
      />
    </div>
  );
};
