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
        "fixed bottom-0 left-0 right-0 z-50 h-14 border-t bg-white",
        className,
      )}
      aria-label="하단 네비게이션"
    >
      <ul className="h-full flex items-center justify-center gap-10">
        {navItems.map((item) => (
          <li key={item.href} className="w-12">
            <Link
              href={item.href}
              className="h-full flex flex-col items-center justify-center gap-1 text-xs text-black"
            >
              <span className="text-xl">{item.icon}</span>
              <span className="truncate">{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
