"use client";

import type {
  AnnouncementDetail,
  EligibilityResult,
} from "@/src/entities/announcement-detail/model/announcement.types";
import { AnnouncementAddTodoButton } from "@/src/features/todo-add/ui/announcement-add-todo-button";
import cn from "@/src/shared/lib/cn";

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
  "순위 없음": {
    container: "bg-[#8F8F8FE5]",
    description: "지원 가능해 보이네요!\n확률이 낮으니, 한번 지원해볼까요~!",
  },
};

const INELIGIBLE_THEME = {
  container: "bg-[#7C0505E5]",
  description:
    "해당 공고 지원 대상이 아니에요\n아쉽지만, 함께 다른 공고를 지원해보아요!",
};

interface SupportResultCardProps {
  result: EligibilityResult;
  announcement: AnnouncementDetail;
  userName: string;
  isClosed: boolean;
}
export function SupportResultCard({
  result,
  announcement,
  userName,
  isClosed,
}: SupportResultCardProps) {
  const { eligible, rank } = result;

  const theme = !eligible
    ? INELIGIBLE_THEME
    : RANK_THEMES[rank as keyof typeof RANK_THEMES] || RANK_THEMES["순위 없음"];

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

      {!isClosed && (
        <AnnouncementAddTodoButton
          payload={{
            announcementId: announcement.announcementId,
            title: announcement.title,
            dueDate: announcement.endDate,
          }}
        />
      )}
    </div>
  );
}
