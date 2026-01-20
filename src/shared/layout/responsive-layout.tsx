import cn from "@/src/shared/lib/cn";
import { headers } from "next/headers";
import { ReactNode } from "react";

interface ResponsiveLayoutProps {
  children: ReactNode;
}

export async function ResponsiveLayout({ children }: ResponsiveLayoutProps) {
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") || "";
  const isAdmin = pathname.startsWith("/admin");

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
            : "max-w-[393px] md:max-w-[1200px]", // 사용자
        )}
      >
        {children}
      </div>
    </div>
  );
}
