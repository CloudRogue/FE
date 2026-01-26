"use client";

import { SupportStatus } from "@/src/entities/announcement-detail";
import {
  AnnouncementAddTodoButton,
  TodoCreateRequest,
} from "@/src/features/todo-add";
import { ROUTES } from "@/src/shared/constants/routes";
import Button from "@/src/shared/ui/button";
import Link from "next/link";

interface SupportContentButtonsProps {
  status: SupportStatus;
  todoPayload: TodoCreateRequest;
}

export function SupportContentButtons({
  status,
  todoPayload,
}: SupportContentButtonsProps) {
  if (status === "ELIGIBLE") {
    return <AnnouncementAddTodoButton payload={todoPayload} />;
  }

  const getButtonConfig = () => {
    switch (status) {
      case "LOGIN_REQUIRED":
        return {
          text: "로그인 하고 결과 보기",
          href: ROUTES.LOGIN,
        };
      case "INELIGIBLE":
        return {
          text: "나를 위한 추천 공고 보기",
          href: ROUTES.ANNOUNCEMENT,
        };
      case "PENDING":

      default:
        return {
          text: "추가 정보 입력하고 결과 보기",
          href: ROUTES.MYPAGE_ELIGIBILITY,
        };
    }
  };

  const { text, href } = getButtonConfig();

  return (
    <Link href={href} className="w-full">
      <Button className="w-full py-4 text-h4">{text}</Button>
    </Link>
  );
}
