import {
  MANAGEMENT_STATUS,
  MANAGEMENT_STATUS_TYPE,
  ManagementStatus,
} from "@/src/entities/management";
import { Badge } from "@/src/shared/ui/badge";

interface ManagementStatusBadgeProps {
  status?: ManagementStatus;
  publisher?: string;
  housingType?: string;
}
export function ManagementStatusBadge({
  status,
  publisher,
  housingType,
}: ManagementStatusBadgeProps) {
  const { colors, label } =
    MANAGEMENT_STATUS[status || MANAGEMENT_STATUS_TYPE.APPLYING];

  return (
    <div className="flex gap-2">
      <Badge
        style={{ backgroundColor: colors.badge }}
        className="border-none py-1 px-2 rounded-md text-sm text-white shadow-none"
      >
        {label}
      </Badge>
      {housingType && (
        <Badge className="bg-slate-100 hover:bg-slate-100 text-slate-500 border-none px-2 py-1 rounded-md text-sm shadow-none">
          {housingType}
        </Badge>
      )}
      {publisher && (
        <Badge className="bg-slate-100 hover:bg-slate-100 text-slate-500 border-none px-2 py-1 rounded-md text-sm shadow-none">
          {publisher}
        </Badge>
      )}
    </div>
  );
}
