"use client";

import { useUser } from "@/src/entities/user";
import { LogoutButton } from "@/src/features/auth"; // 하단에서 작성

export function MypageProfile() {
  const { user, isLoading } = useUser();

  if (isLoading)
    return <div className="h-24 animate-pulse bg-slate-100 rounded-xl" />;
  if (!user) return null;

  return (
    <section className="mb-6 flex items-start justify-between py-6">
      <div className="min-w-0">
        <p className="text-2xl font-bold text-slate-900">
          <span>{user.name}</span> 님
        </p>
        <p className="mt-2 text-base text-slate-500">이메일: {user.email}</p>
      </div>
      <LogoutButton />
    </section>
  );
}
