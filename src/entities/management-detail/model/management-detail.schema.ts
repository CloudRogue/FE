import { z } from "zod";

// 서류 범위 Enum 정의
export const DocumentScopeSchema = z.enum(["COMMON", "TARGET_ONLY"]);

// 서류 정보 객체 스키마
export const AnnouncementDocumentSchema = z.object({
  id: z.number().int(), // 문서 식별자
  name: z.string(), // 서류명
  scope: DocumentScopeSchema, // 서류 범위
});

export const AnnouncementDetailManagementSchema = z.object({
  announcementId: z.number().int(), // 공고 PK
  title: z.string(), // 공고명
  dDay: z.number(),
  publisher: z.string(),
  housingType: z.string().nullable(),
  currentStatus: z.enum(["APPLYING", "DOCUMENT_PENDING", "FINAL_PENDING"]),
  endDate: z.string(), // 공고 접수 마감일
  applyUrl: z.string(), // 공고 지원하기 링크

  // 1단계: 공고 접수 정보
  apply: z.object({
    date: z.string().nullable(), // 공고 접수 마감일
    documents: z.array(AnnouncementDocumentSchema), // 공고 접수 단계 필요 서류
  }),

  // 2단계: 서류 결과 정보
  docResult: z.object({
    date: z.string().nullable(), // 서류대상자 발표일
    documents: z.array(AnnouncementDocumentSchema), // 서류대상자 발표 단계 필요 서류
  }),

  // 3단계: 최종 결과 정보
  finalResult: z.object({
    date: z.string().nullable(), // 당첨자 발표일
    summary: z.string().nullable(), // 최종 단계 요약(표시용 한 줄)
  }),
});
