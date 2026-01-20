import { z } from "zod";

import { Api } from "@/src/shared/api/api";
import {
  MyPageEligibilityUpsertRequestSchema,
  type MyPageEligibilityUpsertRequest,
} from "@/src/features/mypage-eligibility";

export async function putMyPageEligibilityDetail(
  body: MyPageEligibilityUpsertRequest,
): Promise<void> {
  MyPageEligibilityUpsertRequestSchema.parse(body);

  const res = await Api.put(
    "/mypage/profile/detail",
    z.undefined(), // 204 No Content
    body,
  );

  return res;
}
