import {
  AdminAdditionalOnboardingSchema,
  AdminAnnouncementSchema,
} from "@/src/features/admin-review-detail";
import { Api } from "@/src/shared/api/api";

//  (어드민) 공고 AI PDF 요약/추출 결과 조회
export async function getAdminAnnouncement(announcementId: string) {
  return await Api.get(
    `/admin/announcements/${announcementId}`,
    AdminAnnouncementSchema,
  );
}

// (어드민) 추가 온보딩 질문 목록 조회
export async function getAdminAdditionalOnboardings() {
  return await Api.get(
    `/admin/additional-onboardings`,
    AdminAdditionalOnboardingSchema,
  );
}
