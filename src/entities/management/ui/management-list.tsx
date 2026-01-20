"use client";

import {
  AnyManagedAnnouncement,
  ManagementListCard,
  managementQueries,
  ManagementStatus,
} from "@/src/entities/management";
import { ROUTES } from "@/src/shared/constants/routes";
import { useIntersection } from "@/src/shared/hooks/use-intersection";
import { useInfiniteQuery } from "@tanstack/react-query";
import Link from "next/link";

interface ManagementListProps {
  status: ManagementStatus;
}

export function ManagementList({ status }: ManagementListProps) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery(managementQueries.list(status));

  const intersectRef = useIntersection(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  });

  return (
    <div className="flex flex-col gap-4">
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

      <div ref={intersectRef} className="h-10 w-full" />
      {isFetchingNextPage && (
        <p className="text-center text-sm text-gray-400">로딩 중...</p>
      )}
    </div>
  );
}
