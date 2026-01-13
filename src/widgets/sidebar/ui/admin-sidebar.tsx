"use client";

import { ROUTES } from "@/src/shared/constants/routes";
import cn from "@/src/shared/lib/cn";
import {
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  ListTodo,
  RefreshCw,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const ADMIN_MENU = [
  {
    title: "검토 전 공고",
    icon: <LayoutGrid size={18} />,
    href: ROUTES.ADMIM_REVIEW,
  },
  {
    title: "등록한 공고",
    icon: <ListTodo size={18} />,
    href: ROUTES.ADMIN_REGISTERED,
  },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        "relative h-screen bg-white border-r border-slate-100 flex flex-col p-4 transition-all duration-300 ease-in-out",
        isCollapsed ? "w-20" : "w-70",
        "max-md:w-20",
      )}
    >
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-10 bg-white border border-slate-200 rounded-full p-1 shadow-sm hover:bg-slate-50 transition-colors z-10 max-md:hidden"
      >
        {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
      </button>

      <div
        className={cn(
          "mb-8 px-2 transition-all",
          isCollapsed ? "text-center" : "",
        )}
      >
        <h1
          className={cn(
            "font-bold text-blue-700 tracking-tight transition-all",
            isCollapsed ? "text-[18px]" : "text-[24px]",
          )}
        >
          {isCollapsed ? "집" : "집착"}
        </h1>
      </div>

      <nav className="flex-1 flex flex-col gap-2">
        {ADMIN_MENU.map((menu) => {
          const isActive = pathname === menu.href;
          return (
            <Link
              key={menu.href}
              href={menu.href}
              title={isCollapsed ? menu.title : ""}
              className={cn(
                "flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all font-bold overflow-hidden whitespace-nowrap",
                isActive
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-100"
                  : "text-slate-500 hover:bg-slate-50",
                isCollapsed ? "justify-center px-0" : "",
              )}
            >
              <div className="shrink-0">{menu.icon}</div>
              {!isCollapsed && (
                <span className="text-[15px] opacity-100 transition-opacity">
                  {menu.title}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto pt-6 border-t border-slate-50">
        <div
          className={cn(
            "flex items-center justify-between mb-2",
            isCollapsed ? "flex-col gap-4" : "",
          )}
        >
          {!isCollapsed && (
            <div className="flex flex-col overflow-hidden">
              <span className="text-sm font-bold text-slate-800 truncate">
                관리자 이름
              </span>
              <span className="text-xs text-slate-400 truncate">
                admin@kakao.com
              </span>
            </div>
          )}

          <button
            className={cn(
              "flex items-center justify-center gap-1 bg-blue-50 text-blue-600 rounded-lg text-xs font-bold hover:bg-blue-100 transition-colors",
              isCollapsed ? "w-10 h-10 p-0" : "px-3 py-1.5",
            )}
            title="유저 모드"
          >
            <RefreshCw size={14} />
            {!isCollapsed && <span>유저 모드</span>}
          </button>
        </div>
      </div>
    </aside>
  );
}
