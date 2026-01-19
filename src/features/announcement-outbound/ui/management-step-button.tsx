"use client";

import { postOutboundLog } from "@/src/features/announcement-outbound";
import { ROUTES } from "@/src/shared/constants/routes";
import cn from "@/src/shared/lib/cn";
import Button from "@/src/shared/ui/button";
import Popover from "@/src/shared/ui/popover";
import { CircleAlert, ExternalLink } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface ManagementStepButtonProps {
  label: string;
  title?: string;
  href: string;
  disabled?: boolean;
  announcementId: number;
}

export const ManagementStepButton = ({
  label,
  title,
  href,
  disabled,
  announcementId,
}: ManagementStepButtonProps) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogClick = () => {
    if (disabled) return;
    postOutboundLog(announcementId).catch((err) =>
      console.error("Failed to post outbound log:", err),
    );
    setIsOpen(true);
  };

  return (
    <Popover
      center
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      containerClassName="block"
      trigger={
        <Link
          href={disabled ? "#" : href}
          target={disabled ? undefined : "_blank"}
          onClick={handleLogClick}
        >
          <Button
            disabled={disabled}
            className={cn(
              "w-full h-11 rounded-xl flex items-center justify-center gap-2 font-bold transition-colors",
              disabled
                ? "bg-slate-200 text-slate-500"
                : "bg-blue-500 text-white hover:bg-blue-600",
            )}
          >
            {label} <ExternalLink size={18} />
          </Button>
        </Link>
      }
    >
      <div className="flex flex-col items-center text-center">
        <div className="w-16 h-16 bg-[#1778FF] rounded-full flex items-center justify-center mb-6">
          <CircleAlert size={30} className="text-white" />
        </div>
        <h3 className="text-[20px] font-bold text-gray-900 mb-2 leading-tight">
          지원이 완료되었습니다!
        </h3>
        <p className="text-[14px] text-gray-500 mb-8 whitespace-pre-wrap leading-relaxed">
          <span className="font-semibold">{title}</span>
          {"\n"}
          지원이 성공적으로 접수되었습니다.
        </p>
        <div className="w-full flex flex-col gap-3">
          <Button
            onClick={() => router.push(ROUTES.MANAGEMENT)}
            className="w-full py-4 bg-[#1778FF] text-white rounded-2xl font-bold text-[16px] hover:bg-blue-600 transition-colors"
          >
            지원관리 보기
          </Button>
          <Button
            onClick={() => {
              setIsOpen(false);
              router.push(ROUTES.HOME);
            }}
            className="w-full py-4 bg-[#F2F4F7] text-[#4E5968] rounded-2xl font-bold text-[16px] hover:bg-gray-200 transition-colors"
          >
            홈으로 가기
          </Button>
        </div>
      </div>
    </Popover>
  );
};
