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

  const baseClass = cn(
    "h-14 w-full justify-start rounded-xl",
    "border border-gray-100 bg-gray-white shadow-button",
    "px-4 text-base font-medium text-gray-700",
    "hover:bg-primary-blue hover:text-white hover:shadow-button hover:opacity-100",
    "transition-none",
  );

  const selectedClass = cn(
    "border-primary-blue bg-primary-blue text-gray-white",
  );

  return (
    <div className="flex flex-col gap-3">
      {options.map((option) => {
        const isSelected = current.includes(option);

        return (
          <Button
            key={option}
            type="button"
            variant="secondary"
            size="md"
            onClick={() => toggle(option)}
            className={cn(baseClass, isSelected && selectedClass)}
          >
            {option}
          </Button>
        );
      })}
    </div>
  );
}
