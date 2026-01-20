"use client";

import type {
  RequiredOnboardingAnswerValue,
  RequiredOnboardingQuestion,
} from "@/src/features/onboarding/model/required-onboarding-types";

import QuestionLayout from "@/src/features/onboarding/ui/question/question-layout";
import QuestionTextInput from "@/src/features/onboarding/ui/question/question-text-input";
import QuestionNumberInput from "@/src/features/onboarding/ui/question/question-number-input";
import QuestionBoolean from "@/src/features/onboarding/ui/question/question-boolean";
import QuestionSelectSingle from "@/src/features/onboarding/ui/question/question-select-single";
import QuestionSelectMulti from "@/src/features/onboarding/ui/question/question-select-multi";

import type {
  AdditionalOnboardingAnswerValue,
  AdditionalOnboardingDraftItem,
  AdditionalOnboardingQuestion,
} from "@/src/features/onboarding-add";

type DraftItem = AdditionalOnboardingDraftItem | undefined;

type Props = {
  question: AdditionalOnboardingQuestion;
  draftItem: DraftItem;
  onChangeValue: (nextValue: AdditionalOnboardingAnswerValue | null) => void;
  onChangeUnknown: (nextUnknown: boolean) => void;
};

function toRequiredQuestion(
  question: AdditionalOnboardingQuestion,
): RequiredOnboardingQuestion {
  return {
    requiredOnboardingId: question.additionalOnboardingId,
    title: question.title,
    description: question.description,
    question: question.question,
    type: question.type,
    options: question.options,
  };
}

function toRequiredValue(
  draftItem: DraftItem,
): RequiredOnboardingAnswerValue | undefined {
  if (!draftItem) return undefined;
  if (draftItem.unknown) return undefined;
  if (draftItem.value === null) return undefined;

  return draftItem.value as RequiredOnboardingAnswerValue;
}

export default function AdditionalOnboardingQuestionRenderer({
  question,
  draftItem,
  onChangeValue,
  onChangeUnknown,
}: Props) {
  const adaptedQuestion = toRequiredQuestion(question);
  const adaptedValue = toRequiredValue(draftItem);

  const unknown = draftItem?.unknown ?? false;

  const handleChange = (next: RequiredOnboardingAnswerValue | undefined) => {
    if (next === undefined) {
      onChangeValue(null);
      return;
    }
    onChangeValue(next as AdditionalOnboardingAnswerValue);
  };

  const handleToggleUnknown = () => {
    onChangeUnknown(!unknown);
    if (!unknown) {
      // unknown을 켜는 순간, value는 null로 정리
      onChangeValue(null);
    }
  };

  return (
    <QuestionLayout question={adaptedQuestion}>
      <div className="mb-4 flex items-center justify-end">
        <button
          type="button"
          onClick={handleToggleUnknown}
          className="text-sm font-medium text-gray-700"
        >
          {unknown ? "모르겠어요 해제" : "모르겠어요"}
        </button>
      </div>

      {unknown ? (
        <div className="text-sm text-gray-500">
          해당 질문은 모르겠어요로 제출됩니다.
        </div>
      ) : (
        <>
          {question.type === "text_input" && (
            <QuestionTextInput
              question={adaptedQuestion}
              value={adaptedValue}
              onChange={(next) => handleChange(next)}
            />
          )}

          {question.type === "number_input" && (
            <QuestionNumberInput
              question={adaptedQuestion}
              value={adaptedValue}
              onChange={(next) => handleChange(next)}
            />
          )}

          {question.type === "boolean" && (
            <QuestionBoolean
              question={adaptedQuestion}
              value={adaptedValue}
              onChange={(next) => handleChange(next)}
            />
          )}

          {question.type === "select_single" && (
            <QuestionSelectSingle
              question={adaptedQuestion}
              value={adaptedValue}
              onChange={(next) => handleChange(next)}
            />
          )}

          {question.type === "select_multi" && (
            <QuestionSelectMulti
              question={adaptedQuestion}
              value={adaptedValue}
              onChange={(next) => handleChange(next)}
            />
          )}
        </>
      )}
    </QuestionLayout>
  );
}
