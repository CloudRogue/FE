import { z } from "zod";

export const OnboardingAddQuestionSchema = z.discriminatedUnion("type", [
  z.object({
    id: z.string(),
    title: z.string(),
    description: z.string().optional(),
    info: z.string().nullable().optional(),
    required: z.boolean().optional(),

    type: z.literal("BOOLEAN"),
    type_data: z
      .object({
        trueLabel: z.string().optional(),
        falseLabel: z.string().optional(),
      })
      .optional(),
  }),

  z.object({
    id: z.string(),
    title: z.string(),
    description: z.string().optional(),
    info: z.string().nullable().optional(),
    required: z.boolean().optional(),

    type: z.literal("INPUT"),
    type_data: z.object({
      inputType: z.enum(["text", "number", "date"]),
      placeholder: z.string().optional(),
    }),
  }),

  z.object({
    id: z.string(),
    title: z.string(),
    description: z.string().optional(),
    info: z.string().nullable().optional(),
    required: z.boolean().optional(),

    type: z.literal("SELECT"),
    type_data: z.object({
      options: z.array(
        z.object({
          label: z.string(),
          value: z.string(),
        }),
      ),
    }),
  }),
]);

export type OnboardingAddQuestion = z.infer<typeof OnboardingAddQuestionSchema>;

export type OnboardingAddAnswers = Record<string, boolean | string | number>;
