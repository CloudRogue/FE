import type {
  OnboardingDraft,
  OnboardingFormData,
} from "@/src/features/onboarding";

const GENDER_MAP: Record<
  NonNullable<OnboardingDraft["gender"]>,
  OnboardingFormData["gender"]
> = {
  male: "MALE",
  female: "FEMALE",
};

const HOUSEHOLD_ROLE_MAP: Record<
  NonNullable<OnboardingDraft["householdRole"]>,
  OnboardingFormData["householdRole"]
> = {
  householder: "HOUSEHOLDER",
  member: "MEMBER",
};

function validateOnboardingDraft(draft: OnboardingDraft): void {
  if (!draft.name?.trim()) throw new Error("이름 정보가 없습니다");
  if (!draft.gender) throw new Error("성별 정보가 없습니다");

  if (!draft.birthYear || !draft.birthMonth || !draft.birthDay) {
    throw new Error("생년월일 정보가 완성되지 않았습니다");
  }

  if (!draft.regionCity || !draft.regionDistrict) {
    throw new Error("지역 정보가 완성되지 않았습니다");
  }

  if (!draft.householdRole) throw new Error("세대 내 역할 정보가 없습니다");
  if (draft.incomeDecile == null) throw new Error("소득 분위 정보가 없습니다");
  if (draft.householdSize == null) throw new Error("가구원 수 정보가 없습니다");
}

function formatBirthDate(draft: OnboardingDraft): string {
  return `${draft.birthYear!}-${draft.birthMonth!.padStart(2, "0")}-${draft.birthDay!.padStart(2, "0")}`;
}

function formatRegionSigungu(draft: OnboardingDraft): string {
  return `${draft.regionCity!} ${draft.regionDistrict!}`;
}

function mapGender(draft: OnboardingDraft): OnboardingFormData["gender"] {
  return GENDER_MAP[draft.gender!];
}

function mapHouseholdRole(
  draft: OnboardingDraft,
): OnboardingFormData["householdRole"] {
  return HOUSEHOLD_ROLE_MAP[draft.householdRole!];
}

export function toOnboardingFormData(
  draft: OnboardingDraft,
): OnboardingFormData {
  validateOnboardingDraft(draft);

  const householdRole = mapHouseholdRole(draft);

  return {
    name: draft.name!.trim(),
    gender: mapGender(draft),
    birthDate: formatBirthDate(draft),
    regionSigungu: formatRegionSigungu(draft),
    householdSize: draft.householdSize!,
    householdRole,
    incomeDecile: draft.incomeDecile!,
  };
}
