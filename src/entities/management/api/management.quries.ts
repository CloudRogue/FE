import {
  getManageApplied,
  getManageClosed,
  getManageDocumentWaiting,
  getManageFinalWaiting,
  MANAGEMENT_STATUS_TYPE,
  ManagementResponse,
  ManagementStatus,
} from "@/src/entities/management";
import { infiniteQueryOptions } from "@tanstack/react-query";

const fetcherMap = {
  [MANAGEMENT_STATUS_TYPE.APPLYING]: getManageApplied,
  [MANAGEMENT_STATUS_TYPE.DOCUMENT_PENDING]: getManageDocumentWaiting,
  [MANAGEMENT_STATUS_TYPE.FINAL_PENDING]: getManageFinalWaiting,
  [MANAGEMENT_STATUS_TYPE.CLOSED]: getManageClosed,
} as const;

export const managementQueries = {
  all: ["management"] as const,
  lists: () => [...managementQueries.all, "list"] as const,
  list: (status: ManagementStatus) =>
    infiniteQueryOptions({
      queryKey: [...managementQueries.lists(), status],
      queryFn: async ({ pageParam }) => {
        const res = await fetcherMap[status](pageParam as number | null);
        return res as ManagementResponse;
      },
      initialPageParam: null as number | null,
      getNextPageParam: (lastPage) => lastPage.meta.nextCursor,
      staleTime: 1000 * 60 * 5,
    }),
};
