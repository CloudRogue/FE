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

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();

  const KAKAO_AUTH_URL = "http://43.202.161.219/oauth2/authorization/kakao";

  const config = PAGE_CONFIG[pathname];
  const isAnnDetail = ROUTE_CHECK.isAnnouncementDetail(pathname);

  // 좌측 영역
  const renderLeft = () => {
    // 상세 페이지는 무조건 뒤로가기
    if (isAnnDetail || ROUTE_CHECK.isManagementDetail(pathname)) {
      return (
        <Button onClick={() => router.back()} className="p-1 -ml-1 text-black">
          <ChevronLeft size={24} />
        </Button>
      );
    }
    // '지원 관리', '마이페이지'는 좌측에 타이틀 노출
    if (config?.type === "LEFT_TITLE") {
      return (
        <h1 className="text-[20px] font-bold text-slate-900">{config.title}</h1>
      );
    }
    // 중앙 타이틀 페이지(관심공고 등)는 뒤로가기 노출
    if (config?.type === "CENTER_TITLE") {
      return (
        <Button onClick={() => router.back()} className="p-1 -ml-1 text-black">
          <ChevronLeft size={24} />
        </Button>
      );
    }
    // 기본은 로고
    return (
      <Link
        href={ROUTES.HOME}
        className="flex items-center gap-1.5 text-black font-bold"
      >
        <Home size={22} fill="currentColor" />
        <span className="text-[19px]">집착</span>
      </Link>
    );
  };

  return (
    <header className="sticky top-0 z-50 flex h-14 w-full items-center border-b bg-white px-4 shrink-0">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between relative">
        {/* 좌측 영역 */}
        <div className="flex min-w-25 items-center z-10">{renderLeft()}</div>

        {/* 중앙 영역 */}
        <div className="absolute left-1/2 -translate-x-1/2 font-bold text-[17px] text-slate-900">
          {isAnnDetail
            ? "공고 상세"
            : config?.type === "CENTER_TITLE"
              ? config.title
              : ""}
        </div>

        {/* 우측 영역 */}
        <div className="flex min-w-25 justify-end z-10">
          {pathname === ROUTES.HOME && (
            <Button
              onClick={() => (window.location.href = KAKAO_AUTH_URL)}
              className="h-9 px-5 bg-black text-white rounded-lg font-bold text-sm"
            >
              로그인
            </Button>
          )}
          {isAnnDetail && (
            <Button
              variant="outline"
              className="gap-1.5 border-black text-black h-9 px-4 rounded-lg font-bold"
            >
              <Share2 size={16} /> 공유하기
            </Button>
          )}
          {(pathname === ROUTES.ANNOUNCEMENT ||
            pathname === ROUTES.MYPAGE_SCRAP) && (
            <Link href={ROUTES.MYPAGE_SCRAP}>
              <Button className="h-9 px-4 bg-black text-white rounded-lg font-bold gap-1.5">
                <Heart size={16} fill="white" /> 관심 공고
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
