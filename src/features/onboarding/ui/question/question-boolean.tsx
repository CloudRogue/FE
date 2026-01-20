"use client";

import Button from "@/src/shared/ui/button";
import cn from "@/src/shared/lib/cn";
import type {
  RequiredOnboardingQuestion,
  RequiredOnboardingAnswerValue,
} from "@/src/features/onboarding/model/required-onboarding-types";

type Props = {
  question: RequiredOnboardingQuestion;
  value: RequiredOnboardingAnswerValue | undefined;
  onChange: (next: RequiredOnboardingAnswerValue) => void;
};

export default function QuestionBoolean({ value, onChange }: Props) {
  const current = typeof value === "boolean" ? value : null;

  const base =
    "h-20 flex-1 rounded-2xl border text-base font-semibold shadow-none";

  const selected = "border-blue-600 bg-blue-50 text-blue-700";

  return (
    <div className="flex gap-4">
      <Button
        type="button"
        onClick={() => onChange(true)}
        className={cn(base, current === true ? selected : "")}
      >
        예
      </Button>

      <Button
        type="button"
        onClick={() => onChange(false)}
        className={cn(base, current === false ? selected : "")}
      >
        아니오
      </Button>
    </div>
  );
}
