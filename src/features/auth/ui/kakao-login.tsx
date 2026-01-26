"use client";

import { submitAdditionalOnboardingAnswers } from "@/src/features/onboarding-add/api/additional-onboarding-action";
import { useRequiredOnboardingStore } from "@/src/features/onboarding/model/required-onboarding-store";
import cn from "@/src/shared/lib/cn";
import Button from "@/src/shared/ui/button";
import { useState } from "react";

interface KakaoLoginButtonProps {
  className?: string;
  children?: React.ReactNode;
  onSuccess?: () => void;
}

export function KakaoLoginButton({
  className,
  children,
  onSuccess,
}: KakaoLoginButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const questions = useRequiredOnboardingStore((state) => state.questions);
  const answers = useRequiredOnboardingStore((state) => state.answers);
  const resetStore = useRequiredOnboardingStore((state) => state.reset);

  const handleSubmit = async () => {
    setIsLoading(true);

    try {
      const formattedAnswers = questions
        .map((question) => {
          const value = answers[question.requiredOnboardingId];

          if (value === undefined) return null;

          return {
            additionalOnboardingId: Number(question.requiredOnboardingId),
            type: question.type,
            unknown: false,
            value: value,
          };
        })
        .filter((item) => item !== null);

      await submitAdditionalOnboardingAnswers({
        answers: formattedAnswers as any,
      });

      resetStore();
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("온보딩 제출 실패:", error);
      alert("제출 중 오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  const defaultClassName =
    "w-full h-14 bg-black hover:bg-gray-800 text-white border-none rounded-xl text-lg font-bold shadow-none disabled:opacity-50";

  return (
    <Button
      onClick={handleSubmit}
      className={cn(defaultClassName, className)}
      disabled={isLoading}
    >
      {isLoading ? "로그인 중..." : (children ?? "카카오로 시작하기")}
    </Button>
  );
}
