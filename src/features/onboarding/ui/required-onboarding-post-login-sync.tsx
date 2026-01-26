"use client";

import { useEffect, useRef } from "react";

import {
  loadRequiredOnboardingDraft,
  clearRequiredOnboardingDraft,
} from "@/src/features/onboarding/model/required-onboarding-storage";

import { getRequiredOnboardingQuestions } from "@/src/features/onboarding/api/required-onboarding-action";
import { toProfileDetailUpsertPayload } from "@/src/features/onboarding/model/profile-detail-upsert";
import { upsertProfileDetail } from "@/src/features/onboarding/api/profile-detail-upsert-action";

type Props = {
  isLoggedIn: boolean;
};

// 로그인 완료 이후 1회만 실행 보장 (같은 탭 기준)
const RUN_KEY = "required-onboarding:post-login-sync:v1";

export default function RequiredOnboardingPostLoginSync({ isLoggedIn }: Props) {
  const startedRef = useRef(false);

  useEffect(() => {
    if (!isLoggedIn) return;

    // 같은 탭에서 이미 실행된 적 있으면 중단
    if (sessionStorage.getItem(RUN_KEY) === "1") return;

    // 같은 마운트에서 중복 실행 방지
    if (startedRef.current) return;

    const draft = loadRequiredOnboardingDraft();
    if (!draft) return;

    const { answers } = draft;
    if (!answers || Object.keys(answers).length === 0) return;

    startedRef.current = true;
    sessionStorage.setItem(RUN_KEY, "1");

    let cancelled = false;

    async function run() {
      try {
        const questions = await getRequiredOnboardingQuestions();
        if (cancelled) return;

        const payload = toProfileDetailUpsertPayload(answers, questions);

        await upsertProfileDetail(payload);
        if (cancelled) return;

        // 성공 시에만 draft 제거
        clearRequiredOnboardingDraft();
      } catch {
        // 실패하면 다음 진입에서 재시도 가능하도록 복구
        sessionStorage.removeItem(RUN_KEY);
        startedRef.current = false;
      }
    }

    run();

    return () => {
      cancelled = true;
    };
  }, [isLoggedIn]);

  return null;
}
