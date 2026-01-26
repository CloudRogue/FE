"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import type { HomeBannerData } from "@/src/entities/home/api/use-get-home-banner";
import { HomeBannerCard } from "@/src/entities/home/ui/home-banner-card";

interface HomeBannerListProps {
  memberBanner?: HomeBannerData;
}

export function HomeBannerList({ memberBanner }: HomeBannerListProps) {
  const constraintsRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const TUTORIAL_LINK =
    "https://zip-chak.notion.site/2f4c108cc66f8078a6b0d5f4eb1c9965";

  const handleBannerClick = (link: string, isExternal: boolean = false) => {
    if (isExternal) {
      window.open(link, "_blank", "noopener,noreferrer");
    } else {
      router.push(link);
    }
  };

  // 단일 배너 케이스
  if (!memberBanner) {
    return (
      <section className="w-full px-4">
        <div
          onClick={() => handleBannerClick(TUTORIAL_LINK, true)}
          className="cursor-pointer transition-transform active:scale-[0.99]"
        >
          <HomeBannerCard
            title="집착에 처음 왔다면?"
            description="집착 사용법을 알려드릴게요"
            variant="violet"
            className="w-full min-w-full" 
          />
        </div>
      </section>
    );
  }

  // 2. 다중 배너 케이스
  return (
    <section className="w-full overflow-hidden" ref={constraintsRef}>
      <motion.div
        drag="x"
        dragConstraints={constraintsRef}
        className="flex w-max gap-3 px-5 py-2 cursor-grab active:cursor-grabbing"
      >
        {/* 회원 맞춤 공고 배너 */}
        <div
          className="flex-shrink-0"
          onClick={() =>
            handleBannerClick(`/announcements/${memberBanner.announcementId}`)
          }
        >
          <HomeBannerCard
            title={memberBanner.title}
            description={
              memberBanner.reasonTag || "회원님을 위한 맞춤 정책입니다"
            }
            endDate="01월 28일"
            dDay={5}
            variant="blue"
          />
        </div>

        {/* 튜토리얼 배너 */}
        <div
          className="flex-shrink-0"
          onClick={() => handleBannerClick(TUTORIAL_LINK, true)}
        >
          <HomeBannerCard
            title="집착에 처음 왔다면?"
            description="집착 사용법을 알려드릴게요"
            variant="violet"
          />
        </div>

        <div className="w-2 flex-shrink-0" />
      </motion.div>
    </section>
  );
}
