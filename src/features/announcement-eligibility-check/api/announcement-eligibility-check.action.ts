"use server";

import { EligibilityResultSchema } from "@/src/entities/announcement-detail";
import { Api } from "@/src/shared/api/api";

export async function postEligibilityCheck(announcementId: string) {
  return await Api.put(
    `/announcements/${announcementId}/detail/eligibility/check`,
    EligibilityResultSchema,
  );
}
