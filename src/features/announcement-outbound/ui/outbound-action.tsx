"use client";

import { AnnouncementDetail } from "@/src/entities/announcement-detail/model/announcement.types";
import { postOutboundLog } from "@/src/features/announcement-outbound/api/action";
import Button from "@/src/shared/ui/button";

interface ApplyActionsProps extends Pick<
  AnnouncementDetail,
  "announcementId" | "externalApplyUrl"
> {}

export function OutboundAction({
  announcementId,
  externalApplyUrl,
}: ApplyActionsProps) {
  const handleApplyClick = async () => {
    await postOutboundLog(announcementId);
    window.open(externalApplyUrl, "_blank");
  };

  return (
    <div className="flex gap-4 mt-2">
      <Button
        onClick={handleApplyClick}
        className="w-full bg-[#111111] text-white py-4 rounded-xl font-bold disabled:opacity-50"
      >
        공고 신청하러 가기
      </Button>
    </div>
  );
}
