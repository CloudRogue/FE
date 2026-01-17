"use client";

import { ReviewDetailHeader } from "@/src/entities/admin-review-detail";
import { useAdminFormStore } from "@/src/features/admin-review-detail";
import {
  Stepper,
  useAdminStepperStore,
} from "@/src/widgets/admin-review-detail";
import { useEffect } from "react";

const ADMIN_STEPS = [
  { number: 1, label: "통합 데이터 검수" },
  { number: 2, label: "최종 미리보기" },
];

interface ReviewDetailWrapperProps {
  announcementId: string;
  children: React.ReactNode;
}

export function ReviewDetailWrapper({
  announcementId,
  children,
}: ReviewDetailWrapperProps) {
  const { step } = useAdminStepperStore();

  const fetchAndSetgetAdminAnnouncement = useAdminFormStore(
    (state) => state.fetchAndSetgetAdminAnnouncement,
  );
  const fetchAndSetAdditionalOnboardings = useAdminFormStore(
    (state) => state.fetchAndSetAdditionalOnboardings,
  );

  useEffect(() => {
    if (announcementId) {
      // 공고 데이터조회
      fetchAndSetgetAdminAnnouncement(announcementId);
      // 추가 온보딩 질문 목록 조회
      fetchAndSetAdditionalOnboardings();
    }
  }, [
    announcementId,
    fetchAndSetgetAdminAnnouncement,
    fetchAndSetAdditionalOnboardings,
  ]);
  return (
    <>
      <ReviewDetailHeader
        announcementId="90001"
        title="2026 청년 행복주택 1차 모집"
      />

      <Stepper steps={ADMIN_STEPS} />

      {step === 1 ? (
        <div className="rounded-2xl bg-blue-700 p-5 text-white">
          <h2 className="text-xl font-bold mb-2">Step 1: 통합 데이터 검수</h2>
          <p className="text-blue-100 text-sm opacity-90">
            AI가 자동으로 추출한 모든 데이터를 한 화면에서 검수하세요.
          </p>
        </div>
      ) : (
        <div className="rounded-2xl bg-blue-700 p-5 text-white">
          <h2 className="text-xl font-bold mb-2">Step 2: 최종 미리보기</h2>
          <p className="text-blue-100 text-sm opacity-90">
            청년들이 실제로 보게 될 화면을 미리보고 온보딩 질문을 확인하세요.
          </p>
        </div>
      )}

      {children}
    </>
  );
}
