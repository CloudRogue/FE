import cn from "@/src/shared/lib/cn";

export function RecentCardSkeleton() {
  const pulseClass = "animate-pulse bg-gray-100 rounded";

  return (
    <div className="flex justify-between gap-3 p-4 bg-white rounded-2xl border border-gray-100">
      <div className="flex-1 flex flex-col justify-between py-1">
        <div className="space-y-2">
          <div className={cn("w-full h-5", pulseClass)} />
          <div className={cn("w-2/3 h-5", pulseClass)} />
        </div>
        <div className={cn("w-32 h-4 mt-4", pulseClass)} />
      </div>
      <div
        className={cn("w-20 h-20 bg-gray-50 rounded-xl shrink-0", pulseClass)}
      />
    </div>
  );
}
