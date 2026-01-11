// 제거

import {
  AnnouncementDetail,
  getAnnouncementSummary,
  OverviewRow,
} from "@/src/entities/announcement-detail";
import Button from "@/src/shared/ui/button";
import Link from "next/link";

interface AnnouncementSummaryProps {
  announcementId: AnnouncementDetail["announcementId"];
  data: {
    target: string;
    price: string;
    period: { start: string; end: string };
    method: string;
    originalUrl: string;
  };
}

export async function OverviewSection({
  data,
  announcementId,
}: AnnouncementSummaryProps) {
  const { kvDigest } = await getAnnouncementSummary(announcementId);

  return (
    <section className="bg-white p-6 rounded-2xl">
      <h3 className="text-lg font-bold text-gray-900">공고 개요</h3>
      <p className="text-gray-400 text-sm mb-5">
        복잡한 공고문 정보를 요약해드릴게요!
      </p>

      <div className="space-y-1 font-bold">
        <OverviewRow label="대상" value={data.target} />
        <OverviewRow label="금액" value={data.price} />
        <OverviewRow
          label="기간"
          value={`${data.period.start} ~ ${data.period.end}`}
        />
        <OverviewRow label="방법" value={data.method} />
      </div>

      <Link href={data.originalUrl} className="w-full mt-6 inline-block">
        <Button className="flex-1 bg-[#F3F4F6] text-[#61666C] py-4 rounded-xl font-bold hover:bg-gray-800">
          공고 보러가기
        </Button>
      </Link>
    </section>
  );
}
