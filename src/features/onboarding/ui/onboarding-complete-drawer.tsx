"use client";

import Button from "@/src/shared/ui/button";
import { Drawer } from "@/src/shared/ui/drawer";

type OnboardingCompleteDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function OnboardingCompleteDrawer({
  isOpen,
  onClose,
}: OnboardingCompleteDrawerProps) {
  return (
    <Drawer isOpen={isOpen} onClose={onClose} className="rounded-t-[32px] p-6">
      <div className="space-y-4">
        <div className="text-xl font-semibold text-neutral-900">
          회원가입 하고 맞춤 공고를 추천 받아보세요!
        </div>

        <div className="flex justify-center">
          <div className="rounded-xl bg-neutral-100 px-4 py-2 text-sm text-neutral-700">
            1초 만에 간편 회원가입
          </div>
        </div>

        <Button
          type="button"
          className="h-14 w-full rounded-xl bg-neutral-900 text-base font-semibold text-white"
        >
          카카오로 시작하기
        </Button>
      </div>
    </Drawer>
  );
}
