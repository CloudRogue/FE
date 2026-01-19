import { z } from "zod";

/**
 * 공고 목록 조회 시 사용되는 요약 스키마
 */
export const AnnouncementSummarySchema = z.object({
  announcementId: z.number().int(),
  title: z.string(),
  housingType: z.string().optional(),
  startDate: z.string(),
  endDate: z.string(),
  publishedAt: z.string(),
  publisher: z.string(),
  status: z.enum(["OPEN", "DUE_SOON", "UPCOMING", "CLOSED"]),
});

/**
 * 공고 상세 조회 시 사용되는 상세 스키마
 */
export const AnnouncementDetailSchema = AnnouncementSummarySchema.extend({
  supplyType: z.string(),
  documentPublishedAt: z.string().nullable(),
  finalPublishedAt: z.string().nullable(),
  dDay: z.number().int().nullable(),
  rentGtn: z.number().nullable(),
  enty: z.number().nullable(),
  prtpay: z.number().nullable(),
  surlus: z.number().nullable(),
  mtRntchrg: z.number().nullable(),
  fullAdres: z.string().nullable(),
  refrnLegaldongNm: z.string().nullable(),
  url: z.string().url().nullable(),
  isScrapped: z.boolean().nullable(),
});

/**
 * 커서 기반 페이지네이션 메타 정보
 */
export const CursorMetaSchema = z.object({
  limit: z.number().int(),
  hasNext: z.boolean(),
  nextCursor: z.string().nullable(),
});

/**
 * 변경된 필터 파라미터 스키마
 */
export const AnnouncementFilterParamsSchema = z.object({
  publisher: z.string().optional(),
  housingType: z.string().optional(),
  regionName: z.string().optional(),
  sort: z.enum(["RELEVANCE", "LATEST", "DEADLINE"]).optional(),
  cursor: z.string().nullable().optional(),
  limit: z.number().int().min(1).max(100).optional(),
});

export const AnnouncementListResponseSchema = z.object({
  data: z.array(AnnouncementSummarySchema),
  meta: CursorMetaSchema,
});
