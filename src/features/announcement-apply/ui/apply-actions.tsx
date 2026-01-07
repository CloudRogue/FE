"use client";

import { postOutboundLog } from "@/src/features/announcement-apply/api/action";
import Button from "@/src/shared/ui/button";

interface ApplyActionsProps {
  announcementId: number;
  originalUrl: string;
}

export function ApplyActions({
  announcementId,
  originalUrl,
}: ApplyActionsProps) {
  const handleApplyClick = async () => {
    await postOutboundLog(announcementId);
    window.open(originalUrl, "_blank");
  };

  return (
    <div className="flex gap-4 mt-2">
      <Button
        onClick={handleApplyClick}
        className="flex-1 bg-[#F3F4F6] text-[#61666C] py-4 rounded-xl font-bold hover:bg-gray-800"
      >
        공고 보러가기
      </Button>
    </div>
  );
}
