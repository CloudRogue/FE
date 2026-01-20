"use client";

import { useRouter } from "next/navigation";
import { useGetHomeBanner } from "@/src/entities/home";
import Button from "@/src/shared/ui/button";
import Card from "@/src/shared/ui/card";

export function HomeBanner() {
  const router = useRouter();

  const { data: banner, isLoading } = useGetHomeBanner();

  const handleStartOnboarding = () => {
    router.push("/onboarding");
  };

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
              <Button
                className="w-full h-[56px] bg-[#3B82F6] text-white rounded-2xl text-[16px] font-bold"
                onClick={handleStartOnboarding}
              >
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
              <Button
                className="w-full h-[56px] bg-[#3B82F6] text-white rounded-2xl text-[16px] font-bold cursor-pointer"
                onClick={handleStartOnboarding}
              >
                집착 시작하기
              </Button>
            </>
          )}
        </div>
      </Card>
    </section>
  );
}
