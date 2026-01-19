"use client";

import {
  ManagementDetailHeader,
  managementDetailQueries,
  ManagementDocumentList,
  ManagementStepSection,
} from "@/src/entities/management-detail";
import { ManagementStepButton } from "@/src/features/announcement-outbound";
import { formatDateStr } from "@/src/shared/lib/date";
import { Accordion } from "@/src/shared/ui/arccordion";
import { useQuery } from "@tanstack/react-query";

interface ManagementDetailPageProps {
  announcementId: string;
}

export default function ManagementDetailPage({
  announcementId,
}: ManagementDetailPageProps) {
  const { data, isLoading } = useQuery(
    managementDetailQueries.detail(announcementId),
  );

  if (isLoading) {
    return (
      <div className="p-10 text-center text-slate-400">
        데이터를 불러오는 중입니다...
      </div>
    );
  }

  if (!data) {
    return (
      <div className="p-10 text-center">공고 정보를 찾을 수 없습니다.</div>
    );
  }

  const { currentStatus, apply, docResult, finalResult } = data;

  const isStep2Done = currentStatus === "DOCUMENT_PENDING";
  const isStep3Done = ["DOCUMENT_PENDING", "FINAL_PENDING"].includes(
    currentStatus,
  );

  return (
    <div>
      {/* 상단 */}
      <div className="bg-white">
        <ManagementDetailHeader data={data} announcementId={announcementId} />
      </div>
      <div className="p-5 bg-gray-100 min-h-screen">
        {/* 공고 접수 */}
        <ManagementStepSection
          label="공고 접수"
          date={formatDateStr(apply.date)}
          isCompleted={true}
        >
          <Accordion
            title="필수 서류"
            defaultOpen
            className="mb-3"
            btnClassName="bg-blue-50/50 py-6"
          >
            <ManagementDocumentList documents={apply.documents} type="APPLY" />
          </Accordion>
          <ManagementStepButton
            label="공고 지원하기"
            title={data.title}
            href={data.applyUrl}
            announcementId={Number(announcementId)}
          />
        </ManagementStepSection>

        {/* 서류대상자 발표 */}
        <ManagementStepSection
          label="서류대상자 발표"
          date={formatDateStr(docResult.date)}
          isCompleted={isStep2Done}
        >
          <Accordion
            title="서류대상자 제출 서류"
            defaultOpen
            className="mb-3"
            btnClassName="bg-[#FEF9F1] py-6"
          >
            <ManagementDocumentList
              documents={docResult.documents}
              type="APPLY"
            />
          </Accordion>
          <ManagementStepButton
            label="서류 지원하기"
            href={data.applyUrl}
            disabled={!isStep2Done}
            announcementId={data.announcementId}
          />
        </ManagementStepSection>

        {/* 당첨자 발표 */}
        <ManagementStepSection
          label="당첨자 발표"
          date={formatDateStr(finalResult.date)}
          isCompleted={isStep3Done}
        >
          <div className="bg-red-50 rounded-2xl p-4 text-[13px] text-slate-600 leading-relaxed">
            {finalResult.summary || "당첨자 발표를 기다려주세요."}
          </div>
        </ManagementStepSection>
      </div>
    </div>
  );
}
