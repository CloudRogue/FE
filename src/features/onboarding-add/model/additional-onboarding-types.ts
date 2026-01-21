export const ADDITIONAL_ONBOARDING_QUESTION_TYPES = [
  "text_input",
  "number_input",
  "boolean",
  "select_single",
  "select_multi",
] as const;

export type AdditionalOnboardingQuestionType =
  (typeof ADDITIONAL_ONBOARDING_QUESTION_TYPES)[number];

export type AdditionalOnboardingQuestionId = number;

export type AdditionalOnboardingAnswerValue =
  | string // text_input, select_single
  | number // number_input
  | boolean // boolean
  | string[]; // select_multi

export type AdditionalOnboardingQuestion = {
  additionalOnboardingId: AdditionalOnboardingQuestionId;
  title: string;
  description: string;
  question: string;
  type: AdditionalOnboardingQuestionType;

  // 명세: required + null 가능
  options: string[] | null;
};

export type AdditionalOnboardingSubmitItem = {
  additionalOnboardingId: AdditionalOnboardingQuestionId;
  type: AdditionalOnboardingQuestionType;
  unknown: boolean;
  value: AdditionalOnboardingAnswerValue | null;
};

export type AdditionalOnboardingSubmitRequest = {
  answers: AdditionalOnboardingSubmitItem[];
};

export type AdditionalOnboardingDraftItem = {
  type: AdditionalOnboardingQuestionType;
  unknown: boolean;
  value: AdditionalOnboardingAnswerValue | null;
};

export type AdditionalOnboardingDraft = Record<
  AdditionalOnboardingQuestionId,
  AdditionalOnboardingDraftItem
>;
