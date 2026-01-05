import * as z from "zod";

// 공고 상태
export const AnnouncementStatusSchema = z.enum([
  "OPEN",
  "DUE_SOON",
  "UPCOMING",
  "CLOSED",
]);

// Digest 상세 정보
export const AnnouncementDigestSchema = z.object({
  // TODO: 명세서에 구체적 필드 없음
  eligibility: z.record(z.string(), z.any()),
  benefitText: z.string().optional(),
  applyWindowText: z.string().optional(),
  periodText: z.string().optional(),
  howToApplyText: z.string().optional(),
  requirements: z.array(z.string()),
});

// 메인 공고 상세
export const AnnouncementDetailSchema = z.object({
  announcementId: z.number().int(),
  publisher: z.string(),
  title: z.string(),
  startDate: z.string(), // ISO Date string
  endDate: z.string(), // ISO Date string
  publishedAt: z.string(), // ISO Date string
  status: AnnouncementStatusSchema,
  dDay: z.number().nullable(),
  rentGtn: z.number().nullable(),
  enty: z.number().nullable(),
  prtpay: z.number().nullable(),
  surlus: z.number().nullable(),
  mtRntchrg: z.number().nullable(),
  fullAdres: z.string().nullable(),
  rnCodeNm: z.string().nullable(),
  refrnLegaldongNm: z.string().nullable(),
  url: z.url().nullable(),
  digest: AnnouncementDigestSchema,
  originalUrl: z.url(),
  externalApplyUrl: z.url(),
  isScrapped: z.boolean().nullable(),
});

export type AnnouncementDetail = z.infer<typeof AnnouncementDetailSchema>;
export type AnnouncementStatus = z.infer<typeof AnnouncementStatusSchema>;

// 자격 진단
export const EligibilityResultSchema = z.object({
  eligible: z.boolean(),
  rank: z.string().nullable(),
  checks: z.array(
    z.object({
      passed: z.boolean(),
      expected: z.string().nullable().optional(),
      actual: z.string().nullable().optional(),
      message: z.string(),
    }),
  ),
});

export type EligibilityResult = z.infer<typeof EligibilityResultSchema>;
