import { AnnouncementSearchResponseSchema } from "@/src/entities/announcement-search";
import { Api } from "@/src/shared/api/api";

export async function getAnnouncementSearch(title: string) {
  if (title.length < 3) {
    return { data: [] };
  }
  return await Api.get(
    `/announcements/search?title=${encodeURIComponent(title)}`,
    AnnouncementSearchResponseSchema,
  );
}
