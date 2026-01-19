"use client";

import {
  AnnouncementDetail,
  EligibilityResult,
} from "@/src/entities/announcement-detail";
import { useUser } from "@/src/entities/user";
import {
  SupportInfoCard,
  SupportResultCard,
} from "@/src/widgets/announcement-support";

interface SupportContentProps {
  announcement: AnnouncementDetail;
  eligibilityCheck: EligibilityResult | null;
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
        userName={displayUserName}
        result={eligibilityCheck}
        isLoggedIn={shouldShowResult}
      />
    </>
  );
}
