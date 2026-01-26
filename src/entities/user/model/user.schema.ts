import { z } from "zod";

/**
 * 프로필 기본 정보 스키마
 */
export const profileBasicSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  onboardingCompleted: z.boolean(),
});

/**
 * 개별 온보딩 답변 항목 스키마
 */
export const profileAnswerSchema = z.object({
  id: z.number().int(),
  title: z.string(),
  type: z.enum([
    "BOOLEAN",
    "TEXT_INPUT",
    "NUMBER_INPUT",
    "SELECT_SINGLE",
    "SELECT_MULTI",
    "DATE",
  ]),
  options: z.array(z.string()).nullable(),
  value: z
    .union([z.boolean(), z.string(), z.number(), z.array(z.string())])
    .nullable(),
});

/**
 * 맞춤 프로필 상세 조회 스키마
 */
export const profileDetailSchema = z.object({
  requiredOnboardingAnswers: z.array(profileAnswerSchema),
  additionalOnboardingAnswers: z.array(profileAnswerSchema),
});

/**
 * 프로필 상세 수정 답변 스키마
 */
export const profileUpdateAnswerSchema = z.object({
  additionalOnboardingId: z.number().int(),
  type: z.enum([
    "BOOLEAN",
    "TEXT_INPUT",
    "NUMBER_INPUT",
    "SELECT_SINGLE",
    "SELECT_MULTI",
    "DATE",
  ]),
  unknown: z.boolean(),
  value: z
    .union([z.boolean(), z.string(), z.number(), z.array(z.string())])
    .nullable(),
});
