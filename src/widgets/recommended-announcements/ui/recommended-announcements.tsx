"use client";

import { useRouter } from "next/navigation";
import { useUserStore } from "@/src/entities/user/model/use-user-store";
import { useGetRecommendedAnnouncements } from "@/src/entities/announcement/api/use-get-recommended";
import { AnnouncementCard } from "@/src/widgets/announcement-card/ui/announcement-card";
import Button from "@/src/shared/ui/button";
import { ROUTES } from "@/src/shared/constants/routes";

export function RecommendedAnnouncements() {
  const router = useRouter();
  const userName = useUserStore((state) => state.user?.name);

  const { data, isLoading } = useGetRecommendedAnnouncements(2);
  const items = data?.data ?? [];

  if (!isLoading && items.length === 0) return null;

  return (
    <section className="px-5 py-4 space-y-4">
      <h3 className="text-[18px] font-bold text-slate-900 px-1">
        {userName
          ? `${userName}님을 위한 추천 공고`
          : "청년님을 위한 추천 공고"}
      </h3>

      <div className="flex flex-col gap-3">
        {items.map((item) => (
          <AnnouncementCard
            key={item.announcementId}
            {...item}
            className="rounded-3xl border-none shadow-sm"
            period={{ start: item.startDate, end: item.endDate }}
          />
        ))}
      </div>

      <Button
        variant="ghost"
        className="w-full h-14 bg-slate-100 text-slate-500 rounded-2xl font-bold mt-2 shadow-none border-none"
        onClick={() => router.push(`${ROUTES.ANNOUNCEMENT}/personalized`)}
      >
        다른 추천 공고 더보기
      </Button>
    </section>
  );
}
