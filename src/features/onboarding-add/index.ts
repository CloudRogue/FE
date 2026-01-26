export { ADDITIONAL_ONBOARDING_QUESTION_TYPES } from "@/src/features/onboarding-add/model/additional-onboarding-types";

export type {
  AdditionalOnboardingQuestionId,
  AdditionalOnboardingQuestion,
  AdditionalOnboardingQuestionType,
  AdditionalOnboardingAnswerValue,
  AdditionalOnboardingDraft,
  AdditionalOnboardingDraftItem,
  AdditionalOnboardingSubmitItem,
  AdditionalOnboardingSubmitRequest,
} from "@/src/features/onboarding-add/model/additional-onboarding-types";

export {
  AdditionalOnboardingQuestionsResponseSchema,
  AdditionalOnboardingSubmitResponseSchema,
  AdditionalOnboardingSubmitRequestSchema,
  AdditionalOnboardingSubmitItemSchema,
  AdditionalOnboardingQuestionApiItemSchema,
  AdditionalOnboardingQuestionTypeSchema,
} from "@/src/features/onboarding-add/model/additional-onboarding-schema";

export { buildAdditionalOnboardingSubmitRequest } from "@/src/features/onboarding-add/model/additional-onboarding-transform";

export { useAdditionalOnboardingStore } from "@/src/features/onboarding-add/model/additional-onboarding-store";

export {
  getAdditionalOnboardingQuestions,
  submitAdditionalOnboardingAnswers,
} from "@/src/features/onboarding-add/api/additional-onboarding-action";

export { default as AdditionalOnboardingShell } from "@/src/features/onboarding-add/ui/additional-onboarding-shell";

export { default as AdditionalOnboardingRenderer } from "@/src/features/onboarding-add/ui/additional-renderer";
