import { z } from "zod";

import { REQUIRED_ONBOARDING_QUESTION_TYPES } from "@/src/features/onboarding/model/required-onboarding.types";

export const RequiredOnboardingQuestionTypeSchema = z.enum(
  REQUIRED_ONBOARDING_QUESTION_TYPES,
);

export const RequiredOnboardingQuestionApiItemSchema = z.object({
  requiredOnboardingId: z.number(),
  title: z.string(),
  description: z.string(),
  question: z.string(),
  type: RequiredOnboardingQuestionTypeSchema,
  // select_* 전용. 서버가 null을 주는 케이스가 있어도 방어.
  options: z.array(z.string()).nonempty().nullable().optional(),
});

export const RequiredOnboardingQuestionsResponseSchema = z.object({
  data: z.array(RequiredOnboardingQuestionApiItemSchema),
});

export const RegionCitySchema = z.object({
  cityCode: z.string(),
  cityName: z.string(),
});

export const RegionCitiesResponseSchema = z.object({
  data: z.array(RegionCitySchema),
});

export const RegionSigunguSchema = z.object({
  sigunguCode: z.string(),
  sigunguName: z.string(),
});

export const RegionSigunguResponseSchema = z.object({
  data: z.array(RegionSigunguSchema),
});
