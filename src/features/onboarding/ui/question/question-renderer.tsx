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

import RequiredOnboardingNotice from "@/src/features/onboarding/ui/required-onboarding-notice";
import { REQUIRED_ONBOARDING_NOTICE_MAP } from "@/src/features/onboarding/model/required-onboarding-notice-map";

const REGION_QUESTION_IDS: number[] = [99999];

type Props = {
  question: RequiredOnboardingQuestion;
  value: RequiredOnboardingAnswerValue | undefined;
  onChange: (next: RequiredOnboardingAnswerValue | undefined) => void;
};

export default function QuestionRenderer({ question, value, onChange }: Props) {
  const notice = REQUIRED_ONBOARDING_NOTICE_MAP[question.requiredOnboardingId];

  const Notice = notice ? (
    <RequiredOnboardingNotice
      title={notice.title}
      description={notice.description}
    />
  ) : null;

  if (REGION_QUESTION_IDS.includes(question.requiredOnboardingId)) {
    return (
      <QuestionLayout question={question}>
        <>
          <QuestionRegion value={value} onChange={onChange} />
          {Notice}
        </>
      </QuestionLayout>
    );
  }

  if (question.type === "text_input") {
    return (
      <QuestionLayout question={question}>
        <>
          <QuestionTextInput
            question={question}
            value={value}
            onChange={onChange}
          />
          {Notice}
        </>
      </QuestionLayout>
    );
  }

  if (question.type === "number_input") {
    return (
      <QuestionLayout question={question}>
        <>
          <QuestionNumberInput
            question={question}
            value={value}
            onChange={onChange}
          />
          {Notice}
        </>
      </QuestionLayout>
    );
  }

  if (question.type === "boolean") {
    return (
      <QuestionLayout question={question}>
        <>
          <QuestionBoolean
            question={question}
            value={value}
            onChange={onChange}
          />
          {Notice}
        </>
      </QuestionLayout>
    );
  }

  if (question.type === "select_single") {
    return (
      <QuestionLayout question={question}>
        <>
          <QuestionSelectSingle
            question={question}
            value={value}
            onChange={onChange}
          />
          {Notice}
        </>
      </QuestionLayout>
    );
  }

  if (question.type === "select_multi") {
    return (
      <QuestionLayout question={question}>
        <>
          <QuestionSelectMulti
            question={question}
            value={value}
            onChange={onChange}
          />
          {Notice}
        </>
      </QuestionLayout>
    );
  }

  return null;
}
