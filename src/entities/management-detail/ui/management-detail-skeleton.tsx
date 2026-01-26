import cn from "@/src/shared/lib/cn";
import Card from "@/src/shared/ui/card";

export function ManagementDetailSkeleton() {
  const pulseClass = "animate-pulse bg-gray-100 rounded";

  return (
    <div className="p-4 bg-gray-bg space-y-4">
      {/* 상단 헤더 스켈레톤 */}
      <div className="bg-white p-4 rounded-xl space-y-3">
        <div className={cn("h-4 w-20", pulseClass)} />
        <div className={cn("h-7 w-3/4", pulseClass)} />
        <div className="flex justify-between items-center pt-2">
          <div className={cn("h-5 w-32", pulseClass)} />
          <div className={cn("h-8 w-16 rounded-full", pulseClass)} />
        </div>
      </div>

      {/* 타임라인 단계별 스켈레톤 */}
      <div className="space-y-0">
        {[1, 2, 3].map((step, index) => (
          <div
            key={`step-skeleton-${step}`}
            className={cn(
              "relative flex flex-col gap-3 w-full pl-6 pb-6",
              "after:absolute after:left-[3.75px] after:top-3.5 after:bottom-0 after:w-0.5 after:bg-slate-100",
              index !== 0 &&
                "before:absolute before:left-[3.75px] before:top-0 before:h-3.5 before:w-0.5 before:bg-slate-100",
              index === 2 && "after:hidden",
            )}
          >
            <div className="absolute left-0 top-2.5 z-10 h-2.5 w-2.5 rounded-full bg-slate-200" />

            <div className="flex justify-between items-center">
              <div className={cn("h-5 w-40", pulseClass)} />
            </div>

            <Card className="flex flex-col gap-4">
              <div className={cn("h-4 w-20", pulseClass)} />
              <div className="space-y-2">
                <div className={cn("h-5 w-full", pulseClass)} />
                <div className={cn("h-5 w-2/3", pulseClass)} />
              </div>
              {index === 0 && (
                <div className={cn("h-12 w-full mt-2", pulseClass)} />
              )}
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
