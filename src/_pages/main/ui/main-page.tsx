"use client";

import { useRouter } from "next/navigation";
import { useUser } from "@/src/entities/user/lib/use-user";
import { HomeBanner } from "@/src/widgets/home-banner";
import { RecommendedAnnouncements } from "@/src/widgets/recommended-announcements";
import { QuickNavigation } from "@/src/widgets/quick-navigation";
import Button from "@/src/shared/ui/button";
import RootLoading from "@/app/loading";

export function MainPage() {
  const router = useRouter();
  const { user, isLoggedIn, isLoading } = useUser();

  if (isLoading) return <RootLoading />;

  return (
    <div className="min-h-screen bg-slate-50 pb-32">
      <div className="max-w-md mx-auto flex flex-col">
        {/* 인사말 섹션 */}
        {isLoggedIn && user && (
          <div className="px-6 pt-6 pb-2">
            <p className="text-slate-500 text-sm mb-1">
              오늘도 좋은 하루 되세요!
            </p>
            <h2 className="text-2xl font-bold text-slate-900">
              반가워요, {user.name}님!
            </h2>
          </div>
        )}

        <HomeBanner />

        {isLoggedIn && user && (
          <div className="flex flex-col gap-4 px-6 mt-8">
            <h3 className="text-lg font-bold text-slate-900">
              {user.name}님을 위한 추천 공고
            </h3>

            <RecommendedAnnouncements />

            <Button
              className="w-full h-12 bg-slate-100 text-slate-600 rounded-xl text-sm font-medium mt-2"
              onClick={() => router.push("/announcements/personalized")}
            >
              다른 추천 공고 더보기
            </Button>
          </div>
        )}

        <div className={isLoggedIn ? "mt-10" : "mt-4"}>
          <QuickNavigation />
        </div>
      </div>
    </div>
  );
}
