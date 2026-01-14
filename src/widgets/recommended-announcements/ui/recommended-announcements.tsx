"use client";

import { useEffect, useState } from "react";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { Api } from "@/src/shared/api/api";
import { AnnouncementCard } from "@/src/entities/announcement/ui/announcement-card";
import Button from "@/src/shared/ui/button";
import type { Announcement } from "@/src/entities/announcement/model/types";

const PersonalizedResponseSchema = z.object({
  data: z.array(
    z.object({
      announcementId: z.number().int(),
      title: z.string(),
      startDate: z.string(),
      endDate: z.string(),
      publisher: z.string(),
      status: z.enum(["OPEN", "DUE_SOON", "UPCOMING", "CLOSED"]),
      housingType: z.string().optional(),
    }),
  ),
});

export function RecommendedAnnouncements() {
  const router = useRouter();
  const [items, setItems] = useState<Announcement[]>([]);

  useEffect(() => {
    Api.get(
      "/api/announcements/personalized?limit=2",
      PersonalizedResponseSchema,
    )
      .then((res) => {
        setItems(res.data as unknown as Announcement[]);
      })
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
            isScrapped={item.isScrapped ?? false}
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
