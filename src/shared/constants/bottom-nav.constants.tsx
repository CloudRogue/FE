import HomeActive from "@/src/shared/ui/icons/tab/home-color.svg";
import Home from "@/src/shared/ui/icons/tab/home-nonecolor.svg";
import ManamgeActive from "@/src/shared/ui/icons/tab/manage-color.svg";
import Manamge from "@/src/shared/ui/icons/tab/manage-nonecolor.svg";
import UserActive from "@/src/shared/ui/icons/tab/user-color.svg";
import User from "@/src/shared/ui/icons/tab/user-nonecolor.svg";

export type BottomNavItem = {
  href: string;
  label: string;
  icon: React.ReactNode;
  activeIcon: React.ReactNode;
};

export const DEFAULT_BOTTOM_NAV_ITEMS: BottomNavItem[] = [
  {
    href: "/",
    label: "집착 홈",
    icon: <Home />,
    activeIcon: <HomeActive className="text-primary-blue" />,
  },
  {
    href: "/management",
    label: "자원 관리",
    icon: <Manamge className="w-6 h-6" />,
    activeIcon: <ManamgeActive />,
  },
  {
    href: "/mypage",
    label: "내 정보",
    icon: <User className="w-6 h-6" />,
    activeIcon: <UserActive />,
  },
];
