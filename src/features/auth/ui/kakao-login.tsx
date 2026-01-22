"use client";

import Button from "@/src/shared/ui/button";
import cn from "@/src/shared/lib/cn";
import { useState } from "react";

type KakaoLoginButtonProps = {
  className?: string;
  children?: React.ReactNode;
};

export function KakaoLoginButton({
  className,
  children,
}: KakaoLoginButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = () => {
    const envUrl = process.env.NEXT_PUBLIC_KAKAO_AUTH_URL;
    const fallbackUrl = "https://zipchak.deving.xyz/login/oauth2/code/kakao";
    const KAKAO_AUTH_URL = envUrl || fallbackUrl;

    console.log("=== 카카오 로그인 디버깅 ===");
    console.log("1. 환경변수 값:", envUrl);
    console.log("2. Fallback 값:", fallbackUrl);
    console.log("3. 최종 사용 URL:", KAKAO_AUTH_URL);
    console.log("========================");

    if (!KAKAO_AUTH_URL.startsWith("https://")) {
      console.error("❌ URL이 https://로 시작하지 않습니다!");
      alert(`잘못된 URL: ${KAKAO_AUTH_URL}`);
      return;
    }

    console.log("🚀 카카오 로그인 페이지로 이동:", KAKAO_AUTH_URL);
    setIsLoading(true);

    // 페이지 이동
    window.location.href = KAKAO_AUTH_URL;
  };

  const defaultClassName =
    "w-full h-14 bg-[#FEE500] hover:bg-[#FDE100] text-black border-none rounded-xl text-lg font-bold shadow-none disabled:opacity-50";

  return (
    <div className="space-y-2">
      <Button
        onClick={handleLogin}
        className={cn(defaultClassName, className)}
        disabled={isLoading}
      >
        {isLoading ? "로그인 중..." : (children ?? "카카오로 시작하기")}
      </Button>

      {/* 개발 환경에서만 보이는 디버그 정보 */}
      {process.env.NODE_ENV === "development" && (
        <div className="p-3 bg-gray-100 rounded text-xs">
          <div className="font-bold mb-1">🔍 환경변수 체크:</div>
          <div className="space-y-1">
            <div>
              <span className="font-semibold">KAKAO_AUTH_URL:</span>{" "}
              {process.env.NEXT_PUBLIC_KAKAO_AUTH_URL || "❌ 없음"}
            </div>
            <div>
              <span className="font-semibold">API_BASE_URL:</span>{" "}
              {process.env.NEXT_PUBLIC_API_BASE_URL || "❌ 없음"}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
