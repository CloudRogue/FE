"use client";

import type {
  AnnouncementDetail,
  EligibilityResult,
} from "@/src/entities/announcement-detail";
import { AnnouncementAddTodoButton } from "@/src/features/todo-add";
import cn from "@/src/shared/lib/cn";
import Button from "@/src/shared/ui/button";
import { formattedDate } from "@/src/widgets/announcement-support";
import Link from "next/link";

const THEME = {
  ELIGIBLE: {
    container: "bg-[#1788F0E5]",
    statusText: "지원 가능",
    buttonType: "add-todo",
  },
  INELIGIBLE: {
    container: "bg-[#7C0505E5]",
    statusText: "지원 불가능",
    buttonType: "link-other",
  },
  "3순위": {
    container: "bg-[#8F8F8FE5]",
    statusText: "진단 보류",
    buttonType: "link-auth",
  },
};

interface SupportResultCardProps {
  result: EligibilityResult;
  announcement: AnnouncementDetail;
  userName: string;
}
export function SupportResultCard({
  result,
  announcement,
  userName,
}: SupportResultCardProps) {
  const { supportStatus, diagnosedAt, predictedRank, predictedBonusPoints } =
    result;

  const theme = THEME[supportStatus as keyof typeof THEME] || THEME.ELIGIBLE;

  return (
    <div
      className={cn("w-full rounded-2xl text-white mb-6 p-6", theme.container)}
    >
      <div className="flex justify-between items-end mb-4 w-full">
        <p className="text-lg">
          <span className="font-bold">{userName}</span>님의 진단 결과
        </p>
        <p>{formattedDate(diagnosedAt)}</p>
      </div>
      {/* 지원 여부 */}
      <div className="flex flex-col gap-3 w-full">
        <div className="w-full py-4 rounded-xl font-bold text-lg text-center">
          {theme.statusText}
        </div>
        {/* NOTE: 항목 결과 디자인 변동 가능성 있음*/}
        <div
          className="grid gap-3 w-full"
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}
        >
          <div className="flex items-center justify-center py-5 px-2 rounded-xl font-semibold text-center min-w-0 bg-white/15">
            가산점 {predictedBonusPoints ?? "0"}점 확보
          </div>
          <div className="flex items-center justify-center py-5 px-2 rounded-xl font-semibold text-center min-w-0 bg-white/15">
            소득 {predictedRank ?? "n"}순위 예상
          </div>
        </div>
      </div>

      {/* 하단 버튼 영역 */}
      <div className="mt-6 text-black w-full">
        {theme.buttonType === "add-todo" && (
          <AnnouncementAddTodoButton
            className="w-full bg-white hover:bg-gray-50 py-4 rounded-xl font-bold text-[16px]"
            payload={{
              announcementId: announcement.announcementId,
              title: announcement.title,
              dueDate: announcement.endDate,
            }}
          />
        )}

        {theme.buttonType === "link-other" && (
          <Link href="/announcements" className="block">
            <Button className="w-full bg-white hover:bg-gray-50 py-4 rounded-xl font-bold">
              다른 공고 보러 가기
            </Button>
          </Link>
        )}

        {theme.buttonType === "link-auth" && (
          <Link href="/login" className="block">
            <Button className="w-full bg-white hover:bg-gray-50 py-4 rounded-xl font-bold">
              자격 정보 입력하기
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}
