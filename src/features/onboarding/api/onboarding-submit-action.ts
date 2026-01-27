import { z } from "zod";
import { Api } from "@/src/shared/api/api";

const NoContentResponseSchema = z.void();

export type OnboardingSubmitType =
  | "BOOLEAN"
  | "SELECT_SINGLE"
  | "SELECT_MULTI"
  | "TEXT_INPUT"
  | "NUMBER_INPUT";

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
