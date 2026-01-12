import {
  MANAGEMENT_STATUS_TYPE,
  ManagementStatus,
  ManagementStatusBadge,
} from "@/src/entities/management";
import { ManagementStepSection } from "@/src/entities/management-detail";
import { ROUTES } from "@/src/shared/constants/routes";
import Button from "@/src/shared/ui/button";
import { ChevronDown, ChevronUp, ExternalLink } from "lucide-react";
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
          <h1 className="text-2xl">title</h1>
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
        <Link href={ROUTES.ANNOUNCEMENT}>자세히 보기</Link>
      </div>
      {/* 하단 */}
      {/* 시안 하단 리스트 섹션 */}
      <div className="p-5 bg-[#F8F9FB] min-h-screen">
        {/* 단계 1: 공고 접수 */}
        <ManagementStepSection
          label="공고 접수"
          date="2000.00.00 00시"
          isCompleted={isStep1Done}
        >
          {/* 아코디언 형태의 카드 */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden mb-3">
            <div className="p-4 flex justify-between items-center border-b border-slate-50">
              <span className="font-bold text-slate-800">필수 서류</span>
              <ChevronUp size={20} className="text-slate-900" />
            </div>
            <div className="p-4 flex justify-between items-center bg-white">
              <div>
                <p className="font-bold text-slate-800">서류 A</p>
                <p className="text-xs text-slate-400">서류 설명 및 조건</p>
              </div>
              <button className="bg-slate-100 text-slate-400 px-2 py-1 rounded text-[11px] font-bold">
                발급처
              </button>
            </div>
          </div>

          <Button className="w-full h-14 bg-[#3B82F6] hover:bg-[#2563EB] rounded-2xl flex items-center justify-center gap-2 text-white font-bold text-lg shadow-lg shadow-blue-100">
            공고 지원하기 <ExternalLink size={20} />
          </Button>
        </ManagementStepSection>

        {/* 단계 2: 서류대상자 발표 */}
        <ManagementStepSection
          label="서류대상자 발표"
          date="2000.00.00 00시"
          isCompleted={isStep2Done}
        >
          <div className="bg-[#FFFBF5] rounded-2xl border border-orange-50 p-4 flex justify-between items-center">
            <span className="font-bold text-slate-800 text-[15px]">
              서류대상자 제출 서류
            </span>
            <ChevronDown size={20} className="text-slate-900" />
          </div>
          <Button
            disabled
            className="w-full h-14 bg-slate-100 text-slate-300 rounded-2xl font-bold mt-3 border-none pointer-events-none"
          >
            서류 제출하기 <ExternalLink size={20} />
          </Button>
        </ManagementStepSection>

        {/* 단계 3: 당첨자 발표 */}
        <ManagementStepSection
          label="당첨자 발표"
          date="2000.00.00 00시"
          isCompleted={false}
        >
          <div className="bg-[#FFF5F6] rounded-2xl p-4 text-[13px] text-slate-600 leading-relaxed">
            당첨 시 유의사항이 들어가는 자리... (요약글 연동)
          </div>
        </ManagementStepSection>
      </div>
    </div>
  );
}
