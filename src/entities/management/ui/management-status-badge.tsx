import { Badge } from "@/src/shared/ui/badge";

interface ManagementStatusBadgeProps {
  publisher?: string;
  housingType?: string;
}
export function ManagementStatusBadge({
  publisher,
  housingType,
}: ManagementStatusBadgeProps) {
  return (
    <div className="flex gap-2">
      {housingType && (
        <Badge className="text-caption1! bg-gray-bg text-gray-700">
          {housingType}
        </Badge>
      )}
      {publisher && (
        <Badge className="text-caption1! bg-gray-bg text-gray-700">
          {publisher}
        </Badge>
      )}
    </div>
  );
}
