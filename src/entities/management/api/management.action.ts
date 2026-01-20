import {
  GetManageAppliedSchema,
  GetManageClosedSchema,
  GetManageDocumentWaitingSchema,
  GetManageFinalWaitingSchema,
} from "@/src/entities/management";
import { Api } from "@/src/shared/api/api";

// (사용자) 신청 관리 - 지원 완료 후 진행 중(APPLYING) 목록 조회
export async function getManageApplied(
  cursor?: number | null,
  size: number = 10,
) {
  return await Api.get(
    `/announcements/application-manage/applied?cursor=${cursor ?? ""}&size=${size}`,
    GetManageAppliedSchema,
  );
}

// (사용자) 신청 관리 - 서류 합격 후 대기 중(DOCUMENT_WAITING) 목록 조회
export async function getManageDocumentWaiting(
  cursor?: number | null,
  size: number = 10,
) {
  return await Api.get(
    `/announcements/application-manage/document-pending?cursor=${cursor ?? ""}&size=${size}`,
    GetManageDocumentWaitingSchema,
  );
}

// (사용자) 신청 관리 - 최종 합격 후 대기 중(FINAL_WAITING) 목록 조회
export async function getManageFinalWaiting(
  cursor?: number | null,
  size: number = 10,
) {
  return await Api.get(
    `/announcements/application-manage/final-pending?cursor=${cursor ?? ""}&size=${size}`,
    GetManageFinalWaitingSchema,
  );
}

// (사용자) 신청 관리 - 발표 완료(CLOSED) 공고 목록 조회
export async function getManageClosed(
  cursor?: number | null,
  size: number = 10,
) {
  return await Api.get(
    `/announcements/application-manage/closed?cursor=${cursor ?? ""}&size=${size}`,
    GetManageClosedSchema,
  );
}
