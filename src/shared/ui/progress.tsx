import { useProgress } from "@/src/shared/hooks/use-progress";
import cn from "@/src/shared/lib/cn";
import { useCallback } from "react";

interface ProgressProps {
  value: number;
  className?: string;
  indicatorClassName?: string;
}

// useProgress hook과 함께 사용
export const Progress = ({
  value,
  className,
  indicatorClassName,
}: ProgressProps) => {
  const clamp = useCallback(
    (value: number, min: number = 0, max: number = 100) => {
      return Math.max(min, Math.min(value, max));
    },
    [],
  );
  const clampedValue = clamp(value);

  return (
    <div
      role="progressbar"
      aria-valuenow={clampedValue}
      aria-valuemin={0}
      aria-valuemax={100}
      className={cn(
        "relative h-2 w-full overflow-hidden rounded-full bg-slate-200",
        className,
      )}
    >
      <div
        className={cn(
          "h-full w-full flex-1 bg-slate-900 transition-all duration-500 ease-in-out",
          indicatorClassName,
        )}
        style={{ transform: `translateX(-${100 - clampedValue}%)` }}
      />
    </div>
  );
};

// useProgress hook 없이 사용
interface AutoProgressProps {
  isLoading: boolean;
  className?: string;
}

export const AutoProgress = ({ isLoading, className }: AutoProgressProps) => {
  const value = useProgress(isLoading);

  if (!isLoading && value === 0) return null;

  return (
    <Progress
      value={value}
      className={cn("fixed top-0 left-0 w-full z-50", className)}
    />
  );
};
