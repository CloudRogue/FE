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
    const fetchBanner = async () => {
      try {
        const data = await Api.get(
          "/api/announcements/banner",
          BannerResponseSchema,
        );
        setBanner(data);
      } catch (error) {
        console.error("배너 로드 실패:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBanner();
  }, []);

  return (
    <section className="px-5 py-6">
      <Card
        isLoading={isLoading}
        padding="none" 
        shadow="sm"
        className="rounded-[32px] border-slate-50 overflow-hidden"
      >
        <div className="p-10 flex flex-col items-center text-center">
          {banner ? (
            <>
              <span className="text-[#3B82F6] text-sm font-bold mb-2">
                #{banner.reasonTag}
              </span>
              <h2 className="text-[20px] font-bold text-slate-900 leading-tight mb-8 whitespace-pre-line">
                {banner.title}
              </h2>
              <Button className="w-full h-[56px] bg-[#3B82F6] text-white rounded-2xl text-lg font-bold">
                공고 상세보기
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
              <Button className="w-full h-[56px] bg-[#3B82F6] text-white rounded-2xl text-lg font-bold">
                집착 시작하기
              </Button>
            </>
          )}
        </div>
      </Card>
    </section>
  );
}
