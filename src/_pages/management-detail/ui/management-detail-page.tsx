import {
  MANAGEMENT_STATUS_TYPE,
  ManagementStatus,
  ManagementStatusBadge,
} from "@/src/entities/management";
import {
  ManagementDocumentItem,
  ManagementStepButton,
  ManagementStepSection,
} from "@/src/entities/management-detail";
import { ROUTES } from "@/src/shared/constants/routes";
import { Accordion } from "@/src/shared/ui/arccordion";
import Image from "next/image";
import Link from "next/link";

interface ManagementDetailPageProps {
  status?: ManagementStatus;
}

export default function ManagementDetailPage({
  status = MANAGEMENT_STATUS_TYPE.APPLYING,
}: ManagementDetailPageProps) {
  const isStep1Done = true;
  const isStep2Done =
    status === MANAGEMENT_STATUS_TYPE.PENDING ||
    status === MANAGEMENT_STATUS_TYPE.FINAL;
  return (
    <div>
      {/* 상단 */}
      <div className="p-5">
        <ManagementStatusBadge status={status} />
        <div className="flex justify-between mb-4">
          <div className="flex flex-col justify-between">
            <h1 className="text-2xl">title</h1>
            <Link href={ROUTES.ANNOUNCEMENT}>자세히 보기</Link>
          </div>
          <div className="w-20 h-20 bg-gray-400 rounded-xl">
            <Image
              src="/"
              alt={`의 썸네일`}
              width={80}
              height={80}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
      <div className="p-5 bg-gray-100 min-h-screen">
        {/* 공고 접수 */}
        <ManagementStepSection
          label="공고 접수"
          date="2000.00.00 00시"
          isCompleted={isStep1Done}
        >
          <Accordion title={`필수 서류`} defaultOpen className="mb-3">
            <ManagementDocumentItem
              title="서류 A"
              description="서류 설명 및 조건"
            />
          </Accordion>
          <ManagementStepButton label="공고 지원하기" />
        </ManagementStepSection>

        {/* 서류대상자 발표 */}
        <ManagementStepSection
          label="서류대상자 발표"
          date="2000.00.00 00시"
          isCompleted={isStep2Done}
        >
          <Accordion title="서류대상자 제출 서류" defaultOpen className="mb-3">
            <ManagementDocumentItem
              title="서류 A"
              description="서류 설명 및 조건"
            />
          </Accordion>
          <ManagementStepButton label="서류 지원하기" disabled={!isStep2Done} />
        </ManagementStepSection>

        {/* 단계 3: 당첨자 발표 */}
        <ManagementStepSection
          label="당첨자 발표"
          date="2000.00.00 00시"
          isCompleted={false}
        >
          <div className="bg-red-50 rounded-2xl p-4 text-[13px] text-slate-600 leading-relaxed">
            당첨 시 유의사항이 들어가는 자리...
          </div>
        </ManagementStepSection>
      </div>
    </div>
  );
}
