// 공고 상세 API
import { AnnouncementDetailSchema } from "@/src/entities/announcement-detail/model/announcement.types";

export async function getAnnouncementDetail(announcementId: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/announcements/${announcementId}`,
    {
      cache: "no-store",
    },
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch announcement: ${res.status}`);
  }

  const data = await res.json();

  return AnnouncementDetailSchema.parse(data);
}
