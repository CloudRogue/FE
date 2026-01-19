"use client";

import { DetailRow } from "@/src/entities/announcement-detail";
import Button from "@/src/shared/ui/button";
import { X } from "lucide-react";
import { useMemo, useState } from "react";

export function RegionRow({ regions }: { regions: string[] | string }) {
  const [isOpen, setIsOpen] = useState(false);

  const { isArrayRegions, displayRegion } = useMemo(() => {
    const list = Array.isArray(regions) ? regions : [];
    const text =
      list.length > 0
        ? `${list[0]}${list.length > 1 ? ` 외 ${list.length - 1}개` : ""}`
        : "전국";
    return { isArrayRegions: list, displayRegion: text };
  }, [regions]);

  const handleClose = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setIsOpen(false);
  };

  return (
    <DetailRow
      label="지역"
      value={displayRegion}
      popover={
        isArrayRegions.length > 1
          ? {
              isOpen,
              onClose: handleClose,
              trigger: (
                <span
                  onClick={() => setIsOpen(true)}
                  className="-mt-0.5 px-2 py-1 text-[11px] font-bold text-white bg-[#437CFF] rounded-md cursor-pointer"
                >
                  전체보기
                </span>
              ),
              children: (
                <div className="flex flex-col gap-4">
                  <div className="flex justify-between items-center">
                    <h4 className="text-lg font-bold text-gray-900">
                      전체 지역 ({isArrayRegions.length}개)
                    </h4>
                    <X onClick={handleClose} />
                  </div>
                  <div className="grid grid-cols-4 gap-2 max-h-75 overflow-y-auto">
                    {isArrayRegions.map((region, idx) => (
                      <span
                        key={`${region}-${idx}`}
                        className="px-3 py-2 bg-[#EBF2FF] text-[#437CFF] text-[13px] font-bold rounded-full text-center"
                      >
                        {region}
                      </span>
                    ))}
                  </div>

                  <Button
                    onClick={handleClose}
                    className="w-full mt-2 py-4 bg-[#437CFF] text-white font-bold rounded-2xl"
                  >
                    확인
                  </Button>
                </div>
              ),
            }
          : undefined
      }
    />
  );
}
