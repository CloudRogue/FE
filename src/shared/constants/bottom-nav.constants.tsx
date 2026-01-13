import { HomeIcon, LayoutGrid, UserRound } from "lucide-react";

export type BottomNavItem = {
  href: string;
  label: string;
  icon: React.ReactNode;
};

export const DEFAULT_BOTTOM_NAV_ITEMS: BottomNavItem[] = [
  { href: "/", label: "홈", icon: <HomeIcon /> },
  {
    href: "/management",
    label: "자원 관리",
    icon: <LayoutGrid />,
  },
  { href: "/mypage", label: "마이 집착", icon: <UserRound /> },
];
