"use client";

import { useGetRecommendedAnnouncements } from "@/src/entities/announcement/api/use-get-recommended";
import { useUser } from "@/src/entities/user";
import { ROUTES } from "@/src/shared/constants/routes";
import cn from "@/src/shared/lib/cn";
import Button from "@/src/shared/ui/button";
import { AnnouncementCard } from "@/src/widgets/announcement-card/ui/announcement-card";
import { useRouter } from "next/navigation";

export function RecommendedAnnouncements() {
  const router = useRouter();
  const { user } = useUser();
  const userName = user?.name;

  const { data, isLoading } = useGetRecommendedAnnouncements(5);
  const items = data?.data ?? [];

  const handleCardClick = (id: number) => {
    router.push(`${ROUTES.ANNOUNCEMENT}/${id}`);
  };

  if (!isLoading && items.length === 0) return null;

  return (
    <section className="flex flex-col items-center gap-6 px-5 py-4">
      <h3 className="w-full px-1 text-h2 font-bold text-gray-black">
        {userName
          ? `${userName}님을 위한 추천 공고`
          : "청년님을 위한 추천 공고"}
      </h3>

      {/* grid-auto-rows-fr: 모든 행의 높이를 동일하게 비율로 맞춤 
        고정 높이 없이 콘텐츠에 따라 유연하게 결정됨
      */}
      <div className="grid w-full grid-cols-2 gap-3 auto-rows-fr">
        {items.length > 0 && (
          <>
            {/* 1. 첫 번째 공고: 전체 너비 */}
            <div
              className="col-span-2 cursor-pointer transition-transform active:scale-[0.98]"
              onClick={() => handleCardClick(items[0].announcementId)}
            >
              <AnnouncementCard
                {...items[0]}
                variant="large"
                className="h-full w-full border-none shadow-sm rounded-lg"
              />
            </div>

            {/* 2. 나머지 공고: 2개씩 나열 */}
            {items.slice(1, 5).map((item, index) => (
              <div
                key={`${item.announcementId}-${index}`}
                onClick={() => handleCardClick(item.announcementId)}
                className="cursor-pointer transition-transform active:scale-[0.98]"
              >
                <AnnouncementCard
                  {...item}
                  variant="small"
                  className="h-full w-full border-none shadow-sm rounded-lg"
                />
              </div>
            ))}
          </>
        )}
      </div>

      <Button
        onClick={() => router.push(`${ROUTES.ANNOUNCEMENT}/personalized`)}
        className={cn(
          "flex h-13 w-full items-center justify-center gap-2.5 p-4",
          "bg-gray-50 text-gray-black! font-bold",
          "rounded-sm border-none shadow-[0px_1px_3px_rgba(0,0,0,0.1)]",
          "transition-all active:scale-[0.98] active:bg-gray-100",
        )}
      >
        다른 추천 공고 더보기
      </Button>
    </section>
  );
}
