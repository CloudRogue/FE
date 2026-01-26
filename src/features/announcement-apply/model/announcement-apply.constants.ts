export const ANNOUNCEMENT_STATUS_CONFIG = {
  UPCOMING: {
    label: (dDay?: number | null) => `공고 접수 시작까지 D-${dDay ?? "?"}`,
    isDisabled: true,
  },
  CLOSED: {
    label: () => "접수가 마감된 공고입니다",
    isDisabled: true,
  },
  OPEN: {
    label: () => "공고 지원하기",
    isDisabled: false,
  },
  DUE_SOON: {
    label: () => "공고 지원하기",
    isDisabled: false,
  },
} as const;
