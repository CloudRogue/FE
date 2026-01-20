// src/features/auth/ui/logout-button.tsx (예시)
"use client";

import { logout } from "@/src/features/auth/api/auth.action";
import { useUserStore } from "@/src/entities/user";
import Button from "@/src/shared/ui/button";

export function LogoutButton() {
  const clearUser = useUserStore((state) => state.clearUser);

  const handleLogout = async () => {
    try {
      await logout();
      clearUser();
      window.location.href = "/";
    } catch (error) {
      console.error("로그아웃 실패:", error);
    }
  };

  return (
    <Button onClick={handleLogout} className="...">
      로그아웃
    </Button>
  );
}
