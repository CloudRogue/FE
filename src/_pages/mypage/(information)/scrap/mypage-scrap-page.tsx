import { ScrapList } from "@/src/entities/mypage-scrap";
import { getScrappedAnnouncements } from "@/src/entities/mypage-scrap/api/mypage-scrap.quries";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

export default async function MyPageScrapPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["mypage", "scrap", { limit: 20 }],
    queryFn: () => getScrappedAnnouncements({ limit: 20 }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="bg-slate-50 p-4">
        <ScrapList />
      </div>
    </HydrationBoundary>
  );
}
