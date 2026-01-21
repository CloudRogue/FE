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

  const { data, isLoading } = useGetRecommendedAnnouncements(5);
  const items = data?.data ?? [];

  if (!isLoading && items.length === 0) return null;

  return (
    <section className="px-5 py-6 space-y-4">
      <h3 className="text-[18px] font-bold text-slate-900 px-1">
        {userName
          ? `${userName}님을 위한 추천 공고`
          : "청년님을 위한 추천 공고"}
      </h3>

      <div className="grid grid-cols-2 gap-4 justify-items-center">
        {items.map((item, index) => {
          const isFullWidth = index === 0;

          return (
            <div
              key={`${item.announcementId}-${index}`}
              className={`${isFullWidth ? "col-span-2" : "col-span-1"}`}
            >
              <div
                style={{
                  width: isFullWidth ? "361px" : "148px",
                  height: isFullWidth ? "171px" : "176px",
                }}
                className="overflow-hidden bg-white rounded-3xl shadow-sm"
              >
                <AnnouncementCard
                  {...item}
                  className="w-full h-full border-none"
                  period={{ start: item.startDate, end: item.endDate }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <Button
        className="w-full h-14 bg-slate-100 text-slate-500 rounded-2xl font-bold mt-2 shadow-none border-none active:bg-slate-200 transition-colors"
        onClick={() => router.push(`${ROUTES.ANNOUNCEMENT}/personalized`)}
      >
        다른 추천 공고 더보기
      </Button>
    </section>
  );
}
