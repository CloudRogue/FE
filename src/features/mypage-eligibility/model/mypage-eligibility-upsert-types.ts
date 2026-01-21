import type { z } from "zod";

import {
  UpsertAnswerSchema,
  UpsertAnswerTypeSchema,
  MyPageEligibilityUpsertRequestSchema,
} from "@/src/features/mypage-eligibility";

export type UpsertAnswerType = z.infer<typeof UpsertAnswerTypeSchema>;
export type UpsertAnswer = z.infer<typeof UpsertAnswerSchema>;
export type MyPageEligibilityUpsertRequest = z.infer<
  typeof MyPageEligibilityUpsertRequestSchema
>;
