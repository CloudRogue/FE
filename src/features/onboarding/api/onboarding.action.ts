import { z } from "zod";

import { Api } from "@/src/shared/api/api";
import type { OnboardingFormData } from "@/src/features/onboarding/model/onboarding.types";

const EmptyResponseSchema = z.object({});

export async function saveOnboardingProfile(data: OnboardingFormData) {
  return Api.patch(`/api/mypage/profile`, EmptyResponseSchema, data);
}
