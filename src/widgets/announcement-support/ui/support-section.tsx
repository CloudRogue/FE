"use client";

import {
  AnnouncementDetail,
  EligibilityResult,
} from "@/src/entities/announcement-detail/model/announcement.types";
import { postEligibilityCheck } from "@/src/features/announcement-eligibility-check/api/action";
import Button from "@/src/shared/ui/button";
import { SupportInfoCard } from "@/src/widgets/announcement-support/ui//support-info-card";
import { SupportResultCard } from "@/src/widgets/announcement-support/ui/support-result-card";
import { Suspense, useState, useTransition } from "react";

interface SupportSectionProps {
  announcementId: AnnouncementDetail["announcementId"];
}

export function SupportSection({ announcementId }: SupportSectionProps) {
  const [isPending, startTransition] = useTransition();
  const [diagnosisResult, setDiagnosisResult] =
    useState<EligibilityResult | null>(null);
  const userName = "구름";

  const handleEligibilityCheck = () => {
    startTransition(async () => {
      const result = await postEligibilityCheck(announcementId);
      setDiagnosisResult(result);
    });
  };

  const handleReset = () => {
    setDiagnosisResult(null);
  };

  return (
    <section className="bg-white p-6 rounded-2xl">
      <h3 className="text-lg font-bold text-gray-900">지원 자격</h3>
      <p className="text-gray-400 text-sm mb-5">
        자격 진단을 받고 선정 가능성을 판단해보세요.
      </p>

      <Suspense fallback={<div>진단을 완료하면 상세 정보가 나타압니다.</div>}>
        <SupportInfoCard userName={userName} result={diagnosisResult} />
      </Suspense>

      {diagnosisResult ? (
        <>
          <SupportResultCard
            eligible={diagnosisResult.eligible}
            rank={diagnosisResult.rank}
            userName={userName}
          />
          <Button
            onClick={handleReset}
            className="w-full bg-[#F1F5F9] text-[#64748B] py-4 rounded-2xl font-bold mt-4"
          >
            정보 수정하고 재진단 받기
          </Button>
        </>
      ) : (
        // 분리해서 feature로 이동 필요
        <Button
          onClick={handleEligibilityCheck}
          disabled={isPending}
          className="w-full bg-[#334155] text-white py-4 rounded-2xl font-bold disabled:opacity-50"
        >
          {isPending
            ? "진단 중..."
            : "추가 정보 입력하고 지원 자격 정밀 진단 받기"}
        </Button>
      )}

      <p className="text-gray-400 text-sm mt-6">
        진단결과는 입력된 정보를 바탕으로 한 모의 계산 결과로, 실제와는 다를 수
        있으니 참고용으로만 활용해주세요.
      </p>
    </section>
  );
}
