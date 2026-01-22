import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === "/") {
    return NextResponse.next();
  }

  const hasAccessToken = request.cookies.has("ACCESS_TOKEN");
  const hasRefreshToken = request.cookies.has("REFRESH_TOKEN");

  const isAuthenticated = hasAccessToken;

  if (!isAuthenticated) {
    if (request.nextUrl.pathname.startsWith("/api")) {
      return NextResponse.json(
        {
          error: "Unauthorized",
          message: "인증이 필요합니다",
          code: "AUTH_REQUIRED",
        },
        { status: 401 },
      );
    }

    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/mypage/:path*",

    // 인증이 필요한 API 경로들 (OpenAPI 명세 기준)
    "/api/mypage/:path*",
    "/api/announcements/search/personalized",
    "/api/announcements/filters/:path*",
    "/api/announcements/search/publisher",
    "/api/announcements/search/housing-type",
    "/api/announcements/search/region",
    "/api/announcements/:announcementId/detail/eligibility/check",
    "/api/announcements/:announcementId/scrap",
    "/api/announcements/application-manage/:path*",
    "/api/required-onboardings",
    "/api/onboardings",
    "/api/community/:path*",

    // 관리자 페이지
    "/admin/:path*",
    "/api/admin/:path*",
  ],
};
