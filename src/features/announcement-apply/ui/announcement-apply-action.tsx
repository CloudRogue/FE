"use client";

import {
  AnnouncementDetail,
  AnnouncementStatusSchema,
} from "@/src/entities/announcement-detail";
import { postAnnouncementApply } from "@/src/features/announcement-apply";
import cn from "@/src/shared/lib/cn";
import Button from "@/src/shared/ui/button";
import Popover from "@/src/shared/ui/popover";
import { Home } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
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
  const [isOpen, setIsOpen] = useState(false);
  const isDisabled = status === "UPCOMING";

  const buttonConfig = useMemo(() => {
    const statusConfigs: Record<
      AnnouncementStatus,
      { label: string; isDisabled: boolean }
    > = {
      UPCOMING: {
        label: `공고 접수 시작까지 D-${dDay ?? "?"}`,
        isDisabled: true,
      },
      CLOSED: {
        label: "접수가 마감된 공고입니다",
        isDisabled: true,
      },
      OPEN: {
        label: "공고 지원하기",
        isDisabled: false,
      },
      DUE_SOON: {
        label: "공고 지원하기",
        isDisabled: false,
      },
    };

    return statusConfigs[status];
  }, [status, dDay]);

  const handleFinalConfirm = async () => {
    try {
      await postAnnouncementApply(announcementId);
      setIsOpen(false);
      router.push("/management");
    } catch (error) {
      console.error("지원 관리 저장 실패", error);
      alert("지원 관리 저장 실패에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <Popover
      center
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      containerClassName="block"
      trigger={
        <Button
          onClick={() => setIsOpen(true)}
          disabled={isDisabled || buttonConfig.isDisabled}
          className={cn(
            "w-full py-4 rounded-xl font-bold transition-all",
            isDisabled
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
          공고 지원, 집착이 관리해줄게요!
        </h3>
        <p className="text-[14px] text-gray-500 mb-8 whitespace-pre-wrap leading-relaxed">
          {title}
          {"\n"}
          지원을 완료하셨다면, 지원 관리에 공고를 담고{"\n"}
          일정과 서류를 편리하게 관리해보세요.
        </p>
        <div className="w-full flex flex-col gap-3">
          <Button
            onClick={handleFinalConfirm}
            className="w-full py-4 bg-[#1778FF] text-white rounded-2xl font-bold text-[16px] hover:bg-blue-600 transition-colors"
          >
            네, 담아주세요
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
