"use client";

import {
  AnnouncementDetail,
  EligibilityResult,
} from "@/src/entities/announcement-detail";
import { EligibilityCheckButton } from "@/src/features/announcement-eligibility-check";
import Button from "@/src/shared/ui/button";
import {
  SupportInfoCard,
  SupportResultCard,
} from "@/src/widgets/announcement-support";
import Link from "next/link";
import { useState } from "react";

interface SupportContentProps {
  announcement: AnnouncementDetail;
  isClosed: boolean;
}

export function SupportContent({
  announcement,
  isClosed,
}: SupportContentProps) {
  const [diagnosisResult, setDiagnosisResult] =
    useState<EligibilityResult | null>(null);
  const [isAccordionOpen, setIsAccordionOpen] = useState(true);
  const userName = "구름";

  const handleSuccess = (result: EligibilityResult) => {
    setDiagnosisResult(result);
    setIsAccordionOpen(false);
  };

  return (
    <>
      <SupportInfoCard
        userName={userName}
        result={diagnosisResult}
        isOpen={isAccordionOpen}
        onToggle={() => setIsAccordionOpen(!isAccordionOpen)}
      />

      {diagnosisResult ? (
        <>
          <SupportResultCard
            result={diagnosisResult}
            announcement={announcement}
            userName={userName}
            isClosed={isClosed}
          />
          <Link href="/mypage" className="block mt-4">
            <Button className="w-full bg-[#111111] text-white py-6 rounded-xl font-bold text-[16px]">
              입력한 정보 수정하고 재진단 받기
            </Button>
          </Link>
        </>
      ) : (
        <EligibilityCheckButton
          announcementId={announcement?.announcementId}
          isClosed={isClosed}
          onSuccess={handleSuccess}
        />
      )}
    </>
  );
}
