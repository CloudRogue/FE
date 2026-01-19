export const MANAGEMENT_STATUS_TYPE = {
  APPLYING: "APPLYING",
  DOCUMENT_PENDING: "DOCUMENT_PENDING",
  FINAL_PENDING: "FINAL_PENDING",
  CLOSED: "CLOSED",
} as const;

export const MANAGEMENT_STATUS = {
  [MANAGEMENT_STATUS_TYPE.APPLYING]: {
    label: "지원 중",
    buttonLabel: "지원 마감",
    colors: {
      bg: "#F1F7FE",
      text: "#1778FF",
      badge: "#1778FF",
      buttonBg: "#E6F0FF",
    },
    position: "2%",
    progress: 4,
  },
  [MANAGEMENT_STATUS_TYPE.DOCUMENT_PENDING]: {
    label: "서류 대기",
    buttonLabel: "서류 대상자 발표",
    colors: {
      bg: "#FEF9F1",
      text: "#F2A356",
      badge: "#F2A356",
      buttonBg: "#FEF9F1",
    },
    position: "0%",
    progress: 28,
  },
  [MANAGEMENT_STATUS_TYPE.FINAL_PENDING]: {
    label: "최종 대기",
    buttonLabel: "최종 당첨자 발표",
    colors: {
      bg: "#FDF5F5",
      text: "#FF384F",
      badge: "#FF384F",
      buttonBg: "#FDF5F5",
    },
    position: "-2%",
    progress: 73,
  },
  [MANAGEMENT_STATUS_TYPE.CLOSED]: {
    label: "발표 완료",
    buttonLabel: "최종 당첨자 발표",
    colors: {
      bg: "#262838",
      text: "#FFFFFF",
      badge: "#262838",
      buttonBg: "#ECEFF1",
    },
    position: "-2%",
    progress: 100,
  },
} as const;

export const MANAGEMENT_TABS = [
  { value: MANAGEMENT_STATUS_TYPE.APPLYING, label: "지원 중" },
  { value: MANAGEMENT_STATUS_TYPE.DOCUMENT_PENDING, label: "서류 대기" },
  { value: MANAGEMENT_STATUS_TYPE.FINAL_PENDING, label: "최종 대기" },
  { value: MANAGEMENT_STATUS_TYPE.CLOSED, label: "마감" },
] as const;

export const STEPPER_STEPS = [
  { id: MANAGEMENT_STATUS_TYPE.APPLYING, label: "지원 완료" },
  { id: MANAGEMENT_STATUS_TYPE.DOCUMENT_PENDING, label: "서류 발표" },
  { id: MANAGEMENT_STATUS_TYPE.FINAL_PENDING, label: "최종 발표" },
] as const;

export type ManagementStatus = keyof typeof MANAGEMENT_STATUS;
