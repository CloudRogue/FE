"use client";

import { ToastType, useToast } from "@/src/shared/hooks/use-toast";
import cn from "@/src/shared/lib/cn";
import { AlertCircleIcon, CheckCircle2Icon } from "lucide-react";

export default function Toast() {
  const { items } = useToast();

  return (
    // 토스트 전체 컨테이너 (화면 우측 하단 고정)
    <div className="fixed bottom-6 right-1 md:right-6 z-9999 space-y-3">
      {items.map((t: ToastType) => (
        <div
          key={t.id}
          className={cn(
            "rounded-sm bg-gray-700 text-white shadow-sm",
            "p-2 pr-3",
            "flex items-center gap-2",
          )}
        >
          {t.type === "success" ? (
            <CheckCircle2Icon className="size-5 text-gray-700 fill-white" />
          ) : (
            <AlertCircleIcon className="size-5 text-gray-700 fill-white" />
          )}
          {/* 메시지 텍스트 */}
          <span className="text-sm">{t.message}</span>
        </div>
      ))}
    </div>
  );
}
