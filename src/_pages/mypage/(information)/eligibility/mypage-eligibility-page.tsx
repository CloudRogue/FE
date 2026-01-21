"use client";

import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import Button from "@/src/shared/ui/button";

import { getMyPageEligibility } from "@/src/entities/mypage-eligibility";
import type {
  MyPageEligibilityAnswer,
  MyPageEligibilityResponse,
} from "@/src/entities/mypage-eligibility";

import {
  putMyPageEligibilityDetail,
  toMyPageEligibilityUpsertRequestFromAdditionalDraft,
  toMyPageEligibilityUpsertRequestFromRequiredDraft,
} from "@/src/features/mypage-eligibility";

import { MyPageEligibilityWidget } from "@/src/widgets/mypage-eligibility";

type AnswerValue = string | number | boolean | string[];

const QUERY_KEY = ["mypage-eligibility"];

const EMPTY: MyPageEligibilityResponse = {
  requiredOnboardingAnswers: [],
  additionalOnboardingAnswers: [],
};

function toDraft(
  items: MyPageEligibilityAnswer[],
): Record<number, AnswerValue> {
  const draft: Record<number, AnswerValue> = {};
  for (const item of items) {
    draft[item.id] = item.value as AnswerValue;
  }
  return draft;
}

export default function MyPageEligibilityPage() {
  const queryClient = useQueryClient();

  const [editStatus, setEditStatus] = useState({
    required: false,
    additional: false,
  });

  const [requiredDraft, setRequiredDraft] = useState<
    Record<number, AnswerValue | undefined>
  >({});
  const [additionalDraft, setAdditionalDraft] = useState<
    Record<number, AnswerValue | undefined>
  >({});

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: QUERY_KEY,
    queryFn: getMyPageEligibility,
    staleTime: 10_000,
  });

  const safeData = useMemo(() => data ?? EMPTY, [data]);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: putMyPageEligibilityDetail,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: QUERY_KEY });
    },
  });

  const handleChangeRequired = (id: number, next: AnswerValue) => {
    setRequiredDraft((prev) => ({ ...prev, [id]: next }));
  };

  const handleChangeAdditional = (id: number, next: AnswerValue) => {
    setAdditionalDraft((prev) => ({ ...prev, [id]: next }));
  };

  const handleToggleRequired = async () => {
    if (isPending) return;

    if (editStatus.required) {
      const payload = toMyPageEligibilityUpsertRequestFromRequiredDraft(
        safeData.requiredOnboardingAnswers,
        requiredDraft,
      );

      await mutateAsync(payload);
      setEditStatus((prev) => ({ ...prev, required: false }));
      return;
    }

    setRequiredDraft(toDraft(safeData.requiredOnboardingAnswers));
    setEditStatus((prev) => ({ ...prev, required: true }));
  };

  const handleToggleAdditional = async () => {
    if (isPending) return;

    if (editStatus.additional) {
      const payload = toMyPageEligibilityUpsertRequestFromAdditionalDraft(
        safeData.additionalOnboardingAnswers,
        additionalDraft,
      );

      await mutateAsync(payload);
      setEditStatus((prev) => ({ ...prev, additional: false }));
      return;
    }

    setAdditionalDraft(toDraft(safeData.additionalOnboardingAnswers));
    setEditStatus((prev) => ({ ...prev, additional: true }));
  };

  if (isLoading) {
    return <div className="p-6 text-sm text-slate-700">로딩중...</div>;
  }

  if (isError) {
    return (
      <div className="p-6">
        <div className="mb-3 text-sm text-slate-700">
          지원 자격 정보를 불러오지 못했습니다.
        </div>
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

  return (
    <div className={isPending ? "pointer-events-none opacity-60" : undefined}>
      <MyPageEligibilityWidget
        data={safeData}
        editStatus={editStatus}
        requiredDraft={requiredDraft}
        additionalDraft={additionalDraft}
        onChangeRequired={handleChangeRequired}
        onChangeAdditional={handleChangeAdditional}
        onToggleRequired={handleToggleRequired}
        onToggleAdditional={handleToggleAdditional}
      />
    </div>
  );
}
