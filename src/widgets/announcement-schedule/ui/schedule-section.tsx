import {
  AnnouncementDetail,
  DetailRow,
} from "@/src/entities/announcement-detail";

export function ScheduleSection({
  announcement,
  period,
}: {
  announcement: AnnouncementDetail;
  period: { start: string; end: string };
}) {
  return (
    <section className="bg-white p-4 rounded-lg">
      <h3 className="text-h2 font-semibold mb-4">공고 일정</h3>

      <div className="space-y-1 font-bold">
        <DetailRow
          label="접수 기간"
          value={`${period.start} ~ ${period.end}`}
        />
        <DetailRow
          label="서류 대상자 발표일"
          value={announcement.documentPublishedAt}
        />
        <DetailRow
          label="최종 당첨자 발표일"
          value={announcement.finalPublishedAt}
        />
      </div>
    </section>
  );
}
