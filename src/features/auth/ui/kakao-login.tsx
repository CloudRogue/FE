"use client";

import Button from "@/src/shared/ui/button";
import cn from "@/src/shared/lib/cn";

type KakaoLoginButtonProps = {
  className?: string;
  children?: React.ReactNode;
};

export function KakaoLoginButton({
  className,
  children,
}: KakaoLoginButtonProps) {
  const handleLogin = () => {
    const KAKAO_AUTH_URL = "http://43.202.161.219/oauth2/authorization/kakao";

    window.location.href = KAKAO_AUTH_URL;
  };

  const defaultClassName =
    "w-full h-14 bg-[#FEE500] hover:bg-[#FDE100] text-black border-none rounded-xl text-lg font-bold shadow-none";

  return (
    <Button onClick={handleLogin} className={cn(defaultClassName, className)}>
      {children ?? "카카오로 시작하기"}
    </Button>
  );
}
