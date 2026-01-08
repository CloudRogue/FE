"use server";

import {
  AnnouncementDetail,
  EligibilityResultSchema,
} from "@/src/entities/announcement-detail";
import { Api } from "@/src/shared/api/api";

export async function postEligibilityCheck(
  announcementId: AnnouncementDetail["announcementId"],
) {
  return await Api.post(
    `/announcements/${announcementId}/eligibility/check`,
    EligibilityResultSchema,
  );
}
