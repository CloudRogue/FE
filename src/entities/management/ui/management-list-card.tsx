import {
  BaseManage,
  MANAGEMENT_STATUS,
  MANAGEMENT_STATUS_TYPE,
  ManagementStatus,
  ManagementStatusBadge,
  ManagementStepper,
} from "@/src/entities/management";
import { formatToDotDate } from "@/src/shared/lib/date";
import { Badge } from "@/src/shared/ui/badge";
import Button from "@/src/shared/ui/button";
import Card from "@/src/shared/ui/card";

interface ManagementListCardProps extends Partial<BaseManage> {
  status: ManagementStatus;
  endDate?: string; // APPLYING
  documentPublishedAt?: string; // DOCUMENT_WAITING
  finalPublishedAt?: string; // FINAL_WAITING, CLOSED
  noticeType?: string; // CLOSED
}

export function ManagementListCard(props: ManagementListCardProps) {
  const {
    status,
    title = "공고 제목을 불러올 수 없습니다.",
    dDay = 0,
    endDate,
    documentPublishedAt,
    finalPublishedAt,
  } = props;
  const { colors, buttonLabel } = MANAGEMENT_STATUS[status];

  const dateMap = {
    [MANAGEMENT_STATUS_TYPE.APPLYING]: endDate,
    [MANAGEMENT_STATUS_TYPE.PENDING]: documentPublishedAt,
    [MANAGEMENT_STATUS_TYPE.FINAL]: finalPublishedAt,
    [MANAGEMENT_STATUS_TYPE.CLOSED]: finalPublishedAt,
  };

  const formattedDate = formatToDotDate(dateMap[status]);
  const isClosed = status === MANAGEMENT_STATUS_TYPE.CLOSED;

  return (
    <Card className="p-6 mb-4 bg-white rounded-2xl shadow-sm border-none">
      <ManagementStatusBadge status={status} />

      <h3 className="text-[18px] font-bold text-slate-900 mb-6 leading-snug">
        {title || "공고 제목을 불러올 수 없습니다."}
      </h3>

      {isClosed && <ManagementStepper status={status} />}

      <Button
        style={{ backgroundColor: colors.buttonBg }}
        className="w-full flex justify-between items-center  text-slate-900 border-none h-14 px-5 rounded-xl font-bold mt-4"
      >
        <span className="text-[15px]">
          {buttonLabel} {formattedDate}
        </span>
        <Badge
          style={{ backgroundColor: colors.badge }}
          className="border-none py-1 px-2 rounded-md text-sm text-white shadow-none"
        >
          D-{dDay ?? 0}
        </Badge>
      </Button>
    </Card>
  );
}
