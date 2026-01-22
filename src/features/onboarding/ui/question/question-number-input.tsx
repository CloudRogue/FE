"use client";

import type {
  RequiredOnboardingQuestion,
  RequiredOnboardingAnswerValue,
} from "@/src/features/onboarding/model/required-onboarding-types";

import OnboardingInput from "@/src/features/onboarding/ui/onboarding-input";

type Props = {
  question: RequiredOnboardingQuestion;
  value: RequiredOnboardingAnswerValue | undefined;
  onChange: (next: RequiredOnboardingAnswerValue | undefined) => void;
};

export default function QuestionNumberInput({ value, onChange }: Props) {
  const safeValue = typeof value === "number" ? String(value) : "";

  return (
    <OnboardingInput
      value={safeValue}
      inputMode="numeric"
      onChange={(e) => {
        const raw = e.target.value;

        if (raw.trim().length === 0) {
          onChange(undefined);
          return;
        }

        const nextNumber = Number(raw);
        if (Number.isNaN(nextNumber)) return;

        onChange(nextNumber);
      }}
    />
  );
}
