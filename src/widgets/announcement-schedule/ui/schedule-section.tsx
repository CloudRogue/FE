import {
  AnnouncementDetail,
  DetailRow,
} from "@/src/entities/announcement-detail";
import { formatDateSpot } from "@/src/shared/lib/date";

export function ScheduleSection({
  announcement,
}: {
  announcement: AnnouncementDetail;
}) {
  return (
    <section className="bg-white p-4 rounded-lg">
      <h3 className="text-h2 font-semibold mb-4">공고 일정</h3>

      <div className="space-y-1 font-bold">
        <DetailRow
          label="접수 기간"
          value={`${formatDateSpot(announcement.startDate)} ~ ${formatDateSpot(announcement.endDate)}`}
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
