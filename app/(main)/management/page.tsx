import { ManagementPage } from "@/src/_pages/management";
import {
  MANAGEMENT_STATUS_TYPE,
  managementQueries,
} from "@/src/entities/management";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

export default async function Page() {
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery(
    managementQueries.list(MANAGEMENT_STATUS_TYPE.APPLYING),
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ManagementPage />
    </HydrationBoundary>
  );
}
