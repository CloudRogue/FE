import {
  AnnouncementDetail,
  DetailRow,
  getAnnouncementOverview,
  getAnnouncementSummary,
  RegionRow,
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

  const { regions = [], applyMethod, target } = overview;
  const announcementSummary = summary?.summary ?? "요약 정보가 없습니다.";

  return (
    <section className="bg-white p-4 rounded-lg">
      <h3 className="text-h2 font-semibold mb-4">공고 개요</h3>

      <div className="space-y-2 font-bold mb-4">
        <DetailRow label="대상" value={target} />
        <RegionRow regions={regions} />
        <DetailRow label="접수 방법" value={applyMethod} />
      </div>

      <div className="mb-4 p-4 bg-gray-bg rounded-md text-body1 leading-relaxed whitespace-pre-wrap">
        {announcementSummary}
      </div>

      <Link
        href={url ?? ""}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full inline-block"
      >
        <Button variant="secondary" className="gap-1.5 w-full">
          <ExternalLink size={15} />
          공고 보러가기
        </Button>
      </Link>
    </section>
  );
}
