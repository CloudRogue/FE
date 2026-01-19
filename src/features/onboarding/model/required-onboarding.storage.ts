import secureLocalStorage from "react-secure-storage";

import type { RequiredOnboardingAnswers } from "@/src/features/onboarding/model/required-onboarding.types";

const STORAGE_KEY = "required-onboarding-draft:v1";

const TTL_MS = 60 * 60 * 1000;

type StoredDraft = {
  answers: RequiredOnboardingAnswers;
  currentIndex: number;
  savedAt: number;
};

function isExpired(savedAt: number) {
  return Date.now() - savedAt > TTL_MS;
}

export function saveRequiredOnboardingDraft(
  answers: RequiredOnboardingAnswers,
  currentIndex: number,
) {
  try {
    const payload: StoredDraft = {
      answers,
      currentIndex,
      savedAt: Date.now(),
    };

    secureLocalStorage.setItem(STORAGE_KEY, payload);
  } catch (error) {
    console.error("저장 실패.", error);
  }
}

export function loadRequiredOnboardingDraft(): {
  answers: RequiredOnboardingAnswers;
  currentIndex: number;
} | null {
  try {
    const parsed = secureLocalStorage.getItem(STORAGE_KEY) as
      | StoredDraft
      | null
      | undefined;

    if (!parsed) return null;
    if (!parsed.answers) return null;

    // TTL 만료면 제거
    if (typeof parsed.savedAt === "number" && isExpired(parsed.savedAt)) {
      secureLocalStorage.removeItem(STORAGE_KEY);
      return null;
    }

    return {
      answers: parsed.answers,
      currentIndex:
        typeof parsed.currentIndex === "number" ? parsed.currentIndex : 0,
    };
  } catch (error) {
    console.error("데이터를 불러오지 못했습니다.", error);
    return null;
  }
}

export function clearRequiredOnboardingDraft() {
  try {
    secureLocalStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error("데이터 삭제 실패.", error);
  }
}
