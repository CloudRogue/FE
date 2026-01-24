import cn from "@/src/shared/lib/cn";

export function AnnouncementCardSkeleton({
  ApplyUrl = false,
  className,
}: {
  ApplyUrl?: boolean;
  className?: string;
}) {
  const pulseClass = "animate-pulse bg-gray-100 rounded";

  return (
    <div
      className={cn(
        "p-4 bg-white rounded-lg border border-gray-100",
        className,
      )}
    >
      {/* 상단 배지 영역 */}
      <div className="flex justify-between items-start mb-3">
        <div className="flex gap-2 flex-wrap">
          <div className={cn("w-10 h-5", pulseClass)} /> {/* 추천 */}
          <div className={cn("w-12 h-5", pulseClass)} /> {/* 지역 */}
          <div className={cn("w-14 h-5", pulseClass)} /> {/* 기관 */}
        </div>
        <div className={cn("w-12 h-5", pulseClass)} /> {/* D-Day */}
      </div>

      {/* 중앙 컨텐츠 영역 */}
      <div className="flex justify-between gap-3">
        <div className="flex-1 flex flex-col justify-between py-1">
          <div className="space-y-2">
            <div className={cn("w-full h-6", pulseClass)} /> {/* 타이틀 줄 1 */}
            <div className={cn("w-2/3 h-6", pulseClass)} /> {/* 타이틀 줄 2 */}
          </div>
          <div className={cn("w-32 h-4 mt-4", pulseClass)} />{" "}
          {/* 접수 마감일 */}
        </div>

        {/* 썸네일 이미지 영역 */}
        <div
          className={cn(
            "w-20 h-20 bg-gray-50 rounded-xl shrink-0 border border-gray-100",
            pulseClass,
          )}
        />
      </div>

      {ApplyUrl && (
        <div className="flex gap-2 mt-4">
          <div className={cn("w-12 h-12 rounded-lg", pulseClass)} />{" "}
          {/* 스크랩 버튼 */}
          <div className={cn("flex-1 h-12 rounded-lg", pulseClass)} />{" "}
          {/* 지원 버튼 */}
        </div>
      )}
    </div>
  );
}
