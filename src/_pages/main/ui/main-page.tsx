"use client";

import RootLoading from "@/app/loading";
import { useUser } from "@/src/entities/user/lib/use-user";
import { BannerGuest } from "@/src/features/guest";
import { Footer } from "@/src/widgets/footer/ui/footer";
import { HomeBannerList } from "@/src/widgets/home";
import { QuickNavigation } from "@/src/widgets/quick-navigation";
import { RecommendedAnnouncements } from "@/src/widgets/recommended-announcements";

import RequiredOnboardingPostLoginSync from "@/src/features/onboarding/ui/required-onboarding-post-login-sync";

export function MainPage() {
  const { user, isLoggedIn, isLoading } = useUser();

  if (isLoading) return <RootLoading />;

  return (
    <div className="flex-1 flex flex-col justify-between">
      {isLoggedIn ? (
        <RequiredOnboardingPostLoginSync isLoggedIn={isLoggedIn} />
      ) : null}

      <div className="flex-1 bg-slate-50 pb-10">
        <div className="max-w-md mx-auto flex flex-col gap-4 py-6">
          {isLoggedIn && user && (
            <div className="px-5">
              <h2 className="text-2xl font-bold text-slate-900">
                반가워요, {user.name}님!
              </h2>
              <p className="text-slate-500 text-sm mb-1">
                오늘도 {user.name}님에게 딱 맞는 집 찾아볼까요?
              </p>
            </div>
          )}

          {isLoggedIn ? <HomeBannerList /> : <BannerGuest />}

          {isLoggedIn && <RecommendedAnnouncements />}

          <QuickNavigation />
        </div>
      </div>
      <Footer />
    </div>
  );
}
