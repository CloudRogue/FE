"use client";

import { AnnouncementDetail } from "@/src/entities/announcement-detail";
import { useUser } from "@/src/entities/user";
import { deleteScrap, patchScrap } from "@/src/features/announcement-scrap";
import cn from "@/src/shared/lib/cn";
import Button from "@/src/shared/ui/button";
import Popover from "@/src/shared/ui/popover";
import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

interface ScrapButtonProps {
  announcementId: AnnouncementDetail["announcementId"];
  initialIsScrapped: AnnouncementDetail["isScrapped"];
}

export function ScrapButton({
  announcementId,
  initialIsScrapped,
}: ScrapButtonProps) {
  const { user, isLoggedIn } = useUser();
  const router = useRouter();

  const [isScrapped, setIsScrapped] = useState(initialIsScrapped);
  const [isPending, startTransition] = useTransition();
  const [isLoginPromptOpen, setIsLoginPromptOpen] = useState(false);

  const handleToggleScrap = (e: React.MouseEvent) => {
    e.preventDefault();

    if (!isLoggedIn || !user) {
      setIsLoginPromptOpen(true);
      return;
    }

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

  const handleLoginRedirect = () => {
    setIsLoginPromptOpen(false);
    router.push("/login");
  };

  // 비회원용 안내 콘텐츠
  const LoginPrompt = (
    <div className="flex flex-col gap-3 w-50">
      <p className="text-sm text-gray-700 leading-snug">
        스크랩은 회원만 이용할 수 있는 기능입니다. 로그인 페이지로
        이동하시겠습니까?
      </p>
      <div className="flex justify-end gap-2">
        <Button
          onClick={() => setIsLoginPromptOpen(false)}
          className="text-xs px-3 py-1.5 rounded bg-gray-100 hover:bg-gray-200 text-gray-600"
        >
          취소
        </Button>
        <Button
          onClick={handleLoginRedirect}
          className="text-xs px-3 py-1.5 rounded bg-blue-500 hover:bg-blue-600 text-white font-medium"
        >
          로그인
        </Button>
      </div>
    </div>
  );

  return (
    <Popover
      isOpen={isLoginPromptOpen}
      onClose={() => setIsLoginPromptOpen(false)}
      trigger={
        <Button
          onClick={handleToggleScrap}
          disabled={isPending}
          className="p-0 h-6 transition-transform disabled:opacity-70"
        >
          <Heart
            size={24}
            className={cn(
              "p-0 transition-colors duration-200",
              isScrapped
                ? "text-red-500 fill-red-500"
                : "text-gray-300 fill-gray-300",
            )}
          />
        </Button>
      }
      className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 m-0 w-70"
    >
      {LoginPrompt}
    </Popover>
  );
}
