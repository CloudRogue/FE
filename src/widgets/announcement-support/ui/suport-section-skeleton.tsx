import Card from "@/src/shared/ui/card";

export function SupportSectionSkeleton() {
  return (
    <Card
      as="section"
      className="flex flex-col gap-4 p-4 rounded-md bg-[linear-gradient(180deg,#F5F7F8_0%,#FFF_100%)] animate-pulse"
    >
      <div className="flex flex-col gap-2">
        <div className="w-10 h-10 bg-gray-200 rounded-full" />
        <div className="w-32 h-7 bg-gray-200 rounded-md" />
        <div className="space-y-2 mt-1">
          <div className="w-full h-5 bg-gray-200 rounded-md" />
          <div className="w-2/3 h-5 bg-gray-200 rounded-md" />
        </div>
        <div className="w-40 h-4 bg-gray-100 rounded-md mt-2" />
      </div>

      <div className="w-full h-32 bg-white/50 border border-gray-100 rounded-lg" />

      <div className="flex gap-3">
        <div className="flex-1 h-12 bg-gray-200 rounded-md" />
        <div className="flex-1 h-12 bg-gray-200 rounded-md" />
      </div>

      <div className="space-y-1 mt-2">
        <div className="w-full h-3 bg-gray-100 rounded-sm" />
        <div className="w-full h-3 bg-gray-100 rounded-sm" />
        <div className="w-4/5 h-3 bg-gray-100 rounded-sm" />
      </div>
    </Card>
  );
}
