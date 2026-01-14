"use client";

import { useEffect, useState } from "react";
import { z } from "zod";
import { Api } from "@/src/shared/api/api";
import Button from "@/src/shared/ui/button";
import Card from "@/src/shared/ui/card";

const BannerResponseSchema = z
  .object({
    announcementId: z.number().int(),
    title: z.string(),
    reasonTag: z.string(),
  })
  .nullable();

type BannerData = z.infer<typeof BannerResponseSchema>;

export function HomeBanner() {
  const [banner, setBanner] = useState<BannerData>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    Api.get("/api/announcements/banner", BannerResponseSchema)
      .then((data) => setBanner(data))
      .catch(() => setBanner(null))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <section className="px-5 py-6">
      <Card
        isLoading={isLoading}
        padding="none"
        shadow="none"
        className="rounded-[32px] border-slate-100 bg-white"
      >
        <div className="p-10 flex flex-col items-start text-left">
          {banner ? (
            <>
              <h2 className="text-[22px] font-bold text-slate-900 leading-tight mb-8">
                {banner.title}
              </h2>
              <Button className="w-full h-[56px] bg-[#3B82F6] text-white rounded-2xl text-[16px] font-bold">
                가입하기
              </Button>
            </>
          ) : (
            <>
              <h2 className="text-[22px] font-bold text-slate-900 leading-tight mb-3">
                나에게 딱 맞는 주택 공고 <br /> 1분 만에 찾기
              </h2>
              <p className="text-slate-500 text-[15px] mb-8">
                복잡한 청년 주택 공고, 이제 간단하게 찾아보세요.
              </p>
              <Button className="w-full h-[56px] bg-[#3B82F6] text-white rounded-2xl text-[16px] font-bold">
                집착 시작하기
              </Button>
            </>
          )}
        </div>
      </Card>
    </section>
  );
}
