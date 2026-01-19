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
export { OverviewRow } from "@/src/entities/announcement-detail/ui/overview-row";
export { RegionOverviewRow } from "@/src/entities/announcement-detail/ui/region-overview-row";
export { AnnouncementCard } from "@/src/entities/announcement/ui/announcement-card";
