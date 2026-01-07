import { AnnouncementDetail } from "@/src/entities/announcement-detail/model/announcement.types";
import { SupportContent } from "@/src/widgets/announcement-support/ui/support-content";

interface SupportSectionProps {
  announcementId: AnnouncementDetail["announcementId"];
  status: AnnouncementDetail["status"];
}

export function SupportSection({
  announcementId,
  status,
}: SupportSectionProps) {
  const isClosed = status === "CLOSED";

  return (
    <section className="bg-white p-6 rounded-2xl">
      <h3 className="text-lg font-bold text-gray-900">지원 자격</h3>
      <p className="text-gray-400 text-sm mb-5">
        자격 진단을 받고 선정 가능성을 판단해보세요.
      </p>

      <SupportContent announcementId={announcementId} isClosed={isClosed} />

      <p className="text-gray-400 text-sm mt-6">
        본 결과는 입력된 정보를 바탕으로 한 AI 모의 계산 결과이므로, 실제와는
        다르거나 잘못된 정보가 있을 수 있으니 참고용으로만 활용해 주세요.
      </p>
    </section>
  );
}
