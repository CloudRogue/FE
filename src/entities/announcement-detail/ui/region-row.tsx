"use client";

import { DetailRow } from "@/src/entities/announcement-detail";
import { Badge } from "@/src/shared/ui/badge";
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
                <Button
                  variant="tertiary_gray"
                  className="h-0"
                  onClick={() => setIsOpen(true)}
                >
                  전체보기
                </Button>
              ),
              children: (
                <div className="flex flex-col gap-4">
                  <div className="flex justify-between items-center">
                    <h4 className="text-h3 text-gray-black">
                      전체 지역 ({isArrayRegions.length}개)
                    </h4>
                    <X onClick={handleClose} />
                  </div>
                  <div className="flex flex-wrap gap-2 max-h-75 overflow-y-auto">
                    {isArrayRegions.map((region, idx) => (
                      <Badge
                        key={`${region}-${idx}`}
                        variant="recommend"
                        className="px-3 py-1.5 text-primary-blue! text-h5 rounded-xl"
                      >
                        {region}
                      </Badge>
                    ))}
                  </div>
                </div>
              ),
            }
          : undefined
      }
    />
  );
}
