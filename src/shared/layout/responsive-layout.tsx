"use client";

import cn from "@/src/shared/lib/cn";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

interface ResponsiveLayoutProps {
  children: ReactNode;
}

export async function ResponsiveLayout({ children }: ResponsiveLayoutProps) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  return (
    <div
      data-admin={isAdmin}
      className="min-h-screen w-full bg-slate-50"
      suppressHydrationWarning
    >
      <div
        suppressHydrationWarning
        className={cn(
          " mx-auto w-full flex flex-col min-h-screen bg-white shadow-sm",
          isAdmin
            ? "mx-0" // 관리자
            : "max-w-98.25 md:max-w-300", // 사용자
        )}
      >
        {children}
      </div>
    </div>
  );
}
