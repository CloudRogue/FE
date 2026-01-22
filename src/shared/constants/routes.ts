export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  SIGNUP: "/signup",
  ANNOUNCEMENT: "/announcement",
  ANNOUNCEMENT_SEARCH: "/announcement/search",
  ANNOUNCEMENT_DETAIL: (id: string) => `/announcement/${id}`,
  MANAGEMENT: "/management", // 지원 관리
  MANAGEMENT_DETAIL: (id: string | number) => `/management/${id}`,
  MYPAGE: "/mypage", // 마이페이지
  MYPAGE_FAQ: "/mypage/faq", // 자주 묻는 질문
  MYPAGE_TERMS: "/mypage/terms", // 서비스 이용 약관
  MYPAGE_PERSONAL: "/mypage/personal", // 개인정보 처리 방침
  MYPAGE_ELIGIBILITY: "/mypage/eligibility", // 내 지원 자격
  MYPAGE_SCRAP: "/mypage/scrap", // 관심 공고
  MYPAGE_RECENT: "/mypage/recent", // 최근 열람 공고
  MYPAGE_ALARM: "/mypage/alram", // 알림 설정
  ONBOARDING: "/onboarding",
  ONBOARDING_ADD: (ids: number[]) => `/onboarding-add?ids=${ids.join(",")}`,
  ADMIN_REVIEW: "/admin",
  ADMIN_REVIEW_DETAIL: (id: number) => `/admin/${id}`,
  ADMIN_REGISTERED: "/admin/registered",
} as const;

export type HeaderType =
  | "LOGO"
  | "LEFT_TITLE"
  | "CENTER_TITLE"
  | "SEARCH"
  | "PROGRESS";

export const PAGE_CONFIG: Record<string, { title: string; type: HeaderType }> =
  {
    // 홈
    [ROUTES.HOME]: { title: "", type: "LOGO" },

    // 공고
    [ROUTES.ANNOUNCEMENT]: { title: "주택 공고", type: "CENTER_TITLE" },
    [ROUTES.ANNOUNCEMENT_SEARCH]: { title: "주택 검색", type: "SEARCH" },
    "/search": { title: "", type: "SEARCH" },

    // 마이페이지 - 알림 설정
    [ROUTES.MYPAGE]: { title: "마이페이지", type: "LEFT_TITLE" },
    [ROUTES.MYPAGE_ELIGIBILITY]: { title: "지원 자격", type: "CENTER_TITLE" },
    [ROUTES.MYPAGE_SCRAP]: { title: "관심 공고", type: "CENTER_TITLE" },
    [ROUTES.MYPAGE_RECENT]: { title: "최근 열람 공고", type: "CENTER_TITLE" },
    [ROUTES.MYPAGE_ALARM]: { title: "알림 설정", type: "CENTER_TITLE" },
    [ROUTES.MYPAGE_FAQ]: { title: "자주 묻는 질문", type: "CENTER_TITLE" },
    [ROUTES.MYPAGE_TERMS]: { title: "서비스 이용 약관", type: "CENTER_TITLE" },

    // 지원 관리
    [ROUTES.MANAGEMENT]: { title: "지원 관리", type: "LEFT_TITLE" },

    // 온보딩
    [ROUTES.ONBOARDING]: { title: "지원 준비", type: "PROGRESS" },
  };

export const ROUTE_CHECK = {
  isAnnouncementDetail: (path: string) => /^\/announcement\/.+/.test(path),
  isManagementDetail: (path: string) => /^\/management\/.+/.test(path),
};
