import { z } from "zod";

export const MyPageEligibilityAnswerTypeSchema = z.enum([
  "BOOLEAN",
  "TEXT_INPUT",
  "NUMBER_INPUT",
  "SELECT_SINGLE",
  "SELECT_MULTI",
  "DATE",
]);

const DateStringSchema = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
  message: "DATE 타입 value는 YYYY-MM-DD 형식이어야 합니다.",
});

const NullableOptionsSchema = z.array(z.string()).nullable().optional();

const BaseAnswerSchema = z.object({
  id: z.number().int(),
  title: z.string(),
  type: MyPageEligibilityAnswerTypeSchema,
});

const BooleanAnswerSchema = BaseAnswerSchema.extend({
  type: z.literal("BOOLEAN"),
  options: NullableOptionsSchema,
  value: z.boolean(),
});

const TextInputAnswerSchema = BaseAnswerSchema.extend({
  type: z.literal("TEXT_INPUT"),
  options: z.null(),
  value: z.string(),
});

const NumberInputAnswerSchema = BaseAnswerSchema.extend({
  type: z.literal("NUMBER_INPUT"),
  options: z.null(),
  value: z.number(),
});

const DateAnswerSchema = BaseAnswerSchema.extend({
  type: z.literal("DATE"),
  options: z.null(),
  value: DateStringSchema,
});

const SelectSingleAnswerSchema = BaseAnswerSchema.extend({
  type: z.literal("SELECT_SINGLE"),
  options: z.array(z.string()),
  value: z.string(),
});

const SelectMultiAnswerSchema = BaseAnswerSchema.extend({
  type: z.literal("SELECT_MULTI"),
  options: z.array(z.string()),
  value: z.array(z.string()),
});

export const MyPageEligibilityAnswerSchema = z.union([
  BooleanAnswerSchema,
  TextInputAnswerSchema,
  NumberInputAnswerSchema,
  DateAnswerSchema,
  SelectSingleAnswerSchema,
  SelectMultiAnswerSchema,
]);

export const MyPageEligibilityResponseSchema = z.object({
  requiredOnboardingAnswers: z.array(MyPageEligibilityAnswerSchema),
  additionalOnboardingAnswers: z.array(MyPageEligibilityAnswerSchema),
});
