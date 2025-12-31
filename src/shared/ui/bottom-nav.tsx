"use client";

import Link from "next/link";
import cn from "@/src/shared/lib/cn";

type BottomNavItem = {
  href: string;
  label: string;
  icon: React.ReactNode;
};

type BottomNavProps = {
  items?: BottomNavItem[];
  className?: string;
};

export default function BottomNav({ items, className }: BottomNavProps) {
  const navItems: BottomNavItem[] = items ?? [
    { href: "/", label: "홈", icon: <span aria-hidden>🏠</span> },
    { href: "/search", label: "탐색", icon: <span aria-hidden>🔎</span> },
    { href: "/scrap", label: "스크랩", icon: <span aria-hidden>📌</span> },
    { href: "/mypage", label: "마이", icon: <span aria-hidden>👤</span> },
  ];

  return (
    <nav
      className={cn(
        "fixed bottom-0 left-0 right-0 z-50 border-t bg-white",
        className,
      )}
      aria-label="하단 네비게이션"
    >
      <ul className="mx-auto max-w-7xl h-14 px-4 grid grid-cols-4 items-center">
        {navItems.map((item) => (
          <li key={item.href} className="h-full">
            <Link
              href={item.href}
              className="h-full w-full flex flex-col items-center justify-center gap-1 text-xs text-black"
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
