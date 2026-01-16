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
  rentGtn: string; // 임대 보증금
  mtRntchrg: string; // 월 임대료
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
  id: string; // 일반 string 허용
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
  // [공고 입력 최종 완료(확정) 처리]
  submitForm: () => Promise<void>;
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
    rentGtn: "",
    mtRntchrg: "",
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
  updateSection: (section, data) =>
    set(
      produce((state: AdminFormStore) => {
        if (Array.isArray(data)) {
          state.formData[section] = data as AdminFormData[typeof section];
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
          // Requirements는 id(string) 기반 삭제
          if (typeof idOrIndex === "string") {
            state.formData.requirements = state.formData.requirements.filter(
              (req) => req.id !== idOrIndex,
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

  submitForm: async () => {
    const { formData } = get();
    // [공고 입력 최종 완료 처리] API 연동
    console.log("최종 제출 데이터:", formData);
  },
}));
