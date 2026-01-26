// 공고 상세 API
import {
  AnnouncementDetailSchema,
  AnnouncementOverviewResponseSchema,
  AnnouncementSummaryResponseSchema,
} from "@/src/entities/announcement-detail";
import { Api } from "@/src/shared/api/api";

// 공고 상세
export async function getAnnouncementDetail(announcementId: string) {
  return await Api.get(
    `/announcements/${announcementId}/detail`,
    AnnouncementDetailSchema,
  );
}

// 공고 개요
export async function getAnnouncementOverview(announcementId: string) {
  return await Api.get(
    `/announcements/${announcementId}/detail/overview`,
    AnnouncementOverviewResponseSchema,
  );
}

// 공고 요약
export async function getAnnouncementSummary(announcementId: string) {
  return await Api.get(
    `/announcements/${announcementId}/detail/summary`,
    AnnouncementSummaryResponseSchema,
  );
}
