import type {
  AdditionalOnboardingAnswerValue,
  AdditionalOnboardingDraft,
  AdditionalOnboardingQuestion,
  AdditionalOnboardingSubmitItem,
  AdditionalOnboardingSubmitRequest,
} from "@/src/features/onboarding-add";

type Normalizer = (
  value: AdditionalOnboardingAnswerValue | null,
) => AdditionalOnboardingAnswerValue | null;

const NORMALIZERS: Record<AdditionalOnboardingQuestion["type"], Normalizer> = {
  boolean: (value) => (typeof value === "boolean" ? value : null),

  number_input: (value) =>
    typeof value === "number" && Number.isFinite(value) ? value : null,

  text_input: (value) => (typeof value === "string" ? value : null),

  select_single: (value) => (typeof value === "string" ? value : null),

  select_multi: (value) => {
    if (!Array.isArray(value)) return null;
    const filtered = value.filter((v) => typeof v === "string");
    // 빈 배열은 사실상 무응답이므로 null로 정리 (unknown=false일 때 400 방지)
    if (filtered.length === 0) return null;
    return filtered;
  },
};

type BuildSubmitParams = {
  questions: AdditionalOnboardingQuestion[];
  draft: AdditionalOnboardingDraft;
};

export function buildAdditionalOnboardingSubmitRequest({
  questions,
  draft,
}: BuildSubmitParams): AdditionalOnboardingSubmitRequest {
  const answers: AdditionalOnboardingSubmitItem[] = questions.map((q) => {
    const saved = draft[q.additionalOnboardingId];

    const unknown = saved?.unknown ?? false;
    const rawValue = saved?.value ?? null;

    if (unknown) {
      return {
        additionalOnboardingId: q.additionalOnboardingId,
        type: q.type,
        unknown: true,
        value: null,
      };
    }

    const normalize = NORMALIZERS[q.type];
    const value = normalize(rawValue);

    return {
      additionalOnboardingId: q.additionalOnboardingId,
      type: q.type,
      unknown: false,
      value,
    };
  });

  return { answers };
}
