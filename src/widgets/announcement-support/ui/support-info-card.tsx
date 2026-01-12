"use client";

import { EligibilityResult } from "@/src/entities/announcement-detail";
import cn from "@/src/shared/lib/cn";
import Button from "@/src/shared/ui/button";
import { ChevronDown } from "lucide-react";
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
    <div className="border-2 rounded-2xl overflow-hidden mb-6 transition-all">
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex justify-between items-center w-full p-4 bg-white hover:bg-gray-50 transition-colors",
          isOpen ? "border-b-2 border-gray-100" : "",
        )}
      >
        <span className="font-bold text-[#1E293B]">
          {userName}님의 자격 정보
        </span>
        <ChevronDown
          className={cn(
            "text-gray-900 transition-transform duration-200",
            isOpen ? "rotate-180" : "rotate-0",
          )}
          size={24}
        />
      </Button>

      <div
        className={cn(
          "overflow-hidden transition-all duration-300 ease-in-out",
          isOpen ? "max-h-250 opacity-100" : "max-h-0 opacity-0",
        )}
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
      </div>
    </div>
  );
}
