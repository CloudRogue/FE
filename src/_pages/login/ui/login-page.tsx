"use client";

import { KakaoLoginButton } from "@/src/features/auth/ui/kakao-login";
import Popup from "@/src/shared/ui/popover";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export function LoginPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  const [isPopupOpen, setIsPopupOpen] = useState(!!error);

  return (
    <>
      <Popup
        isOpen={true}
        onClose={() => {}}
        center
        className="w-full max-w-md"
      >
        <div className="space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              로그인
            </h1>
            <p className="mt-3 text-sm text-gray-500">
              집착에 오신 것을 환영합니다. <br />
              카카오 계정으로 간편하게 시작하세요.
            </p>
          </div>

          <KakaoLoginButton />

          <p className="text-center text-xs text-gray-400">
            로그인 시 서비스 이용약관 및 개인정보 처리방침에 동의하게 됩니다.
          </p>
        </div>
      </Popup>

      <Popup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} center>
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="flex flex-col space-y-2">
            <span className="text-xl font-bold text-gray-900">로그인 실패</span>
            <p className="text-sm text-gray-600 break-keep">
              인증 과정 중 문제가 발생했습니다. <br />
              잠시 후 다시 시도해 주세요.
            </p>
          </div>

          {process.env.NODE_ENV === "development" && error && (
            <code className="rounded bg-red-50 p-1 font-mono text-[10px] text-red-400">
              Error: {error}
            </code>
          )}

          <button
            onClick={() => setIsPopupOpen(false)}
            className="w-full rounded-lg bg-gray-900 py-3 text-sm font-bold text-white transition-colors hover:bg-gray-800"
          >
            확인
          </button>
        </div>
      </Popup>
    </>
  );
}
