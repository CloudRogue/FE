import { Api } from "@/src/shared/api/api";
import {
  MyPageEligibilityResponseSchema,
  type MyPageEligibilityResponse,
} from "@/src/entities/mypage-eligibility";

export async function getMyPageEligibility(): Promise<MyPageEligibilityResponse> {
  return Api.get("/mypage/profile/detail", MyPageEligibilityResponseSchema);
}
