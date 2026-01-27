import * as z from "zod";

// 공고 상태
export const AnnouncementStatusSchema = z.enum([
  "OPEN",
  "DUE_SOON",
  "UPCOMING",
  "CLOSED",
]);

//  공고 지원 조건
export const AnnouncementEligibilitySchema = z
  .object({
    announcementId: z.number().int(), // 공고 PK
    eligibility: z
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
      .nullable(),
  })
  .nullable();

// 메인 공고 상세
export const AnnouncementDetailSchema = z.object({
  announcementId: z.number().int(), // 공고 PK
  publisher: z.string(), // 발행처(기관/지자체 등)
  title: z.string(), // 공고명
  housingType: z.string().nullable(), // 주택 유형(앱 뱃지/필터에 사용)
  supplyType: z.string(), // 공급 유형
  startDate: z.string(), // 공고 시작일
  endDate: z.string(), // 공고 마감일
  documentPublishedAt: z.string().nullable().optional(), // 서류 발표일
  finalPublishedAt: z.string().nullable().optional(), // 최종 발표일(당첨자 발표일)
  status: AnnouncementStatusSchema, // 공고 접수 상태
  dDay: z.int().nullable(), // 마감까지 남은 일수
  rentGtn: z.number().nullable(), // 최소임대보증금
  enty: z.number().nullable(), // 최소 계약금
  prtpay: z.number().nullable(), // 최소 중도금
  surlus: z.number().nullable(), // 최소 잔금
  mtRntchrg: z.number().nullable(), // 최소 월 임대료
  fullAddress: z.string().nullable(), // 전체주소
  refrnLegaldongNm: z.string().nullable(), // 참조_법정동명(주소가 지번 주소일 때 표시)
  url: z.string().nullable(), // 모집 공고 URL
  isScrapped: z.boolean().nullable(), // 로그인 사용자 기준 찜 여부
});

// 자격 진단
export const EligibilityResultSchema = z.object({
  supportStatus: z.enum(["ELIGIBLE", "INELIGIBLE", "PENDING"]), // 지원 상태
  diagnosedAt: z.string(), // 진단 최신 일시(서버 기준)
  predictedRank: z.number().int(), // 예상 순위
  predictedBonusPoints: z.number().int(), // 예상 가산점 integer >= 0
  // 가변 판정 결과 리스트
  trace: z.array(
    z.object({
      key: z.string(),
      passed: z.boolean(),
      message: z.string(),
    }),
  ),
});

// 공고 요약
export const AnnouncementSummaryResponseSchema = z.object({
  announcementId: z.number(),
  summary: z.string(),
});

// 공고 개요
export const AnnouncementOverviewResponseSchema = z.object({
  announcementId: z.number(),
  content: z.string(),
  target: z.string(),
  regions: z.union([z.array(z.string()), z.string()]),
  applyMethod: z.string(),
});
