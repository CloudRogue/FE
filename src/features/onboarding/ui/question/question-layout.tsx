"use client";

import type { ReactNode } from "react";

import type { RequiredOnboardingQuestion } from "@/src/features/onboarding/model/required-onboarding-types";

type Props = {
  question: RequiredOnboardingQuestion;
  children: ReactNode;
};

export default function QuestionLayout({ question, children }: Props) {
  return (
    <section className="flex flex-col gap-6">
      <header className="flex flex-col gap-2">
        <h1 className="text-xl font-semibold">{question.title}</h1>

        {question.description && (
          <p className="text-sm text-gray-600">{question.description}</p>
        )}
      </header>

      <div className="flex flex-col gap-4">
        <p className="text-base font-medium">{question.question}</p>

        <div>{children}</div>
      </div>
    </section>
  );
}
