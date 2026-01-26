import type {
  RequiredOnboardingAnswers,
  RequiredOnboardingQuestion,
  RequiredOnboardingQuestionType,
} from "@/src/features/onboarding/model/required-onboarding-types";

export type ProfileDetailUpsertType =
  | "BOOLEAN"
  | "TEXT_INPUT"
  | "NUMBER_INPUT"
  | "SELECT_SINGLE"
  | "SELECT_MULTI"
  | "DATE";

export type ProfileDetailUpsertItem = {
  additionalOnboardingId: number;
  type: ProfileDetailUpsertType;
  unknown: boolean;
  value: boolean | string | number | string[] | null;
};

export type ProfileDetailUpsertPayload = {
  answers: ProfileDetailUpsertItem[];
};

const TYPE_MAP: Record<
  RequiredOnboardingQuestionType,
  ProfileDetailUpsertType
> = {
  boolean: "BOOLEAN",
  text_input: "TEXT_INPUT",
  number_input: "NUMBER_INPUT",
  select_single: "SELECT_SINGLE",
  select_multi: "SELECT_MULTI",
} as const;

/**
 * localStorage draft(answers) + questions(type 매핑용) -> PUT payload 변환
 *
 * - unknown 처리:
 *   - draft에 값이 없으면 unknown=true, value=null로 처리
 *   - 값이 있으면 unknown=false, value=값
 *
 * - answers는 명세상 non-empty라서, 최소 1개라도 만들기 위해 "questions" 기준으로 생성함.
 */
export function toProfileDetailUpsertPayload(
  draftAnswers: RequiredOnboardingAnswers,
  questions: RequiredOnboardingQuestion[],
): ProfileDetailUpsertPayload {
  const items: ProfileDetailUpsertItem[] = questions.map((q) => {
    const id = q.requiredOnboardingId;
    const type = TYPE_MAP[q.type] ?? "TEXT_INPUT";

    const hasValue = Object.prototype.hasOwnProperty.call(draftAnswers, id);
    const rawValue = hasValue ? draftAnswers[id] : undefined;

    if (!hasValue || rawValue === undefined) {
      return {
        additionalOnboardingId: id,
        type,
        unknown: true,
        value: null,
      };
    }

    return {
      additionalOnboardingId: id,
      type,
      unknown: false,
      value: rawValue as ProfileDetailUpsertItem["value"],
    };
  });

  return { answers: items };
}
