import { Check } from "lucide-react";

// 타임라인 아이템 레이아웃
interface PreviewTimelineItemProps {
  title: string;
  children: React.ReactNode;
}

export function PreviewTimelineItem({
  title,
  children,
}: PreviewTimelineItemProps) {
  return (
    <div className="flex gap-4 relative z-10">
      <div className="shrink-0 w-6 h-6 rounded-full bg-slate-500 flex items-center justify-center mt-1">
        <Check size={14} className="text-white" strokeWidth={3} />
      </div>
      <div className="flex flex-col gap-4 w-full">
        <span className="font-bold text-slate-900 text-[16px]">{title}</span>
        {children}
      </div>
    </div>
  );
}
