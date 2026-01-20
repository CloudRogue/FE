import { ManagementDetailPage } from "@/src/_pages/management-detail";
import { managementDetailQueries } from "@/src/entities/management-detail";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

type PageParams = Promise<{ id: string }>;

export default async function Page({ params }: { params: PageParams }) {
  const { id } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(managementDetailQueries.detail(id));
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ManagementDetailPage announcementId={id} />
    </HydrationBoundary>
  );
}
