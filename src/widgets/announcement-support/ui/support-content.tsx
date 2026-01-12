"use client";

import {
  AnnouncementDetail,
  EligibilityResult,
} from "@/src/entities/announcement-detail";
import { useUser } from "@/src/entities/user";
import Button from "@/src/shared/ui/button";
import {
  SupportInfoCard,
  SupportResultCard,
} from "@/src/widgets/announcement-support";
import Link from "next/link";

interface SupportContentProps {
  announcement: AnnouncementDetail;
  eligibilityCheck: EligibilityResult;
}

export function SupportContent({
  announcement,
  eligibilityCheck,
}: SupportContentProps) {
  const { user, isLoggedIn } = useUser();

  const displayUserName = user?.name || "청년";
  const shouldShowResult = isLoggedIn && !!eligibilityCheck;

  return (
    <>
      {shouldShowResult && (
        <SupportResultCard
          result={eligibilityCheck}
          announcement={announcement}
          userName={displayUserName}
        />
      )}

      <SupportInfoCard
        userName={user?.name || "청년"}
        result={shouldShowResult ? eligibilityCheck : null}
        isLoggedIn={shouldShowResult}
      />

      <div className="mt-4">
        {shouldShowResult ? (
          <Link href="/mypage">
            <Button className="w-full bg-[#111111] text-white py-6 rounded-xl font-bold text-[16px]">
              내 자격 정보 수정하기
            </Button>
          </Link>
        ) : (
          <Link href="/login">
            <Button className="w-full bg-[#111111] text-white py-6 rounded-xl font-bold text-[16px]">
              지원 자격 진단 받으려면 로그인 하기
            </Button>
          </Link>
        )}
      </div>
    </>
  );
}
