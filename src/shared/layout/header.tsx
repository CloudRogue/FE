"use client";

import { useUser } from "@/src/entities/user/lib/use-user";
import {
  PAGE_CONFIG,
  ROUTES,
  ROUTE_CHECK,
} from "@/src/shared/constants/routes";
import { HeaderShare } from "@/src/shared/layout/header-share";
import {
  HeaderCenter,
  HeaderLeft,
} from "@/src/shared/layout/hedaer-components";
import Button from "@/src/shared/ui/button";
import { usePathname, useRouter } from "next/navigation";

// TODO: next.config.ts로 옮기기
const KAKAO_AUTH_URL = process.env.NEXT_PUBLIC_KAKAO_AUTH_URL!;

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { isLoggedIn } = useUser();

  const config = PAGE_CONFIG[pathname];
  const isAnnDetail = ROUTE_CHECK.isAnnouncementDetail(pathname);
  const isManDetail = ROUTE_CHECK.isManagementDetail(pathname);

  const currentType =
    isAnnDetail || isManDetail ? "CENTER_TITLE" : config?.type;
  const currentTitle = isAnnDetail
    ? "공고 상세"
    : isManDetail
      ? "지원 준비"
      : config?.title;

  return (
    <header className="sticky top-0 z-40 flex justify-between w-full h-15 p-4 bg-white">
      {/* Left */}
      <HeaderLeft
        type={currentType}
        title={currentTitle}
        onBack={() => router.back()}
      />

      {/* Center */}
      <div className="flex-1 flex items-center justify-center">
        <HeaderCenter type={currentType} title={currentTitle} />
      </div>

      {/* Right */}
      <div className="flex items-center justify-end z-10 min-w-10">
        <div className="flex items-center gap-2">
          {/* 홈에서 로그인 버튼 */}
          {pathname === ROUTES.HOME && !isLoggedIn && (
            <Button
              size="sm"
              className="h-8 text-xs"
              onClick={() => router.push(ROUTES.ONBOARDING)}
            >
              로그인
            </Button>
          )}

          {/* 상세페이지 공유 버튼 */}
          {isAnnDetail && <HeaderShare />}

          {/* 검색 아이콘*/}
          {/* {pathname === ROUTES.ANNOUNCEMENT && (
            <Link href={ROUTES.ANNOUNCEMENT_SEARCH}>
              <Search width={24} />
            </Link>
          )} */}
        </div>
      </div>
    </header>
  );
}
