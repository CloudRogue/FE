import {
  AnnouncementDetail,
  OverviewRow,
} from "@/src/entities/announcement-detail";

export function ScheduleSection({
  announcement,
  period,
}: {
  announcement: AnnouncementDetail;
  period: { start: string; end: string };
}) {
  return (
    <section className="bg-white p-6 rounded-2xl">
      <h3 className="text-lg font-bold text-gray-900 mb-5">공고 개요</h3>

      <div className="space-y-1 font-bold">
        <OverviewRow
          label="접수 기간"
          value={`${period.start} ~ ${period.end}`}
        />
        <OverviewRow
          label="서류 대상자 발표일"
          value={announcement.publishedAt}
        />
        <OverviewRow
          label="최종 당첨자 발표일"
          value={announcement.publishedAt}
        />
      </div>
    </section>
  );
}
