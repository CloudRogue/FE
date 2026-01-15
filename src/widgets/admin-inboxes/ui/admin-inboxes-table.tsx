"use client";

import { useRouter } from "next/navigation";
import { ExternalLink } from "lucide-react";

import { ROUTES } from "@/src/shared/constants/routes";
import Button from "@/src/shared/ui/button";
import cn from "@/src/shared/lib/cn";
import { formatKST } from "@/src/shared/lib/date";

import { PublisherBadge } from "@/src/widgets/admin-inboxes";
import type { AdminInboxItem } from "@/src/widgets/admin-inboxes";

type Props = {
  items: AdminInboxItem[];
  className?: string;
};

const ACTION_BUTTON_CLASS =
  "h-12 w-[140px] rounded-full bg-blue-600 px-5 text-sm font-semibold text-white shadow-none";

const ORIGINAL_LINK_BUTTON_CLASS =
  "mt-2 inline-flex items-center gap-2 text-sm font-medium text-blue-600";

export default function AdminInboxesTable({ items, className }: Props) {
  const router = useRouter();

  const handleClickReview = (announcementId: number) => {
    router.push(ROUTES.ADMIN_REVIEW_DETAIL(announcementId));
  };

  return (
    <section
      className={cn(
        "w-full overflow-hidden rounded-2xl border border-gray-200 bg-white",
        className,
      )}
    >
      <table className="w-full table-fixed">
        <thead>
          <tr className="border-b border-gray-200 bg-gray-100 text-sm font-medium text-gray-600">
            <th scope="col" className="w-[220px] px-8 py-4 text-left">
              수집일시
            </th>
            <th scope="col" className="w-[120px] px-8 py-4 text-center">
              공급주체
            </th>
            <th scope="col" className="px-8 py-4 text-left">
              공고명
            </th>
            <th scope="col" className="w-[180px] px-8 py-4 text-center">
              액션
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">
          {items.map((row) => (
            <tr key={row.announcementId} className="align-middle">
              <td className="w-[220px] px-8 py-7">
                <span className="text-base text-gray-700">
                  {formatKST(row.createdAt)}
                </span>
              </td>

              <td className="w-[120px] px-8 py-7">
                <div className="flex justify-center">
                  <PublisherBadge publisher={row.publisher} />
                </div>
              </td>

              <td className="px-8 py-7">
                <div className="min-w-0">
                  <p className="truncate text-lg font-semibold text-gray-900">
                    {row.title}
                  </p>

                  <Button
                    type="button"
                    className={ORIGINAL_LINK_BUTTON_CLASS}
                    disabled
                  >
                    <span className="inline-flex h-5 w-5 items-center justify-center rounded border border-blue-200">
                      <ExternalLink className="h-3.5 w-3.5" />
                    </span>
                    원문 보기
                  </Button>
                </div>
              </td>

              <td className="w-[180px] py-7">
                <div className="flex justify-center">
                  <Button
                    type="button"
                    onClick={() => handleClickReview(row.announcementId)}
                    className={ACTION_BUTTON_CLASS}
                  >
                    검토 및 등록하기
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
