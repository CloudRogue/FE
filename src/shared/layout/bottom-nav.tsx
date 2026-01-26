"use client";

import { DEFAULT_BOTTOM_NAV_ITEMS } from "@/src/shared/constants/bottom-nav.constants";
import cn from "@/src/shared/lib/cn";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ROUTE_CHECK } from "../constants/routes";

type BottomNavProps = {
  items?: typeof DEFAULT_BOTTOM_NAV_ITEMS;
  className?: string;
};

export default function BottomNav({ items, className }: BottomNavProps) {
  const pathname = usePathname();
  const navItems = items ?? DEFAULT_BOTTOM_NAV_ITEMS;
  const isAnnDetail = ROUTE_CHECK.isAnnouncementDetail(pathname);

  if (isAnnDetail) {
    return "";
  }
  return (
    <nav
      className={cn(
        "fixed bottom-0 left-1/2 -translate-x-1/2 z-10 h-17./ w-98.25 md:w-300 bg-white",
        className,
      )}
      aria-label="하단 네비게이션"
    >
      <ul className="grid grid-cols-3 md:w-100 md:mx-auto h-full">
        {navItems.map((item) => {
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);
          return (
            <Link key={item.href} href={item.href}>
              <li className="flex flex-col items-center justify-center gap-2  h-full py-3 text-xs text-black">
                <span className="text-xl">
                  {isActive ? item.activeIcon : item.icon}
                </span>
                <span
                  className={cn(
                    "truncate font-semibold",
                    isActive ? "text-primary-blue" : "text-gray-700",
                  )}
                >
                  {item.label}
                </span>
              </li>
            </Link>
          );
        })}
      </ul>
    </nav>
  );
}
