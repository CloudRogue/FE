"use client";

import Link from "next/link";
import cn from "@/src/shared/lib/cn";
import { DEFAULT_BOTTOM_NAV_ITEMS } from "@/src/shared/constants/bottom-nav.constants";

type BottomNavProps = {
  items?: typeof DEFAULT_BOTTOM_NAV_ITEMS;
  className?: string;
};

export default function BottomNav({ items, className }: BottomNavProps) {
  const navItems = items ?? DEFAULT_BOTTOM_NAV_ITEMS;

  return (
    <nav
      className={cn(
        "fixed bottom-0 left-0 right-0 z-50 h-14 border-t bg-white",
        className,
      )}
      aria-label="하단 네비게이션"
    >
      <ul className="h-full grid grid-cols-4 items-center">
        {navItems.map((item) => (
          <li key={item.href} className="h-full">
            <Link
              href={item.href}
              className="h-full flex flex-col items-center justify-center gap-1 text-xs text-black"
            >
              <span className="text-lg leading-none">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
