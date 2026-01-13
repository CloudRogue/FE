"use client";

import { ApiRequestError } from "@/src/shared/api/api";
import Button from "@/src/shared/ui/button";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  const router = useRouter();

  // 에러 타입 및 상태 코드 분석
  const isApiError = error instanceof ApiRequestError;
  const status = isApiError ? error.data.status : (error as any).status;

  // 조건부 로직
  const isNetworkError = !navigator.onLine || error.message.includes("fetch");
  const isNotFoundError =
    status === 404 || error.message.includes("NEXT_NOT_FOUND");

  useEffect(() => {
    if (isApiError) {
      console.error(
        `[${error.data.code}] ${error.data.message}`,
        error.data.details,
      );
    } else {
      console.error(error);
    }
  }, [error, isApiError]);

  if (isNetworkError) {
    return (
      <ErrorView
        title="현재 접속이 원활하지 않아요"
        description={`일시적인 오류로 서버와의 연결이 끊어졌습니다.\n네트워크를 연결해주세요.`}
        buttonText="페이지 새로고침"
        onClick={() => window.location.reload()}
      />
    );
  }

  if (isNotFoundError) {
    return (
      <ErrorView
        title={`죄송합니다.\n페이지를 찾을 수 없습니다.`}
        description={`존재하지 않는 주소를 입력하셨거나,\n요청하신 페이지의 주소가 변경, 삭제되어 찾을 수 없습니다.`}
        buttonText="홈 화면 이동하기"
        onClick={() => router.push("/")}
      />
    );
  }

  // 기본값: 시스템 오류
  return (
    <ErrorView
      title="시스템 오류가 발생했습니다."
      description={`문제를 해결하기 위해 열심히 노력하고 있습니다.\n페이지를 새로고침 해주세요.`}
      buttonText="페이지 새로고침"
      onClick={() => reset()}
    />
  );
}

function ErrorView({
  title,
  description,
  buttonText,
  onClick,
}: {
  title: string;
  description: string;
  buttonText: string;
  onClick: () => void;
}) {
  return (
    <div
      style={{ minHeight: "calc(100dvh - 112px)" }}
      className="flex flex-col gap-4 items-center justify-center px-6 text-center"
    >
      <div className="flex items-center justify-center w-16 h-16 bg-red-500 rounded-full">
        <span className="text-white text-2xl font-bold">!</span>
      </div>

      <h2 className="text-2xl font-bold text-[#1E293B] whitespace-pre-wrap leading-tight">
        {title}
      </h2>

      <p className="text-[15px] text-gray-400 whitespace-pre-wrap leading-relaxed">
        {description}
      </p>

      <Button
        onClick={onClick}
        className="w-full max-w-[320px] h-13 bg-[#F1F5F9] text-[#1E293B] border-none hover:bg-[#E2E8F0] rounded-xl font-medium"
      >
        {buttonText}
      </Button>
    </div>
  );
}
