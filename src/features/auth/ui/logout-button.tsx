"use client";

import { useState } from "react";
import { logout } from "@/src/features/auth/api/auth.action";
import Button from "@/src/shared/ui/button";

export function LogoutButton() {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    if (isLoading) return;

    setIsLoading(true);
    try {
      await logout();

      window.location.href = "/";
    } catch (error) {
      console.error("로그아웃 실패:", error);
      alert("로그아웃 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button onClick={handleLogout} disabled={isLoading} className="...">
      {isLoading ? "로그아웃 중..." : "로그아웃"}
    </Button>
  );
}
