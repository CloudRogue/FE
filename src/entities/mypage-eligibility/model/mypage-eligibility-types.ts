import type { z } from "zod";

import {
  MyPageEligibilityAnswerTypeSchema,
  MyPageEligibilityAnswerSchema,
  MyPageEligibilityResponseSchema,
} from "@/src/entities/mypage-eligibility/model/mypage-eligibility-schema";

export type MyPageEligibilityAnswerType = z.infer<
  typeof MyPageEligibilityAnswerTypeSchema
>;

export type MyPageEligibilityAnswer = z.infer<
  typeof MyPageEligibilityAnswerSchema
>;

export type MyPageEligibilityResponse = z.infer<
  typeof MyPageEligibilityResponseSchema
>;

export type MyPageEligibilitySectionKey =
  | "requiredOnboardingAnswers"
  | "additionalOnboardingAnswers";
