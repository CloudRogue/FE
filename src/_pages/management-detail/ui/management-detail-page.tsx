"use client";

import {
  ManagementDetailHeader,
  managementDetailQueries,
  ManagementDetailSkeleton,
  ManagementDocumentList,
  ManagementStepSection,
} from "@/src/entities/management-detail";
import { ManagementStepButton } from "@/src/features/announcement-outbound";
import { formatDateStr } from "@/src/shared/lib/date";
import Button from "@/src/shared/ui/button";
import { useQuery } from "@tanstack/react-query";

interface ManagementDetailPageProps {
  announcementId: string;
}

export default function ManagementDetailPage({
  announcementId,
}: ManagementDetailPageProps) {
  const { data, isLoading, isError, refetch } = useQuery(
    managementDetailQueries.detail(announcementId),
  );

  if (isLoading) {
    return <ManagementDetailSkeleton />;
  }

  if (isError) {
    return (
      <div className="py-20 text-center">
        <div className="mb-3 text-sm">공고 정보를 불러오지 못했습니다.</div>
        <Button
          type="button"
          onClick={() => refetch()}
          className="rounded-md border px-3 py-2 text-sm"
        >
          다시 시도
        </Button>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="p-10 text-center">공고 정보를 찾을 수 없습니다.</div>
    );
  }

  const { currentStatus, apply, docResult, finalResult, dDay } = data;

  const steps = [
    {
      type: "APPLYING",
      label: "공고 접수",
      data: apply,
      content: (
        <>
          <p className="text-body2 text-gray-400 font-bold">필수 서류</p>
          <ManagementDocumentList documents={apply.documents} />
          <ManagementStepButton
            href={data.applyUrl}
            announcementId={Number(announcementId)}
            disabled={currentStatus !== "APPLYING"}
          />
        </>
      ),
    },
    {
      type: "DOCUMENT_PENDING",
      label: "서류대상자 발표",
      data: docResult,
      content: (
        <>
          <p className="text-body2 text-gray-400 font-bold">
            서류대상자 제출 서류
          </p>
          <ManagementDocumentList documents={docResult.documents} />
        </>
      ),
    },
    {
      type: "FINAL_PENDING",
      label: "당첨자 발표",
      data: finalResult,
      content: (
        <p className="text-body2 text-slate-600">
          {finalResult.summary || "당첨자 발표를 기다려주세요."}
        </p>
      ),
    },
  ];

  return (
    <div className="p-4  bg-gray-bg">
      {/* 상단 */}
      <div className="bg-white">
        <ManagementDetailHeader data={data} announcementId={announcementId} />
      </div>
      <div>
        {steps.map((step, index) => (
          <ManagementStepSection
            key={step.type}
            type={step.type as any}
            label={step.label}
            date={formatDateStr(step.data.date)}
            dDay={dDay}
            currentStatus={currentStatus}
            isFrist={index === 0}
          >
            {step.content}
          </ManagementStepSection>
        ))}
      </div>
    </div>
  );
}
