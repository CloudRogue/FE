import { z } from "zod";

import { ADDITIONAL_ONBOARDING_QUESTION_TYPES } from "@/src/features/onboarding-add";

export const AdditionalOnboardingQuestionTypeSchema = z.enum(
  ADDITIONAL_ONBOARDING_QUESTION_TYPES,
);

export const AdditionalOnboardingQuestionApiItemSchema = z.object({
  additionalOnboardingId: z.number(),
  title: z.string(),
  description: z.string(),
  question: z.string(),
  type: AdditionalOnboardingQuestionTypeSchema,
  options: z.array(z.string()).min(1).nullable(),
});

export const AdditionalOnboardingQuestionsResponseSchema = z.object({
  data: z.array(AdditionalOnboardingQuestionApiItemSchema),
});

export const AdditionalOnboardingSubmitItemSchema = z.object({
  additionalOnboardingId: z.number(),
  type: AdditionalOnboardingQuestionTypeSchema,
  unknown: z.boolean(),
  value: z.union([
    z.boolean(),
    z.string(),
    z.number(),
    z.array(z.string()),
    z.null(),
  ]),
});

export const AdditionalOnboardingSubmitRequestSchema = z.object({
  answers: z.array(AdditionalOnboardingSubmitItemSchema).nonempty(),
});

export const AdditionalOnboardingSubmitResponseSchema = z.unknown().optional();
