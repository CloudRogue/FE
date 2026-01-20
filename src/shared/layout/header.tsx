"use client";

import { useUser } from "@/src/entities/user/lib/use-user";
import {
  PAGE_CONFIG,
  ROUTES,
  ROUTE_CHECK,
} from "@/src/shared/constants/routes";
import Button from "@/src/shared/ui/button";
import { ChevronLeft, Heart, Home, Share2 } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const BLUE_BUTTON_STYLE =
  "flex items-center justify-center px-[10px] h-8 gap-[6px] rounded-[8px] bg-[#1778FF] text-white text-[14px] font-bold";
// TODO: next.config.ts로 옮기기
const KAKAO_AUTH_URL = process.env.NEXT_PUBLIC_KAKAO_AUTH_URL!;

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { isLoggedIn } = useUser();

  const config = PAGE_CONFIG[pathname];
  const isAnnDetail = ROUTE_CHECK.isAnnouncementDetail(pathname);
  const isManDetail = ROUTE_CHECK.isManagementDetail(pathname);

  // 뒤로가기 버튼 필요 여부
  const showBackButton =
    isAnnDetail || isManDetail || config?.type === "CENTER_TITLE";

  // 중앙 타이틀
  const centerTitle = isAnnDetail
    ? "공고 상세"
    : isManDetail
      ? "지원 준비"
      : config?.type === "CENTER_TITLE"
        ? config.title
        : "";

  const renderLeft = () => {
    if (showBackButton) {
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

  return (
    <header className="sticky top-0 z-40 flex h-16 w-full items-center bg-white px-4 shrink-0 border border-gray-100">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between relative">
        {/* 좌측 영역 */}
        <div className="flex min-w-25 items-center z-10">{renderLeft()}</div>

        <div className="absolute left-1/2 -translate-x-1/2 font-bold text-[18px] md:text-[20px] text-slate-900 whitespace-nowrap">
          {centerTitle}
        </div>

        {/* 우측 영역 */}
        <div className="flex min-w-25 justify-end z-10">
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
              className={BLUE_BUTTON_STYLE}
              onClick={async () => {
                try {
                  const url = window.location.origin + window.location.pathname;
                  await navigator.clipboard.writeText(url);
                  alert("링크가 복사되었습니다.");
                } catch (error) {
                  console.error("링크 복사 실패:", error);
                  alert(
                    "링크 복사에 실패했습니다. 직접 주소창을 복사해주세요.",
                  );
                }
              }}
            >
              <Share2 size={16} />
              <span className="hidden md:inline">공유하기</span>
            </Button>
          )}

          {(pathname === ROUTES.ANNOUNCEMENT ||
            pathname === ROUTES.MYPAGE_SCRAP) && (
            <Link href={ROUTES.MYPAGE_SCRAP}>
              <Button className={BLUE_BUTTON_STYLE}>
                <Heart size={16} fill="white" />
                관심 공고
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
