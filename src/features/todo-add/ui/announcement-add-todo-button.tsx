// 공고 상세보기 전용 투두 추가 버튼 컴포넌트

"use client";

import { postAddTodo, TodoCreateRequest } from "@/src/features/todo-add";
import Button from "@/src/shared/ui/button";
import { useTransition } from "react";

interface AddTodoButtonProps {
  payload: TodoCreateRequest;
  className?: string;
}

export function AnnouncementAddTodoButton({
  payload,
  className,
}: AddTodoButtonProps) {
  const [isPending, startTransition] = useTransition();

  const handleAddTodo = () => {
    startTransition(async () => {
      try {
        await postAddTodo({
          ...payload,
          announcementId: payload.announcementId
            ? Number(payload.announcementId)
            : null,
        });
        alert("지원 관리에 추가되었습니다.");
      } catch (error) {
        console.error("지원 관리 추가 중 오류 발생:", error);
        alert("지원 관리 추가에 실패했습니다.");
      }
    });
  };

  return (
    <Button
      onClick={handleAddTodo}
      disabled={isPending}
      className="w-full bg-white text-[#1E293B] py-2.5 rounded-xl font-bold text-[16px] border border-gray-200 hover:bg-gray-50 transition-colors disabled:opacity-50"
    >
      {isPending ? "추가 중..." : "지원 관리에 공고 담고 지원 준비하기"}
    </Button>
  );
}
