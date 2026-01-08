"use server";

import { EligibilityResultSchema } from "@/src/entities/announcement-detail";
import { Api } from "@/src/shared/api/api";

export async function postEligibilityCheck(announcementId: number) {
  return await Api.post(
    `/announcements/${announcementId}/eligibility/check`,
    EligibilityResultSchema,
  );
}
