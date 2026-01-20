import {
  AdminAnnouncementRequest,
  AdminAnnouncementRequestSchema,
} from "@/src/features/admin-review-detail";
import { Api } from "@/src/shared/api/api";

//  (어드민) 공고 AI PDF 요약/추출 결과 조회
export async function postAdminAnnouncement(
  announcementId: string,
  payload: AdminAnnouncementRequest,
) {
  return await Api.post(
    `/admin/announcements/${announcementId}`,
    AdminAnnouncementRequestSchema,
    payload,
  );
}
