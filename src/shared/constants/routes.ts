export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  SIGNUP: "/signup",
  ANNOUNCEMENT: "/announcement",
  ANNOUNCEMENT_DETAIL: (id: string) => `/announcement/${id}`,
  MANAGEMENT: "/management", // 지원 관리
  MYPAGE: "/mypage", // 마이페이지
  MYPAGE_FAQ: "/mypage/faq", // 자주 묻는 질문
  MYPAGE_IQUIRY: "/mypage/iquiry", // 1:1 문의
  MYPAGE_TERMS: "/mypage/terms", // 이용 약관
  MYPAGE_ELIGIBILITY: "/mypage/eligibility", // 내 지원 자격
  MYPAGE_SCRAP: "/mypage/scrap", // 관심공고
  ONBOARDING: "/onboarding",
  ADMIN: "/admin",
  ADMIM_REVIEW: "/admin/review",
  ADMIN_REGISTERED: "/admin/registered",
} as const;

export type HeaderType = "LOGO" | "LEFT_TITLE" | "CENTER_TITLE";

export const PAGE_CONFIG: Record<string, { title: string; type: HeaderType }> =
  {
    [ROUTES.HOME]: { title: "", type: "LOGO" },
    [ROUTES.MANAGEMENT]: { title: "지원 관리", type: "LEFT_TITLE" },
    [ROUTES.MYPAGE]: { title: "마이페이지", type: "LEFT_TITLE" },
    [ROUTES.ANNOUNCEMENT]: { title: "주택 공고", type: "CENTER_TITLE" },
    [ROUTES.MYPAGE_FAQ]: { title: "자주 묻는 질문", type: "CENTER_TITLE" },
    [ROUTES.MYPAGE_IQUIRY]: { title: "1:1 문의", type: "CENTER_TITLE" },
    [ROUTES.MYPAGE_TERMS]: { title: "이용 약관", type: "CENTER_TITLE" },
    [ROUTES.MYPAGE_ELIGIBILITY]: {
      title: "내 지원 자격",
      type: "CENTER_TITLE",
    },
    [ROUTES.MYPAGE_SCRAP]: { title: "관심 공고", type: "CENTER_TITLE" },
    [ROUTES.ONBOARDING]: { title: "지원 준비", type: "CENTER_TITLE" },
  };

export const ROUTE_CHECK = {
  isAnnouncementDetail: (path: string) => /^\/announcement\/.+/.test(path),
  isManagementDetail: (path: string) => /^\/management\/.+/.test(path),
};
