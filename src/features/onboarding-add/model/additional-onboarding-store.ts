import { create } from "zustand";

import {
  getAdditionalOnboardingQuestions,
  submitAdditionalOnboardingAnswers,
  buildAdditionalOnboardingSubmitRequest,
  type AdditionalOnboardingAnswerValue,
  type AdditionalOnboardingDraft,
  type AdditionalOnboardingQuestion,
} from "@/src/features/onboarding-add";

type Status = "idle" | "loading" | "ready" | "submitting" | "error";

type State = {
  status: Status;
  error: string | null;

  questions: AdditionalOnboardingQuestion[];
  currentIndex: number;

  draft: AdditionalOnboardingDraft;
  isComplete: boolean;

  init: (ids: number[]) => Promise<void>;

  prev: () => void;
  next: () => void;

  setAnswer: (
    id: number,
    value: AdditionalOnboardingAnswerValue | null,
  ) => void;
  setUnknown: (id: number, unknown: boolean) => void;

  isCurrentValid: () => boolean;
  isLast: () => boolean;

  submit: () => Promise<void>;

  reset: () => void;
};

function getCurrentQuestion(
  questions: AdditionalOnboardingQuestion[],
  currentIndex: number,
) {
  if (questions.length === 0) return null;
  return questions[currentIndex] ?? null;
}

function isValidValueByType(
  type: AdditionalOnboardingQuestion["type"],
  value: AdditionalOnboardingAnswerValue | null,
) {
  if (value === null) return false;

  if (type === "boolean") return typeof value === "boolean";

  if (type === "number_input") {
    return typeof value === "number" && Number.isFinite(value);
  }

  if (type === "text_input" || type === "select_single") {
    return typeof value === "string" && value.trim().length > 0;
  }

  if (type === "select_multi") {
    return Array.isArray(value) && value.length > 0;
  }

  return false;
}

function toErrorMessage(error: unknown, fallback: string) {
  if (typeof error === "string") return error;
  if (error instanceof Error) return error.message;
  return fallback;
}

export const useAdditionalOnboardingStore = create<State>((set, get) => ({
  status: "idle",
  error: null,

  questions: [],
  currentIndex: 0,

  draft: {},
  isComplete: false,

  init: async (ids) => {
    set({
      status: "loading",
      error: null,
      questions: [],
      currentIndex: 0,
      draft: {},
      isComplete: false,
    });

    try {
      const questions = await getAdditionalOnboardingQuestions(ids);

      set(() => {
        const nextDraft: AdditionalOnboardingDraft = {};

        for (const q of questions) {
          nextDraft[q.additionalOnboardingId] = {
            type: q.type,
            unknown: false,
            value: null,
          };
        }

        return {
          status: "ready",
          error: null,
          questions,
          currentIndex: 0,
          draft: nextDraft,
          isComplete: false,
        };
      });
    } catch (error) {
      set({
        status: "error",
        error: toErrorMessage(error, "추가 온보딩을 불러오지 못했습니다."),
      });
    }
  },

  prev: () => {
    set((prev) => {
      const nextIndex = Math.max(0, prev.currentIndex - 1);
      return { currentIndex: nextIndex };
    });
  },

  next: () => {
    set((prev) => {
      const nextIndex = Math.min(
        prev.questions.length - 1,
        prev.currentIndex + 1,
      );
      return { currentIndex: nextIndex };
    });
  },

  setAnswer: (id, value) => {
    set((prev) => ({
      draft: {
        ...prev.draft,
        [id]: {
          ...(prev.draft[id] ?? {
            type: "text_input",
            unknown: false,
            value: null,
          }),
          value,
        },
      },
    }));
  },

  setUnknown: (id, unknown) => {
    set((prev) => {
      const prevItem =
        prev.draft[id] ??
        ({ type: "text_input", unknown: false, value: null } as const);

      return {
        draft: {
          ...prev.draft,
          [id]: {
            ...prevItem,
            unknown,
            value: unknown ? null : prevItem.value,
          },
        },
      };
    });
  },

  isCurrentValid: () => {
    const { questions, currentIndex, draft } = get();
    const q = getCurrentQuestion(questions, currentIndex);
    if (!q) return false;

    const item = draft[q.additionalOnboardingId];
    if (!item) return false;

    if (item.unknown) return true;

    return isValidValueByType(q.type, item.value);
  },

  isLast: () => {
    const { questions, currentIndex } = get();
    return questions.length > 0 && currentIndex >= questions.length - 1;
  },

  submit: async () => {
    const { questions, draft } = get();

    set({ status: "submitting", error: null });

    try {
      const payload = buildAdditionalOnboardingSubmitRequest({
        questions,
        draft,
      });

      await submitAdditionalOnboardingAnswers(payload);

      set({ status: "ready", isComplete: true, error: null });
    } catch (error) {
      set({
        status: "error",
        error: toErrorMessage(error, "추가 온보딩 제출에 실패했습니다."),
      });
    }
  },

  reset: () => {
    set({
      status: "idle",
      error: null,
      questions: [],
      currentIndex: 0,
      draft: {},
      isComplete: false,
    });
  },
}));
