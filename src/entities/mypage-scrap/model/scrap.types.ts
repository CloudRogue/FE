import { z } from "zod";

// 공고 제공처
export const AnnouncementProviderSchema = z.enum(["LH", "SH"]);

// 개별 공고 아이템
export const AnnouncementItemSchema = z.object({
  announcementId: z.number().int(), // 공고 PK
  provider: AnnouncementProviderSchema, // LH | SH
  title: z.string(), // 공고명
  endDate: z.string(), // 마감일 (YYYY-MM-DD)
  publisher: z.string(), // 발행처
});

// 공고 리스트 응답
export const AnnouncementListResponseSchema = z.object({
  items: z.array(AnnouncementItemSchema), // 찜한 공고 목록
  page: z.number().int().min(0), // 현재 페이지 (0부터 시작)
  size: z.number().int().min(1).max(100), // 페이지 크기 (1~100)
  totalElements: z.number().int().min(0), // 전체 항목 수
  totalPages: z.number().int().min(0), // 전체 페이지 수
});

export type AnnouncementProvider = z.infer<typeof AnnouncementProviderSchema>;
export type AnnouncementItem = z.infer<typeof AnnouncementItemSchema>;
export type AnnouncementListResponse = z.infer<
  typeof AnnouncementListResponseSchema
>;

// 공고 리스트 요청
export const AnnouncementListParamsSchema = z.object({
  page: z.number().int().min(0).default(0),
  size: z.number().int().min(1).max(100).default(20),
});

export type AnnouncementListParams = z.input<
  typeof AnnouncementListParamsSchema
>;
