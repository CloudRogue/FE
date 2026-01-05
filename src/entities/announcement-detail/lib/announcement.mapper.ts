import { AnnouncementDetail } from "@/src/entities/announcement-detail/model/announcement.types";

export const mapAnnouncementToSummary = (announcement: AnnouncementDetail) => {
  const formatDate = (dateStr: string) => dateStr.replaceAll("-", ".");

  const period = {
    start: formatDate(announcement.startDate),
    end: formatDate(announcement.endDate),
  };

  const formattedPrice = [
    `보증금 ${(announcement.rentGtn ?? 0).toLocaleString()}원`,
    `월 ${(announcement.mtRntchrg ?? 0).toLocaleString()}원`,
  ].join(" / ");

  return {
    target: "대상 정보 없음", // TODO: 명세 업데이트 후 수정
    price: formattedPrice,
    period,
    method: announcement.digest.howToApplyText ?? "온라인 접수",
    sourceUrl: {
      originalUrl: announcement.originalUrl ?? "",
      url: announcement.url ?? undefined,
    },
  };
};
