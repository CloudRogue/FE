"use client";

import { useEffect, useMemo, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Button from "@/src/shared/ui/button";
import { Progress } from "@/src/shared/ui/progress";
import cn from "@/src/shared/lib/cn";
import LeftIcon from "@/src/shared/ui/icons/arroaw/left.svg";

import {
  useAdditionalOnboardingStore,
  AdditionalOnboardingRenderer,
} from "@/src/features/onboarding-add";

function parseIdsFromSearchParams(
  searchParams: ReturnType<typeof useSearchParams>,
): number[] {
  // ids=900001,900002
  const rawSingle = searchParams.get("ids");
  const fromSingle = rawSingle
    ? rawSingle
        .split(",")
        .map((v) => Number(v.trim()))
        .filter((n) => Number.isFinite(n))
    : [];

  // ids=900001&ids=900002
  const rawMulti = searchParams.getAll("ids");
  const fromMulti = rawMulti
    .map((v) => Number(v.trim()))
    .filter((n) => Number.isFinite(n));

  return Array.from(new Set([...fromSingle, ...fromMulti]));
}

export default function AdditionalOnboardingShell() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const ids = useMemo(
    () => parseIdsFromSearchParams(searchParams),
    [searchParams],
  );

  const {
    status,
    error,
    questions,
    currentIndex,
    draft,
    isComplete,
    init,
    prev,
    next,
    setAnswer,
    setUnknown,
    isCurrentValid,
    isLast,
    submit,
    reset,
  } = useAdditionalOnboardingStore();

  // ids가 없으면 init 자체를 하지 않음
  useEffect(() => {
    if (ids.length === 0) return;
    init(ids);
  }, [init, ids]);

  const total = questions.length;

  const currentQuestion = useMemo(() => {
    if (total === 0) return null;
    return questions[currentIndex] ?? null;
  }, [questions, currentIndex, total]);

  const isFirst = currentIndex <= 0;

  const progressValue = useMemo(() => {
    if (total <= 0) return 0;
    return Math.round(((currentIndex + 1) / total) * 100);
  }, [currentIndex, total]);

  const currentDraftItem = useMemo(() => {
    if (!currentQuestion) return undefined;
    return draft[currentQuestion.additionalOnboardingId];
  }, [draft, currentQuestion]);

  const canGoNext = isCurrentValid();

  // 완료되면 홈으로 이동 (뒤로가기 시 다시 온보딩으로 안 오게 replace)
  useEffect(() => {
    if (!isComplete) return;
    reset(); // 상태 정리(선택): 뒤로 왔을 때 완료 화면 같은 거 안 남김
    router.replace("/");
  }, [isComplete, reset, router]);

  const handleClickNext = useCallback(async () => {
    if (!canGoNext) return;

    if (isLast()) {
      await submit(); // 성공하면 위 useEffect가 홈으로 보냄
      return;
    }

    next();
  }, [canGoNext, isLast, submit, next]);

  const handleClickPrev = useCallback(() => {
    if (isFirst) return;
    prev();
  }, [isFirst, prev]);

  if (ids.length === 0) {
    return <div className="p-6">잘못된 접근입니다. (ids 누락)</div>;
  }

  if (status === "loading" || status === "idle") {
    return <div className="p-6">로딩중...</div>;
  }

  if (status === "error") {
    return (
      <div className="p-6">
        <div className="mb-3 text-sm">
          {error ?? "추가 온보딩을 불러오지 못했습니다."}
        </div>
        <Button
          type="button"
          onClick={() => init(ids)}
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
    <div className="flex min-h-dvh flex-col bg-gray-bg">
      <header className="flex items-center gap-3 px-4 pt-6">
        <button
          type="button"
          onClick={handleClickPrev}
          aria-label="이전"
          disabled={isFirst}
          className={cn(
            "inline-flex h-10 w-10 items-center justify-center rounded-md",
            "text-gray-black",
            isFirst && "pointer-events-none opacity-30",
          )}
        >
          <LeftIcon className="h-6 w-6" />
        </button>

        <div className="flex-1">
          <Progress value={progressValue} />
        </div>
      </header>

      <main className="flex-1 px-6 py-8">
        <AdditionalOnboardingRenderer
          question={currentQuestion}
          draftItem={currentDraftItem}
          onChangeValue={(nextValue) =>
            setAnswer(currentQuestion.additionalOnboardingId, nextValue)
          }
          onChangeUnknown={(nextUnknown) =>
            setUnknown(currentQuestion.additionalOnboardingId, nextUnknown)
          }
        />
      </main>
      <footer className="sticky bottom-0 bg-gray-bg px-6 pb-6 pt-4">
        <Button
          type="button"
          onClick={handleClickNext}
          variant="primary"
          size="lg"
          disabled={status === "submitting"}
          className={cn(
            "w-full shadow-button",
            !canGoNext && "pointer-events-none",
          )}
        >
          {status === "submitting"
            ? "제출 중..."
            : isLast()
              ? "완료"
              : "다음으로"}
        </Button>
      </footer>
    </div>
  );
}
