// 공고 상세보기 전용 투두 추가 버튼 컴포넌트

"use client";

import { postAddTodo, TodoCreateRequest } from "@/src/features/todo-add";
import { ROUTES } from "@/src/shared/constants/routes";
import { toast } from "@/src/shared/hooks/use-toast";
import cn from "@/src/shared/lib/cn";
import Button from "@/src/shared/ui/button";
import Manage from "@/src/shared/ui/icons/tab/manage-nonecolor.svg";
import Popup from "@/src/shared/ui/popover";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

interface AddTodoButtonProps {
  payload: TodoCreateRequest;
  className?: string;
}

export function AnnouncementAddTodoButton({
  payload,
  className,
}: AddTodoButtonProps) {
  const router = useRouter();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const openPopup = () => setIsPopupOpen(true);
  const closePopup = () => setIsPopupOpen(false);

  const handleAddTodo = () => {
    startTransition(async () => {
      try {
        await postAddTodo({
          ...payload,
          announcementId: payload.announcementId
            ? Number(payload.announcementId)
            : null,
        });
        toast.success("지원 관리에 추가되었습니다.");
        router.push(ROUTES.MANAGEMENT);
      } catch (error) {
        console.error("지원 관리 추가 중 오류 발생:", error);
        toast.error("지원 관리 추가에 실패했습니다.");
      }
    });
  };

  return (
    <>
      <Button onClick={openPopup} className={cn("w-full ", className)}>
        내 지원 관리에 담기
      </Button>

      {/* 안내 팝업 */}
      <Popup isOpen={isPopupOpen} onClose={closePopup}>
        <div className="flex flex-col items-center gap-6 text-center">
          {/* 상단 아이콘 */}
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-50">
            <Manage width={32} height={32} className="text-primary-blue" />
          </div>

          {/* 텍스트 정보 */}
          <div className="mb-8 flex flex-col gap-2">
            <h2 className="text-h1 text-gray-black">
              공고를 놓치지 않게 도와드릴까요?
            </h2>
            <p className="text-body2 text-gray-500 leading-relaxed">
              신청하신 공고의 일정과 준비 서류를
              <br />
              한눈에 확인할 수 있도록 정리해 드릴게요.
            </p>
          </div>

          {/* 버튼 그룹 */}
          <div className="flex w-full flex-col gap-2">
            <Button
              onClick={handleAddTodo}
              disabled={isPending}
              className="w-full"
            >
              {isPending ? "추가 중..." : "내 지원 관리에 담기"}
            </Button>
            <Button onClick={closePopup} variant="secondary" className="w-full">
              나중에 하기
            </Button>
          </div>
        </div>
      </Popup>
    </>
  );
}
