"use client";

import { AnnouncementDetail } from "@/src/entities/announcement-detail";
import { useUser } from "@/src/entities/user";
import { postEligibilityCheck } from "@/src/features/announcement-eligibility-check";
import { SupportContent } from "@/src/widgets/announcement-support";
import { useQuery } from "@tanstack/react-query";

export function SupportContentWrapper({
  announcement,
}: {
  announcement: AnnouncementDetail;
}) {
  const { isLoggedIn } = useUser();

  const { data, isLoading, isError } = useQuery({
    // TODO: 쿼리키 상수화 필요
    queryKey: ["eligibilityCheck", announcement.announcementId],
    queryFn: () => postEligibilityCheck(String(announcement.announcementId)),
    enabled: isLoggedIn,
  });

  if (isLoggedIn && isLoading) {
    throw new Promise(() => {});
  }

  if (isError) {
    throw new Error("API 호출 실패");
  }

  return (
    <SupportContent
      announcement={announcement}
      eligibilityCheck={data ?? null}
    />
  );
}
