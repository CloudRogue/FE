import { AnnouncementDetail } from "@/src/entities/announcement-detail";
import { Api } from "@/src/shared/api/api";
import { z } from "zod";

const ScrapResponseSchema = z.any();

export async function patchScrap(
  announcementId: AnnouncementDetail["announcementId"],
) {
  return await Api.post(
    `/announcements/${announcementId}/scrap`,
    ScrapResponseSchema,
    {},
  );
}

export async function deleteScrap(
  announcementId: AnnouncementDetail["announcementId"],
) {
  return await Api.delete(
    `/announcements/${announcementId}/scrap`,
    ScrapResponseSchema,
  );
}
