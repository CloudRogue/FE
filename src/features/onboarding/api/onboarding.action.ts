import { z } from "zod";

import { Api } from "@/src/shared/api/api";
import type { OnboardingFormData } from "../model/onboarding.types";

/**
 * 초기 온보딩(프로필) 저장
 * PATCH /api/mypage/profile
 * 성공 시 204 No Content
 */
const EmptyResponseSchema = z.object({});

export async function saveOnboardingProfile(data: OnboardingFormData) {
  return Api.patch(`/api/mypage/profile`, EmptyResponseSchema, data);
}
