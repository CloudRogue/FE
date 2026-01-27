import type {
  OnboardingSubmitItem,
  OnboardingSubmitPayload,
} from "@/src/features/onboarding/api/onboarding-submit-action";

import type {
  RequiredOnboardingAnswers,
  RequiredOnboardingQuestion,
  RequiredOnboardingQuestionType,
} from "@/src/features/onboarding/model/required-onboarding-types";

const TYPE_MAP: Record<
  RequiredOnboardingQuestionType,
  OnboardingSubmitItem["type"]
> = {
  boolean: "BOOLEAN",
  text_input: "TEXT_INPUT",
  number_input: "NUMBER_INPUT",
  select_single: "SELECT_SINGLE",
  select_multi: "SELECT_MULTI",
};

export function toSubmitPayloadFromRequired(
  draftAnswers: RequiredOnboardingAnswers,
  questions: RequiredOnboardingQuestion[],
): OnboardingSubmitPayload {
  const answers: OnboardingSubmitItem[] = questions.map((q) => {
    const id = q.requiredOnboardingId;
    const type = TYPE_MAP[q.type];

    const hasValue = Object.prototype.hasOwnProperty.call(draftAnswers, id);
    const raw = hasValue ? draftAnswers[id] : undefined;

    if (!hasValue || raw === undefined) {
      return {
        additionalOnboardingId: id,
        type,
        unknown: true,
        value: null,
      };
    }

    return {
      additionalOnboardingId: id,
      type,
      unknown: false,
      value: raw as OnboardingSubmitItem["value"],
    };
  });

  return { answers };
}
