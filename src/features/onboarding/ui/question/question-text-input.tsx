"use client";

import type {
  RequiredOnboardingQuestion,
  RequiredOnboardingAnswerValue,
} from "@/src/features/onboarding/model/required-onboarding-types";

import OnboardingInput from "@/src/features/onboarding/ui/onboarding-input";

type Props = {
  question: RequiredOnboardingQuestion;
  value: RequiredOnboardingAnswerValue | undefined;
  onChange: (next: RequiredOnboardingAnswerValue) => void;
};

export default function QuestionTextInput({ value, onChange }: Props) {
  const safeValue = typeof value === "string" ? value : "";

  return (
    <OnboardingInput
      value={safeValue}
      placeholder=""
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
