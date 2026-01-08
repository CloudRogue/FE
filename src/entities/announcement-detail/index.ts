// api
export { getAnnouncementDetail } from "@/src/entities/announcement-detail/api/queries";

// lib
export { mapAnnouncementToSummary } from "@/src/entities/announcement-detail/lib/announcement.mapper";

// model
export {
  AnnouncementDetailSchema,
  AnnouncementEligibilitySchema,
  AnnouncementStatusSchema,
  EligibilityResultSchema,
  type AnnouncementDetail,
  type AnnouncementStatus,
  type EligibilityResult,
} from "@/src/entities/announcement-detail/model/announcement.types";

// ui
export { default as AnnouncementCard } from "@/src/entities/announcement-detail/ui/announcement-card";
export { OverviewRow } from "@/src/entities/announcement-detail/ui/overview-row";
