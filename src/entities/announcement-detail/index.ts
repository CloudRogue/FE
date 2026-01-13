// api
export {
  getAnnouncementDetail,
  getAnnouncementSummary,
} from "@/src/entities/announcement-detail/api/queries";

// lib
export { mapAnnouncementToSummary } from "@/src/entities/announcement-detail/lib/announcement.mapper";

// model
export {
  AnnouncementDetailSchema,
  AnnouncementEligibilitySchema,
  AnnouncementStatusSchema,
  EligibilityResultSchema,
  KvDigestItemSchema,
  KvDigestResponseSchema,
  type AnnouncementDetail,
  type AnnouncementEligibility,
  type AnnouncementStatus,
  type EligibilityResult,
  type KvDigestItem,
  type KvDigestResponse,
} from "@/src/entities/announcement-detail/model/announcement.types";

// ui
export { AnnouncementCard } from "@/src/entities/announcement/ui/announcement-card";
export { OverviewRow } from "@/src/entities/announcement-detail/ui/overview-row";
