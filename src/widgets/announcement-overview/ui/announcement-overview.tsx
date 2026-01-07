import { AnnouncementDetail } from "@/src/entities/announcement-detail/model/announcement.types";
import { OverviewRow } from "@/src/entities/announcement-detail/ui/overview-row";
import { ApplyActions } from "@/src/features/announcement-apply/ui/apply-actions";

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

export function AnnouncementOverview({
  announcementId,
  data,
}: AnnouncementSummaryProps) {
  return (
    <section className="bg-white p-6 rounded-2xl">
      <h3 className="text-lg font-bold text-gray-900">공고 요약</h3>
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

      <ApplyActions
        announcementId={announcementId}
        originalUrl={data.originalUrl}
      />
    </section>
  );
}
