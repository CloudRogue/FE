import {
  AnnouncementDetail,
  getAnnouncementSummary,
} from "@/src/entities/announcement-detail";

interface SummaryCardProps {
  announcementId: AnnouncementDetail["announcementId"];
}

export default async function SummaryCard({
  announcementId,
}: SummaryCardProps) {
  const { kvDigest } = await getAnnouncementSummary(announcementId);

  return (
    <section className="bg-white p-6 rounded-2xl">
      <h3 className="text-lg font-bold text-gray-900">공고 요약</h3>
      <ul className="space-y-4">
        {kvDigest.map((item) => (
          <li key={item.key} className="flex flex-col gap-1">
            <span className="text-sm font-semibold text-blue-600">
              {item.key}
            </span>
            <p className="text-[15px] text-gray-700 leading-relaxed whitespace-pre-wrap">
              {item.value}
            </p>
          </li>
        ))}
      </ul>

      {kvDigest.length === 0 && (
        <p className="text-gray-400 text-center py-4">요약 정보가 없습니다.</p>
      )}
    </section>
  );
}
