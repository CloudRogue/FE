import {
  getAdminAdditionalOnboardings,
  getAdminAnnouncement,
} from "@/src/entities/admin-review-detail";
import {
  AdminAnnouncementRequest,
  AdminAnnouncementRequestSchema,
  postAdminAnnouncement,
} from "@/src/features/admin-review-detail";
import { produce } from "immer";
import { create } from "zustand";

// [AI PDF 요약/추출 결과 조회]
export interface KVDigestItem {
  key: string;
  value: string;
}

// 공고 개요/요약 수기 저장
export interface SummaryItem {
  target: string; // 대상
  method: string; // 접수방법
  rentGtn: number; // 임대 보증금
  mtRntchrg: number; // 월 임대료
  regions: string[]; // 지역
  description: string; // 공고 요약 및 유의사항
  contentText: string; //  원문/가공 본문
  kvDigest: KVDigestItem[]; // [AI PDF 요약 결과 조회]
}

// [지원 자격 입력 / 추가 온보딩 질문 생성]
export type RequirementType =
  | "TEXT_INPUT"
  | "NUMBER_INPUT"
  | "SELECT_SINGLE"
  | "SELECT_MULTI"
  | "BOOLEAN";

export interface RequirementItem {
  additionalOnboardingId: string; // 일반 string 허용
  title: string; // 화면에 표시될 제목
  question: string; // 사용자에게 노출될 질문
  description: string; // 질문에 대한 상세 설명
  value: string; // 입력된 값
  type: RequirementType; // 입력 폼 타입
  options?: string[]; // select 타입일 때 선택지 리스트
  isRequired?: boolean; // API에서 내려오는 필수 여부 플래그
  isNew?: boolean; // [추가 온보딩 질문 생성 시 활용]
}

interface AdminFormData {
  // 공고 기본 정보 [SH 공고 필드 수기 작성]
  basicInfo: {
    title: string; // 공고명
    publisher: string; // 공급 주체
    supplyType: string; // 공급 유형
    originalUrl: string; // 원문 링크
    applyUrl: string; // 신청 링크
  };
  // 공고 개요
  summary: SummaryItem;
  // 필수 지원 자격 조건
  requirements: RequirementItem[]; // [지원 자격 입력]
  // 일정 및 서류 관리 [공고 제출서류/주요 일정 최초 등록]
  schedule: {
    applyStartDate: string; // 접수 시작일
    applyEndDate: string; // 접수 마감일
    requiredDocuments: string[]; // 공고 접수 시 필수 서류 리스트
    documentPublishedAt: string; // 서류 대상자 발표일
    resultDocuments: string[]; // 서류 대상 시 필수 서류 리스트
    finalPublishedAt: string; // 최종 당첨자 및 발표일
  };
}

type PathMap = {
  "summary.regions": string; // 개요 지역
  "summary.kvDigest": KVDigestItem; // AI 요약 결과 추가용
  "schedule.requiredDocuments": string; // 공고 접수 시 필수 서류 리스트
  "schedule.resultDocuments": string; // 서류 대상 시 필수 서류 리스트
  requirements: RequirementItem; // 자격 조건
};

type ArrayPath = keyof PathMap;

interface AdminFormStore {
  formData: AdminFormData;
  qualificationPool?: RequirementItem[]; // 하단 버튼 리스트(Pool)
  // 특정 섹션의 데이터를 업데이트
  updateSection: <T extends keyof AdminFormData>(
    section: T,
    data: Partial<AdminFormData[T]>,
  ) => void;
  // 배열형 데이터에 아이템 추가
  addItem: <T extends ArrayPath>(path: T, item: PathMap[T]) => void;
  // 배열형 데이터에서 아이템 삭제
  removeItem: (
    path:
      | "summary.regions"
      | "schedule.requiredDocuments"
      | "schedule.resultDocuments"
      | "requirements",
    idOrIndex: string | number,
  ) => void;
  // LH 여부 - 공급 주체 확장 가능
  getPublisherStatus: () => { isLH: boolean; isSH: boolean; isGH: boolean };
  // [공고 입력 최종 완료(확정) 처리]
  submitForm: (announcementId: string) => Promise<void>;
  // [공고 AI PDF 요약/추출 결과 조회]
  setgetAdminAnnouncement: (digest: KVDigestItem[]) => void;
  fetchAndSetgetAdminAnnouncement: (announcementId: string) => Promise<void>;
  // [추가 온보딩 질문 목록 조회]
  fetchAndSetAdditionalOnboardings: () => Promise<void>;
}

const initialData: AdminFormData = {
  basicInfo: {
    title: "",
    publisher: "LH",
    supplyType: "행복주택",
    originalUrl: "",
    applyUrl: "",
  },
  summary: {
    target: "",
    method: "",
    rentGtn: 0,
    mtRntchrg: 0,
    regions: ["강남구"],
    description: "",
    contentText: "",
    kvDigest: [],
  },
  requirements: [],
  schedule: {
    applyStartDate: "",
    applyEndDate: "",
    requiredDocuments: [],
    documentPublishedAt: "",
    finalPublishedAt: "",
    resultDocuments: [],
  },
};

export const useAdminFormStore = create<AdminFormStore>((set, get) => ({
  formData: initialData,
  qualificationPool: [],

  updateSection: (section, data) =>
    set(
      produce((state) => {
        if (Array.isArray(state.formData[section])) {
          state.formData[section] = data;
        } else {
          state.formData[section] = { ...state.formData[section], ...data };
        }
      }),
    ),

  addItem: (path, item) =>
    set(
      produce((state: AdminFormStore) => {
        if (path === "requirements") {
          state.formData.requirements.push(item as RequirementItem);
        } else {
          const [parent, child] = path.split(".") as [
            keyof AdminFormData,
            string,
          ];
          const target = state.formData[parent];
          if (target && child in target) {
            const array = (target as Record<string, unknown>)[child];
            if (Array.isArray(array)) {
              array.push(item);
            }
          }
        }
      }),
    ),

  removeItem: (path, idOrIndex) =>
    set(
      produce((state: AdminFormStore) => {
        if (path === "requirements") {
          // Requirements는 additionalOnboardingId 기반 삭제
          if (typeof idOrIndex === "string") {
            state.formData.requirements = state.formData.requirements.filter(
              (req) => req.additionalOnboardingId !== idOrIndex,
            );
          } else {
            state.formData.requirements.splice(idOrIndex, 1);
          }
        } else {
          // 나머지 문자열 배열들 처리
          const [parent, child] = path.split(".") as [
            "summary" | "schedule",
            string,
          ];

          const targetArray = (
            state.formData[parent as keyof AdminFormData] as Record<
              string,
              unknown
            >
          )[child];

          if (Array.isArray(targetArray) && typeof idOrIndex === "number") {
            (targetArray as string[]).splice(idOrIndex, 1);
          }
        }
      }),
    ),

  submitForm: async (announcementId: string) => {
    const { formData, getPublisherStatus } = get();
    const { isLH } = getPublisherStatus();

    // 공통 매핑 데이터 (LH/SH 공통 활용 가능성 있는 부분)
    const commonManualRequirements = formData.requirements.map((req) => ({
      additionalOnboardingId: Number(req.additionalOnboardingId),
      type: req.type,
      unknown: false,
      value: null, // 실제 답변값은 유저가 입력하므로 어드민 설정 시엔 null
      options: req.options || null,
    }));

    const commonDocuments = [
      ...formData.schedule.requiredDocuments.map((name) => ({
        name,
        type: "COMMON" as const,
      })),
      ...formData.schedule.resultDocuments.map((name) => ({
        name,
        type: "TARGET_ONLY" as const,
      })),
    ];

    let payload: AdminAnnouncementRequest;

    if (isLH) {
      // LH: 최상위 필드 null 처리
      payload = {
        publisher: "LH",
        housingType: null,
        supplyType: null,
        regionCode: null,
        regionName: null,
        applyUrl: null,
        applyEntryUrl: formData.basicInfo.applyUrl,
        rentGtn: null,
        enty: null,
        prtpay: null,
        surlus: null,
        mtRntchrg: null,
        eligibility: {
          answers: commonManualRequirements,
        },
        submission: {
          dates: {
            applyStartDate: null,
            applyEndDate: null,
            documentPublishedAt: formData.schedule.documentPublishedAt || null,
            finalPublishedAt: null,
          },
          documents: commonDocuments,
        },
        overviewSummary: {
          overview: {
            content: formData.summary.description,
            target: formData.summary.target,
            regions: formData.summary.regions,
            applyMethod: formData.summary.method,
          },
          summary: formData.summary.description || null,
        },
      };
    } else {
      // SH/일반: 모든 데이터 수기 필드 포함
      payload = {
        publisher: "SH",
        housingType: null, // 스토어에 정의되지 않은 필드는 공란(null)
        supplyType: formData.basicInfo.supplyType,
        regionCode: null,
        regionName: null,
        applyUrl: formData.basicInfo.originalUrl,
        applyEntryUrl: formData.basicInfo.applyUrl,
        rentGtn: formData.summary.rentGtn,
        enty: 0, // 스토어 정의 외 필드
        prtpay: 0,
        surlus: 0,
        mtRntchrg: formData.summary.mtRntchrg,
        eligibility: {
          answers: commonManualRequirements,
        },
        submission: {
          dates: {
            applyStartDate: formData.schedule.applyStartDate,
            applyEndDate: formData.schedule.applyEndDate,
            documentPublishedAt: formData.schedule.documentPublishedAt,
            finalPublishedAt: formData.schedule.finalPublishedAt,
          },
          documents: commonDocuments,
        },
        overviewSummary: {
          overview: {
            content: formData.summary.description,
            target: formData.summary.target,
            regions: formData.summary.regions,
            applyMethod: formData.summary.method,
          },
          summary: formData.summary.description || null,
        },
      };
    }

    // Zod 유효성 검사
    const validation = AdminAnnouncementRequestSchema.safeParse(payload);
    if (!validation.success) {
      console.error("검증 실패 상세:", validation.error.format());
      alert(`입력값을 확인해주세요. (상세 에러는 콘솔을 확인하세요)`);
      return;
    }

    try {
      // POST API 호출
      await postAdminAnnouncement(announcementId, payload);
      alert("공고가 성공적으로 저장되었습니다.");
    } catch (error) {
      console.error("저장 실패:", error);
      alert("저장에 실패했습니다. 다시 시도해주세요.");
    }
  },

  setgetAdminAnnouncement: (digest) =>
    set(
      produce((state: AdminFormStore) => {
        state.formData.summary.kvDigest = digest;
      }),
    ),

  getPublisherStatus: () => {
    const publisher = get().formData.basicInfo.publisher || "";
    return {
      isLH: publisher.includes("LH"),
      isSH: publisher.includes("SH"),
      isGH: publisher.includes("GH"),
    };
  },

  // 공고 AI PDF 요약 결과 조회 후 스토어 반영
  fetchAndSetgetAdminAnnouncement: async (announcementId: string) => {
    try {
      const response = await getAdminAnnouncement(announcementId);

      if (response) {
        set(
          produce((state: AdminFormStore) => {
            // 기본 정보 (Basic Info) 매핑
            state.formData.basicInfo = {
              title: response.title || "",
              publisher: (response.publisher || "").includes("LH")
                ? "LH"
                : (response.publisher || "").includes("SH")
                  ? "SH"
                  : "GH",
              supplyType: response.supplyType || "",
              originalUrl: response.url || "",
              applyUrl: response.applyUrl || "",
            };

            // 개요 및 요약 (Summary)
            state.formData.summary = {
              ...state.formData.summary, // 기존 값 유지 (regions 등)
              rentGtn: response.rentGtn || 0,
              mtRntchrg: response.mtRntchrg || 0,
              kvDigest: response.kvDigest || [],
            };

            // 일정 관리 (Schedule)
            state.formData.schedule = {
              ...state.formData.schedule,
              applyStartDate: response.startDate || "",
              applyEndDate: response.endDate || "",
              documentPublishedAt: response.documentPublishedAt || "",
              finalPublishedAt: response.finalPublishedAt || "",
            };
          }),
        );
      }
    } catch (error) {
      console.error("공고 상세 데이터 로드 실패:", error);
    }
  },

  // 추가 온보딩 질문 목록 조회
  fetchAndSetAdditionalOnboardings: async () => {
    try {
      const response = await getAdminAdditionalOnboardings();
      const rawData = Array.isArray(response) ? response : response?.data || [];

      const allData: RequirementItem[] = rawData.map((item) => ({
        additionalOnboardingId: String(item.additionalOnboardingId),
        title: item.title || "",
        question: item.question || "",
        description: item.description ?? "",
        isRequired: item.required,
        type: (item.type?.toUpperCase() as RequirementType) || "TEXT_INPUT",
        value: item.value || "",
        isNew: false,
        options: item.options || null,
      }));

      set(
        produce((state: AdminFormStore) => {
          state.formData.requirements = allData.filter(
            (item) => item.isRequired,
          );
          state.qualificationPool = allData;
        }),
      );
    } catch (error) {
      console.error("온보딩 질문 로드 실패:", error);
      set(
        produce((state) => {
          state.formData.requirements = [];
          state.qualificationPool = [];
        }),
      );
    }
  },
}));
