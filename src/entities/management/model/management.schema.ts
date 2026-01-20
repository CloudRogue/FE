import { z } from "zod";

export const BaseManageSchema = z.object({
  announcementId: z.number().int(),
  title: z.string(),
  dDay: z.number().int(),
  publisher: z.string(),
  currentStatus: z.enum([
    "APPLYING",
    "DOCUMENT_WAITING",
    "FINAL_WAITING",
    "CLOSED",
  ]),
});

// (사용자) 신청 관리 - 지원 완료 후 진행 중(APPLYING) 목록 조회
export const ManageAppliedSchema = z.object({
  announcementId: z.number().int(),
  title: z.string(),
  dDay: z.number().int(),
  publisher: z.string(),
  housingType: z.string(), // 주택 유형(표시용)
  currentStatus: z.literal("APPLYING"),
  endDate: z.string(), // 공고 접수 마감 일시
});

// (사용자) 신청 관리 - 서류 합격 후 대기 중(DOCUMENT_WAITING) 목록 조회
export const ManageDocumentWaitingSchema = BaseManageSchema.extend({
  housingType: z.string(),
  currentStatus: z.literal("DOCUMENT_WAITING"),
  documentPublishedAt: z.string(), // 서류대상자 발표 일시
});

// (사용자) 신청 관리 - 최종 합격 후 대기 중(FINAL_WAITING) 목록 조회
export const ManageFinalWaitingSchema = BaseManageSchema.extend({
  housingType: z.string(),
  currentStatus: z.literal("FINAL_WAITING"),
  finalPublishedAt: z.string(), // "최종 발표 일시"
});

// (사용자) 신청 관리 - 발표 완료(CLOSED) 공고 목록 조회
export const ManageClosedSchema = BaseManageSchema.extend({
  noticeType: z.string(),
  currentStatus: z.literal("CLOSED"),
  finalPublishedAt: z.string(),
});

// Response =====================
const CursorMetaSchema = z.object({
  nextCursor: z.number().int().nullable(),
  hasNext: z.boolean(),
  size: z.number().int(),
});

export const ManagementSummarySchema = z.object({
  applyingCount: z.number().int().nonnegative(), // 지원 완료 수
  documentWaitingCount: z.number().int().nonnegative(), // 서류 대기 수
  finalWaitingCount: z.number().int().nonnegative(), // 최종 대기 수
});

const createManageListSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.object({
    summary: ManagementSummarySchema,
    data: z.array(dataSchema),
    meta: CursorMetaSchema,
  });

// 지원 완료 목록 조회
export const GetManageAppliedSchema =
  createManageListSchema(ManageAppliedSchema);
// 서류 대기 목록 조회
export const GetManageDocumentWaitingSchema = createManageListSchema(
  ManageDocumentWaitingSchema,
);
// 최종 대기 목록 조회
export const GetManageFinalWaitingSchema = createManageListSchema(
  ManageFinalWaitingSchema,
);
// 발표 완료 목록 조회
export const GetManageClosedSchema = createManageListSchema(ManageClosedSchema);
