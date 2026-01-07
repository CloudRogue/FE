import type { AnnouncementDetail } from "@/src/entities/announcement-detail/model/announcement.types";

export const mapAnnouncementToSummary = (announcement: AnnouncementDetail) => {
  const formatDate = (dateStr: string) => dateStr.replaceAll("-", ".");

  const formattedPrice = (price: number | null): string => {
    if (price === null || price === 0) return "정보 없음";
    const manwon = Math.floor(price / 10000);
    return `${manwon.toLocaleString()}만원`;
  };

  const formattedTarget = (): string => {
    const ageText = announcement.eligibility?.age?.displayText;
    const regionText = announcement.eligibility?.region?.displayText;
    const parts = [ageText, regionText].filter(Boolean);
    return parts.length > 0 ? parts.join(" ") : "상세 공고 참조";
  };

  return {
    target: formattedTarget(),
    price:
      announcement.mtRntchrg !== null
        ? `월 최소 ${formattedPrice(announcement.mtRntchrg)}`
        : "상세 공고 참조",
    period: {
      start: formatDate(announcement.startDate),
      end: formatDate(announcement.endDate),
    },
    method: `${announcement.publisher} 홈페이지`,
    url: announcement.url ?? "",
  };
};
