import {
  AdminAdditionalOnboardingSchema,
  AdminAdditionalOnboardingsRequestSchema,
  AdminAnnouncementRequestSchema,
  AdminAnnouncementSchema,
} from "@/src/entities/admin-review-detail";
import { z } from "zod";

export type AdminAnnouncementResponse = z.infer<typeof AdminAnnouncementSchema>;
export type AdminAdditionalOnboardingResponse = z.infer<
  typeof AdminAdditionalOnboardingSchema
>;
export type AdminAnnouncementRequest = z.infer<
  typeof AdminAnnouncementRequestSchema
>;
export type AdminAdditionalOnboardingsRequest = z.infer<
  typeof AdminAdditionalOnboardingsRequestSchema
>;
