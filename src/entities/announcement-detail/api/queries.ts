// 공고 상세 API
import { AnnouncementDetailSchema } from "@/src/entities/announcement-detail";
import { Api } from "@/src/shared/api/api";

export async function getAnnouncementDetail(announcementId: string) {
  return await Api.get(
    `/announcements/${announcementId}`,
    AnnouncementDetailSchema,
  );
}
