import { Api } from "@/src/shared/api/api";

import {
  AdditionalOnboardingQuestionsResponseSchema,
  AdditionalOnboardingSubmitResponseSchema,
  type AdditionalOnboardingQuestion,
  type AdditionalOnboardingSubmitRequest,
} from "@/src/features/onboarding-add";

export async function getAdditionalOnboardingQuestions(
  ids: number[],
): Promise<AdditionalOnboardingQuestion[]> {
  const cleaned = Array.from(new Set(ids.filter((n) => Number.isFinite(n))));

  const searchParams = new URLSearchParams();
  // 명세 형태: ids=900001,900002
  searchParams.set("ids", cleaned.join(","));

  const res = await Api.get(
    `/onboardings?${searchParams.toString()}`,
    AdditionalOnboardingQuestionsResponseSchema,
  );

  return res.data;
}

export async function submitAdditionalOnboardingAnswers(
  payload: AdditionalOnboardingSubmitRequest,
): Promise<void> {
  await Api.post(
    `/onboardings`,
    AdditionalOnboardingSubmitResponseSchema,
    payload,
  );
}
