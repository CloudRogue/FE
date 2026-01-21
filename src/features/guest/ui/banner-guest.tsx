"use client";

import { useRouter } from "next/navigation";
import Button from "@/src/shared/ui/button";
import Card from "@/src/shared/ui/card";

export function BannerGuest() {
  const router = useRouter();

  const handleStartOnboarding = () => {
    router.push("/onboarding");
  };

  return (
    <Card padding="none" className="rounded-[32px] border-slate-100 bg-white">
      <div className="p-10 flex flex-col items-start text-left">
        <h2 className="mb-3 text-[22px] font-bold leading-tight text-slate-900">
          나에게 딱 맞는 주택 공고 <br /> 1분 만에 찾기
        </h2>
        <p className="mb-8 text-[15px] text-slate-500">
          복잡한 청년 주택 공고, 이제 간단하게 찾아보세요.
        </p>
        <Button
          className="h-[56px] w-full rounded-2xl bg-[#3B82F6] text-[16px] font-bold text-white cursor-pointer"
          onClick={handleStartOnboarding}
        >
          집착 시작하기
        </Button>
      </div>
    </Card>
  );
}
