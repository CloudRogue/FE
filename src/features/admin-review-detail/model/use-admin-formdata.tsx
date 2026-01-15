import { produce } from "immer";
import { create } from "zustand";

// 공고 개요
export interface SummaryItem {
  target: string; // 대상
  method: string; // 접수방법
  rental: string; // 임대 보증금(최소)
  rent: string; // 월 임대로
  regions: string[]; // 지역
  description: string; // 공고 요약 및 유의사항
}

// 개별 자격 조건 데이터 인터페이스
export type RequirementType =
  | "text_input"
  | "number_input"
  | "select_single"
  | "select_multi"
  | "boolean";

export interface RequirementItem {
  id: string; // 일반 string 허용
  title: string; // 화면에 표시될 제목
  question: string; // 사용자에게 노출될 질문
  description: string; // 질문에 대한 상세 설명
  value: string; // 입력된 값
  type: RequirementType; // 입력 폼 타입
  options?: string[]; // select 타입일 때 선택지 리스트
  isRequired?: boolean; // API에서 내려오는 필수 여부 플래그
  isNew?: boolean; // 신규 추가 항목 여부
}

interface AdminFormData {
  // 공고 기본 정보
  basicInfo: {
    title: string; // 공고명
    provider: string; // 공급 주체
    announcementType: string; // 주택 유형
    originalLink: string; // 원문 링크
    applyLink: string; // 신청 링크
  };
  // 공고 개요
  summary: SummaryItem;
  // 필수 지원 자격 조건
  requirements: RequirementItem[];
  // 일정 및 서류 관리
  schedule: {
    applyStart: string; // 접수 시작일
    applyEnd: string; // 접수 마감일
    requiredDocuments: string[]; // 공고 접수 시 필수 서류 리스트
    resultDate: string; // 서류 대상자 발표일
    resultDocuments: string[]; // 서류 대상 시 필수 서류 리스트
    finalDate: string; // 최종 당첨자 및 발표일
  };
}

type PathMap = {
  "summary.regions": string;
  "schedule.requiredDocuments": string;
  "schedule.resultDocuments": string;
  requirements: RequirementItem;
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
}

const initialData: AdminFormData = {
  basicInfo: {
    title: "",
    provider: "LH",
    announcementType: "행복주택",
    originalLink: "",
    applyLink: "",
  },
  summary: {
    target: "",
    method: "",
    rental: "",
    rent: "",
    regions: ["강남구"],
    description: "",
  },
  requirements: [],
  schedule: {
    applyStart: "",
    applyEnd: "",
    requiredDocuments: [],
    resultDate: "",
    finalDate: "",
    resultDocuments: [],
  },
};

export const useAdminFormStore = create<AdminFormStore>((set) => ({
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
}));
