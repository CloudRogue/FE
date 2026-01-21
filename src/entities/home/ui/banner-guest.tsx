import { FC } from "react";
import { HomeBannerCard } from "@/src/widgets/home-banner/ui/home-banner-card";

export const BannerGuest: FC = () => {
  return (
    <div className="px-4 w-full">
      <HomeBannerCard
        title="나에게 딱 맞는\n주거 정책을 찾아보세요"
        description="로그인하고 맞춤 추천받기"
        endDate="상시 모집"
        dDay={0}
        className="!bg-slate-800 w-full" 
      />
    </div>
  );
};
