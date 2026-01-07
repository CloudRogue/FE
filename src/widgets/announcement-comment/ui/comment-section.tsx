"use client";

import { useAnnouncementComments } from "@/src/entities/announcement-comment/api/queries";
import { CommentCard } from "@/src/entities/announcement-comment/ui/comment-card";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useId } from "react";

interface CommentSectionProps {
  announcementId: number;
}

export function CommentSection({ announcementId }: CommentSectionProps) {
  const baseId = useId();
  const pathname = usePathname();

  const isDetailPage = pathname === `/announcement/${announcementId}`;
  const displaySize = isDetailPage ? 2 : 20;

  const {
    data: comments,
    isLoading,
    isError,
  } = useAnnouncementComments(String(announcementId), 0, displaySize);

  // 목데이터 사용 추후 변경 필요
  const displayComments = commentsMock;
  const totalCount = commentsMock.length;

  return (
    <section className="bg-white p-6 rounded-2xl space-y-5">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold text-gray-900">
          공고 댓글({totalCount})
        </h3>

        {displayComments.length && (
          <Link
            href={`/announcement/${announcementId}/comments`}
            className="text-sm text-gray-400 font-medium flex items-center hover:text-gray-600 transition-colors"
          >
            댓글 더보기 <ChevronRight size={16} />
          </Link>
        )}
      </div>

      <div className="space-y-4">
        {isLoading && !displayComments.length && (
          <div className="p-6 text-center text-gray-400 text-sm">
            댓글 불러오는 중...
          </div>
        )}

        {isError && (
          <div className="p-6 text-center text-red-400 text-sm">
            댓글을 불러오지 못했습니다.
          </div>
        )}

        {!isLoading && !isError && (
          <>
            {displayComments.length > 0 ? (
              displayComments.map((comment, index) => (
                <CommentCard
                  key={`${baseId}-${comment.id}-${index}`}
                  comment={comment}
                />
              ))
            ) : (
              <p className="text-center py-10 text-gray-400 text-sm">
                아직 작성된 댓글이 없습니다.
              </p>
            )}
          </>
        )}

        <p className="text-black">
          댓글 데이터 출력 예시(API 연동 이후 제거 예정)
        </p>
        {displayComments.length > 0 ? (
          displayComments.map((comment, index) => (
            <CommentCard
              key={`${baseId}-${comment.id}-${index}`}
              comment={comment}
            />
          ))
        ) : (
          <p className="text-center py-10 text-gray-400 text-sm">
            아직 작성된 댓글이 없습니다.
          </p>
        )}
      </div>
    </section>
  );
}

const commentsMock = [
  {
    items: [
      {
        id: 800002,
        announcementId: "900002",
        parentId: 14,
        kind: "ANSWER" as const,
        content:
          "Mock content 내용 2\n\n- 긴 텍스트 테스트\n- 항목\n- 항목\n- 항목\n- 항목\n- 항목\n",
        contentFilter: "PROFANITY" as const,
        likeCount: 14,
        reportCount: 14,
        deleted: true,
        createdAt: "2025-12-31T11:14:00+09:00",
        updatedAt: "2025-12-31T11:14:00+09:00",
        deletedAt: null,
        author: {
          userId: "01JH6Z8R8V5K0Q9N7Z2F3M1T8A",
        },
      },
      {
        id: 800002,
        announcementId: "900002",
        parentId: 14,
        kind: "ANSWER" as const,
        content:
          "Mock content 내용 2\n\n- 긴 텍스트 테스트\n- 항목\n- 항목\n- 항목\n- 항목\n- 항목\n",
        contentFilter: "PROFANITY" as const,
        likeCount: 14,
        reportCount: 14,
        deleted: true,
        createdAt: "2025-12-31T11:14:00+09:00",
        updatedAt: "2025-12-31T11:14:00+09:00",
        deletedAt: null,
        author: {
          userId: "01JH6Z8R8V5K0Q9N7Z2F3M1T8A",
        },
      },
    ],
    meta: {
      page: 0,
      size: 20,
      totalElements: 2,
      totalPages: 1,
      hasNext: false,
      hasPrev: false,
    },
  },
][0].items;
