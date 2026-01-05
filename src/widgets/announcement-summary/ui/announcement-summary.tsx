import { SummaryRow } from "@/src/entities/announcement-detail/ui/summary-row";
import { ApplyActions } from "@/src/features/announcement-apply/ui/apply-actions";

interface SummaryData {
  target: string;
  price: string;
  period: { start: string; end: string };
  method: string;
  sourceUrl: { originalUrl: string; url?: string };
}

export function AnnouncementSummary({
  announcementId,
  data,
}: {
  announcementId: number;
  data: SummaryData;
}) {
  return (
    <section className="bg-white p-6 rounded-2xl">
      <h3 className="text-lg font-bold text-gray-900">공고 요약</h3>
      <p className="text-gray-400 text-sm mb-5">
        복잡한 공고문 정보를 요약해드릴게요!
      </p>

      <div className="space-y-1 font-bold">
        <SummaryRow label="대상" value={data.target} />
        <SummaryRow label="금액" value={data.price} />
        <SummaryRow
          label="기간"
          value={`${data.period.start} ~ ${data.period.end}`}
        />
        <SummaryRow label="방법" value={data.method} />
      </div>

      <ApplyActions
        announcementId={announcementId}
        sourceUrl={data.sourceUrl}
      />
    </section>
  );
}
