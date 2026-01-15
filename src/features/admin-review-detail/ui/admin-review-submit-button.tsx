"use client";

import { useAdminFormStore } from "@/src/features/admin-review-detail";
import Button from "@/src/shared/ui/button";

interface SubmitButtonProps {
  className?: string;
}

export function AdminReviewSubmitButton({ className }: SubmitButtonProps) {
  const { formData } = useAdminFormStore();

  const handleSubmit = async () => {
    try {
      console.log("서버로 데이터 전송:", formData);
      alert("공고가 성공적으로 등록되었습니다.");
    } catch (error) {
      console.error("등록 중 오류 발생:", error);
      alert("등록에 실패했습니다.");
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
