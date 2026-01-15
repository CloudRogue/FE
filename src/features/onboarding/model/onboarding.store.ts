import { create } from "zustand";

import type { OnboardingDraft } from "@/src/features/onboarding";

export const ONBOARDING_TOTAL_STEP_COUNT = 6;
export const ONBOARDING_MIN_STEP = 0;
export const ONBOARDING_MAX_STEP = ONBOARDING_TOTAL_STEP_COUNT - 1;

function clampStep(value: number) {
  if (Number.isNaN(value)) return ONBOARDING_MIN_STEP;
  if (value < ONBOARDING_MIN_STEP) return ONBOARDING_MIN_STEP;
  if (value > ONBOARDING_MAX_STEP) return ONBOARDING_MAX_STEP;
  return value;
}

type OnboardingState = {
  currentStepIndex: number;
  draft: OnboardingDraft;

  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;

  updateDraft: (patch: Partial<OnboardingDraft>) => void;
  reset: () => void;
};

export const useOnboardingStore = create<OnboardingState>((set, get) => ({
  currentStepIndex: 0,
  draft: {},

  setStep: (step) => set({ currentStepIndex: clampStep(step) }),

  nextStep: () =>
    set({ currentStepIndex: clampStep(get().currentStepIndex + 1) }),

  prevStep: () =>
    set({ currentStepIndex: clampStep(get().currentStepIndex - 1) }),

  updateDraft: (patch) =>
    set((state) => ({
      draft: { ...state.draft, ...patch },
    })),

  reset: () => set({ currentStepIndex: 0, draft: {} }),
}));

export function isDirtyDraft(draft: OnboardingDraft) {
  return Object.values(draft).some((v) => {
    if (v == null) return false;
    if (typeof v === "number") return true;
    return String(v).trim().length > 0;
  });
}
