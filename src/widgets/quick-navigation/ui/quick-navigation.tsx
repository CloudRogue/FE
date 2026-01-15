"use client";

import { useFilterStore } from "@/src/features/filter-announcements/model/use-filter-store";
import { useRouter } from "next/navigation";
import Card from "@/src/shared/ui/card";

const NAV_ITEMS = [
  {
    title: "마감임박 공고 모음",
    description: "접수 마감이 얼마 남지 않은 꿀 공고 보러가기",
    sortType: "DEADLINE" as const,
  },
  {
    title: "새로 올라온 공고",
    description: "가장 최근 새로 올라온 공고 보러가기",
    sortType: "LATEST" as const,
  },
  {
    title: "지금 핫한 인기 공고",
    description: "조회수가 높은 지금 핫한 인기 공고 보러가기",
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
      <h3 className="text-lg font-bold text-slate-800 px-1">공고 바로가기</h3>

      <div className="flex flex-col gap-3">
        {NAV_ITEMS.map((item) => (
          <Card
            key={item.title}
            as="button"
            onClick={() => handleNavClick(item.sortType)}
            padding="medium"
            shadow="none" // AnnouncementCard와 맞춰서 shadow 제거 혹은 아주 연하게
            className="w-full flex items-center justify-between text-left hover:bg-slate-50 transition-all border-slate-100 rounded-[24px] active:scale-[0.98]"
          >
            <div className="flex-1 pr-4">
              <h4 className="text-[16px] font-bold text-slate-800 mb-1">
                {item.title}
              </h4>
              <p className="text-[13px] text-slate-500 flex items-center gap-1">
                {item.description}{" "}
                <span className="text-slate-400 font-bold">→</span>
              </p>
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
