"use client";

import { useUserStore } from "@/src/entities/user/model/use-user-store";
import { useGetHomeBanner } from "@/src/entities/home/api/use-get-home-banner";
import { BannerMember } from "@/src/entities/home/ui/banner-member";
import { BannerGuest } from "@/src/features/guest/ui/banner-guest";

export function HomeBanner() {
  const isLoggedIn = useUserStore((state) => state.isLoggedIn);
  const { data: banner, isLoading } = useGetHomeBanner();

  return (
    <section className="px-5 py-6">
      {isLoggedIn ? (
        <BannerMember banner={banner} isLoading={isLoading} />
      ) : (
        <BannerGuest />
      )}
    </section>
  );
}
