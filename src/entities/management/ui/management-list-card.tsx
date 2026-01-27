import {
  BaseManage,
  MANAGEMENT_STATUS,
  MANAGEMENT_STATUS_TYPE,
  ManagementStatus,
  ManagementStatusBadge,
} from "@/src/entities/management";
import cn from "@/src/shared/lib/cn";
import { formatToDotDate } from "@/src/shared/lib/date";
import { Badge } from "@/src/shared/ui/badge";
import Card from "@/src/shared/ui/card";

interface ManagementListCardProps extends Partial<BaseManage> {
  status: ManagementStatus;
  supplyType?: string;
  endDate?: string; // APPLYING
  documentPublishedAt?: string; // DOCUMENT_WAITING
  finalPublishedAt?: string; // FINAL_WAITING, CLOSED
  noticeType?: string; // CLOSED
}

const BADGE_STYLE_MAP: Record<string, string> = {
  [MANAGEMENT_STATUS_TYPE.APPLYING]: "bg-blue-50 text-primary-blue",
  [MANAGEMENT_STATUS_TYPE.DOCUMENT_PENDING]: "bg-yellow-50 text-yellow-default",
  [MANAGEMENT_STATUS_TYPE.FINAL_PENDING]: "bg-green-50 text-green-default",
  [MANAGEMENT_STATUS_TYPE.CLOSED]: "bg-gray-100 text-gray-500",
};

export function ManagementListCard(props: ManagementListCardProps) {
  const {
    title,
    dDay,
    status,
    supplyType,
    noticeType,
    endDate,
    documentPublishedAt,
    finalPublishedAt,
  } = props;

  const targetDate = (() => {
    switch (status) {
      case MANAGEMENT_STATUS_TYPE.APPLYING:
        return endDate;
      case MANAGEMENT_STATUS_TYPE.DOCUMENT_PENDING:
        return documentPublishedAt;
      case MANAGEMENT_STATUS_TYPE.FINAL_PENDING:
      case MANAGEMENT_STATUS_TYPE.CLOSED:
        return finalPublishedAt;
      default:
        return undefined;
    }
  })();

  const { buttonLabel } = MANAGEMENT_STATUS[status];
  const formattedDate = formatToDotDate(targetDate) || "일정 미정";

  return (
    <Card className="flex flex-col gap-3 bg-white">
      <ManagementStatusBadge
        publisher={props.publisher}
        housingType={supplyType ?? noticeType}
      />

      <h3 className="text-h3 text-gray-black">
        {title || "공고 제목을 불러올 수 없습니다."}
      </h3>

      <div className="flex justify-between w-full p-4 border border-gray-100 rounded-md">
        <span className="text-h5 font-medium">
          {buttonLabel} {formattedDate}
        </span>
        {!!dDay && (
          <Badge
            className={cn("text-caption1! font-bold", BADGE_STYLE_MAP[status])}
          >
            D-{dDay}
          </Badge>
        )}
      </div>
    </Card>
  );
}
