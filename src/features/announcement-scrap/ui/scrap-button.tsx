"use client";

import { AnnouncementDetail } from "@/src/entities/announcement-detail";
import { useUser } from "@/src/entities/user";
import { deleteScrap, patchScrap } from "@/src/features/announcement-scrap";
import { LoginRequiredModal } from "@/src/shared/components/login-required-modal";
import cn from "@/src/shared/lib/cn";
import LikeColor from "@/src/shared/ui/icons/my/like-color.svg";
import Heart from "@/src/shared/ui/icons/policy/like.svg";
import Popover from "@/src/shared/ui/popover";
import { useState, useTransition } from "react";

interface ScrapButtonProps {
  announcementId: AnnouncementDetail["announcementId"];
  initialIsScrapped: AnnouncementDetail["isScrapped"];
  isAboveTheImage?: boolean;
}

export function ScrapButton({
  announcementId,
  initialIsScrapped,
  isAboveTheImage = false,
}: ScrapButtonProps) {
  const { user, isLoggedIn } = useUser();
  const [isScrapped, setIsScrapped] = useState(initialIsScrapped);
  const [isPending, startTransition] = useTransition();
  const [isLoginPromptOpen, setIsLoginPromptOpen] = useState(false);

  const handleToggleScrap = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isLoggedIn || !user) {
      setIsLoginPromptOpen(true);
      return;
    }

    if (isPending) return;

    const nextState = !isScrapped;
    setIsScrapped(nextState);

    startTransition(async () => {
      try {
        if (nextState) {
          await patchScrap(announcementId);
        } else {
          await deleteScrap(announcementId);
        }
      } catch (error) {
        console.error("스크랩 처리 중 오류 발생:", error);
        setIsScrapped(!nextState);
        alert("스크랩 처리에 실패했습니다.");
      }
    });
  };

  const CommonUIProps = { isScrapped, isPending, onClick: handleToggleScrap };

  return (
    <Popover
      isOpen={isLoginPromptOpen}
      onClose={() => setIsLoginPromptOpen(false)}
      trigger={
        isAboveTheImage ? (
          <AboveImageScrapUI {...CommonUIProps} />
        ) : (
          <DefaultScrapUI {...CommonUIProps} />
        )
      }
      className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 m-0 w-70"
    >
      <LoginRequiredModal onClose={() => setIsLoginPromptOpen(false)} />
    </Popover>
  );
}

interface UIProps {
  isScrapped: boolean | null | undefined;
  isPending: boolean;
  onClick: (e: React.MouseEvent) => void;
}

// 일반 공고 상세용 버튼 (회색 배경)
export const DefaultScrapUI = ({ isScrapped, isPending, onClick }: UIProps) => (
  <div
    onClick={onClick}
    role="button"
    tabIndex={0}
    className={cn(
      "bg-gray-50 cursor-pointer p-4 transition-transform inline-flex items-center justify-center rounded-sm",
      isPending && "opacity-70 pointer-events-none",
    )}
  >
    <Heart
      width={20}
      height={20}
      className={cn(
        "duration-200",
        isScrapped ? "text-red-500 fill-red-500" : "text-gray-400 fill-none",
      )}
    />
  </div>
);

// 이미지 위에 올라가는 버튼 (원형)
export const AboveImageScrapUI = ({
  isScrapped,
  isPending,
  onClick,
}: UIProps) => (
  <div
    className="absolute bottom-1.5 right-1.5 z-10"
    onClick={(e) => {
      e.preventDefault();
      e.stopPropagation();
    }}
  >
    <div
      onClick={onClick}
      role="button"
      tabIndex={0}
      className={cn(
        "cursor-pointer w-7 h-7",
        isPending && "opacity-70 pointer-events-none",
      )}
    >
      {isScrapped ? (
        <LikeColor className="text-red-default" />
      ) : (
        <LikeColor className="text-gray-100" />
      )}
    </div>
  </div>
);
