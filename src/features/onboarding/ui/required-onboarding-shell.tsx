"use client";

import { useEffect, useMemo } from "react";

import Button from "@/src/shared/ui/button";
import { Progress } from "@/src/shared/ui/progress";
import cn from "@/src/shared/lib/cn";

import LeftIcon from "@/src/shared/ui/icons/arroaw/left.svg";

import { useRequiredOnboardingStore } from "@/src/features/onboarding/model/required-onboarding-store";
import QuestionRenderer from "@/src/features/onboarding/ui/question/question-renderer";
import RequiredOnboardingDrawer from "@/src/features/onboarding/ui/required-onboarding-drawer";
import RequiredOnboardingStart from "@/src/features/onboarding/ui/required-onboarding-start";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/src/shared/constants/routes";
export default function RequiredOnboardingShell() {
  const {
    hasStarted,
    start,
    resetStart,

    status,
    error,
    questions,
    currentIndex,
    answers,
    isComplete,
    init,
    prev,
    next,
    setAnswer,
    markComplete,
  } = useRequiredOnboardingStore();

  useEffect(() => {
    init();
  }, [init]);

  const router = useRouter();

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

  const handleClickNext = () => {
    if (!canGoNext) return;

    if (isLast) {
      markComplete();
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
        {!hasStarted ? (
          <button
            type="button"
            onClick={() => router.push(ROUTES.LOGIN)}
            className="mb-3 w-full text-sm text-gray-400 underline"
          >
            이미 계정이 있나요? 로그인 하기
          </button>
        ) : null}

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
          {hasStarted ? "다음으로" : "시작하기"}
        </Button>
      </footer>

      <RequiredOnboardingDrawer open={isComplete} />
    </div>
  );
}
