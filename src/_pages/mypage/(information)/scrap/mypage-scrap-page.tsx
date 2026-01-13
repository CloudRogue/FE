import { ScrapList } from "@/src/entities/mypage-scrap";
import { getScrappedAnnouncements } from "@/src/entities/mypage-scrap/api/quries";

export default async function MyPageScrapPage() {
  const initialData = await getScrappedAnnouncements({ page: 0, size: 20 });

  return (
    <div className="min-h-full bg-slate-50 p-4">
      <ScrapList initialItems={initialData.items} />
    </div>
  );
}
