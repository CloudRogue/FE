"use client";

import OnboardingButton from "@/src/features/onboarding/ui/onboarding-button";

import type { RequiredOnboardingAnswerValue } from "@/src/features/onboarding/model/required-onboarding-types";

type Props = {
  value: RequiredOnboardingAnswerValue | undefined;
  onChange: (next: RequiredOnboardingAnswerValue) => void;
};

export default function QuestionBoolean({ value, onChange }: Props) {
  const current = typeof value === "boolean" ? value : null;

  return (
    <div className="grid grid-cols-2 gap-4">
      <OnboardingButton
        type="button"
        selected={current === false}
        onClick={() => onChange(false)}
      >
        무소유
      </OnboardingButton>

      <OnboardingButton
        type="button"
        selected={current === true}
        onClick={() => onChange(true)}
      >
        소유
      </OnboardingButton>
    </div>
  );
}
