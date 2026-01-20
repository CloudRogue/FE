import { z } from "zod";

// 기본 프로필 스키마
export const profileBasicSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  onboardingCompleted: z.boolean(),
});

// 프로필 상세 항목(질문-답변) 스키마
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

// 전체 요청 바디 스키마 (필요 시)
export const profileUpdateRequestSchema = z.object({
  answers: z.array(profileUpdateAnswerSchema),
});
// 상세 프로필 전체 스키마
export const profileDetailSchema = z.object({
  requiredOnboardingAnswers: z.array(profileAnswerSchema),
  additionalOnboardingAnswers: z.array(profileAnswerSchema),
});
