// 공고 상세 API
import {
  AnnouncementDetailSchema,
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
