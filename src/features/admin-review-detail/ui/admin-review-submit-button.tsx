"use client";

import { useAdminFormStore } from "@/src/features/admin-review-detail";
import Button from "@/src/shared/ui/button";
import { useParams } from "next/navigation";

interface SubmitButtonProps {
  className?: string;
}

export function AdminReviewSubmitButton({ className }: SubmitButtonProps) {
  const { submitForm } = useAdminFormStore();

  const params = useParams();
  const announcementId = params?.id as string;

  const handleSubmit = async () => {
    if (!announcementId) {
      alert("공고 ID를 찾을 수 없습니다.");
      return;
    }

    try {
      await submitForm(announcementId);
    } catch (error) {
      console.error("등록 과정 중 예외 발생:", error);
    }
  };

  return (
    <Button
      onClick={handleSubmit}
      className={`px-10 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-100 transition-all ${className}`}
    >
      최종 등록하기
    </Button>
  );
}
