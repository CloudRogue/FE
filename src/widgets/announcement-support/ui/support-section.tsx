import {
  AnnouncementDetail,
  EligibilityResult,
} from "@/src/entities/announcement-detail";
import { SupportContent } from "@/src/widgets/announcement-support";

interface SupportSectionProps {
  announcement: AnnouncementDetail;
}

export async function SupportSection({ announcement }: SupportSectionProps) {
  // const eligibilityCheckResult = await postEligibilityCheck(
  //   String(announcement.announcementId),
  // );

  const eligibilityCheckResult = {
    supportStatus: "ELIGIBLE",
    diagnosedAt: "2026-01-09T16:10:00+09:00",
    predictedRank: 1,
    predictedBonusPoints: 3,
    trace: [
      {
        key: "무주택 세대구성원인가요?",
        passed: true,
        message:
          "프로필 상 '주택 보유: 없음'으로 확인되어 무주택 요건을 충족합니다.",
      },
      {
        key: "소득이 4분위 이하인가요?",
        passed: true,
        message: "소득 3분위로 확인되어 기준(4분위 이하)을 충족합니다.",
      },
    ],
  } as EligibilityResult;

  return (
    <section className="bg-white p-6 rounded-2xl">
      <h3 className="text-lg font-bold text-gray-900">지원 자격</h3>
      <p className="text-gray-400 text-sm mb-5">
        자격 진단을 받고 선정 가능성을 판단해보세요.
      </p>

      <SupportContent
        announcement={announcement}
        eligibilityCheck={eligibilityCheckResult}
      />

      <p className="text-gray-400 text-sm mt-6">
        진단 결과는 입력된 정보를 바탕으로 한 모의 AI 계산 결과로, 실제와는 다를
        수 있으니 실제 지원 과정에서 지원 자격 및 가산 정보를 꼭 확인해 주세요.
      </p>
    </section>
  );
}
