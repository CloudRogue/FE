import {
  MANAGEMENT_STATUS,
  ManagementStatus,
  ManagementStepper,
} from "@/src/entities/management";
import { Badge } from "@/src/shared/ui/badge";
import Button from "@/src/shared/ui/button";
import Card from "@/src/shared/ui/card";

interface ManagementListCardProps {
  status?: ManagementStatus;
}

export function ManagementListCard({
  status = "applying",
}: ManagementListCardProps) {
  const { colors, label, buttonLabel } = MANAGEMENT_STATUS[status];

  return (
    <Card className="p-6 mb-4 bg-white rounded-2xl shadow-sm border-none">
      <div className="flex gap-2 mb-5">
        <Badge
          style={{ backgroundColor: colors.badge }}
          className="border-none py-1 px-2 rounded-md text-sm text-white shadow-none"
        >
          {label}
        </Badge>
        <Badge className="bg-slate-100 hover:bg-slate-100 text-slate-500 border-none px-2 py-1 rounded-md text-sm shadow-none">
          공급주체
        </Badge>
        <Badge className="bg-slate-100 hover:bg-slate-100 text-slate-500 border-none px-2 py-1 rounded-md text-sm shadow-none">
          공고유형
        </Badge>
      </div>

      <h3 className="text-[18px] font-bold text-slate-900 mb-6 leading-snug">
        title
      </h3>

      {status !== "closed" && <ManagementStepper status={status} />}

      <Button
        style={{ backgroundColor: colors.buttonBg }}
        className="w-full flex justify-between items-center  text-slate-900 border-none h-14 px-5 rounded-xl font-bold mt-4"
      >
        <span>{buttonLabel} 2025.12.31</span>
        <Badge
          style={{ backgroundColor: colors.badge }}
          className="border-none py-1 px-2 rounded-md text-sm text-white shadow-none"
        >
          D-0
        </Badge>
      </Button>
    </Card>
  );
}
