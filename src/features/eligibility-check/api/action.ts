"use server";

import { EligibilityResultSchema } from "@/src/entities/announcement-detail/model/announcement.types";

export async function postEligibilityDiagnosis(announcementId: number) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/announcements/${announcementId}/eligibility/check`,
    { method: "POST" },
  );

  const data = await res.json();

  return EligibilityResultSchema.parse(data);
}
