"use client";

import {
  AnnouncementDetail,
  AnnouncementStatusSchema,
} from "@/src/entities/announcement-detail";
import { postOutboundLog } from "@/src/features/announcement-outbound";
import cn from "@/src/shared/lib/cn";
import Button from "@/src/shared/ui/button";
import { useMemo } from "react";
import z from "zod";

type AnnouncementStatus = z.infer<typeof AnnouncementStatusSchema>;

type ApplyActionsProps = Pick<
  AnnouncementDetail,
  "announcementId" | "url" | "status" | "dDay"
>;

export function OutboundAction({
  announcementId,
  url,
  status,
  dDay,
}: ApplyActionsProps) {
  const isDisabled = status === "UPCOMING";

  const buttonConfig = useMemo(() => {
    const statusConfigs: Record<
      AnnouncementStatus,
      { label: string; isDisabled: boolean; style: string }
    > = {
      UPCOMING: {
        label: `공고 접수 시작까지 D-${dDay ?? "?"}`,
        isDisabled: true,
        style: "bg-gray-400 text-white cursor-not-allowed",
      },
      CLOSED: {
        label: "접수가 마감된 공고입니다",
        isDisabled: true,
        style: "bg-gray-400 text-white cursor-not-allowed",
      },
      OPEN: {
        label: "공고 신청하러 가기",
        isDisabled: false,
        style: "bg-[#111111] text-white active:scale-[0.98] hover:bg-black",
      },
      DUE_SOON: {
        label: "공고 신청하러 가기",
        isDisabled: false,
        style: "bg-[#111111] text-white active:scale-[0.98] hover:bg-black",
      },
    };

    return statusConfigs[status];
  }, [status, dDay]);

  const handleApplyClick = async () => {
    if (!url) return;
    try {
      await postOutboundLog(announcementId);
    } catch (error) {
      console.error("Outbound log failed", error);
    } finally {
      window.open(url, "_blank");
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
          : "bg-[#111111] text-white active:scale-[0.98]",
      )}
    >
      {buttonConfig.label}
    </Button>
  );
}
