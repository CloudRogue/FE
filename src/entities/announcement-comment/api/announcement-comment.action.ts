import { CommentListResponseSchema } from "@/src/entities/announcement-comment";
import { AnnouncementDetail } from "@/src/entities/announcement-detail";
import { Api } from "@/src/shared/api/api";
import { useQuery } from "@tanstack/react-query";

export const commentKeys = {
  all: ["comments"] as const,
  list: (
    announcementId: AnnouncementDetail["announcementId"],
    page: number,
    size: number,
  ) => [...commentKeys.all, announcementId, { page, size }] as const,
};

interface useAnnouncementCommentsParams {
  announcementId: number;
  page?: number;
  size?: number;
  sort?: "LATEST" | "POPULAR";
}

export const useAnnouncementComments = ({
  announcementId,
  page = 0,
  size = 20,
  sort = "LATEST",
}: useAnnouncementCommentsParams) => {
  const searchParams = new URLSearchParams({
    page: page.toString(),
    size: size.toString(),
    sort: sort,
  });

  return useQuery({
    queryKey: commentKeys.list(announcementId, page, size),
    queryFn: () =>
      Api.get(
        `/community/announcements/${announcementId}/comments?${searchParams.toString()}`,
        CommentListResponseSchema,
      ),
  });
};
