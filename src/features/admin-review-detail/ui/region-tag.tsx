import Button from "@/src/shared/ui/button";
import { X } from "lucide-react";

// 지역 태그 칩
interface RegionTagProps {
  label: string;
  onRemove?: () => void | null;
}

export function RegionTag({ label, onRemove }: RegionTagProps) {
  return (
    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-blue-200 rounded-lg text-blue-600 font-bold text-sm">
      {label}
      {onRemove && (
        <Button
          onClick={onRemove}
          className="text-blue-400 hover:text-red-500 transition-colors p-0 h-5"
          aria-label={`${label} 삭제`}
        >
          <X size={14} />
        </Button>
      )}
    </div>
  );
}
