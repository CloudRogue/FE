// 공고 상세 API
import {
  AnnouncementDetailSchema,
  AnnouncementEligibilitySchema,
  KvDigestResponseSchema,
} from "@/src/entities/announcement-detail";
import { Api } from "@/src/shared/api/api";

// 공고 상세
export async function getAnnouncementDetail(announcementId: string) {
  return await Api.get(
    `/announcements/${announcementId}`,
    AnnouncementDetailSchema,
  );
}

// 공고 요약
export async function getAnnouncementSummary(announcementId: string) {
  return await Api.get(
    `/announcements/${announcementId}/summary`,
    KvDigestResponseSchema,
  );
}

// 공고 지원 조건
export async function getAnnouncementEligibility(announcementId: string) {
  return await Api.get(
    `/announcements/${announcementId}/eligibility`,
    AnnouncementEligibilitySchema,
  );
}
