import {
  QualificationId,
  RequirementItem,
} from "@/src/features/admin-review-detail";

// detail-from-basic
export const PROVIDER_OPTIONS = [
  { value: "LH", label: "LH" },
  { value: "SH", label: "SH" },
  { value: "GH", label: "GH" },
];

export const ANNOUNCEMENT_TYPE_OPTIONS = [
  { value: "행복주택", label: "행복주택" },
  { value: "국민임대", label: "국민임대" },
  { value: "청년매입임대", label: "청년매입임대" },
];

export const APPLY_LINK_OPTIONS = [
  { value: "LH 청약 플러스", label: "LH 청약 플러스" },
  { value: "SH 인터넷 청약 시스템", label: "SH 인터넷 청약 시스템" },
];

// detail-from-requirements (필수 지원 자격))
export const ADD_QUALIFICATION_OPTIONS = [
  { id: "age", label: "나이" },
  { id: "nationality", label: "국적" },
  { id: "student", label: "대학생 여부" },
  { id: "jobSeeker", label: "취준생 여부" },
  { id: "newWorker", label: "사회초년생 여부" },
  { id: "marriage", label: "혼인 여부" },
  { id: "householdHead", label: "세대주 여부" },
  { id: "housing", label: "주택 소유 여부" },
  { id: "carOwnership", label: "차량 소유 여부" },
  { id: "carValue", label: "차량 가액" },
  { id: "income", label: "월평균 소득" },
  { id: "assets", label: "총 자산" },
  { id: "parentHousing", label: "부모 주택 소유 여부" },
  { id: "parentIncome", label: "부모 월평균 소득" },
  { id: "parentAssets", label: "부모 총 자산" },
] as const;

export const DEFAULT_DATA_MAP: Partial<
  Record<QualificationId, Partial<RequirementItem>>
> = {
  age: { min: 19, max: 39, unit: "세" },
  nationality: { value: "내국인" },
  student: { value: "해당" },
  jobSeeker: { value: "해당" },
  newWorker: { value: "해당" },
  marriage: { value: "미혼" },
  householdHead: { value: "세대주" },
  housing: { value: "무주택" },
  carOwnership: { value: "미소유" },
  carValue: { value: 3708, unit: "만원", condition: "이하" },
  income: { value: 100, unit: "%", condition: "이하" },
  assets: { value: 2.8, unit: "억 원", condition: "이하" },
  parentHousing: { value: "무소유" },
  parentIncome: { value: 100, unit: "%", condition: "이하" },
  parentAssets: { value: 2.8, unit: "억 원", condition: "이하" },
};

export const CONDITION_OPTIONS = [
  { value: "조건", label: "조건" },
  { value: "이상", label: "이상" },
  { value: "미만", label: "미만" },
];
