"use client";

import { EligibilityResult } from "@/src/entities/announcement-detail";
import cn from "@/src/shared/lib/cn";
import { Accordion } from "@/src/shared/ui/arccordion";
import { useState } from "react";

interface SupportInfoCardProps {
  userName: string;
  result: EligibilityResult | null;
  isLoggedIn: boolean;
}

export function SupportInfoCard({
  userName,
  result,
  isLoggedIn,
}: SupportInfoCardProps) {
  const [isOpen, setIsOpen] = useState(!isLoggedIn);
  const [prevIsLoggedIn, setPrevIsLoggedIn] = useState(isLoggedIn);

  if (isLoggedIn !== prevIsLoggedIn) {
    setPrevIsLoggedIn(isLoggedIn);
    setIsOpen(!isLoggedIn);
  }

  const hasResult = result && result.trace && result.trace.length > 0;

  return (
    <Accordion
      title={`${userName}님의 자격 정보`}
      isOpen={isOpen}
      onToggle={() => setIsOpen(!isOpen)}
      className="mb-6"
    >
      <div className="bg-gray-50 p-5 space-y-6">
        {hasResult
          ? result.trace.map((check, i) => (
              <div key={i} className="flex justify-between items-center">
                <div>
                  <p className="text-[#1E293B]">{check.key}</p>
                  <p className="text-gray-500 text-sm">{check.message}</p>
                </div>
                <div
                  className={cn(
                    "text-[13px] px-3 py-1.5 rounded-lg font-bold border",
                    check.passed
                      ? "bg-blue-50 text-blue-600 border-blue-200"
                      : "bg-red-50 text-red-500 border-red-200",
                  )}
                >
                  {check.passed ? "진단 통과" : "지원 불가"}
                </div>
              </div>
            ))
          : [
              "항목 (공고 기준 or 가산점 여부)",
              "나이 (만 00~00세)",
              "청약 통장 가입 기간 (가산점)",
            ].map((label, i) => (
              <div key={i} className="flex justify-between items-start">
                <div className="space-y-1">
                  <p className="text-xs text-slate-500 font-medium">{label}</p>
                  <p className="text-[15px] font-bold text-blue-600">
                    입력 필요
                  </p>
                </div>
                <div className="text-[13px] px-3 py-1.5 rounded-lg font-bold bg-slate-100 text-slate-300 border border-slate-200">
                  진단 결과
                </div>
              </div>
            ))}
      </div>
    </Accordion>
  );
}
