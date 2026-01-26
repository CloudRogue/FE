"use client";

import { useUser } from "@/src/entities/user";
import { logout } from "@/src/features/auth";
import Button from "@/src/shared/ui/button";
import Alarm from "@/src/shared/ui/icons/popup/alaram.svg";
import Popover from "@/src/shared/ui/popover";
import { useState } from "react";

export default function MypageProfile() {
  const { user, isLoading } = useUser();
  const [isOpen, setIsOpen] = useState(false);

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
      <div className="mb-4 h-24 w-full animate-pulse rounded-xl bg-slate-100" />
    );
  }

  if (!user) return null;

  return (
    <section className="mb-4 mt-2 py-2.5 flex items-center justify-between">
      <div>
        <p className="text-h1">
          <span>{user.name}</span> 님
        </p>
        <p className="text-h4 text-gray-700 font-normal">
          이메일: {user.email}
        </p>
      </div>

      <Popover
        center
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        containerClassName="flex items-center"
        trigger={
          <Button variant="secondary" size="md" onClick={() => setIsOpen(true)}>
            로그아웃
          </Button>
        }
      >
        <div className="flex flex-col items-center gap-6 w-full text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-50">
            <Alarm width={32} height={32} className="text-primary-blue" />
          </div>
          <div className="flex flex-col gap-3">
            <h3 className="text-h1 text-gray-black">로그아웃 하시겠어요?</h3>
            <p className="text-body2 text-gray-500 leading-relaxed">
              잊으신 혜택은 없으신가요?
              <br />
              언제든지 다시 찾아주세요.
            </p>
          </div>

          <div className="w-full flex flex-col gap-2">
            <Button onClick={handleLogout} className="w-full bg-red-default">
              로그아웃 하기
            </Button>
            <Button
              onClick={() => setIsOpen(false)}
              variant="secondary"
              className="w-full py-0"
            >
              계속 이용하기
            </Button>
          </div>
        </div>
      </Popover>
    </section>
  );
}
