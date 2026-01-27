"use client";

import { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";

import Button from "@/src/shared/ui/button";
import { Progress } from "@/src/shared/ui/progress";
import cn from "@/src/shared/lib/cn";

import LeftIcon from "@/src/shared/ui/icons/arroaw/left.svg";

import { useRequiredOnboardingStore } from "@/src/features/onboarding/model/required-onboarding-store";
import QuestionRenderer from "@/src/features/onboarding/ui/question/question-renderer";
import RequiredOnboardingStart from "@/src/features/onboarding/ui/required-onboarding-start";
import { submitOnboardingAnswers } from "@/src/features/onboarding/api/onboarding-submit-action";
import { toSubmitPayloadFromRequired } from "@/src/features/onboarding/model/onboarding-submit-transform";
import { clearRequiredOnboardingDraft } from "@/src/features/onboarding/model/required-onboarding-storage";
import { ROUTES } from "@/src/shared/constants/routes";

export default function RequiredOnboardingShell() {
  const router = useRouter();

  const {
    hasStarted,
    start,
    resetStart,

    status,
    error,
    questions,
    currentIndex,
    answers,
    init,
    prev,
    next,
    setAnswer,
  } = useRequiredOnboardingStore();

  useEffect(() => {
    init();
  }, [init]);

  const total = questions.length;

  const currentQuestion = useMemo(() => {
    if (total === 0) return null;
    return questions[currentIndex] ?? null;
  }, [questions, currentIndex, total]);

  const isFirst = currentIndex <= 0;
  const isLast = total > 0 && currentIndex >= total - 1;

  const progressValue = useMemo(() => {
    if (total <= 0) return 0;
    return Math.round(((currentIndex + 1) / total) * 100);
  }, [currentIndex, total]);

  const currentAnswer = useMemo(() => {
    if (!currentQuestion) return undefined;
    return answers[currentQuestion.requiredOnboardingId];
  }, [answers, currentQuestion]);

  const canGoNext = useMemo(() => {
    if (!currentQuestion) return false;

    const value = answers[currentQuestion.requiredOnboardingId];
    if (value === undefined) return false;

    if (typeof value === "string" && value.trim().length === 0) return false;

    if (Array.isArray(value) && value.length === 0) return false;

    return true;
  }, [answers, currentQuestion]);

  const handleClickNext = async () => {
    if (!canGoNext) return;

    if (isLast) {
      try {
        const payload = toSubmitPayloadFromRequired(answers, questions);

        await submitOnboardingAnswers(payload);
        clearRequiredOnboardingDraft();

        router.replace(ROUTES.HOME);
      } catch (e) {
        console.error(e);
      }
      return;
    }

    next();
  };

  const handleClickPrev = () => {
    // Start 화면: 뒤로가기 => 홈으로
    if (!hasStarted) {
      router.replace(ROUTES.HOME);
      return;
    }

    // 첫 질문 화면에서 뒤로가기 => Start 화면으로
    if (isFirst) {
      resetStart();
      return;
    }

    prev();
  };

  if (status === "loading" || status === "idle") {
    return <div className="p-6">로딩중...</div>;
  }

  if (status === "error") {
    return (
      <div className="p-6">
        <div className="mb-3 text-sm">
          {error ?? "온보딩을 불러오지 못했습니다."}
        </div>
        <Button
          type="button"
          onClick={() => init()}
          className="rounded-md border px-3 py-2 text-sm"
        >
          다시 시도
        </Button>
      </div>
    );
  }

  // Start가 아닌데도 질문이 없으면 그때만 에러 처리
  if (hasStarted && !currentQuestion) {
    return <div className="p-6">질문이 없습니다.</div>;
  }

  return (
    <div className="flex min-h-dvh flex-col bg-gray-bg">
      <header className="flex items-center gap-3 px-4 pt-6">
        <button
          type="button"
          onClick={handleClickPrev}
          aria-label="이전"
          className={cn(
            "inline-flex h-10 w-10 items-center justify-center rounded-md",
            "text-gray-black",
          )}
        >
          <LeftIcon className="h-6 w-6" />
        </button>

        <div className="flex-1">
          {hasStarted && <Progress value={progressValue} />}
        </div>
      </header>

      <main className="flex-1 px-6 py-8">
        {hasStarted ? (
          <QuestionRenderer
            question={currentQuestion!}
            value={currentAnswer}
            onChange={(nextValue) =>
              setAnswer(currentQuestion!.requiredOnboardingId, nextValue)
            }
          />
        ) : (
          <RequiredOnboardingStart />
        )}
      </main>

      <footer className="sticky bottom-0 bg-gray-bg px-6 pb-6 pt-4">
        <Button
          type="button"
          onClick={hasStarted ? handleClickNext : start}
          variant="primary"
          size="lg"
          className={cn(
            "w-full shadow-button",
            hasStarted && !canGoNext && "pointer-events-none",
          )}
        >
          {hasStarted ? (isLast ? "완료" : "다음으로") : "시작하기"}
        </Button>
      </footer>
    </div>
  );
}
