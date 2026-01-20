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

export default function QuestionSelectMulti({
  question,
  value,
  onChange,
}: Props) {
  const current = Array.isArray(value) ? value : [];
  const options = question.options ?? [];

  const toggle = (option: string) => {
    const has = current.includes(option);

    if (has) {
      onChange(current.filter((v) => v !== option));
      return;
    }

    onChange([...current, option]);
  };

  return (
    <div className="flex flex-col gap-3">
      {options.map((option) => {
        const isSelected = current.includes(option);

        return (
          <Button
            key={option}
            type="button"
            onClick={() => toggle(option)}
            className={cn(
              "h-14 w-full justify-start rounded-xl border px-4 text-base shadow-none",
              isSelected ? "border-blue-600 bg-blue-50 text-blue-700" : "",
            )}
          >
            {option}
          </Button>
        );
      })}
    </div>
  );
}
