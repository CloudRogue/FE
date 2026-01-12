export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  SIGNUP: "/signup",
  ANNOUNCEMENT: "/announcement",
  ANNOUNCEMENT_DETAIL: (id: string) => `/announcement/${id}`,
  MANAGEMENT: "/management", // 지원 관리
  MYPAGE: "/mypage", // 마이페이지
  // TODO: 마이페이지 경로 수정 필요
  MYPAGE_QUALIFICATION: "/mypage/qualification",
  MYPAGE_SCRAP: "/mypage/scrap",
  ONBOARDING: "/onboarding",
} as const;

export type HeaderType = "LOGO" | "LEFT_TITLE" | "CENTER_TITLE";

export const PAGE_CONFIG: Record<string, { title: string; type: HeaderType }> =
  {
    [ROUTES.HOME]: { title: "", type: "LOGO" },
    [ROUTES.MANAGEMENT]: { title: "지원 관리", type: "LEFT_TITLE" },
    [ROUTES.MYPAGE]: { title: "마이페이지", type: "LEFT_TITLE" },
    [ROUTES.ANNOUNCEMENT]: { title: "주택 공고", type: "CENTER_TITLE" },
    [ROUTES.MYPAGE_QUALIFICATION]: {
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
