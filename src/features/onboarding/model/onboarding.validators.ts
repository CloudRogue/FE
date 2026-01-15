import type { OnboardingDraft } from "@/src/features/onboarding";

type StepValidator = (draft: OnboardingDraft) => boolean;

export const STEP_VALIDATORS: Record<number, StepValidator> = {
  0: () => true,

  1: (draft) => {
    const name = draft.name?.trim() ?? "";
    const gender = draft.gender;
    return name.length > 0 && (gender === "male" || gender === "female");
  },

  2: (draft) => {
    const y = draft.birthYear ?? "";
    const m = draft.birthMonth ?? "";
    const d = draft.birthDay ?? "";
    return /^\d{4}$/.test(y) && m.length >= 1 && d.length >= 1;
  },

  3: (draft) => Boolean(draft.regionCity) && Boolean(draft.regionDistrict),

  4: (draft) => {
    const size = draft.householdSize;
    const role = draft.householdRole;

    return (
      typeof size === "number" &&
      Number.isFinite(size) &&
      size >= 1 &&
      (role === "householder" || role === "member")
    );
  },

  5: (draft) => {
    const n = draft.incomeDecile;
    return typeof n === "number" && n >= 1 && n <= 10;
  },
};

export function canProceedToNextStep(step: number, draft: OnboardingDraft) {
  return STEP_VALIDATORS[step]?.(draft) ?? true;
}
