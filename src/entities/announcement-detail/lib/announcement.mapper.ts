import type { AnnouncementDetail } from "@/src/entities/announcement-detail";

// 공고 상세에서 사용하는 데이터는 period 하나 - 나머지 정보는 API가 분리되어서 이동
export const mapAnnouncementToSummary = (announcement: AnnouncementDetail) => {
  const formatDate = (dateStr: string) => dateStr.replaceAll("-", ".");

  return {
    start: formatDate(announcement.startDate),
    end: formatDate(announcement.endDate),
  };
};
