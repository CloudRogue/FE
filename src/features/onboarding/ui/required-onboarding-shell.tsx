"use client";

import { useEffect, useMemo } from "react";
import { ChevronLeft } from "lucide-react";

import Button from "@/src/shared/ui/button";
import { Progress } from "@/src/shared/ui/progress";
import cn from "@/src/shared/lib/cn";

import { useRequiredOnboardingStore } from "@/src/features/onboarding/model/required-onboarding-store";
import QuestionRenderer from "@/src/features/onboarding/ui/question/question-renderer";
import RequiredOnboardingDrawer from "@/src/features/onboarding/ui/required-onboarding-drawer";

export default function RequiredOnboardingShell() {
  const {
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
    if (isFirst) return;
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

  if (!currentQuestion) {
    return <div className="p-6">질문이 없습니다.</div>;
  }

  return (
    <div className="flex min-h-dvh flex-col bg-white">
      <header className="flex items-center gap-3 px-6 pt-6">
        <button
          type="button"
          onClick={handleClickPrev}
          aria-label="이전"
          disabled={isFirst}
          className={cn(
            "inline-flex h-8 w-8 items-center justify-center rounded-md",
            isFirst && "pointer-events-none opacity-30",
          )}
        >
          <ChevronLeft className="h-6 w-6" />
        </button>

        <div className="flex-1">
          <Progress value={progressValue} />
        </div>
      </header>

      <main className="flex-1 px-6 py-8">
        <QuestionRenderer
          question={currentQuestion}
          value={currentAnswer}
          onChange={(nextValue) =>
            setAnswer(currentQuestion.requiredOnboardingId, nextValue)
          }
        />
      </main>

      <footer className="sticky bottom-0 bg-white px-6 pb-6 pt-4">
        <Button
          type="button"
          onClick={handleClickNext}
          disabled={!canGoNext}
          className="h-14 w-full rounded-xl text-base font-semibold shadow-none"
        >
          {isLast ? "완료" : "다음"}
        </Button>
      </footer>

      <RequiredOnboardingDrawer open={isComplete} />
    </div>
  );
}
