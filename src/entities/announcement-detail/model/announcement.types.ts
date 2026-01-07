import * as z from "zod";

// 공고 상태
export const AnnouncementStatusSchema = z.enum([
  "OPEN",
  "DUE_SOON",
  "UPCOMING",
  "CLOSED",
]);

// eligibility
export const AnnouncementEligibilitySchema = z
  .object({
    // 나이 요건
    age: z
      .object({
        min: z.number().int().nullable(),
        max: z.number().int().nullable(),
        displayText: z.string(),
      })
      .nullable(),
    // 거주 지역 요건
    region: z
      .object({
        ruleType: z.enum(["INCLUDE", "EXCLUDE"]), // codes에 포함된 지역만 허용/제외
        codes: z.array(z.string()), // 대상 지역 코드 목록
        displayText: z.string(),
      })
      .nullable(),
    // 소득 요건
    income: z
      .object({
        metric: z.enum([
          "MEDIAN_INCOME_PERCENT", // 중위소득
          "INCOME_DECILE", // 소득 분위
          "HEALTH_INSURANCE_PREMIUM", // 건강보험료
        ]),
        operator: z.enum(["LTE", "LT", "GTE", "GT", "EQ", "BETWEEN"]),
        value: z.number().nullable(), // 기준값(metric에 따라 단위 상이)
        value2: z.number().nullable(), // operator=BETWEEN일 때 상한값
        householdSizeMin: z.number().int().nullable(), // 최소 가구운 수
        householdSizeMax: z.number().int().nullable(), // 최대 가구운 수
        displayText: z.string(),
      })
      .nullable(),
    //청약통장 요건
    subscriptionAccount: z
      .object({
        MonthsMin: z.number().int().nullable(), // 청약통장 가입기간 최소(개월) - 0이상
        Min: z.number().int().nullable(), // 청약통장 납입 횟수 최소 - 0이상
        displayText: z.string(), // 화면 표기용(원문 요약)
      })
      .nullable(),
    notes: z.string().nullable(), // 예외/특기사항
  })
  .nullable();

// 메인 공고 상세
export const AnnouncementDetailSchema = z.object({
  announcementId: z.number().int(), // 공고 PK
  publisher: z.string(), // 발행처(기관/지자체 등)
  title: z.string(), // 공고명
  housingType: z.string(), // 주택 유형(앱 뱃지/필터에 사용)
  startDate: z.string(), // 공고 시작일
  endDate: z.string(), // 공고 마감일
  publishedAt: z.string(), // 발표일(게시일)
  status: AnnouncementStatusSchema, // 공고 접수 상태
  dDay: z.number().nullable(), // 마감까지 남은 일수
  rentGtn: z.number().nullable(), // 최소임대보증금
  enty: z.number().nullable(), // 최소 계약금
  prtpay: z.number().nullable(), // 최소 중도금
  surlus: z.number().nullable(), // 최소 잔금
  mtRntchrg: z.number().nullable(), // 최소 월 임대료
  fullAdres: z.string().nullable(), // 전체주소
  rnCodeNm: z.string().nullable(), // 도로명 주소(주소가 도로명 주소일 때 표시)
  refrnLegaldongNm: z.string().nullable(), // 참조_법정동명(주소가 지번 주소일 때 표시)
  url: z.string().url().nullable(), // 모집 공고 URL
  eligibility: AnnouncementEligibilitySchema, // 자격 요건
  originalUrl: z.string().url(), // 원문 공고 URL
  externalApplyUrl: z.string().url(), // 신청하러가기 외부 링크
  isScrapped: z.boolean().nullable(), // 로그인 사용자 기준 찜 여부
});

export type AnnouncementDetail = z.infer<typeof AnnouncementDetailSchema>;
export type AnnouncementStatus = z.infer<typeof AnnouncementStatusSchema>;

// 자격 진단
export const EligibilityResultSchema = z.object({
  eligible: z.boolean(),
  rank: z.enum(["1순위", "2순위", "3순위"]).nullable(),
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
