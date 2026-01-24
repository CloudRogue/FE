import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const hasAccessToken = request.cookies.has("ACCESS_TOKEN");
  const isAuthenticated = hasAccessToken;
  const { pathname } = request.nextUrl;

  if (pathname === "/") return NextResponse.next();
  if (pathname.startsWith("/admin") || pathname.startsWith("/api/admin")) {
    if (!isAuthenticated) {
      if (pathname.startsWith("/api")) {
        return NextResponse.json(
          {
            error: "Unauthorized",
            message: "인증이 필요합니다",
            code: "AUTH_REQUIRED",
          },
          { status: 401 },
        );
      }
      return NextResponse.redirect(
        new URL("/login?callbackUrl=" + pathname, request.url),
      );
    }
    return NextResponse.next();
  }

  const authRequiredPaths = ["/mypage", "/management", "/application-manage"];
  const publicMypagePaths = ["/mypage/terms", "/mypage/personal"];

  const isAuthRequiredPath = authRequiredPaths.some((path) =>
    pathname.startsWith(path),
  );
  const isPublicMypagePath = publicMypagePaths.includes(pathname);

  if (isAuthRequiredPath && !isPublicMypagePath && !isAuthenticated) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  const authRequiredApiPaths = [
    "/api/mypage",
    "/api/announcements/search/personalized",
    "/api/announcements/application-manage",
    "/api/required-onboardings",
    "/api/onboardings",
    "/api/community",
  ];

  const isAuthRequiredApi = authRequiredApiPaths.some((path) =>
    pathname.startsWith(path),
  );
  const scrapApiPattern = /^\/api\/announcements\/[^\/]+\/scrap$/;
  const isScrapApi = scrapApiPattern.test(pathname);

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
    "/mypage/:path*",
    "/management/:path*",
    "/application-manage/:path*",
    "/admin/:path*",
    "/api/admin/:path*",
    "/api/mypage/:path*",
    "/api/announcements/search/personalized",
    "/api/announcements/:announcementId/scrap",
    "/api/announcements/application-manage/:path*",
    "/api/required-onboardings",
    "/api/onboardings",
    "/api/community/:path*",
  ],
};
