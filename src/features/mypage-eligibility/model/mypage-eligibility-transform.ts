import type {
  MyPageEligibilityAnswer,
  MyPageEligibilityResponse,
} from "@/src/entities/mypage-eligibility";

import type {
  MyPageEligibilityUpsertRequest,
  UpsertAnswer,
} from "@/src/features/mypage-eligibility";

type AnswerValue = string | number | boolean | string[];

export function toMyPageEligibilityUpsertRequest(
  data: MyPageEligibilityResponse,
): MyPageEligibilityUpsertRequest {
  const merged: MyPageEligibilityAnswer[] = [
    ...data.requiredOnboardingAnswers,
    ...data.additionalOnboardingAnswers,
  ];

  const answers: UpsertAnswer[] = merged.map((a) => ({
    additionalOnboardingId: a.id,
    type: a.type,
    unknown: false,
    value: a.value,
  }));

  return { answers };
}

function toUpsertAnswersFromDraft(
  items: MyPageEligibilityAnswer[],
  draft: Record<number, AnswerValue | undefined>,
): UpsertAnswer[] {
  return items.map((a) => {
    const nextValue = draft[a.id];

    return {
      additionalOnboardingId: a.id,
      type: a.type,
      unknown: false,
      value: nextValue === undefined ? a.value : nextValue,
    };
  });
}

export function toMyPageEligibilityUpsertRequestFromRequiredDraft(
  items: MyPageEligibilityAnswer[],
  draft: Record<number, AnswerValue | undefined>,
): MyPageEligibilityUpsertRequest {
  return { answers: toUpsertAnswersFromDraft(items, draft) };
}

export function toMyPageEligibilityUpsertRequestFromAdditionalDraft(
  items: MyPageEligibilityAnswer[],
  draft: Record<number, AnswerValue | undefined>,
): MyPageEligibilityUpsertRequest {
  return { answers: toUpsertAnswersFromDraft(items, draft) };
}
