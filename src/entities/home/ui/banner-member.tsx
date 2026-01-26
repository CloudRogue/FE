"use client";

import type { FC } from "react";
import { useRouter } from "next/navigation";
import type { HomeBannerData } from "@/src/entities/home/api/use-get-home-banner";
import Card from "@/src/shared/ui/card";
import { HomeBannerCard } from "./home-banner-card";

interface BannerMemberProps {
  banner: HomeBannerData | undefined;
  isLoading: boolean;
}

export const BannerMember: FC<BannerMemberProps> = ({ banner, isLoading }) => {
  const router = useRouter();

  const handleAction = () => {
    if (banner?.announcementId) {
      router.push(`/announcements/${banner.announcementId}`);
    }
  };

  // 로딩 상태일 때 공통 Card의 Skeleton 스타일 활용
  if (isLoading || !banner) {
    return (
      <Card
        isLoading={true}
        className="w-[280px] h-[180px] !rounded-[20px] bg-slate-100"
      />
    );
  }

  return (
    <button
      type="button"
      onClick={handleAction}
      className="block transition-transform active:scale-[0.97] outline-none"
      aria-label={`${banner.title} 공고 상세보기`}
    >
      <HomeBannerCard
        title={banner.title}
        description={banner.reasonTag || "회원님을 위한 맞춤 정책입니다"}
        endDate="01월 30일" // 고정 데이터 또는 API 날짜 포맷팅 필요
        dDay={7} // 고정 데이터 또는 API dDay 계산값 필요
      />
    </button>
  );
};
