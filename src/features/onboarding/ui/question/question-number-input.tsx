"use client";

import Input from "@/src/shared/ui/input";
import type {
  RequiredOnboardingQuestion,
  RequiredOnboardingAnswerValue,
} from "@/src/features/onboarding/model/required-onboarding.types";

type Props = {
  question: RequiredOnboardingQuestion;
  value: RequiredOnboardingAnswerValue | undefined;
  onChange: (next: RequiredOnboardingAnswerValue | undefined) => void;
};

export default function QuestionNumberInput({ value, onChange }: Props) {
  const safeValue = typeof value === "number" ? String(value) : "";

  return (
    <Input
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
      className="h-14 w-full rounded-xl border px-4 text-base"
    />
  );
}
