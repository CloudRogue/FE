"use client";

import {
  AnyManagedAnnouncement,
  MANAGEMENT_STATUS,
  ManagementListCard,
  ManagementListSkeleton,
  managementQueries,
  ManagementStatus,
} from "@/src/entities/management";
import { ROUTES } from "@/src/shared/constants/routes";
import { useIntersection } from "@/src/shared/hooks/use-intersection";
import Button from "@/src/shared/ui/button";
import { useInfiniteQuery } from "@tanstack/react-query";
import Link from "next/link";

interface ManagementListProps {
  status: ManagementStatus;
}

export function ManagementList({ status }: ManagementListProps) {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    refetch,
  } = useInfiniteQuery(managementQueries.list(status));

  const intersectRef = useIntersection(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  });

  const getStatusSummary = () => {
    const summary = data?.pages[0]?.summary;
    if (!summary) return { label: MANAGEMENT_STATUS[status].label, count: 0 };

    switch (status) {
      case "APPLYING":
        return { label: "지원 중 공고", count: summary.applyingCount };
      case "DOCUMENT_PENDING":
        return {
          label: "서류대상자 발표 대기 중 공고",
          count: summary.documentWaitingCount,
        };
      case "FINAL_PENDING":
        return {
          label: "최종당첨자 발표 대기 중 공고",
          count: summary.finalWaitingCount,
        };
      case "CLOSED":
      default:
        return {
          label: "발표 완료된 공고",
          // API 수정 필요
          count: summary.closedCount,
        };
    }
  };

  const { label, count } = getStatusSummary();

  if (isLoading) {
    return <ManagementListSkeleton />;
  }

  if (isError) {
    return (
      <div className="py-20 text-center">
        <div className="mb-3 text-sm">목록을 불러오지 못했습니다.</div>
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

  const isEmpty = data?.pages[0]?.data.length === 0;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between text-h4 font-gray-700">
        <span className="font-medium">{label}</span>
        <span className="font-semibold">{count}</span>
      </div>

      {isEmpty ? (
        <div className="flex flex-col items-center justify-center py-20 text-gray-500">
          <p className="text-sm">아직 지원 관리 중인 공고가 없습니다.</p>
        </div>
      ) : (
        <>
          {data?.pages.map((page) =>
            page.data.map((item: AnyManagedAnnouncement, idx) => (
              <Link
                key={`${item.announcementId}-${idx}`}
                href={ROUTES.MANAGEMENT_DETAIL(item.announcementId)}
                className="block no-underline"
              >
                <ManagementListCard status={status} {...item} />
              </Link>
            )),
          )}
        </>
      )}

      <div ref={intersectRef} className="h-10 w-full" />
      {isFetchingNextPage && (
        <p className="text-center text-sm text-gray-400">로딩 중...</p>
      )}
    </div>
  );
}
