import { AnnouncementDetail } from "@/src/entities/announcement-detail";
import { SupportContentWrapper } from "@/src/features/announcement-eligibility-check";
import { ErrorBoundary } from "@/src/shared/api/error-boundary";
import { SupportContentButtons } from "@/src/widgets/announcement-support";
import { Suspense } from "react";

interface SupportSectionProps {
  announcement: AnnouncementDetail;
}

export function SupportSection({ announcement }: SupportSectionProps) {
  return (
    <section className="bg-white p-6 rounded-2xl">
      <h3 className="text-lg font-bold text-gray-900">지원 자격</h3>
      <p className="text-gray-400 text-sm mb-5">
        자격 진단을 받고 선정 가능성을 판단해보세요.
      </p>

      <ErrorBoundary
        fallback={
          <p className="text-red-500 text-sm">
            진단 정보를 불러오는 중 오류가 발생했습니다. 잠시 후 다시
            시도해주세요.
          </p>
        }
      >
        <Suspense
          fallback={
            <p className="text-gray-400 text-sm text-center">
              지원 자격 진단 중..
            </p>
          }
        >
          <SupportContentWrapper announcement={announcement} />
        </Suspense>
      </ErrorBoundary>

      <SupportContentButtons />

      <p className="text-gray-400 text-sm mt-6">
        진단 결과는 입력된 정보를 바탕으로 한 모의 AI 계산 결과로, 실제와는 다를
        수 있으니 실제 지원 과정에서 지원 자격 및 가산 정보를 꼭 확인해 주세요.
      </p>
    </section>
  );
}
