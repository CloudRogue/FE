"use client";

import type {
  RequiredOnboardingQuestion,
  RequiredOnboardingAnswerValue,
} from "@/src/features/onboarding/model/required-onboarding-types";

import QuestionLayout from "@/src/features/onboarding/ui/question/question-layout";
import QuestionTextInput from "@/src/features/onboarding/ui/question/question-text-input";
import QuestionNumberInput from "@/src/features/onboarding/ui/question/question-number-input";
import QuestionBoolean from "@/src/features/onboarding/ui/question/question-boolean";
import QuestionSelectSingle from "@/src/features/onboarding/ui/question/question-select-single";
import QuestionSelectMulti from "@/src/features/onboarding/ui/question/question-select-multi";
import QuestionRegion from "@/src/features/onboarding/ui/question/question-region";

const REGION_QUESTION_IDS: number[] = [99999];

type Props = {
  question: RequiredOnboardingQuestion;
  value: RequiredOnboardingAnswerValue | undefined;
  onChange: (next: RequiredOnboardingAnswerValue | undefined) => void;
};

export default function QuestionRenderer({ question, value, onChange }: Props) {
  if (REGION_QUESTION_IDS.includes(question.requiredOnboardingId)) {
    return (
      <QuestionLayout question={question}>
        <QuestionRegion value={value} onChange={onChange} />
      </QuestionLayout>
    );
  }

  if (question.type === "text_input") {
    return (
      <QuestionLayout question={question}>
        <QuestionTextInput
          question={question}
          value={value}
          onChange={onChange}
        />
      </QuestionLayout>
    );
  }

  if (question.type === "number_input") {
    return (
      <QuestionLayout question={question}>
        <QuestionNumberInput
          question={question}
          value={value}
          onChange={onChange}
        />
      </QuestionLayout>
    );
  }

  if (question.type === "boolean") {
    return (
      <QuestionLayout question={question}>
        <QuestionBoolean
          question={question}
          value={value}
          onChange={onChange}
        />
      </QuestionLayout>
    );
  }

  if (question.type === "select_single") {
    return (
      <QuestionLayout question={question}>
        <QuestionSelectSingle
          question={question}
          value={value}
          onChange={onChange}
        />
      </QuestionLayout>
    );
  }

  if (question.type === "select_multi") {
    return (
      <QuestionLayout question={question}>
        <QuestionSelectMulti
          question={question}
          value={value}
          onChange={onChange}
        />
      </QuestionLayout>
    );
  }

  return null;
}
