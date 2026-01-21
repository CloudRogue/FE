import { z } from "zod";

import { Api } from "@/src/shared/api/api";
import type { ProfileDetailUpsertPayload } from "@/src/features/onboarding/model/profile-detail-upsert";

const NoContentResponseSchema = z.void();

export async function upsertProfileDetail(
  payload: ProfileDetailUpsertPayload,
): Promise<void> {
  await Api.put("/mypage/profile/detail", NoContentResponseSchema, payload);
}
