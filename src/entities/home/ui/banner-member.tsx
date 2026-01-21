"use client";

import { useRouter } from "next/navigation";
import Button from "@/src/shared/ui/button";
import Card from "@/src/shared/ui/card";
import type { HomeBannerData } from "@/src/entities/home/api/use-get-home-banner";

interface BannerMemberProps {
  banner: HomeBannerData | undefined;
  isLoading: boolean;
}

export function BannerMember({ banner, isLoading }: BannerMemberProps) {
  const router = useRouter();

  const handleAction = () => {
    if (banner?.announcementId) {
      router.push(`/announcements/${banner.announcementId}`);
    }
  };

  return (
    <Card
      isLoading={isLoading}
      padding="none"
      className="rounded-[32px] border-slate-100 bg-white"
    >
      <div className="p-10 flex flex-col items-start text-left">
        <h2 className="mb-8 text-[22px] font-bold leading-tight text-slate-900">
          {banner ? banner.title : "맞춤 공고를 분석하고 있습니다"}
        </h2>

        <Button
          className="h-[56px] w-full rounded-2xl bg-[#3B82F6] text-white font-bold"
          onClick={handleAction}
          disabled={!banner}
        >
          공고 확인하기
        </Button>
      </div>
    </Card>
  );
}
