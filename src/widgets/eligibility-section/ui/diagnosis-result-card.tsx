"use client";

import cn from "@/src/shared/lib/cn";

interface DiagnosisResultCardProps {
  eligible: boolean;
  rank: "1순위" | "2순위" | "3순위" | null;
  userName: string;
}

const RANK_THEMES = {
  "1순위": {
    container: "bg-[#1788F0E5]",
    title: "축하해요!",
    description: "지원 가능 및 1순위 가 예상돼요\n가점 3점을 모두 확보하셨어요",
  },
  "2순위": {
    container: "bg-[#F7AF1EE5]",
    description: "지원 가능 및 2순위 가 예상돼요\n한번 지원해볼까요~!",
  },
  "3순위": {
    container: "bg-[#8F8F8FE5]",
    description:
      "지원 가능 및 3순위 가 예상돼요\n확률이 낮으니, 함께 다른 공고도 지원해보아요!",
  },
};

const INELIGIBLE_THEME = {
  container: "bg-[#7C0505E5]",
  description:
    "해당 공고 지원 대상이 아니에요\n아쉽지만, 함께 다른 공고를 지원해보아요!",
};

export function DiagnosisResultCard({
  eligible,
  rank,
  userName,
}: DiagnosisResultCardProps) {
  const theme = !eligible
    ? INELIGIBLE_THEME
    : RANK_THEMES[rank as keyof typeof RANK_THEMES] || RANK_THEMES["3순위"];

  return (
    <div className={cn("p-6 rounded-2xl text-white mb-6", theme.container)}>
      <div className="mb-6">
        <p className="text-[14px] opacity-90 mb-1">자격 자가 진단 결과</p>
        <h4 className="text-[18px] font-bold leading-snug whitespace-pre-wrap">
          {userName}님,
          {"title" in theme && (
            <>
              {" "}
              {theme.title}
              {"\n"}
            </>
          )}
          {!("title" in theme) && "\n"}
          {theme.description}
        </h4>
      </div>

      <button className="w-full bg-white text-[#1E293B] py-2.5 rounded-xl font-bold text-[16px] hover:bg-gray-50 transition-colors">
        공고 신청하러 가기
      </button>
    </div>
  );
}
