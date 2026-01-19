import cn from "@/src/shared/lib/cn";
import { Checkbox } from "@/src/stories/Checkbox";
import React from "react";

interface StepSectionProps {
  label: string;
  date: string;
  isCompleted?: boolean;
  children?: React.ReactNode;
}

export function ManagementStepSection({
  label,
  date,
  isCompleted,
  children,
}: StepSectionProps) {
  return (
    <div className="flex justify-between gap-3 mb-7 last:mb-0">
      <Checkbox
        checked={isCompleted}
        readOnly
        className={cn(
          "h-6 w-6 rounded-xl border-none transition-colors",
          isCompleted ? "bg-blue-500 text-white" : "bg-slate-500 text-white",
        )}
      />
      <div className="flex flex-col gap-3 w-full">
        <span className="font-bold text-slate-900">
          {label}: {date}
        </span>
        <div>{children}</div>
      </div>
    </div>
  );
}
