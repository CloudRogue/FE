import Card from "@/src/shared/ui/card";
import Image from "next/image";
interface PolicyCardProps {
  provider?: string;
  title?: string;
  date?: string;
  imageUrl?: string;
}

export default function PolicyCard({
  provider = "공급주체",
  title = "주거 정책 타이틀",
  date = "2000.00.00 ~ 2000.00.00",
  imageUrl,
}: PolicyCardProps) {
  return (
    <Card
      as="article"
      padding="small"
      shadow="sm"
      className="flex gap-4 items-center"
    >
      <div className="flex-1 space-y-1">
        <span className="text-xs text-gray-400">{provider}</span>
        <h3 className="font-medium text-gray-900 leading-snug">{title}</h3>
        <p className="text-sm text-gray-500">{date}</p>
      </div>
      <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-gray-100 flex items-center justify-center">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={title}
            className="h-full w-full object-cover"
          />
        ) : (
          <span className="text-xl">🏘️</span>
        )}
      </div>
    </Card>
  );
}
