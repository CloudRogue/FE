import { z } from "zod";

// (어드민) 공고 AI PDF 요약/추출 결과 조회
export const AdminAnnouncementSchema = z.object({
  announcementId: z.number(), // 공고 PK
  publisher: z.string().nullable(), // 발행처
  title: z.string().nullable(), // 공고명
  housingType: z.string().nullable().optional(), // 주택 유형
  supplyType: z.string().nullable().optional(), // 공급 유형
  startDate: z.string().nullable().optional(), // 공고 시작일
  endDate: z.string().nullable().optional(), // 공고 마감일
  documentPublishedAt: z.string().nullable().optional(), // 서류 발표일
  finalPublishedAt: z.string().nullable().optional(), // 최종 발표일(당첨자 발표일)
  // 공고 접수 상태
  status: z
    .enum(["OPEN", "DUE_SOON", "UPCOMING", "CLOSED"])
    .nullable()
    .optional(),
  dDay: z.number().nullable().optional(), // 마감까지 남은 일수
  rentGtn: z.number().nullable().optional(), // 보증금
  enty: z.number().optional().nullable().optional(), // 계약금
  prtpay: z.number().optional().nullable().optional(), // 중도금
  surlus: z.number().optional().nullable().optional(), // 잔금
  mtRntchrg: z.number().nullable().optional(), // 월 임대료
  fullAdres: z.string().nullable().optional(), // 전체 주소
  refrnLegaldongNm: z.string().nullable().optional(), // 참조_법적 동명
  url: z.string().nullable(), // 모집공고 URL
  applyUrl: z.string().nullable(), // 신청하러가기 URL
  isScrapped: z.boolean().nullable().optional(), // 로그인 사용자 기준 찜 여부
  // AI가 PDF에서 뽑아낸 요약 결과
  kvDigest: z.array(
    z.object({
      key: z.string(),
      value: z.string().nullable(),
    }),
  ),
});

// (어드민) 추가 온보딩 질문 목록 조회
export const AdminAdditionalOnboardingSchema = z.object({
  data: z.array(
    z.object({
      additionalOnboardingId: z.number(), // 추가 온보딩 PK
      title: z.string(), // 추가 온보딩 제목
      description: z.string(), // 온보딩 설명
      question: z.string(), // 질문 텍스트
      // 입력 타입
      type: z.enum([
        "BOOLEAN",
        "TEXT_INPUT",
        "NUMBER_INPUT",
        "SELECT_SINGLE",
        "SELECT_MULTI",
      ]),
      required: z.boolean().default(false), // 필수 입력 여부
    }),
  ),
});

export const AdminAnnouncementRequestSchema = z.object({
  publisher: z.enum(["LH", "SH"]), // 공고 기관
  housingType: z.string().nullable(), // 주택 유형 (LH는 null)
  supplyType: z.string().nullable(), // 공급 유형 (LH는 null)
  regionCode: z.string().nullable(), // 지역 코드 (LH는 null)
  regionName: z.string().nullable(), // 시군구명 (LH는 null)
  applyUrl: z.string().nullable(), // 공고 원문 URL (LH는 null)
  applyEntryUrl: z.string().nullable(), // 신청하러가기 URI
  rentGtn: z.number().nullable(), // 임대보증금 최소 (LH는 null)
  enty: z.number().nullable(), // 계약금 최소 (LH는 null)
  prtpay: z.number().nullable(), // 중도금 최소 (LH는 null)
  surlus: z.number().nullable(), // 잔금 최소
  mtRntchrg: z.number().nullable(), // 월 임대로 최소 (LH는 null)

  // eligibility (지원 자격 / 추가 온보딩)
  eligibility: z
    .object({
      answers: z.array(
        z.object({
          additionalOnboardingId: z.number(),
          // UI 블록 타입
          type: z.enum([
            "BOOLEAN",
            "TEXT_INPUT",
            "NUMBER_INPUT",
            "SELECT_SINGLE",
            "SELECT_MULTI",
          ]),
          unknown: z.boolean().default(false), // 모름/미응답 여부
          value: z
            .union([
              z.string(),
              z.number(),
              z.boolean(),
              z.array(z.string()),
              z.null(),
            ])
            .nullable(), // 답변값
          options: z.array(z.string()).nullable(), // 선택지 배열
        }),
      ),
    })
    .nullable(),

  // submission (일정 및 서류)
  submission: z
    .object({
      dates: z.object({
        applyStartDate: z.string().nullable(), // 신청 시작일
        applyEndDate: z.string().nullable(), // 신청 마감일
        documentPublishedAt: z.string().nullable(), // 서류 발표일
        finalPublishedAt: z.string().nullable(), // 최종 발표일
      }),
      // 공고 접수 시 필수 서류 리스트 - requiredDocuments
      applyDocuments: z.array(
        z.object({
          name: z.string(), // 서류명
          type: z.enum(["COMMON", "TARGET_ONLY"]), // 서류타입
        }),
      ),
      // 서류 대상 시 필수 서류 리스트 - resultDocuments
      atDocument: z.array(
        z.object({
          name: z.string(), // 서류명
          type: z.enum(["COMMON", "TARGET_ONLY"]), // 서류타입
        }),
      ),
    })
    .nullable(),

  // overviewSummary (개요 및 요약)
  overviewSummary: z
    .object({
      overview: z.object({
        content: z.string(), // 공고 내용(개요)
        target: z.string(), // 공고 대상
        regions: z.array(z.string()), // 지역
        applyMethod: z.string(), // 접수 방법
      }),
      summary: z.string().nullable(), // 공고 요약
    })
    .nullable(),
});

export const AdminAdditionalOnboardingsRequestSchema = z.object({
  items: z.array(
    z.object({
      title: z.string(), // 추가 온보딩 제목
      description: z.string(), // 온보딩 설명
      question: z.string(), // 질문 텍스트
      // 입력 타입
      type: z.enum([
        "BOOLEAN",
        "TEXT_INPUT",
        "NUMBER_INPUT",
        "SELECT_SINGLE",
        "SELECT_MULTI",
      ]),
      options: z.array(z.string()).nullable(), // 선택지 배열
    }),
  ),
});
