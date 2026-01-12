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
    <div className="mb-8 last:mb-0">
      <div className="flex items-center gap-3 mb-4">
        <Checkbox
          checked={isCompleted}
          readOnly
          className={cn(
            "h-6 w-6 rounded-full border-none transition-colors",
            isCompleted ? "bg-blue-500 text-white" : "bg-slate-500 text-white",
          )}
        />
        <span className="text-[17px] font-bold text-slate-900">
          {label}: {date}
        </span>
      </div>

      <div className="ml-9">{children}</div>
    </div>
  );
}
