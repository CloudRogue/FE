import type { z } from "zod";
import type {
  AnnouncementSummarySchema,
  AnnouncementDetailSchema,
  AnnouncementFilterParamsSchema,
  AnnouncementListResponseSchema,
} from "./schemas";

// 목록용 타입
export type Announcement = z.infer<typeof AnnouncementSummarySchema>;

// 상세용 타입
export type AnnouncementDetail = z.infer<typeof AnnouncementDetailSchema>;

// 필터 파라미터 타입
export type AnnouncementFilterParams = z.infer<
  typeof AnnouncementFilterParamsSchema
>;

// 리스트 응답 타입
export type AnnouncementListResponse = z.infer<
  typeof AnnouncementListResponseSchema
>;
