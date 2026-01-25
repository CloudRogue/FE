import cn from "@/src/shared/lib/cn";

export function ManagementListSkeleton() {
  const pulseClass = "animate-pulse bg-gray-100 rounded";

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center py-1">
        <div className={cn("h-5 w-32", pulseClass)} />
        <div className={cn("h-5 w-8", pulseClass)} />
      </div>

      {Array.from({ length: 3 }).map((_, i) => (
        <div
          key={`mgmt-skeleton-${i}`}
          className="p-4 bg-white rounded-2xl border border-gray-50 flex flex-col gap-3"
        >
          <div className="flex justify-between items-start">
            <div className={cn("h-5 w-16", pulseClass)} />
            <div className={cn("h-5 w-12", pulseClass)} />
          </div>

          <div className="space-y-2">
            <div className={cn("h-6 w-full", pulseClass)} />
            <div className={cn("h-6 w-2/3", pulseClass)} />
          </div>
          <div className="mt-2 flex gap-2">
            <div className={cn("h-4 w-24", pulseClass)} />
            <div className={cn("h-4 w-16", pulseClass)} />
          </div>
        </div>
      ))}
    </div>
  );
}
