"use client";

import {
  PAGE_CONFIG,
  ROUTES,
  ROUTE_CHECK,
} from "@/src/shared/constants/routes";
import Button from "@/src/shared/ui/button";
import { ChevronLeft, Heart, Home, Share2 } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useUser } from "@/src/entities/user/lib/use-user";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { isLoggedIn } = useUser();

  const KAKAO_AUTH_URL =
    process.env.NEXT_PUBLIC_KAKAO_AUTH_URL ||
    "http://43.202.161.219/oauth2/authorization/kakao";

  const config = PAGE_CONFIG[pathname];
  const isAnnDetail = ROUTE_CHECK.isAnnouncementDetail(pathname);

  const renderLeft = () => {
    if (isAnnDetail || ROUTE_CHECK.isManagementDetail(pathname)) {
      return (
        <Button onClick={() => router.back()} className="p-1 -ml-1 text-black">
          <ChevronLeft size={24} />
        </Button>
      );
    }
    if (config?.type === "LEFT_TITLE") {
      return (
        <h1 className="text-[18px] md:text-[20px] font-bold text-slate-900">
          {config.title}
        </h1>
      );
    }
    if (config?.type === "CENTER_TITLE") {
      return (
        <Button onClick={() => router.back()} className="p-1 -ml-1 text-black">
          <ChevronLeft size={24} />
        </Button>
      );
    }
    return (
      <Link
        href={ROUTES.HOME}
        className="flex items-center gap-1.5 text-black font-bold"
      >
        <Home size={22} fill="currentColor" />
        <span className="text-[17px] md:text-[19px]">집착</span>
      </Link>
    );
  };

  const blueButtonStyle = `
    flex items-center justify-center
    px-[10px] py-[6px] gap-[6px] 
    rounded-[8px] bg-[#1778FF] 
    text-white text-[14px] font-bold
  `;

  return (
    <header className="sticky top-0 z-50 flex h-14 md:h-16 w-full items-center border-b bg-white px-4 md:px-8 shrink-0">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between relative">
        {/* 좌측 영역 */}
        <div className="flex min-w-[100px] items-center z-10">
          {renderLeft()}
        </div>

        <div className="absolute left-1/2 -translate-x-1/2 font-bold text-[15px] md:text-[17px] text-slate-900 whitespace-nowrap">
          {isAnnDetail
            ? "공고 상세"
            : config?.type === "CENTER_TITLE"
              ? config.title
              : ""}
        </div>

        {/* 우측 영역 */}
        <div className="flex min-w-[100px] justify-end z-10">
          {pathname === ROUTES.HOME && !isLoggedIn && (
            <Button
              onClick={() => (window.location.href = KAKAO_AUTH_URL)}
              className="h-8 md:h-9 px-3 md:px-5 bg-black text-white rounded-lg font-bold text-xs md:text-sm"
            >
              로그인
            </Button>
          )}

          {isAnnDetail && (
            <Button
              className={blueButtonStyle}
              onClick={() => {
                //추후 기능 추가
                alert("공유하기 기능이 준비 중입니다.");
              }}
            >
              <Share2 size={16} />
              <span className="hidden md:inline">공유하기</span>
            </Button>
          )}

          {(pathname === ROUTES.ANNOUNCEMENT ||
            pathname === ROUTES.MYPAGE_SCRAP) && (
            <Link href={ROUTES.MYPAGE_SCRAP}>
              <Button className={blueButtonStyle}>
                {" "}
                <Heart size={16} fill="white" /> 관심 공고{" "}
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
