"use client";

import type { OnboardingAddQuestion } from "@/src/features/onboarding-add";

import {
  BooleanStep,
  InputStep,
  DateStep,
  SelectStep,
} from "@/src/features/onboarding-add";

type OnboardingAddRendererProps = {
  question: OnboardingAddQuestion;
  value: boolean | string | number | undefined;
  onChange: (value: boolean | string | number) => void;
};

export default function OnboardingAddRenderer({
  question,
  value,
  onChange,
}: OnboardingAddRendererProps) {
  if (question.type === "BOOLEAN") {
    return (
      <BooleanStep
        value={typeof value === "boolean" ? value : undefined}
        trueLabel={question.type_data?.trueLabel}
        falseLabel={question.type_data?.falseLabel}
        onChange={onChange}
      />
    );
  }

  if (question.type === "INPUT") {
    if (question.type_data.inputType === "date") {
      return (
        <DateStep
          value={typeof value === "string" ? value : undefined}
          onChange={(v) => onChange(v)}
        />
      );
    }

    return (
      <InputStep
        value={
          typeof value === "number" ? value : (value as string | undefined)
        }
        inputType={question.type_data.inputType}
        placeholder={question.type_data.placeholder}
        onChange={onChange}
      />
    );
  }

  if (question.type === "SELECT") {
    return (
      <SelectStep
        value={typeof value === "string" ? value : undefined}
        options={question.type_data.options}
        onChange={onChange}
      />
    );
  }

  return null;
}
