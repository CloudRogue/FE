"use client";

import { AnnouncementDetail } from "@/src/entities/announcement-detail";
import { useUser } from "@/src/entities/user";
import {
  ANNOUNCEMENT_STATUS_CONFIG,
  postAnnouncementApply,
} from "@/src/features/announcement-apply";
import { ROUTES } from "@/src/shared/constants/routes";
import { toast } from "@/src/shared/hooks/use-toast";
import Button from "@/src/shared/ui/button";
import Share from "@/src/shared/ui/icons/policy/share.svg";
import Manage from "@/src/shared/ui/icons/tab/manage-nonecolor.svg";
import Popover from "@/src/shared/ui/popover";
import { useRouter } from "next/navigation";
import { useMemo, useState, useTransition } from "react";

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
        toast.success("지원 관리에 추가되었습니다.");
        router.push(ROUTES.MANAGEMENT);
      } catch (error) {
        console.error("지원 관리 저장 실패:", error);
        toast.error("지원 관리 추가에 실패했습니다.");
      }
    });
  };

  return (
    <Popover
      center
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      containerClassName="block w-full"
      trigger={
        <Button
          variant="secondary"
          onClick={() => !buttonConfig.isDisabled && setIsOpen(true)}
          disabled={buttonConfig.isDisabled}
          className="gap-2.5 w-full h-full text-gray-700"
        >
          <Share width={16} height={16} />
          {buttonConfig.label}
        </Button>
      }
    >
      <div className="flex flex-col items-center gap-6 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-50">
          <Manage width={32} height={32} className="text-primary-blue" />
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="text-h1 text-gray-black">
            {isLoggedIn
              ? "공고를 놓치지 않게 도와드릴까요?"
              : "로그인이 필요한 서비스 입니다!"}
          </h3>
          <p className="text-body2 text-gray-500 leading-relaxed">
            {isLoggedIn ? (
              <>
                {title}
                <br />
                신청하신 공고의 일정과 준비 서류를
                <br />
                한눈에 확인할 수 있도록 정리해 드릴게요.
              </>
            ) : (
              "로그인하고 나만의 공고 맞춤 서비스를 만나보세요!"
            )}
          </p>
        </div>

        <div className="w-full flex flex-col gap-2">
          <Button onClick={handleFinalConfirm} className="w-full">
            {isPending
              ? "처리 중..."
              : isLoggedIn
                ? "네, 담아주세요"
                : "로그인 하기"}
          </Button>
          <Button
            onClick={() => setIsOpen(false)}
            variant="secondary"
            className="w-full"
          >
            아니요, 괜찮아요
          </Button>
        </div>
      </div>
    </Popover>
  );
}
