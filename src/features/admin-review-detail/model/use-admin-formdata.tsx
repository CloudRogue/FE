import { create } from "zustand";

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

export interface ResultDocument {
  name: string;
  target: string;
}

interface AdminFormData {
  // 공고 기본 정보
  basicInfo: {
    title: string;
    provider: string; // LH, SH 등
    announcementType: string; // 행복주택 등
    originalLink: string;
    applyLink: string;
    images: string[];
  };
  // 공고 개요
  summary: {
    target: string;
    method: string;
    regions: string[]; // 강남구, 강동구 등
    description: string;
  };
  // 필수 지원 자격 조건
  requirements: RequirementItem[];
  // 일정 및 서류 관리
  schedule: {
    applyStart: string;
    applyEnd: string;
    requiredDocuments: string[]; // 주민등록등본 등
    resultDate: string;
    finalDate: string;
    resultDocuments: ResultDocument[];
  };
}

type AddableItem = string | RequirementItem | ResultDocument;

interface AdminFormStore {
  formData: AdminFormData;
  updateSection: <T extends keyof AdminFormData>(
    section: T,
    data: Partial<AdminFormData[T]>,
  ) => void;
  addItem: (
    section:
      | "extraPoints"
      | "requirements"
      | "regions"
      | "requiredDocuments"
      | "resultDocuments",
    item: AddableItem,
  ) => void;
  removeItem: (
    section:
      | "extraPoints"
      | "requirements"
      | "regions"
      | "requiredDocuments"
      | "resultDocuments",
    idOrIndex: string | number,
  ) => void;
}

export const useAdminFormStore = create<AdminFormStore>((set) => ({
  formData: {
    basicInfo: {
      title: "",
      provider: "LH",
      announcementType: "행복주택",
      originalLink: "",
      applyLink: "",
      images: [],
    },
    summary: { target: "", method: "", regions: ["강남구"], description: "" },
    requirements: [],
    extraPoints: [],
    schedule: {
      applyStart: "",
      applyEnd: "",
      requiredDocuments: [],
      resultDate: "",
      finalDate: "",
      resultDocuments: [],
    },
  },

  updateSection: (section, data) =>
    set((state) => ({
      formData: {
        ...state.formData,
        [section]: Array.isArray(data)
          ? data
          : { ...state.formData[section], ...data },
      },
    })),

  addItem: (section, item) =>
    set((state) => {
      const { formData } = state;

      // regions 처리 (string[])
      if (section === "regions") {
        return {
          formData: {
            ...formData,
            summary: {
              ...formData.summary,
              regions: [...formData.summary.regions, item as string],
            },
          },
        };
      }

      // requiredDocuments 처리 (string[])
      if (section === "requiredDocuments") {
        return {
          formData: {
            ...formData,
            schedule: {
              ...formData.schedule,
              requiredDocuments: [
                ...formData.schedule.requiredDocuments,
                item as string,
              ],
            },
          },
        };
      }

      // resultDocuments 처리 (ResultDocument[])
      if (section === "resultDocuments") {
        return {
          formData: {
            ...formData,
            schedule: {
              ...formData.schedule,
              resultDocuments: [
                ...formData.schedule.resultDocuments,
                item as ResultDocument,
              ],
            },
          },
        };
      }

      // 루트 레벨 배열 (requirements)
      if (section === "requirements") {
        return {
          formData: {
            ...formData,
            requirements: [...formData.requirements, item as RequirementItem],
          },
        };
      }

      return state;
    }),

  removeItem: (section, idOrIndex) =>
    set((state) => {
      const { formData } = state;

      if (section === "regions") {
        return {
          formData: {
            ...formData,
            summary: {
              ...formData.summary,
              regions: formData.summary.regions.filter(
                (_, i) => i !== idOrIndex,
              ),
            },
          },
        };
      }

      if (section === "requiredDocuments") {
        return {
          formData: {
            ...formData,
            schedule: {
              ...formData.schedule,
              requiredDocuments: formData.schedule.requiredDocuments.filter(
                (_, i) => i !== idOrIndex,
              ),
            },
          },
        };
      }

      if (section === "resultDocuments") {
        return {
          formData: {
            ...formData,
            schedule: {
              ...formData.schedule,
              resultDocuments: formData.schedule.resultDocuments.filter(
                (_, i) => i !== idOrIndex,
              ),
            },
          },
        };
      }

      // id가 있는 객체 배열 처리 requirements
      const currentArray = formData[section as "requirements"];
      return {
        formData: {
          ...formData,
          [section]: currentArray.filter(
            (item: RequirementItem, index: number) => {
              return item.id ? item.id !== idOrIndex : index !== idOrIndex;
            },
          ),
        },
      };
    }),
}));
