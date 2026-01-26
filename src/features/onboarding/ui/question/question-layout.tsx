"use client";

import type { ReactNode } from "react";

import type { RequiredOnboardingQuestion } from "@/src/features/onboarding/model/required-onboarding-types";

type LayoutQuestion = Pick<
  RequiredOnboardingQuestion,
  "title" | "description" | "question"
>;

type Props = {
  question: LayoutQuestion;
  children: ReactNode;
  variant?: "default" | "start";
};

export default function QuestionLayout({
  question,
  children,
  variant = "default",
}: Props) {
  const isStart = variant === "start";

  return (
    <section className="flex flex-col gap-6">
      <header className="flex flex-col gap-2">
        <h1
          className={
            isStart
              ? "text-sm text-gray-400"
              : "text-xl font-semibold text-gray-black"
          }
        >
          {question.title}
        </h1>

        {question.description ? (
          <p
            className={
              isStart
                ? "text-xl font-semibold text-gray-black whitespace-pre-line"
                : "text-sm text-gray-600"
            }
          >
            {question.description}
          </p>
        ) : null}
      </header>

      <div className="flex flex-col gap-4">
        {question.question ? (
          <p className="text-base font-medium">{question.question}</p>
        ) : null}

        <div>{children}</div>
      </div>
    </section>
  );
}
