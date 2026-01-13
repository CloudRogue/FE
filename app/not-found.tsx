"use client";

import Button from "@/src/shared/ui/button";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <div
      style={{ minHeight: "calc(100dvh - 112px)" }}
      className="flex flex-col gap-4 items-center justify-center px-6 text-center"
    >
      <div className="flex items-center justify-center w-16 h-16 bg-red-500 rounded-full">
        <span className="text-white text-2xl font-bold">!</span>
      </div>

      <h2 className="text-2xl font-bold text-[#1E293B] whitespace-pre-wrap leading-tight">
        죄송합니다.
        <br />
        페이지를 찾을 수 없습니다.
      </h2>

      <p className="text-[15px] text-gray-400 whitespace-pre-wrap leading-relaxed">
        존재하지 않는 주소를 입력하셨거나,
        <br />
        요청하신 페이지의 주소가 변경, 삭제되어 찾을 수 없습니다.
      </p>

      <Button
        onClick={() => router.push("/")}
        className="w-full max-w-[320px] h-13 bg-[#F1F5F9] text-[#1E293B] border-none hover:bg-[#E2E8F0] rounded-xl font-medium"
      >
        홈 화면 이동하기
      </Button>
    </div>
  );
}
