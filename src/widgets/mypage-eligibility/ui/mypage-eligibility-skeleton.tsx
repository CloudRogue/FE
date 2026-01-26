import cn from "@/src/shared/lib/cn";
import Card from "@/src/shared/ui/card";

export function MyPageEligibilitySkeleton() {
  const pulseClass = "animate-pulse bg-gray-100 rounded";

  return (
    <div className="space-y-4 p-4">
      {/* 나의 핵심 정보 섹션 */}
      <Card>
        <div className="mb-6 flex items-center justify-between">
          <div className={cn("h-6 w-24", pulseClass)} />
          <div className={cn("h-5 w-12", pulseClass)} />
        </div>

        <div className="space-y-4">
          {Array.from({ length: 7 }).map((_, i) => (
            <div
              key={`required-${i}`}
              className="flex h-8 items-center justify-between"
            >
              <div className={cn("h-4 w-16", pulseClass)} />
              <div className={cn("h-4 w-20", pulseClass)} />
            </div>
          ))}
        </div>
      </Card>

      {/* 추가 정보 섹션 */}
      <Card>
        <div className="mb-6 flex items-center justify-between">
          <div className={cn("h-6 w-20", pulseClass)} />
          <div className={cn("h-5 w-12", pulseClass)} />
        </div>

        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={`additional-${i}`}
              className="flex h-8 items-center justify-between"
            >
              <div className={cn("h-4 w-12", pulseClass)} />
              <div className={cn("h-4 w-24", pulseClass)} />
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
