import { Api } from "@/src/shared/api/api";

import { RequiredOnboardingQuestionsResponseSchema } from "@/src/features/onboarding/model/required-onboarding.schema";
import type { RequiredOnboardingQuestion } from "@/src/features/onboarding/model/required-onboarding.types";

export async function getRequiredOnboardingQuestions(): Promise<
  RequiredOnboardingQuestion[]
> {
  const res = await Api.get(
    "/required-onboardings",
    RequiredOnboardingQuestionsResponseSchema,
  );

  return res.data;
}
