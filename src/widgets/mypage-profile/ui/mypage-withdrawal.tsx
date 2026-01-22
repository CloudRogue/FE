"use client";

import { useUser } from "@/src/entities/user";
import Button from "@/src/shared/ui/button";
import Alarm from "@/src/shared/ui/icons/popup/alaram.svg";
import Popover from "@/src/shared/ui/popover";
import { useState } from "react";

export default function MypageWithdrawal() {
  const { user, isLoggedIn } = useUser();

  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    console.log("회원 탈퇴");
  };

  if (!isLoggedIn) {
    return "";
  }

  return (
    <Popover
      center
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      containerClassName="flex items-center"
      trigger={
        <Button
          variant="tertiary_gray"
          size="md"
          onClick={() => setIsOpen(true)}
        >
          탈퇴하기
        </Button>
      }
    >
      <div className="flex flex-col items-center gap-6 w-full text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-50">
          <Alarm width={32} height={32} className="text-primary-blue" />
        </div>
        <div className="flex flex-col gap-3">
          <h3 className="text-h1 text-gray-black">정말 탈퇴하시겠어요?</h3>
          <p className="text-body2 text-gray-500 leading-relaxed">
            지금 떠나시면 {user?.name}님의 정보가 모두 사라져요.
            <br />
            다시 복구하기 어려우니 신중히 결정해 주세요.
          </p>
        </div>

        <div className="w-full flex flex-col gap-2">
          <Button onClick={handleLogout} className="w-full bg-red-default">
            탈퇴하기
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
  );
}
