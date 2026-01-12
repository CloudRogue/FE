import {
  MANAGEMENT_STATUS,
  MANAGEMENT_STATUS_TYPE,
  ManagementStatus,
  ManagementStatusBadge,
  ManagementStepper,
} from "@/src/entities/management";
import { Badge } from "@/src/shared/ui/badge";
import Button from "@/src/shared/ui/button";
import Card from "@/src/shared/ui/card";

interface ManagementListCardProps {
  status?: ManagementStatus;
}

export function ManagementListCard({
  status = MANAGEMENT_STATUS_TYPE.APPLYING,
}: ManagementListCardProps) {
  const { colors, label, buttonLabel } = MANAGEMENT_STATUS[status];

  return (
    <Card className="p-6 mb-4 bg-white rounded-2xl shadow-sm border-none">
      <ManagementStatusBadge status={status} />

      <h3 className="text-[18px] font-bold text-slate-900 mb-6 leading-snug">
        title
      </h3>

      {status !== MANAGEMENT_STATUS_TYPE.CLOSED && (
        <ManagementStepper status={status} />
      )}

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
