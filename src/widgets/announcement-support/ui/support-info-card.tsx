"use client";

import { EligibilityResult } from "@/src/entities/announcement-detail";
import { ROUTES } from "@/src/shared/constants/routes";
import cn from "@/src/shared/lib/cn";
import { Accordion } from "@/src/shared/ui/arccordion";
import Button from "@/src/shared/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";

import NoOne from "@/src/shared/ui/icons/eligibility/no1.svg";
import OkayOne from "@/src/shared/ui/icons/eligibility/okay1.svg";
import QuestionTwo from "@/src/shared/ui/icons/eligibility/question2.svg";

interface SupportInfoCardProps {
  result: EligibilityResult | null;
  isLoggedIn: boolean;
}

export function SupportInfoCard({ result, isLoggedIn }: SupportInfoCardProps) {
  const [isOpen, setIsOpen] = useState(!isLoggedIn);

  useEffect(() => {
    setIsOpen(!isLoggedIn);
  }, [isLoggedIn]);

  const traceData = result?.trace ?? [];
  const hasResult = isLoggedIn && traceData.length > 0;

  return (
    <Accordion
      title={
        <div className="flex items-center justify-between w-full">
          <span>나의 지원 자격</span>
          <Link href={ROUTES.MYPAGE_ELIGIBILITY}>
            <Button
              variant="tertiary_gray"
              className="h-auto p-0 text-gray-400 font-medium"
            >
              수정하기
            </Button>
          </Link>
        </div>
      }
      subTitle={isOpen ? "상세 정보 닫기" : "상세 정보 열기"}
      useIcon={false}
      isOpen={isOpen}
      onToggle={() => setIsOpen(!isOpen)}
    >
      <div className="space-y-6">
        {hasResult
          ? traceData.map((item, i) => {
              const isPending = result?.supportStatus === "PENDING";
              const isIneligible = result?.supportStatus === "INELIGIBLE";

              const StatusIcon = item.passed
                ? OkayOne
                : isPending
                  ? QuestionTwo
                  : NoOne;

              return (
                <div key={i} className="flex items-start gap-3">
                  <div className="mt-1">
                    <StatusIcon />
                  </div>
                  <div className="flex flex-col">
                    <p
                      className={cn(
                        "text-caption1",
                        !item.passed && isIneligible
                          ? "text-red-500"
                          : "text-gray-700",
                      )}
                    >
                      {item.key}
                    </p>
                    <div className="text-caption2 text-gray-black leading-relaxed">
                      <RenderStyledMessage message={item.message} />
                    </div>
                  </div>
                </div>
              );
            })
          : ["나이", "월평균 소득", "자산"].map((label, i) => (
              <div key={i} className="flex items-center gap-3">
                <QuestionTwo />
                <div className="flex flex-col">
                  <p className="text-caption1 font-bold text-gray-400">
                    {label}
                  </p>
                  <p className="text-caption2 text-gray-300">
                    로그인 후 확인 가능합니다.
                  </p>
                </div>
              </div>
            ))}
      </div>
    </Accordion>
  );
}

const HIGHLIGHT_STYLES: Record<string, string> = {
  "지원 가능": "text-blue-600 font-bold",
  "조건 불일치": "text-red-500 font-bold",
  "입력 필요": "text-gray-400 font-bold",
};

const RenderStyledMessage = ({ message }: { message: string }) => {
  return (
    <>
      {message.split("\n").map((line, idx) => {
        const parts = line.split(/(지원 가능|조건 불일치|입력 필요)/g);
        return (
          <span key={idx} className="block">
            {parts.map((part, pIdx) => (
              <strong
                key={pIdx}
                className={HIGHLIGHT_STYLES[part] || "font-normal"}
              >
                {part}
              </strong>
            ))}
          </span>
        );
      })}
    </>
  );
};
