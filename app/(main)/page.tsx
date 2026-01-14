"use client";

import { useUser } from "@/src/entities/user/lib/use-user";
import { HomeBanner } from "@/src/widgets/home-banner";
import { RecommendedAnnouncements } from "@/src/widgets/recommended-announcements";
import { QuickNavigation } from "@/src/widgets/quick-navigation";

export default function MainPage() {
  const { user, isLoggedIn, isLoading } = useUser();

  if (isLoading) {
    return <div className="min-h-screen bg-slate-50" />;
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-32">
      <div className="max-w-md mx-auto flex flex-col">
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

        {isLoggedIn && <RecommendedAnnouncements />}

        <div className={isLoggedIn ? "mt-4" : ""}>
          <QuickNavigation />
        </div>
      </div>
    </div>
  );
}
