"use client";

import { useFilterStore } from "@/src/features/filter-announcements/model/use-filter-store";
import { useRouter } from "next/navigation";
import Card from "@/src/shared/ui/card";

const NAV_ITEMS = [
  {
    title: "곧 마감돼요",
    description: "지금 신청할 수 있는 마지막 기회예요",
    actionText: "마감 임박 공고 보기",
    sortType: "DEADLINE" as const,
  },
  {
    title: "새로 올라왔어요",
    description: "오늘 업데이트된 공고들을 확인해보세요",
    actionText: "신규 공고 보기",
    sortType: "LATEST" as const,
  },
  {
    title: "지금 가장 핫해요",
    description: "많은 청년들이 주목하고 있는 인기 공고예요",
    actionText: "인기 공고 보기",
    sortType: "RELEVANCE" as const,
  },
] as const;

export function QuickNavigation() {
  const router = useRouter();
  const setSort = useFilterStore((state) => state.setSort);

  const handleNavClick = (sort: (typeof NAV_ITEMS)[number]["sortType"]) => {
    setSort(sort);
    router.push("/announcement");
  };

  return (
    <section className="px-5 py-4 space-y-4">
      <h3 className="text-lg font-bold text-slate-800 px-1">유형별 공고</h3>

      <div className="flex flex-col gap-3">
        {NAV_ITEMS.map((item) => (
          <Card
            key={item.title}
            as="button"
            onClick={() => handleNavClick(item.sortType)}
            className="w-full flex items-center justify-between text-left hover:bg-slate-50 transition-all border-slate-100 rounded-[24px] active:scale-[0.98]"
          >
            <div className="flex-1 pr-4">
              <h4 className="text-[16px] font-bold text-slate-800 mb-1">
                {item.title}
              </h4>
              <p className="text-[14px] text-slate-500 leading-snug">
                {item.description}
              </p>
              <span className="text-[13px] text-slate-400 underline underline-offset-4 decoration-slate-200 mt-1 font-medium">
                {item.actionText}
              </span>
            </div>
            <div className="w-16 h-16 bg-slate-50 rounded-xl overflow-hidden relative shrink-0 border border-slate-100">
              <div className="w-full h-full opacity-20 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:12px_12px]" />
              {/* 실제 이미지가 준비되면 아래 주석 해제 */}
              {/* <Image src={item.image} alt={item.title} fill className="object-cover" /> */}
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
