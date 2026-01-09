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
    const baseUrl =
      process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080";
    window.location.href = `${baseUrl}/api/auth/kakao`;
  };

  const defaultClassName =
    "w-full h-14 bg-[#FEE500] hover:bg-[#FDE100] text-black border-none rounded-xl text-lg font-bold";

  return (
    <Button
      onClick={handleLogin}
      className={cn(className ? className : defaultClassName)}
    >
      {children ?? "카카오로 시작하기"}
    </Button>
  );
}
