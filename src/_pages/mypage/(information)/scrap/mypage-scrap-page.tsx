import { ScrapList } from "@/src/entities/mypage-scrap";
import { getScrappedAnnouncements } from "@/src/entities/mypage-scrap/api/quries";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

export default async function MyPageScrapPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["mypage", "scrap", { page: 0, size: 20 }],
    queryFn: () => getScrappedAnnouncements({ page: 0, size: 20 }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="min-h-full bg-slate-50 p-4">
        <ScrapList />
      </div>
    </HydrationBoundary>
  );
}
