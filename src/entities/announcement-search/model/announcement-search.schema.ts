import { z } from "zod";

export const AnnouncementSearchSchema = z.object({
  announcementId: z.number().int(), // integer <int64>
  title: z.string(), // 공고명
  housingType: z.string().nullable(), // 주택 유형 (string or null)
  publishedAt: z.string().nullable(), // 당첨자 발표일 (date string or null)
  publisher: z.string(), // 발행처
  regionName: z.string().nullable(), // 지역 (string or null)
  startDate: z.string().nullable(), // 모집 시작일 (date string or null)
  endDate: z.string().nullable(), // 모집 마감일 (date string or null)
});

export const AnnouncementSearchResponseSchema = z.object({
  data: z.array(AnnouncementSearchSchema).max(50), // 검색 결과
});

export const AnnouncementSearchRequestSchema = z.object({
  title: z.string().min(3, "최소 3글자 이상 입력해 주세요."),
});
