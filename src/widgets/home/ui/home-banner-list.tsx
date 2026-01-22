"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { HomeBannerCard } from "@/src/entities/home/ui/home-banner-card";

export function HomeBannerList() {
  const constraintsRef = useRef(null);

  const banners = [
    {
      id: 1,
      title: "청년 매입임대주택\n정기 모집",
      description: "서울/수도권 잔여 세대 입주자 모집",
      endDate: "2026.01.30",
      dDay: 7,
      variant: "blue" as const,
    },
    {
      id: 2,
      title: "행복주택 신규 단지\n사전 알림 신청",
      description: "놓치기 쉬운 우리 동네 공고 확인하기",
      endDate: "2026.02.15",
      dDay: 23,
      variant: "violet" as const,
    },
    {
      id: 3,
      title: "행복주택 신규 단지\n사전 알림 신청",
      description: "놓치기 쉬운 우리 동네 공고 확인하기",
      endDate: "2026.02.15",
      dDay: 23,
      variant: "blue" as const,
    },
  ];

  return (
    <section className="w-full overflow-hidden" ref={constraintsRef}>
      <motion.div
        drag="x"
        dragConstraints={constraintsRef}
        className="flex w-max gap-3 px-5 py-2 cursor-grab active:cursor-grabbing"
      >
        {banners.map((banner) => (
          <div
            key={banner.id}
            className="flex-shrink-0"
            onPointerDown={(e) => e.stopPropagation()}
          >
            <HomeBannerCard {...banner} />
            <div className="w-2 flex-shrink-0" />
          </div>
        ))}
      </motion.div>
    </section>
  );
}
