export const MANAGEMENT_STATUS_TYPE = {
  APPLYING: "APPLYING",
  DOCUMENT_PENDING: "DOCUMENT_PENDING",
  FINAL_PENDING: "FINAL_PENDING",
  CLOSED: "CLOSED",
} as const;

export const MANAGEMENT_STATUS = {
  [MANAGEMENT_STATUS_TYPE.APPLYING]: {
    value: MANAGEMENT_STATUS_TYPE.APPLYING,
    label: "지원 중",
    buttonLabel: "지원 마감",
    activeClass:
      "data-[state=active]:text-primary-blue data-[state=active]:border-primary-blue",
  },
  [MANAGEMENT_STATUS_TYPE.DOCUMENT_PENDING]: {
    value: MANAGEMENT_STATUS_TYPE.DOCUMENT_PENDING,
    label: "서류 대기",
    buttonLabel: "서류 대상자 발표",
    activeClass:
      "data-[state=active]:text-yellow-default data-[state=active]:border-yellow-default",
  },
  [MANAGEMENT_STATUS_TYPE.FINAL_PENDING]: {
    value: MANAGEMENT_STATUS_TYPE.FINAL_PENDING,
    label: "최종 대기",
    buttonLabel: "최종 당첨자 발표",
    activeClass:
      "data-[state=active]:text-green-default data-[state=active]:border-green-default",
  },
  [MANAGEMENT_STATUS_TYPE.CLOSED]: {
    value: MANAGEMENT_STATUS_TYPE.CLOSED,
    label: "발표 완료",
    buttonLabel: "최종 당첨자 발표",
    activeClass:
      "data-[state=active]:text-gray-black data-[state=active]:border-gray-black",
  },
} as const;

export const MANAGEMENT_TABS = [
  { value: MANAGEMENT_STATUS_TYPE.APPLYING, label: "지원 중" },
  { value: MANAGEMENT_STATUS_TYPE.DOCUMENT_PENDING, label: "서류 대기" },
  { value: MANAGEMENT_STATUS_TYPE.FINAL_PENDING, label: "최종 대기" },
  { value: MANAGEMENT_STATUS_TYPE.CLOSED, label: "발표 완료" },
] as const;

export type ManagementStatus = keyof typeof MANAGEMENT_STATUS;
