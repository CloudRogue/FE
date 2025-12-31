export type BottomNavItem = {
  href: string;
  label: string;
  icon: React.ReactNode;
};

export const DEFAULT_BOTTOM_NAV_ITEMS: BottomNavItem[] = [
  { href: "/", label: "홈", icon: <span aria-hidden>🏠</span> },
  { href: "/search", label: "탐색", icon: <span aria-hidden>🔎</span> },
  { href: "/scrap", label: "스크랩", icon: <span aria-hidden>📌</span> },
  { href: "/mypage", label: "마이", icon: <span aria-hidden>👤</span> },
];
