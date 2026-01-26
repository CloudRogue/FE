import { z } from "zod";

export const UpsertAnswerTypeSchema = z.enum([
  "BOOLEAN",
  "TEXT_INPUT",
  "NUMBER_INPUT",
  "SELECT_SINGLE",
  "SELECT_MULTI",
  "DATE",
]);

export const UpsertAnswerSchema = z.object({
  additionalOnboardingId: z.number().int(),
  type: UpsertAnswerTypeSchema,
  unknown: z.boolean(),
  value: z.union([
    z.boolean(),
    z.string(),
    z.number(),
    z.array(z.string()),
    z.null(),
  ]),
});

export const MyPageEligibilityUpsertRequestSchema = z.object({
  answers: z.array(UpsertAnswerSchema).nonempty(),
});
