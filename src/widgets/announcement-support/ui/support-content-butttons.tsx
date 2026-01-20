"use client";

import { useUser } from "@/src/entities/user";
import Button from "@/src/shared/ui/button";
import Link from "next/link";

export function SupportContentButtons() {
  const { isLoggedIn } = useUser();

  return (
    <div className="mt-4">
      {isLoggedIn ? (
        <Link href="/mypage">
          <Button className="w-full bg-[#ECEFF1] text-white py-6 rounded-xl font-bold text-[16px]">
            내 자격 정보 수정하기
          </Button>
        </Link>
      ) : (
        <Link href="/login">
          <Button className="w-full bg-[#1778FF] text-white py-6 rounded-xl font-bold text-[16px]">
            지원 자격 진단 받으려면 로그인 하기
          </Button>
        </Link>
      )}
    </div>
  );
}
