"use client";

import { useState } from "react";
import Button from "@/src/shared/ui/button";
import cn from "@/src/shared/lib/cn";

import KakaoIcon from "@/src/shared/ui/icons/login/kakao.svg";

interface KakaoLoginButtonProps {
  className?: string;
  children?: React.ReactNode;
}

export function KakaoLoginButton({
  className,
  children,
}: KakaoLoginButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = () => {
    const KAKAO_AUTH_URL =
      process.env.NEXT_PUBLIC_KAKAO_AUTH_URL ||
      "https://zipchak.deving.xyz/oauth2/authorization/kakao";

    setIsLoading(true);
    window.location.href = KAKAO_AUTH_URL;
  };

  return (
    <Button
      onClick={handleLogin}
      disabled={isLoading}
      variant="secondary"
      size="sm"
      className={cn(
        "w-full min-w-40",
        "h-11.25 rounded-[6px]",
        "px-3.5",
        "gap-2",
        "bg-yellow-kakao text-black",
        "hover:bg-yellow-kakao",
        "shadow-button hover:shadow-button-hover",
        className,
      )}
      leftIcon={<KakaoIcon className="block h-7.5 w-7 shrink-0" aria-hidden />}
    >
      <span className="text-h4 font-semibold">
        {isLoading ? "로그인 중..." : (children ?? "카카오로 시작하기")}
      </span>
    </Button>
  );
}
