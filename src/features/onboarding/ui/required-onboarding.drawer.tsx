"use client";

import { KakaoLoginButton } from "@/src/features/auth/ui/kakao-login";
import Button from "@/src/shared/ui/button";

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

      <div className="absolute bottom-0 left-0 right-0 rounded-t-2xl bg-white p-6 shadow-lg">
        <div className="mb-2 text-lg font-semibold">온보딩 완료</div>
        <div className="mb-6 text-sm text-gray-600">
          카카오 로그인 후 서비스를 이용할 수 있어요.
        </div>

        <KakaoLoginButton />

        {onClose && (
          <Button
            type="button"
            onClick={onClose}
            className="mt-3 h-12 w-full rounded-md border text-sm"
          >
            닫기
          </Button>
        )}
      </div>
    </div>
  );
}
