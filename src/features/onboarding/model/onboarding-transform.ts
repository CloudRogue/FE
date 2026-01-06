import type {
  OnboardingDraft,
  OnboardingFormData,
} from "@/src/features/onboarding/model/onboarding.types";

function padToTwoDigits(value: string): string {
  return value.padStart(2, "0");
}

function createBirthDate(draft: OnboardingDraft): string {
  const { birthYear, birthMonth, birthDay } = draft;

  if (!birthYear || !birthMonth || !birthDay) {
    throw new Error("생년월일 정보가 완성되지 않았습니다");
  }

  const year = birthYear;
  const month = padToTwoDigits(birthMonth);
  const day = padToTwoDigits(birthDay);

  return `${year}-${month}-${day}`;
}

function createRegionSigungu(draft: OnboardingDraft): string {
  const { regionCity, regionDistrict } = draft;

  if (!regionCity || !regionDistrict) {
    throw new Error("지역 정보가 완성되지 않았습니다");
  }

  return `${regionCity} ${regionDistrict}`;
}

function createGender(draft: OnboardingDraft): OnboardingFormData["gender"] {
  const { gender } = draft;

  if (!gender) {
    throw new Error("성별 정보가 없습니다");
  }

  if (gender === "male") return "MALE";
  if (gender === "female") return "FEMALE";

  throw new Error("성별 정보가 올바르지 않습니다");
}

function createHouseholdRole(
  draft: OnboardingDraft,
): OnboardingFormData["householdRole"] {
  const { householdRole } = draft;

  if (!householdRole) {
    throw new Error("세대 내 역할 정보가 없습니다");
  }

  if (householdRole === "householder") return "HOUSEHOLDER";
  if (householdRole === "member") return "MEMBER";

  throw new Error("세대 내 역할 정보가 올바르지 않습니다");
}

export function toOnboardingFormData(
  draft: OnboardingDraft,
): OnboardingFormData {
  const name = draft.name?.trim();
  if (!name) {
    throw new Error("이름 정보가 없습니다");
  }

  if (draft.incomeDecile == null) {
    throw new Error("소득 분위 정보가 없습니다");
  }

  if (draft.householdSize == null) {
    throw new Error("가구원 수 정보가 없습니다");
  }

  const householdRole = createHouseholdRole(draft);
  const isHouseholder = householdRole === "HOUSEHOLDER";

  return {
    name,
    gender: createGender(draft),
    birthDate: createBirthDate(draft),
    regionSigungu: createRegionSigungu(draft),
    householdSize: draft.householdSize,
    isHouseholder,
    householdRole,
    incomeDecile: draft.incomeDecile,
  };
}
