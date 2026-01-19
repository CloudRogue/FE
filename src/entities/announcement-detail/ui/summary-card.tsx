import {
  AnnouncementDetail,
  getAnnouncementOverview,
  getAnnouncementSummary,
  OverviewRow,
  RegionOverviewRow,
} from "@/src/entities/announcement-detail";
import Button from "@/src/shared/ui/button";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

interface SummaryCardProps {
  announcementId: AnnouncementDetail["announcementId"];
  url: AnnouncementDetail["url"];
}

export default async function SummaryCard({
  announcementId,
  url,
}: SummaryCardProps) {
  const id = String(announcementId);

  const [overview, summary] = await Promise.all([
    getAnnouncementOverview(id),
    getAnnouncementSummary(id),
  ]);

  const { regions = [], applyMethod, target = "알 수 없음" } = overview;
  const announcementSummary = summary?.summary ?? "요약 정보가 없습니다.";

  return (
    <section className="bg-white p-6 rounded-2xl shadow-sm">
      <h3 className="text-lg font-bold text-gray-900 mb-5">공고 개요</h3>

      <div className="space-y-1 font-bold mb-4">
        <OverviewRow label="항목" value="공고 내용" />
        <OverviewRow label="대상" value={target} />
        <RegionOverviewRow regions={regions} />
        <OverviewRow label="접수 방법" value={applyMethod} />
      </div>

      <div className="text-gray-600 leading-relaxed whitespace-pre-wrap">
        {announcementSummary}
      </div>

      <Link
        href={url ?? ""}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full mt-6 inline-block"
      >
        <Button className="flex items-center gap-2 w-full bg-[#F3F4F6] text-[#61666C] py-4 rounded-xl font-bold hover:bg-gray-100 border-none">
          공고 보러가기 <ExternalLink size={15} />
        </Button>
      </Link>
    </section>
  );
}
