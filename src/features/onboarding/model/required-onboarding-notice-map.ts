export type RequiredOnboardingNotice = {
  title: string;
  description: string;
};

export const REQUIRED_ONBOARDING_NOTICE_MAP: Record<
  number,
  RequiredOnboardingNotice
> = {
  // 생년월일
  10: {
    title: "안내 사항",
    description: "8자리 숫자로 입력해 주세요 \n(예: 20000101)",
  },

  // 주택 소유 여부
  12: {
    title: "안내 사항",
    description: "본인 명의의 집이 없다면 ‘무소유’를 선택해 주세요",
  },

  // 결혼 여부
  13: {
    title: "안내 사항",
    description: "예비 신혼부부라면 ‘기혼’을 선택하는 걸 추천해요",
  },

  // 세대주 여부
  14: {
    title: "안내 사항",
    description:
      "부모님과 함께 거주하며 본인이 세대주가 아니라면 ‘세대원’을 선택해 주세요",
  },

  // 가구원 수
  15: {
    title: "안내 사항",
    description: "동거인은 가구원 수에서 제외되니 유의해 주세요",
  },

  // 월 평균 소득
  16: {
    title: "안내 사항",
    description:
      "세전 금액 기준으로 입력해 주세요\n상여금이나 기타 소득이 포함된 평균 금액일수록 정확해요",
  },
};
