// detail-from-basic
export const PROVIDER_OPTIONS = [
  { value: "LH", label: "LH" },
  { value: "SH", label: "SH" },
  { value: "GH", label: "GH" },
];

export const ANNOUNCEMENT_TYPE_MAP: Record<
  string,
  { value: string; label: string }[]
> = {
  LH: [
    { value: "통합 공공 임대", label: "통합 공공 임대" },
    { value: "국민 임대", label: "국민 임대" },
    { value: "행복주택", label: "행복주택" },
    { value: "공공임대", label: "공공임대" },
    { value: "영구임대", label: "영구임대" },
    { value: "장기전세", label: "장기전세" },
    { value: "매입임대", label: "매입임대" },
    { value: "전세임대", label: "전세임대" },
  ],
  SH: [
    { value: "청년안심주택", label: "청년안심주택" },
    { value: "전세임대주택", label: "전세임대주택" },
    { value: "행복주택", label: "행복주택" },
    { value: "장기안심주택", label: "장기안심주택" },
    { value: "희망하우징", label: "희망하우징" },
    { value: "매입임대주택", label: "매입임대주택" },
    { value: "국민임대주택", label: "국민임대주택" },
    { value: "공공임대주택", label: "공공임대주택" },
    { value: "장기전세주택", label: "장기전세주택" },
  ],
  GH: [
    { value: "행복주택", label: "행복주택" },
    { value: "국민임대", label: "국민임대" },
    { value: "청년매입임대", label: "청년매입임대" },
  ],
};

export const APPLY_LINK_OPTIONS = [
  { value: "LH 청약 플러스", label: "LH 청약 플러스" },
  { value: "SH 인터넷 청약 시스템", label: "SH 인터넷 청약 시스템" },
];

// requirements-card
export const TYPE_OPTION = [
  { value: "BOOLEAN", label: "BOOLEAN" },
  { value: "TEXT_INPUT", label: "TEXT_INPUT" },
  { value: "NUMBER_INPUT", label: "NUMBER_INPUT" },
  { value: "SELECT_SINGLE", label: "SELECT_SINGLE" },
  { value: "SELECT_MULTI", label: "SELECT_MULTI" },
];
