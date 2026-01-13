"use client";

import { useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import Checkbox from "@/src/shared/ui/checkbox";

import type {
  OnboardingAddAnswers,
  OnboardingAddQuestion,
} from "@/src/features/onboarding-add";

import {
  OnboardingAddShell,
  OnboardingAddRenderer,
} from "@/src/features/onboarding-add";

// 임시
const MOCK_QUESTIONS: OnboardingAddQuestion[] = [
  {
    id: "hasSubscriptionAccount",
    title: "청약통장이 있나요?",
    description: "지원 자격 확인을 위해 필요합니다.",
    type: "BOOLEAN",
    required: true,
    type_data: {
      trueLabel: "있어요",
      falseLabel: "없어요",
    },
  },
  {
    id: "subscriptionOpenedAt",
    title: "청약통장 개설일자를 입력해주세요",
    description: "가입기간 계산에 사용됩니다.",
    type: "INPUT",
    required: true,
    type_data: {
      inputType: "date",
      placeholder: "YYYY-MM-DD",
    },
  },
  {
    id: "subscriptionPaymentCount",
    title: "청약통장 납입 횟수를 알려주세요",
    description: "납입 횟수 요건 확인에 사용됩니다.",
    type: "INPUT",
    required: true,
    type_data: {
      inputType: "number",
      placeholder: "예) 24",
    },
  },
];

const STEP_KEY = "addStep";
const MIN_STEP = 0;

function clampStep(value: number, maxStep: number) {
  if (Number.isNaN(value)) return MIN_STEP;
  if (value < MIN_STEP) return MIN_STEP;
  if (value > maxStep) return maxStep;
  return value;
}

function isEmptyAnswer(value: OnboardingAddAnswers[string] | undefined) {
  if (value === undefined) return true;
  if (typeof value === "string") return value.trim().length === 0;
  return false;
}

function unknownKey(id: string) {
  return `unknown_${id}`;
}

function isUnknown(sp: URLSearchParams, id: string) {
  return sp.get(unknownKey(id)) === "1";
}

function setUnknown(sp: URLSearchParams, id: string, value: boolean) {
  if (value) sp.set(unknownKey(id), "1");
  else sp.delete(unknownKey(id));
}

function queryToAnswer(
  question: OnboardingAddQuestion,
  sp: URLSearchParams,
): boolean | string | number | undefined {
  const raw = sp.get(question.id);
  if (raw === null) return undefined;

  if (question.type === "BOOLEAN") {
    if (raw === "true") return true;
    if (raw === "false") return false;
    return undefined;
  }

  if (question.type === "INPUT") {
    if (question.type_data.inputType === "number") {
      const n = Number(raw);
      return Number.isNaN(n) ? undefined : n;
    }
    return raw;
  }

  if (question.type === "SELECT") return raw;

  return undefined;
}

function setOrDelete(sp: URLSearchParams, key: string, value: unknown) {
  if (value === undefined || value === null) return sp.delete(key);

  if (typeof value === "string") {
    const trimmed = value.trim();
    return trimmed.length ? sp.set(key, trimmed) : sp.delete(key);
  }

  sp.set(key, String(value));
}

export default function OnboardingAddControl() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const questions = MOCK_QUESTIONS;

  const totalStepCount = questions.length;
  const maxStep = Math.max(0, totalStepCount - 1);

  const urlParams = useMemo(
    () => new URLSearchParams(searchParams.toString()),
    [searchParams],
  );

  const currentStepIndex = useMemo(() => {
    return clampStep(Number(searchParams.get(STEP_KEY) ?? 0), maxStep);
  }, [searchParams, maxStep]);

  const currentQuestion = questions[currentStepIndex];

  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === maxStep;

  const primaryButtonLabel = isLastStep ? "완료" : "다음";

  const unknownChecked = useMemo(() => {
    if (!currentQuestion) return false;
    return isUnknown(urlParams, currentQuestion.id);
  }, [urlParams, currentQuestion]);

  const currentValue = useMemo(() => {
    if (!currentQuestion) return undefined;
    return queryToAnswer(currentQuestion, urlParams);
  }, [currentQuestion, urlParams]);

  const canProceed = useMemo(() => {
    if (!currentQuestion) return false;

    if (unknownChecked) return true;

    if (currentQuestion.required && isEmptyAnswer(currentValue)) return false;

    if (
      currentQuestion.type === "INPUT" &&
      currentQuestion.type_data.inputType === "date"
    ) {
      const v = typeof currentValue === "string" ? currentValue : "";
      return /^\d{4}-\d{2}-\d{2}$/.test(v);
    }

    return true;
  }, [unknownChecked, currentQuestion, currentValue]);

  const replaceQuery = (next: URLSearchParams) => {
    router.replace(`${pathname}?${next.toString()}`, { scroll: false });
  };

  const replaceStep = (nextStep: number) => {
    const next = new URLSearchParams(searchParams.toString());
    next.set(STEP_KEY, String(clampStep(nextStep, maxStep)));
    replaceQuery(next);
  };

  const handleBack = () => {
    if (!currentQuestion) return;
    if (!isFirstStep) replaceStep(currentStepIndex - 1);
  };

  const handlePrimary = () => {
    if (!currentQuestion) return;
    if (!canProceed) return;

    if (isLastStep) {
      const sp = new URLSearchParams(searchParams.toString());
      const answers: OnboardingAddAnswers = {};

      for (const q of questions) {
        if (isUnknown(sp, q.id)) continue;

        const v = queryToAnswer(q, sp);
        if (v !== undefined) answers[q.id] = v;
      }

      console.log("[onboarding-add] submit:", answers);
      return;
    }

    replaceStep(currentStepIndex + 1);
  };

  const handleUnknownToggle = (checked: boolean) => {
    if (!currentQuestion) return;

    const next = new URLSearchParams(searchParams.toString());

    if (checked) next.delete(currentQuestion.id);

    setUnknown(next, currentQuestion.id, checked);
    next.set(STEP_KEY, String(currentStepIndex));

    replaceQuery(next);
  };

  const handleChange = (value: boolean | string | number) => {
    if (!currentQuestion) return;

    const next = new URLSearchParams(searchParams.toString());

    next.delete(unknownKey(currentQuestion.id));

    if (currentQuestion.type === "BOOLEAN") {
      setOrDelete(next, currentQuestion.id, value === true ? "true" : "false");
    } else {
      setOrDelete(next, currentQuestion.id, value);
    }

    next.set(STEP_KEY, String(currentStepIndex));
    replaceQuery(next);
  };

  if (!totalStepCount) {
    return (
      <main className="min-h-dvh bg-white px-6 pt-10">
        <p className="text-sm text-neutral-600">추가 온보딩 질문이 없습니다.</p>
      </main>
    );
  }

  if (!currentQuestion) {
    return (
      <main className="min-h-dvh bg-white px-6 pt-10">
        <p className="text-sm text-neutral-600">
          추가 온보딩 질문을 불러오지 못했습니다.
        </p>
      </main>
    );
  }

  return (
    <OnboardingAddShell
      currentStepIndex={currentStepIndex}
      totalStepCount={totalStepCount}
      title={currentQuestion.title}
      description={currentQuestion.description}
      onBack={handleBack}
      backDisabled={isFirstStep}
      primaryButtonLabel={primaryButtonLabel}
      onPrimary={handlePrimary}
      primaryDisabled={!canProceed}
    >
      <div className="flex justify-end">
        <Checkbox
          label="모르겠어요"
          checked={unknownChecked}
          onChange={(e) => handleUnknownToggle(e.target.checked)}
          className="border-slate-300 text-slate-900 focus:ring-slate-900"
        />
      </div>

      <div className="mt-4">
        <OnboardingAddRenderer
          question={currentQuestion}
          value={unknownChecked ? undefined : currentValue}
          onChange={handleChange}
        />
      </div>
    </OnboardingAddShell>
  );
}
