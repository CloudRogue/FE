"use client";

import cn from "@/src/shared/lib/cn";
import { DiagnosisResultCard } from "@/src/widgets/eligibility-section/ui/diagnosis-result-card";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

export function EligibilitySection() {
  const [isOpen, setIsOpen] = useState(true);
  const [isDiagnosed, setIsDiagnosed] = useState(true);
  const userName = "구름";

  const eligibilityData = [
    { label: "나이", subLabel: "(만 19~34세)", value: "만 28세" },
    { label: "거주지", subLabel: "(서울시 거주자)", value: "서울시 거주" },
    { label: "소득", subLabel: "(기준중위 60% 이하)", value: "48% 해당" },
    { label: "청약 통장 가입 기간", subLabel: "(가산점)", value: "-" },
    { label: "청약 통장 납입 횟수", subLabel: "(가산점)", value: "-" },
  ];

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
            {eligibilityData.map((item, index) => (
              <div key={index} className="flex justify-between items-end">
                <div className="space-y-1">
                  <div className="flex gap-1 text-[14px] text-[#9CA3B2]">
                    <span>{item.label}</span>
                    <span>{item.subLabel}</span>
                  </div>
                  <div className="text-[17px] font-bold text-[#1E293B]">
                    {item.value}
                  </div>
                </div>
                <button className="px-3 py-1.5 bg-[#F1F5F9] text-[#94A3B8] text-[13px] rounded-md font-medium">
                  진단 결과
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {isDiagnosed ? (
        <>
          <DiagnosisResultCard rank="1순위" userName={userName} />
          <button className="w-full bg-[#F1F5F9] text-[#64748B] py-4 rounded-2xl font-bold text-[16px] mb-6">
            정보 수정하고 재진단 받기
          </button>
        </>
      ) : (
        <button className="w-full bg-[#666666] text-white text-[16px] p-2.5 rounded-2xl mb-5">
          추가 정보 입력하고 지원 자격 정밀 진단 받기
        </button>
      )}

      <p className="text-gray-400 text-sm">
        진단결과는 입력된 정보를 바탕으로 한 모의 계산 결과로, 실제와는 다를 수
        있으니 참고용으로만 활용해주세요.
      </p>
    </section>
  );
}
