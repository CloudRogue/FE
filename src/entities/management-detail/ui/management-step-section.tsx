import { MANAGEMENT_STATUS_TYPE } from "@/src/entities/management";
import cn from "@/src/shared/lib/cn";
import { Badge } from "@/src/shared/ui/badge";
import Card from "@/src/shared/ui/card";
import React from "react";

interface StepSectionProps {
  type: "APPLYING" | "DOCUMENT_PENDING" | "FINAL_PENDING";
  label: string;
  date: string;
  dDay: number;
  currentStatus?: "APPLYING" | "DOCUMENT_PENDING" | "FINAL_PENDING";
  isFrist?: boolean;
  children?: React.ReactNode;
}

const BADGE_STYLE_MAP: Record<string, string> = {
  [MANAGEMENT_STATUS_TYPE.APPLYING]: "bg-blue-50 text-primary-blue",
  [MANAGEMENT_STATUS_TYPE.DOCUMENT_PENDING]: "bg-yellow-50 text-yellow-default",
  [MANAGEMENT_STATUS_TYPE.FINAL_PENDING]: "bg-green-50 text-green-default",
  [MANAGEMENT_STATUS_TYPE.CLOSED]: "bg-gray-100 text-gray-500",
};

export function ManagementStepSection({
  type,
  label,
  date,
  dDay,
  currentStatus,
  isFrist,
  children,
}: StepSectionProps) {
  const isCurrent = currentStatus === type;

  return (
    <div
      className={cn(
        "relative flex flex-col gap-3 w-full pl-6 pb-4",
        "after:absolute after:left-[3.75px] after:top-3.5 after:bottom-0 after:w-0.5 after:bg-slate-100",
        !isFrist &&
          "before:absolute before:left-[3.75px] before:top-0 before:h-3.5 before:w-0.5 before:bg-slate-100",
      )}
    >
      <div className="absolute left-0 top-2.5 z-10 h-2.5 w-2.5 rounded-full bg-slate-100" />
      <div className="flex justify-between items-center">
        <span className="text-h3">
          {label}: {date}
        </span>
        {isCurrent && (
          <Badge
            className={cn("text-caption1! font-bold", BADGE_STYLE_MAP[type])}
          >
            D-{dDay}
          </Badge>
        )}
      </div>
      <Card className="flex flex-col gap-4">{children}</Card>
    </div>
  );
}
