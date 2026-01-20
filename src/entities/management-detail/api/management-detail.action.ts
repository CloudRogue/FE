import { AnnouncementDetailManagementSchema } from "@/src/entities/management-detail";
import { Api } from "@/src/shared/api/api";

export async function getAnnouncementApplicationDetail(announcementId: string) {
  return await Api.get(
    `/announcements/application-manage/${announcementId}/detail`,
    AnnouncementDetailManagementSchema,
  );
}
