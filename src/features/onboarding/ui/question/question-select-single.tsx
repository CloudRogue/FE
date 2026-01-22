"use client";

import type {
  RequiredOnboardingQuestion,
  RequiredOnboardingAnswerValue,
} from "@/src/features/onboarding/model/required-onboarding-types";

import OnboardingButton from "@/src/features/onboarding/ui/onboarding-button";

type Props = {
  question: RequiredOnboardingQuestion;
  value: RequiredOnboardingAnswerValue | undefined;
  onChange: (next: RequiredOnboardingAnswerValue) => void;
};

export default function QuestionSelectSingle({
  question,
  value,
  onChange,
}: Props) {
  const current = typeof value === "string" ? value : null;
  const options = question.options ?? [];

  return (
    <div className="grid grid-cols-2 gap-4">
      {options.map((option) => {
        const isSelected = current === option;

        return (
          <OnboardingButton
            key={option}
            type="button"
            selected={isSelected}
            onClick={() => onChange(option)}
          >
            {option}
          </OnboardingButton>
        );
      })}
    </div>
  );
}
