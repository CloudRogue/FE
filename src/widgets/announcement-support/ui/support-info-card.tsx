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
  const [isOpen, setIsOpen] = useState(false);
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
        {hasResult ? (
          result.trace.map((check, i) => (
            <div key={i} className="flex justify-between items-center">
              <div>
                <p className="text-[#1E293B]">{check.key}</p>
                <p className="text-gray-500 text-sm">{check.message}</p>
              </div>
              <span
                className={cn(
                  "text-xs px-2 py-1 rounded",
                  check.passed
                    ? "bg-blue-50 text-blue-600"
                    : "bg-red-50 text-red-600",
                )}
              >
                {check.passed ? "적합" : "부적합"}
              </span>
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-500 text-center py-4">
            진단을 완료하면 상세 정보가 나타납니다.
          </p>
        )}
      </div>
    </Accordion>
  );
}
