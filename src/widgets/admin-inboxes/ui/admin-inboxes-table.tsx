"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";

import Button from "@/src/shared/ui/button";
import cn from "@/src/shared/lib/cn";

import PublisherBadge from "./publisher-badge";
import type { AdminInboxItem } from "../model/admin-inboxes-type";

type Props = {
  items: AdminInboxItem[];
  className?: string;
};

const ACTION_BUTTON_CLASS =
  "h-12 w-[140px] rounded-full bg-blue-600 px-5 text-sm font-semibold text-white shadow-none";

function formatKST(dateTime: string) {
  const d = new Date(dateTime);

  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  const hh = String(d.getHours()).padStart(2, "0");
  const mi = String(d.getMinutes()).padStart(2, "0");

  return `${yyyy}-${mm}-${dd} ${hh}:${mi}`;
}

export default function AdminInboxesTable({ items, className }: Props) {
  const router = useRouter();

  const handleClickReview = useCallback(
    (announcementId: number) => {
      router.push(`/admin/review/${announcementId}`);
    },
    [router],
  );

  return (
    <section
      className={cn(
        "w-full overflow-hidden rounded-2xl border border-gray-200 bg-white",
        className,
      )}
    >
      <div className="grid grid-cols-[220px_120px_1fr_180px] items-center border-b border-gray-200 bg-gray-100 px-8 py-4 text-sm font-medium text-gray-600">
        <span>수집일시</span>
        <span className="text-center">공급주체</span>
        <span>공고명</span>
        <span className="text-center">액션</span>
      </div>

      <ul className="divide-y divide-gray-200">
        {items.map((row) => (
          <li
            key={row.announcementId}
            className="grid grid-cols-[220px_120px_1fr_180px] items-center px-8 py-7"
          >
            <span className="text-base text-gray-700">
              {formatKST(row.createdAt)}
            </span>

            <div className="flex justify-center">
              <PublisherBadge publisher={row.publisher} />
            </div>

            <div className="min-w-0">
              <p className="truncate text-lg font-semibold text-gray-900">
                {row.title}
              </p>

              <Button
                type="button"
                className="mt-2 inline-flex items-center gap-2 text-sm font-medium text-blue-600"
                onClick={() =>
                  console.log("open original:", row.announcementId)
                }
              >
                <span className="inline-flex h-5 w-5 items-center justify-center rounded border border-blue-200">
                  ↗
                </span>
                원문 보기
              </Button>
            </div>

            <div className="flex justify-end">
              <Button
                type="button"
                onClick={() => handleClickReview(row.announcementId)}
                className={ACTION_BUTTON_CLASS}
              >
                검토 및 등록하기
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
