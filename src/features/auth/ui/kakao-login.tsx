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
    const fallbackUrl = "https://zipchak.deving.xyz/oauth2/authorization/kakao";
    const KAKAO_AUTH_URL = envUrl || fallbackUrl;


    
    setIsLoading(true);

    window.location.href = KAKAO_AUTH_URL;
  };

  const defaultClassName =
    "w-full h-14 bg-[#FEE500] hover:bg-[#FDE100] text-black border-none rounded-xl text-lg font-bold shadow-none disabled:opacity-50";

  return (
    <Button
      onClick={handleLogin}
      className={cn(defaultClassName, className)}
      disabled={isLoading}
    >
      {isLoading ? "로그인 중..." : (children ?? "카카오로 시작하기")}
    </Button>
  );
}
