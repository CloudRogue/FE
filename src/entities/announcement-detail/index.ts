// api
export {
  getAnnouncementDetail,
  getAnnouncementOverview,
  getAnnouncementSummary,
} from "@/src/entities/announcement-detail/api/queries";

// lib
export { mapAnnouncementToSummary } from "@/src/entities/announcement-detail/lib/announcement.mapper";

// model
export {
  AnnouncementDetailSchema,
  AnnouncementEligibilitySchema,
  AnnouncementOverviewResponseSchema,
  AnnouncementStatusSchema,
  AnnouncementSummaryResponseSchema,
  EligibilityResultSchema,
  type AnnouncementDetail,
  type AnnouncementEligibility,
  type AnnouncementOverviewResponse,
  type AnnouncementStatus,
  type AnnouncementSummaryResponse,
  type EligibilityResult,
} from "@/src/entities/announcement-detail/model/announcement.types";

// ui
export { DetailRow } from "@/src/entities/announcement-detail/ui/detail-row";
export { RegionRow } from "@/src/entities/announcement-detail/ui/region-row";
