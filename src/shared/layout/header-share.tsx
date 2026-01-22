"use client";

import { toast } from "@/src/shared/hooks/use-toast";
import Share from "@/src/shared/ui/icons/policy/share_light.svg";
import Close from "@/src/shared/ui/icons/popup/close.svg";
import Copy from "@/src/shared/ui/icons/popup/copy.svg";
import Kakao from "@/src/shared/ui/icons/popup/kakao.svg";
import Popover from "@/src/shared/ui/popover";
import { useState } from "react";

export function HeaderShare() {
  const [isOpen, setIsOpen] = useState(false);

  const handleCopyLink = async () => {
    try {
      const url = window.location.origin + window.location.pathname;
      await navigator.clipboard.writeText(url);
      toast.success("링크가 복사되었습니다.");
      setIsOpen(false);
    } catch (error) {
      console.error("링크 복사 실패:", error);
      toast.error("링크 복사에 실패했습니다.");
    }
  };

  return (
    <Popover
      center
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      containerClassName="flex items-center py-8"
      trigger={
        <div role="button" onClick={() => setIsOpen(true)}>
          <Share width={24} />
        </div>
      }
    >
      <div className="flex flex-col items-center gap-6 w-full text-center">
        <div className="w-full flex justify-between">
          <p className="text-h2">공유하기</p>
          <Close onClick={() => setIsOpen(false)} />
        </div>
        <div className="flex gap-12">
          <div
            role="button"
            onClick={() =>
              toast.error("카카오톡 공유하기 기능을 열심히 준비하고 있습니다!")
            }
            className="flex flex-col items-center"
          >
            <span className="w-14 h-14 bg-yellow-kakao rounded-full flex items-center justify-center mb-3">
              <Kakao />
            </span>
            <span className="text-body1">카카오톡</span>
          </div>
          <div
            role="button"
            onClick={handleCopyLink}
            className="flex flex-col items-center"
          >
            <span className="w-14 h-14 bg-gray-50 rounded-full flex items-center justify-center mb-3">
              <Copy />
            </span>
            <span className="text-body1">링크 복사</span>
          </div>
        </div>
      </div>
    </Popover>
  );
}
