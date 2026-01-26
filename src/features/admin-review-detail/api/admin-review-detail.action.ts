import {
  AdminAdditionalOnboardingResponse,
  AdminAdditionalOnboardingSchema,
  AdminAdditionalOnboardingsRequest,
  AdminAnnouncementRequest,
  AdminAnnouncementRequestSchema,
} from "@/src/entities/admin-review-detail";
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

// (어드민) 추가 온보딩 질문 생성
export async function postAdminAdditionalOnboardings(
  payload: AdminAdditionalOnboardingsRequest,
) {
  return await Api.post<AdminAdditionalOnboardingResponse>(
    `/admin/additional-onboardings`,
    AdminAdditionalOnboardingSchema,
    payload,
  );
}
