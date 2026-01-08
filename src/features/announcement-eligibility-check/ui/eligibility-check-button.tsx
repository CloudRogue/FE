"use client";

import { EligibilityResult } from "@/src/entities/announcement-detail";
import { postEligibilityCheck } from "@/src/features/announcement-eligibility-check";
import Button from "@/src/shared/ui/button";
import { useTransition } from "react";

interface EligibilityCheckButtonProps {
  announcementId: number;
  isClosed: boolean;
  onSuccess: (result: EligibilityResult) => void;
}

export function EligibilityCheckButton({
  announcementId,
  isClosed,
  onSuccess,
}: EligibilityCheckButtonProps) {
  const [isPending, startTransition] = useTransition();

  const handleEligibilityCheck = () => {
    startTransition(async () => {
      try {
        const result = await postEligibilityCheck(announcementId);
        onSuccess(result);
      } catch (error) {
        console.error("진단 실패:", error);
      }
    });
  };

  return (
    <Button
      onClick={handleEligibilityCheck}
      disabled={isPending || isClosed}
      className="w-full bg-[#111111] text-white py-6 rounded-xl font-bold text-[16px] disabled:bg-gray-300 disabled:opacity-50"
    >
      {isClosed
        ? "접수 마감"
        : isPending
          ? "진단 중..."
          : "지원 자격 정밀 진단 받기"}
    </Button>
  );
}
