"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { KakaoLoginButton } from "@/src/features/auth/ui/kakao-login";
import Popup from "@/src/shared/ui/popover";

export function LoginPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    if (error) {
      setIsPopupOpen(true);
    }
  }, [error]);

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <>
      <Popup
        isOpen={true}
        onClose={() => {}}
        center
        className="w-full max-w-md"
      >
        <div className="w-full space-y-8 p-10 bg-white rounded-2xl shadow-sm">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
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
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="flex flex-col space-y-2">
            <span className="text-xl font-bold text-gray-900">로그인 실패</span>
            <p className="text-sm text-gray-600 break-keep">
              인증 과정 중 문제가 발생했습니다. <br />
              잠시 후 다시 시도해 주세요.
            </p>
          </div>

          {process.env.NODE_ENV === "development" && (
            <code className="text-[10px] text-red-400 bg-red-50 p-1 rounded font-mono">
              Error: {error}
            </code>
          )}

          <button
            onClick={() => setIsPopupOpen(false)}
            className="w-full py-3 bg-gray-900 text-white rounded-lg font-bold text-sm hover:bg-gray-800 transition-colors"
          >
            확인
          </button>
        </div>
      </Popup>
    </>
  );
}
