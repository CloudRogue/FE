"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import type { InfiniteData } from "@tanstack/react-query";
import { announcementQueries } from "@/src/entities/announcement/api/announcement.queries";
import type {
  AnnouncementFilterParams,
  AnnouncementListResponse,
} from "@/src/entities/announcement/model/announcement.types";

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
  const requestFilters = {
    limit: 20,
    ...filters,
  };

  const getQueryConfig = () => {
    if (type === "personalized") {
      return announcementQueries.personalized(requestFilters);
    }

    if (type === "open" || type === "upcoming" || type === "closed") {
      return announcementQueries.byStatus(type, requestFilters);
    }

    if (type === "region" || type === "publisher" || type === "housing-type") {
      return announcementQueries.search(type, requestFilters);
    }

    return announcementQueries.byStatus("open", requestFilters);
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
