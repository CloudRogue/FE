import { AnnouncementDetail } from "@/src/entities/announcement-detail";
import { Api } from "@/src/shared/api/api";
import z from "zod";

export async function postOutboundLog(
  announcementId: AnnouncementDetail["announcementId"],
) {
  return await Api.post(
    `/announcements/${announcementId}/outbounds`,
    z.unknown(),
    {},
  );
}
