import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const hasAccessToken = request.cookies.has("ACCESS_TOKEN");
  const hasRefreshToken = request.cookies.has("REFRESH_TOKEN");
  const isAuthenticated = hasAccessToken;

  if (request.nextUrl.pathname === "/") {
    return NextResponse.next();
  }

  if (
    request.nextUrl.pathname.startsWith("/admin") ||
    request.nextUrl.pathname.startsWith("/api/admin")
  ) {
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

  const authRequiredPaths = ["/mypage", "/application-manage"];
  const isAuthRequiredPath = authRequiredPaths.some((path) =>
    request.nextUrl.pathname.startsWith(path),
  );

  if (isAuthRequiredPath && !isAuthenticated) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  const authRequiredApiPaths = [
    "/api/mypage",
    "/api/announcements/search/personalized",
    "/api/announcements/filters",
    "/api/announcements/search/publisher",
    "/api/announcements/search/housing-type",
    "/api/announcements/search/region",
    "/api/announcements/application-manage",
    "/api/required-onboardings",
    "/api/onboardings",
    "/api/community",
  ];

  const isAuthRequiredApi = authRequiredApiPaths.some((path) =>
    request.nextUrl.pathname.startsWith(path),
  );

  const scrapApiPattern = /^\/api\/announcements\/[^\/]+\/scrap$/;
  const isScrapApi = scrapApiPattern.test(request.nextUrl.pathname);

  if ((isAuthRequiredApi || isScrapApi) && !isAuthenticated) {
    return NextResponse.json(
      {
        error: "Unauthorized",
        message: "인증이 필요합니다",
        code: "AUTH_REQUIRED",
      },
      { status: 401 },
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // 인증 필수 페이지
    "/mypage/:path*",
    "/application-manage/:path*",

    // 관리자 페이지
    "/admin/:path*",
    "/api/admin/:path*",

    // 인증이 필요한 API 경로들
    "/api/mypage/:path*",
    "/api/announcements/search/personalized",
    "/api/announcements/filters/:path*",
    "/api/announcements/search/publisher",
    "/api/announcements/search/housing-type",
    "/api/announcements/search/region",
    "/api/announcements/:announcementId/scrap",
    "/api/announcements/application-manage/:path*",
    "/api/required-onboardings",
    "/api/onboardings",
    "/api/community/:path*",
  ],
};
