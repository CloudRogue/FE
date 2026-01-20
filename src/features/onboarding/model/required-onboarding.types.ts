export const REQUIRED_ONBOARDING_QUESTION_TYPES = [
  "text_input",
  "number_input",
  "boolean",
  "select_single",
  "select_multi",
] as const;

export type RequiredOnboardingQuestionType =
  (typeof REQUIRED_ONBOARDING_QUESTION_TYPES)[number];

export type RequiredOnboardingQuestionId = number;

export type RequiredOnboardingRegionAnswerValue = {
  cityCode: string;
  sigunguCode: string;
};

export type RequiredOnboardingAnswerValue =
  | string // text_input, select_single
  | number // number_input
  | boolean // boolean
  | string[] // select_multi
  | RequiredOnboardingRegionAnswerValue; // region

export type RequiredOnboardingAnswers = Record<
  RequiredOnboardingQuestionId,
  RequiredOnboardingAnswerValue
>;

export type RequiredOnboardingQuestion = {
  requiredOnboardingId: RequiredOnboardingQuestionId;
  title: string;
  description: string;
  question: string;
  type: RequiredOnboardingQuestionType;
  options?: string[] | null;
};

export type RegionCity = {
  cityCode: string;
  cityName: string;
};

export type RegionSigungu = {
  sigunguCode: string;
  sigunguName: string;
};
