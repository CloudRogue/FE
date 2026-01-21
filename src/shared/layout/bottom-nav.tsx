"use client";

import { DEFAULT_BOTTOM_NAV_ITEMS } from "@/src/shared/constants/bottom-nav.constants";
import cn from "@/src/shared/lib/cn";
import Link from "next/link";

type BottomNavProps = {
  items?: typeof DEFAULT_BOTTOM_NAV_ITEMS;
  className?: string;
};

export default function BottomNav({ items, className }: BottomNavProps) {
  const navItems = items ?? DEFAULT_BOTTOM_NAV_ITEMS;

  return (
    <nav
      className={cn(
        "fixed bottom-0 left-1/2 -translate-x-1/2 z-30 h-20 w-98.25 md:w-300 bg-white",
        className,
      )}
      aria-label="하단 네비게이션"
    >
      <ul className="h-full flex items-center justify-center gap-11">
        {navItems.map((item) => (
          <li key={item.href} className="w-12">
            <Link
              href={item.href}
              className="h-full flex flex-col items-center justify-center gap-2 text-xs text-black"
            >
              <span className="text-xl">{item.icon}</span>
              <span className="truncate font-semibold">{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
