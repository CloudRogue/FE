import { CommentListResponseSchema } from "@/src/entities/announcement-comment/model/comment.types";
import { Api } from "@/src/shared/api/api";
import { useQuery } from "@tanstack/react-query";

export const commentKeys = {
  all: ["comments"] as const,
  list: (announcementId: string, page: number, size: number) =>
    [...commentKeys.all, announcementId, { page, size }] as const,
};

export const useAnnouncementComments = (
  announcementId: string,
  page: number = 0,
  size: number = 20,
) => {
  return useQuery({
    queryKey: commentKeys.list(announcementId, page, size),
    queryFn: () =>
      Api.get(
        `/community/announcements/${announcementId}/comments?page=${page}&size=${size}&sort=LATEST`,
        CommentListResponseSchema,
      ),
  });
};
