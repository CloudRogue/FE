"use client";

import { postOutboundLog } from "@/src/features/announcement-apply/api/action";
import Button from "@/src/shared/ui/button";

interface ApplyActionsProps {
  announcementId: number;
  sourceUrl: {
    originalUrl: string;
    url?: string;
  };
}

export function ApplyActions({ announcementId, sourceUrl }: ApplyActionsProps) {
  const handleViewOriginal = () => {
    window.open(sourceUrl.originalUrl, "_blank");
  };

  const handleApplyClick = async () => {
    const result = await postOutboundLog(announcementId);

    if (!result.success) {
      console.error(result.message);
    }

    window.open(sourceUrl.url, "_blank");
  };

  return (
    <div className="flex gap-4 mt-2">
      <Button
        onClick={handleViewOriginal}
        className="flex-1 bg-gray-100 text-gray-600 py-4 rounded-xl font-bold"
      >
        공고문 원문 보기
      </Button>
      <Button
        onClick={handleApplyClick} // 연동된 핸들러
        className="flex-1 bg-black text-white py-4 rounded-xl font-bold hover:bg-gray-800"
      >
        공고 신청하러 가기
      </Button>
    </div>
  );
}
