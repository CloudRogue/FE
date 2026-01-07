"use client";

import cn from "@/src/shared/lib/cn";
import Button from "@/src/shared/ui/button";
import { Heart } from "lucide-react";
import { useState, useTransition } from "react";
import { deleteScrap, patchScrap } from "../api/action";

interface ScrapButtonProps {
  announcementId: number;
  initialIsScrapped: boolean;
}

export function ScrapButton({
  announcementId,
  initialIsScrapped,
}: ScrapButtonProps) {
  const [isScrapped, setIsScrapped] = useState(initialIsScrapped);
  const [isPending, startTransition] = useTransition();

  const handleToggleScrap = (e: React.MouseEvent) => {
    e.preventDefault();

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
        setIsScrapped(!nextState);
        alert("스크랩 처리에 실패했습니다.");
      }
    });
  };

  return (
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
  );
}
