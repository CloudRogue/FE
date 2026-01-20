import {
  AnnouncementDetailSchema,
  AnnouncementEligibilitySchema,
  AnnouncementOverviewResponseSchema,
  AnnouncementStatusSchema,
  AnnouncementSummaryResponseSchema,
  EligibilityResultSchema,
} from "@/src/entities/announcement-detail/";
import * as z from "zod";

export type AnnouncementEligibility = z.infer<
  typeof AnnouncementEligibilitySchema
>;

export type AnnouncementDetail = z.infer<typeof AnnouncementDetailSchema>;
export type AnnouncementStatus = z.infer<typeof AnnouncementStatusSchema>;

export type EligibilityResult = z.infer<typeof EligibilityResultSchema>;

export type AnnouncementSummaryResponse = z.infer<
  typeof AnnouncementSummaryResponseSchema
>;

export type AnnouncementOverviewResponse = z.infer<
  typeof AnnouncementOverviewResponseSchema
>;
