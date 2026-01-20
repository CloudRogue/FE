"use client";

import {
  AnnouncementDetail,
  AnnouncementStatusSchema,
} from "@/src/entities/announcement-detail";
import { useUser } from "@/src/entities/user";
import {
  ANNOUNCEMENT_STATUS_CONFIG,
  postAnnouncementApply,
} from "@/src/features/announcement-apply";
import { ROUTES } from "@/src/shared/constants/routes";
import cn from "@/src/shared/lib/cn";
import Button from "@/src/shared/ui/button";
import Popover from "@/src/shared/ui/popover";
import { Home } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo, useState, useTransition } from "react";
import z from "zod";

type AnnouncementStatus = z.infer<typeof AnnouncementStatusSchema>;

type ApplyActionsProps = Pick<
  AnnouncementDetail,
  "announcementId" | "status" | "dDay" | "title"
>;

export function AnnouncementApplyAction({
  announcementId,
  title,
  status,
  dDay,
}: ApplyActionsProps) {
  const router = useRouter();
  const { isLoggedIn } = useUser();

  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const buttonConfig = useMemo(() => {
    const config = ANNOUNCEMENT_STATUS_CONFIG[status];
    return {
      label: config.label(dDay),
      isDisabled: config.isDisabled,
    };
  }, [status, dDay]);

  const handleFinalConfirm = async () => {
    if (!isLoggedIn) {
      router.push(ROUTES.LOGIN);
      return;
    }

    startTransition(async () => {
      try {
        await postAnnouncementApply(announcementId);
        setIsOpen(false);
        router.push(ROUTES.MANAGEMENT);
      } catch (error) {
        console.error("지원 관리 저장 실패:", error);
        alert("지원 관리 저장 중 문제가 발생했습니다.");
      }
    });
  };

  return (
    <Popover
      center
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      containerClassName="block"
      trigger={
        <Button
          onClick={() => !buttonConfig.isDisabled && setIsOpen(true)}
          disabled={buttonConfig.isDisabled}
          className={cn(
            "w-full py-4 rounded-xl font-bold transition-all",
            buttonConfig.isDisabled
              ? "bg-gray-400 text-white cursor-not-allowed"
              : "bg-[#1778FF] text-white active:scale-[0.98]",
          )}
        >
          {buttonConfig.label}
        </Button>
      }
    >
      <div className="flex flex-col items-center text-center">
        <div className="w-16 h-16 bg-[#1778FF] rounded-full flex items-center justify-center mb-6">
          <Home size={30} className="text-white" />
        </div>
        <h3 className="text-[20px] font-bold text-gray-900 mb-2 leading-tight">
          {isLoggedIn
            ? "공고 지원, 집착이 관리해줄게요!"
            : "로그인이 필요한 서비스 입니다!"}
        </h3>
        <p className="text-[14px] text-gray-500 mb-8 whitespace-pre-wrap leading-relaxed">
          {isLoggedIn ? (
            <>
              {title}
              {"\n"}
              지원을 완료하셨다면, 지원 관리에 공고를 담고{"\n"}
              일정과 서류를 편리하게 관리해보세요.
            </>
          ) : (
            "로그인하고 나만의 공고 맞춤 서비스를 만나보세요!"
          )}
        </p>
        <div className="w-full flex flex-col gap-3">
          <Button
            onClick={handleFinalConfirm}
            className="w-full py-4 bg-[#1778FF] text-white rounded-2xl font-bold text-[16px] hover:bg-blue-600 transition-colors"
          >
            {isPending
              ? "처리 중..."
              : isLoggedIn
                ? "네, 담아주세요"
                : "로그인 하기"}
          </Button>
          <Button
            onClick={() => setIsOpen(false)}
            className="w-full py-4 bg-[#F2F4F7] text-[#4E5968] rounded-2xl font-bold text-[16px] hover:bg-gray-200 transition-colors"
          >
            아니요, 괜찮아요
          </Button>
        </div>
      </div>
    </Popover>
  );
}
