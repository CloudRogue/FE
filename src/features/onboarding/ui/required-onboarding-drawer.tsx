"use client";

import { KakaoLoginButton } from "@/src/features/auth/ui/kakao-login";
import Button from "@/src/shared/ui/button";
import Tooltip from "@/src/shared/ui/tooltip";

type Props = {
  open: boolean;
  onClose?: () => void;
};

export default function RequiredOnboardingDrawer({ open, onClose }: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
        role="button"
        tabIndex={0}
      />

      <div className="absolute bottom-0 left-0 right-0 rounded-t-2xl bg-white px-6 pt-8 pb-6 shadow-lg">
        <div className="mb-6 text-center text-h4 font-semibold text-gray-black">
          내 조건에 딱 맞는 주택 공고, 바로 확인해볼까요?
        </div>

        <Tooltip content="카카오로 1초 만에 시작하기">
          <div className="w-full">
            <KakaoLoginButton />
          </div>
        </Tooltip>

        {onClose && (
          <Button
            type="button"
            onClick={onClose}
            variant="secondary"
            className="mt-3 h-12 w-full"
          >
            닫기
          </Button>
        )}
      </div>
    </div>
  );
}
