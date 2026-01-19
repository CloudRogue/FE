import {
  AnnouncementDetail,
  AnnouncementStatusSchema,
} from "@/src/entities/announcement-detail";
import cn from "@/src/shared/lib/cn";
import Button from "@/src/shared/ui/button";
import { useMemo } from "react";
import z from "zod";
import { postAnnouncementApply } from "../api/announcement-apply.action";

type AnnouncementStatus = z.infer<typeof AnnouncementStatusSchema>;

type ApplyActionsProps = Pick<
  AnnouncementDetail,
  "announcementId" | "url" | "status" | "dDay"
>;

export function AnnouncementApplyAction({
  announcementId,
  url,
  status,
  dDay,
}: ApplyActionsProps) {
  const isDisabled = status === "UPCOMING";

  const buttonConfig = useMemo(() => {
    const statusConfigs: Record<
      AnnouncementStatus,
      { label: string; isDisabled: boolean }
    > = {
      UPCOMING: {
        label: `공고 접수 시작까지 D-${dDay ?? "?"}`,
        isDisabled: true,
      },
      CLOSED: {
        label: "접수가 마감된 공고입니다",
        isDisabled: true,
      },
      OPEN: {
        label: "공고 지원하기",
        isDisabled: false,
      },
      DUE_SOON: {
        label: "공고 지원하기",
        isDisabled: false,
      },
    };

    return statusConfigs[status];
  }, [status, dDay]);

  const handleApplyClick = async () => {
    if (!url) return;
    try {
      await postAnnouncementApply(announcementId);
    } catch (error) {
      console.error("지원 관리 저장 실패", error);
    }
  };

  return (
    <Button
      onClick={handleApplyClick}
      disabled={isDisabled}
      className={cn(
        "w-full py-4 rounded-xl font-bold transition-all",
        isDisabled
          ? "bg-gray-400 text-white cursor-not-allowed"
          : "bg-[#1778FF] text-white active:scale-[0.98]",
      )}
    >
      {buttonConfig.label}
    </Button>
  );
}
