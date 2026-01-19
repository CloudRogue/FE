"use client";

import { useQuery } from "@tanstack/react-query";

import { getAdminInboxes } from "@/src/entities/admin-inboxes";
import { AdminInboxesTable } from "@/src/widgets/admin-inboxes";
import Button from "@/src/shared/ui/button";

export default function AdminInboxesPage() {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["admin-inboxes"],
    queryFn: getAdminInboxes,
    staleTime: 10_000,
  });

  if (isLoading) {
    return <div className="p-6">로딩중...</div>;
  }

  if (isError) {
    return (
      <div className="p-6">
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

  return <AdminInboxesTable items={data?.data ?? []} />;
}
