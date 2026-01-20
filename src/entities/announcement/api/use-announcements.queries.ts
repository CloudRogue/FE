import { useInfiniteQuery } from "@tanstack/react-query";
import type { InfiniteData } from "@tanstack/react-query";
import { announcementQueries } from "@/src/entities/announcement/api/announcement.queries";
import type {
  AnnouncementFilterParams,
  AnnouncementListResponse,
} from "@/src/entities/announcement/model/types";

type AnnouncementType =
  | "personalized"
  | "open"
  | "upcoming"
  | "closed"
  | "region"
  | "publisher"
  | "housing-type";

export function useAnnouncements(
  type: AnnouncementType,
  filters: AnnouncementFilterParams,
) {
  const getQueryConfig = () => {
    if (type === "personalized") {
      return announcementQueries.personalized(filters);
    }

    if (type === "open" || type === "upcoming" || type === "closed") {
      return announcementQueries.byStatus(type, filters);
    }

    if (type === "region" || type === "publisher" || type === "housing-type") {
      return announcementQueries.search(type, filters);
    }

    return announcementQueries.byStatus("open", filters);
  };

  const queryConfig = getQueryConfig();

  return useInfiniteQuery<
    AnnouncementListResponse,
    Error,
    InfiniteData<AnnouncementListResponse>,
    ReturnType<typeof getQueryConfig>["queryKey"],
    string | null
  >({
    ...queryConfig,
    initialPageParam: null,
    getNextPageParam: (lastPage) =>
      lastPage.meta.hasNext ? lastPage.meta.nextCursor : undefined,
  });
}
