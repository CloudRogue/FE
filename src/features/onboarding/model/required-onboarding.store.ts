import { create } from "zustand";

import { getRequiredOnboardingQuestions } from "@/src/features/onboarding/api/required-onboarding.action";
import type {
  RequiredOnboardingAnswers,
  RequiredOnboardingQuestion,
  RequiredOnboardingQuestionId,
  RequiredOnboardingAnswerValue,
} from "@/src/features/onboarding/model/required-onboarding.types";
import {
  clearRequiredOnboardingDraft,
  loadRequiredOnboardingDraft,
  saveRequiredOnboardingDraft,
} from "@/src/features/onboarding/model/required-onboarding.storage";

type RequiredOnboardingStatus = "idle" | "loading" | "success" | "error";

type RequiredOnboardingState = {
  status: RequiredOnboardingStatus;
  error: string | null;

  questions: RequiredOnboardingQuestion[];
  currentIndex: number;

  answers: RequiredOnboardingAnswers;

  isComplete: boolean;

  init: () => Promise<void>;
  reset: () => void;

  setAnswer: (
    id: RequiredOnboardingQuestionId,
    value: RequiredOnboardingAnswerValue | undefined,
  ) => void;

  next: () => void;
  prev: () => void;

  markComplete: () => void;
};

function clampIndex(value: number, min: number, max: number) {
  if (value < min) return min;
  if (value > max) return max;
  return value;
}

export const useRequiredOnboardingStore = create<RequiredOnboardingState>(
  (set, get) => ({
    status: "idle",
    error: null,

    questions: [],
    currentIndex: 0,

    answers: {},

    isComplete: false,

    init: async () => {
      set({ status: "loading", error: null });

      try {
        const questions = await getRequiredOnboardingQuestions();
        const loaded = loadRequiredOnboardingDraft();

        set((prev) => {
          const loadedIndex = loaded?.currentIndex ?? prev.currentIndex;
          const nextIndex = clampIndex(
            loadedIndex,
            0,
            Math.max(0, questions.length - 1),
          );

          const nextAnswers = loaded?.answers ?? prev.answers;

          saveRequiredOnboardingDraft(nextAnswers, nextIndex);

          return {
            status: "success",
            questions,
            currentIndex: nextIndex,
            answers: nextAnswers,
          };
        });
      } catch (e) {
        const message =
          e instanceof Error
            ? e.message
            : "필수 온보딩 질문을 불러오지 못했습니다.";
        set({ status: "error", error: message });
      }
    },

    reset: () => {
      clearRequiredOnboardingDraft();
      set({
        status: "idle",
        error: null,
        questions: [],
        currentIndex: 0,
        answers: {},
        isComplete: false,
      });
    },

    setAnswer: (id, value) => {
      set((prev) => {
        const nextAnswers: RequiredOnboardingAnswers = { ...prev.answers };

        if (value === undefined) {
          delete nextAnswers[id];
        } else {
          nextAnswers[id] = value;
        }

        saveRequiredOnboardingDraft(nextAnswers, prev.currentIndex);

        return { answers: nextAnswers };
      });
    },

    next: () => {
      const { questions, currentIndex, answers } = get();
      const nextIndex = clampIndex(
        currentIndex + 1,
        0,
        Math.max(0, questions.length - 1),
      );

      set({ currentIndex: nextIndex });
      saveRequiredOnboardingDraft(answers, nextIndex);
    },

    prev: () => {
      const { questions, currentIndex, answers } = get();
      const prevIndex = clampIndex(
        currentIndex - 1,
        0,
        Math.max(0, questions.length - 1),
      );

      set({ currentIndex: prevIndex });
      saveRequiredOnboardingDraft(answers, prevIndex);
    },

    markComplete: () => {
      set({ isComplete: true });
    },
  }),
);
