"use client";

import { ManagementStatusBadge } from "@/src/entities/management";
import {
  managementDetailQueries,
  ManagementDocumentItem,
  ManagementStepButton,
  ManagementStepSection,
} from "@/src/entities/management-detail";
import { ROUTES } from "@/src/shared/constants/routes";
import { formatDateStr } from "@/src/shared/lib/date";
import { Accordion } from "@/src/shared/ui/arccordion";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";

interface ManagementDetailPageProps {
  announcementId: string;
}

export default function ManagementDetailPage({
  announcementId,
}: ManagementDetailPageProps) {
  const { data, isLoading } = useQuery(
    managementDetailQueries.detail(announcementId),
  );

  if (isLoading) return <div className="p-5 text-center">로딩 중...</div>;
  if (!data) return null;

  const currentStatus = data.currentStatus;
  const isStep2Done = currentStatus === "DOCUMENT_PENDING";
  const isStep3Done = currentStatus === "FINAL_PENDING";

  return (
    <div>
      {/* 상단 */}
      <div className="p-5">
        <ManagementStatusBadge
          status={currentStatus}
          publisher={data.publisher}
          housingType={data.housingType}
        />
        <div className="flex justify-between mb-4">
          <div className="flex flex-col justify-between">
            <h1 className="text-2xl">{data.title}</h1>
            <Link
              href={`/${ROUTES.ANNOUNCEMENT}/${announcementId}`}
              className="text-sm text-slate-400 underline"
            >
              자세히 보기
            </Link>
          </div>
          <div className="w-20 h-20 bg-gray-400 rounded-xl">
            <Image
              src="/default-thumbnail.png"
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
          date={formatDateStr(data.apply.date)}
          isCompleted={true}
        >
          <Accordion
            title={`필수 서류`}
            defaultOpen
            className="mb-3"
            btnClassName="bg-[#1778FF10] py-6"
          >
            <div className="flex flex-col gap-2">
              {data.apply.documents.map((doc) => (
                <ManagementDocumentItem
                  key={doc.id}
                  title={doc.name}
                  description={
                    doc.scope === "COMMON" ? "공통 제출 서류" : "대상자 한정"
                  }
                />
              ))}
            </div>
          </Accordion>
          <ManagementStepButton label="공고 지원하기" href={data.applyUrl} />
        </ManagementStepSection>

        {/* 서류대상자 발표 */}
        <ManagementStepSection
          label="서류대상자 발표"
          date={formatDateStr(data.docResult.date)}
          isCompleted={isStep2Done}
        >
          {data.docResult.documents.length > 0 && (
            <Accordion
              title="서류대상자 제출 서류"
              defaultOpen
              className="mb-3"
              btnClassName="bg-[#FEF9F1] py-6"
            >
              <div className="flex flex-col gap-2">
                {data.docResult.documents.map((doc) => (
                  <ManagementDocumentItem
                    key={doc.id}
                    title={doc.name}
                    description={
                      doc.scope === "TARGET_ONLY"
                        ? "해당자 추가 제출"
                        : "공통 서류"
                    }
                  />
                ))}
              </div>
            </Accordion>
          )}
          <ManagementStepButton
            label="서류 지원하기"
            href={data.applyUrl}
            disabled={!isStep2Done}
          />
        </ManagementStepSection>

        {/* 단계 3: 당첨자 발표 */}
        <ManagementStepSection
          label="당첨자 발표"
          date={formatDateStr(data.finalResult.date)}
          isCompleted={isStep3Done}
        >
          <div className="bg-red-50 rounded-2xl p-4 text-[13px] text-slate-600 leading-relaxed">
            {data.finalResult.summary || "당첨자 발표를 기다려주세요."}
          </div>
        </ManagementStepSection>
      </div>
    </div>
  );
}
