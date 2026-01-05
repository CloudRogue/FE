"use client";

import { EligibilityResult } from "@/src/entities/announcement-detail/model/announcement.types";
import { postEligibilityDiagnosis } from "@/src/features/eligibility-check/api/action";
import cn from "@/src/shared/lib/cn";
import { DiagnosisResultCard } from "@/src/widgets/eligibility-section/ui/diagnosis-result-card";
import { ChevronDown } from "lucide-react";
import { useState, useTransition } from "react";

export function EligibilitySection({
  announcementId,
}: {
  announcementId: number;
}) {
  const [isOpen, setIsOpen] = useState(true);
  const [isPending, startTransition] = useTransition();
  const [diagnosisResult, setDiagnosisResult] = useState<any>(null);
  const userName = "구름";

  const handleDiagnosis = () => {
    startTransition(async () => {
      const result = await postEligibilityDiagnosis(announcementId);
      setDiagnosisResult(result);
    });
  };

  return (
    <section className="bg-white p-6 rounded-2xl">
      <h3 className="text-lg font-bold text-gray-900">지원 자격</h3>
      <p className="text-gray-400 text-sm mb-5">
        자격 진단을 받고 선정 가능성을 판단해보세요.
      </p>

      {/* 자격 정보 카드 */}
      <div className="border-2 rounded-2xl overflow-hidden mb-6 transition-all">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "flex justify-between items-center w-full p-4 bg-white hover:bg-gray-50 transition-colors",
            isOpen ? "border-b-2 border-gray-100" : "",
          )}
        >
          <span className="font-bold text-[#1E293B]">구름님의 자격 정보</span>
          <ChevronDown
            className={cn(
              "text-gray-900 transition-transform duration-200",
              isOpen ? "rotate-180" : "rotate-0",
            )}
            size={24}
          />
        </button>

        <div
          className={cn(
            "overflow-hidden transition-all duration-300 ease-in-out",
            isOpen ? "max-h-250 opacity-100" : "max-h-0 opacity-0",
          )}
        >
          <div className="bg-gray-50 p-5 space-y-6">
            {diagnosisResult ? (
              diagnosisResult.checks.map(
                (check: EligibilityResult["checks"][0], i: number) => (
                  <div key={i} className="flex justify-between items-center">
                    <span className="text-[#1E293B] font-medium">
                      {check.message}
                    </span>
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
                ),
              )
            ) : (
              // 진단 전: 기본 Mock 데이터 렌더링
              <p className="text-sm text-gray-500 text-center py-4">
                진단을 완료하면 상세 정보가 나타납니다.
              </p>
            )}
          </div>
        </div>
      </div>

      {diagnosisResult ? (
        <>
          <DiagnosisResultCard rank="1순위" userName={userName} />
          <button
            onClick={() => setDiagnosisResult(null)}
            className="w-full bg-[#F1F5F9] text-[#64748B] py-4 rounded-2xl font-bold mt-4"
          >
            정보 수정하고 재진단 받기
          </button>
        </>
      ) : (
        <button
          onClick={handleDiagnosis}
          disabled={isPending}
          className="w-full bg-[#334155] text-white py-4 rounded-2xl font-bold disabled:opacity-50"
        >
          {isPending
            ? "진단 중..."
            : "추가 정보 입력하고 지원 자격 정밀 진단 받기"}
        </button>
      )}

      <p className="text-gray-400 text-sm">
        진단결과는 입력된 정보를 바탕으로 한 모의 계산 결과로, 실제와는 다를 수
        있으니 참고용으로만 활용해주세요.
      </p>
    </section>
  );
}
