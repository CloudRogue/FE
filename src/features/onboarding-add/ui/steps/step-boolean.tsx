"use client";

import Button from "@/src/shared/ui/button";
import cn from "@/src/shared/lib/cn";

type BooleanStepProps = {
  value?: boolean;
  trueLabel?: string;
  falseLabel?: string;
  onChange: (value: boolean) => void;
};

export default function BooleanStep({
  value,
  trueLabel = "예",
  falseLabel = "아니오",
  onChange,
}: BooleanStepProps) {
  return (
    <div className="flex gap-4">
      <Button
        type="button"
        onClick={() => onChange(true)}
        aria-pressed={value === true}
        className={cn(
          "h-12 flex-1 rounded-xl border text-md",
          value === true
            ? "border-slate-900 bg-white text-slate-900"
            : "border-slate-200 bg-slate-50 text-slate-500",
        )}
      >
        {trueLabel}
      </Button>

      <Button
        type="button"
        onClick={() => onChange(false)}
        aria-pressed={value === false}
        className={cn(
          "h-12 flex-1 rounded-xl border text-md",
          value === false
            ? "border-slate-900 bg-white text-slate-900"
            : "border-slate-200 bg-slate-50 text-slate-500",
        )}
      >
        {falseLabel}
      </Button>
    </div>
  );
}
