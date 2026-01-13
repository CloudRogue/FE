import {
  MANAGEMENT_STATUS,
  MANAGEMENT_STATUS_TYPE,
  ManagementStatus,
} from "@/src/entities/management";
import { Badge } from "@/src/shared/ui/badge";

interface ManagementStatusBadgeProps {
  status?: ManagementStatus;
}
export function ManagementStatusBadge({ status }: ManagementStatusBadgeProps) {
  const { colors, label } =
    MANAGEMENT_STATUS[status || MANAGEMENT_STATUS_TYPE.APPLYING];

  return (
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
  );
}
