import { useInfiniteQuery } from "@tanstack/react-query";
import { Api } from "@/src/shared/api/api";
import { AnnouncementListResponseSchema } from "@/src/entities/announcement/model/schemas";
import type {
  AnnouncementFilterParams,
  AnnouncementListResponse,
} from "@/src/entities/announcement/model/types";

const getAnnouncementList = async (
  params: AnnouncementFilterParams,
  isPersonalized: boolean,
): Promise<AnnouncementListResponse> => {
  const baseUrl = isPersonalized
    ? "/api/announcements/personalized"
    : "/api/announcements/open";

  const searchParams = new URLSearchParams();

  if (params.regionCode) searchParams.append("regionCode", params.regionCode);
  if (params.publisher) searchParams.append("publisher", params.publisher);
  if (params.housingType)
    searchParams.append("housingType", params.housingType);
  if (params.sort) searchParams.append("sort", params.sort);
  if (params.cursor) searchParams.append("cursor", params.cursor);
  if (params.limit) searchParams.append("limit", params.limit.toString());

  const url = `${baseUrl}?${searchParams.toString()}`;

  return await Api.get<AnnouncementListResponse>(
    url,
    AnnouncementListResponseSchema,
  );
};

export function useAnnouncements(
  filters: AnnouncementFilterParams,
  isPersonalized: boolean = false,
) {
  return useInfiniteQuery<
    AnnouncementListResponse,
    Error,
    AnnouncementListResponse,
    ["announcements", "list", AnnouncementFilterParams, boolean],
    string | null
  >({
    queryKey: ["announcements", "list", filters, isPersonalized],
    queryFn: ({ pageParam }) =>
      getAnnouncementList(
        {
          ...filters,
          cursor: pageParam,
        },
        isPersonalized,
      ),
    initialPageParam: null,
    getNextPageParam: (lastPage) =>
      lastPage.meta.hasNext ? lastPage.meta.nextCursor : undefined,
  });
}
