"use client";

import { useEffect, useState } from "react";
import { z } from "zod";
import { useRouter } from "next/navigation"; // useRouter 추가
import { Api } from "@/src/shared/api/api";
import { AnnouncementCard } from "@/src/entities/announcement/ui/announcement-card";
import Button from "@/src/shared/ui/button";

// 명세서 기반 응답 스키마
const PersonalizedResponseSchema = z.object({
  data: z.array(z.any()),
});

export function RecommendedAnnouncements() {
  const router = useRouter(); 
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    Api.get(
      "/api/announcements/personalized?limit=3",
      PersonalizedResponseSchema,
    )
      .then((res) => setItems(res.data))
      .catch(() => setItems([]));
  }, []);

  if (items.length === 0) return null;

  return (
    <section className="px-5 py-4 space-y-4">
      <h3 className="text-[18px] font-bold text-slate-900 px-1">
        청년님을 위한 추천 공고
      </h3>

      <div className="flex flex-col gap-3">
        {items.map((item) => (
          <AnnouncementCard
            key={item.announcementId}
            {...item}
            className="rounded-[24px] border-none shadow-sm"
            period={{ start: item.startDate, end: item.endDate }}
          />
        ))}
      </div>

      <Button
        variant="ghost"
        className="w-full h-14 bg-slate-100 text-slate-500 rounded-2xl font-bold mt-2 shadow-none border-none"
        onClick={() => router.push("/announcement?personalized=true")}
      >
        다른 추천 공고 더보기
      </Button>
    </section>
  );
}
