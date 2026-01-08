// 공고 상세 API
import {
  AnnouncementDetail,
  AnnouncementDetailSchema,
  KvDigestResponseSchema,
} from "@/src/entities/announcement-detail";
import { Api } from "@/src/shared/api/api";

export async function getAnnouncementDetail(
  announcementId: AnnouncementDetail["announcementId"],
) {
  return await Api.get(
    `/announcements/${announcementId}`,
    AnnouncementDetailSchema,
  );
}

export async function getAnnouncementSummary(
  announcementId: AnnouncementDetail["announcementId"],
) {
  return await Api.get(
    `/announcements/${announcementId}/summary`,
    KvDigestResponseSchema,
  );
}
