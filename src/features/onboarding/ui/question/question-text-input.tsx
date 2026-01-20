"use client";

import Input from "@/src/shared/ui/input";
import type {
  RequiredOnboardingQuestion,
  RequiredOnboardingAnswerValue,
} from "@/src/features/onboarding/model/required-onboarding.types";

type Props = {
  question: RequiredOnboardingQuestion;
  value: RequiredOnboardingAnswerValue | undefined;
  onChange: (next: RequiredOnboardingAnswerValue) => void;
};

export default function QuestionTextInput({ value, onChange }: Props) {
  const safeValue = typeof value === "string" ? value : "";

  return (
    <Input
      value={safeValue}
      placeholder=""
      onChange={(e) => onChange(e.target.value)}
      className="h-14 w-full rounded-xl border px-4 text-base"
    />
  );
}
