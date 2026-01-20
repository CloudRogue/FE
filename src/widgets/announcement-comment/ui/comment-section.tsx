"use client";

import {
  CommentCard,
  useAnnouncementComments,
} from "@/src/entities/announcement-comment";
import { AnnouncementDetail } from "@/src/entities/announcement-detail";
import { usePathname } from "next/navigation";
import { useId } from "react";

interface CommentSectionProps {
  announcementId: AnnouncementDetail["announcementId"];
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
  } = useAnnouncementComments({
    announcementId: Number(announcementId),
    page: 0,
    size: displaySize,
  });

  const totalCount = comments?.meta.totalElements ?? 0;
  const displayComments = comments?.items ?? [];

  return (
    <section className="bg-white p-6 rounded-2xl space-y-5">
      <h3 className="text-lg font-bold text-gray-900">
        공고 댓글({totalCount})
      </h3>

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
      </div>
    </section>
  );
}
