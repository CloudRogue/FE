"use client";

import { useUser } from "@/src/entities/user";
import { logout } from "@/src/features/auth";
import Button from "@/src/shared/ui/button";

export default function MypageProfile() {
  const { user, isLoading } = useUser();

  const handleLogout = async () => {
    try {
      await logout();
      window.location.href = "/";
    } catch (error) {
      console.error("로그아웃 도중 오류가 발생했습니다:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="mb-6 h-24 w-full animate-pulse rounded-xl bg-slate-100" />
    );
  }

  if (!user) return null;

  return (
    <section className="mb-6 flex items-start justify-between py-6">
      <div className="min-w-0">
        <p className="text-2xl font-bold text-slate-900">
          <span>{user.name}</span> 님
        </p>
        <p className="mt-2 text-base text-slate-500">이메일: {user.email}</p>
      </div>

      <Button
        type="button"
        onClick={handleLogout}
        className="shrink-0 rounded-xl bg-slate-600 px-5 py-3 text-base font-semibold text-white"
      >
        로그아웃
      </Button>
    </section>
  );
}
