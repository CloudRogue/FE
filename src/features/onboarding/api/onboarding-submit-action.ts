import { z } from "zod";
import { Api } from "@/src/shared/api/api";

const NoContentResponseSchema = z.void();

export type OnboardingSubmitType =
  | "boolean"
  | "select_single"
  | "select_multi"
  | "text_input"
  | "number_input";

export type OnboardingSubmitItem = {
  additionalOnboardingId: number;
  type: OnboardingSubmitType;
  unknown: boolean;
  value: boolean | string | number | string[] | null;
};

export type OnboardingSubmitPayload = {
  answers: OnboardingSubmitItem[];
};

export async function submitOnboardingAnswers(
  payload: OnboardingSubmitPayload,
): Promise<void> {
  await Api.post("/onboardings", NoContentResponseSchema, payload);
}
