import Card from "@/src/shared/ui/card";
import { Badge } from "@/src/shared/ui/badge";
import type { Announcement } from "../model/types";
import type { BadgeProps } from "@/src/shared/ui/badge";

interface Props {
  announcement: Announcement;
}


const statusVariantMap: Record<Announcement["status"], BadgeProps["variant"]> =
  {
    OPEN: "secondary",
    DUE_SOON: "destructive", 
    UPCOMING: "default", 
    CLOSED: "outline", 
  };

export function AnnouncementCard({ announcement }: Props) {
  const { title, publisher, housingType, status, endDate } = announcement;

  return (
    <Card
      as="article"
      padding="medium"
      shadow="sm"
      className="hover:border-black transition-all cursor-pointer group"
    >
      <div className="flex justify-between items-start mb-3">
        <span className="text-xs font-medium text-gray-400 group-hover:text-gray-600 transition-colors">
          {publisher}
        </span>
        <Badge variant={statusVariantMap[status]}>
          {status === "DUE_SOON" ? "마감 임박" : status}
        </Badge>
      </div>

      <h3 className="text-lg font-bold text-black mb-4 line-clamp-2 leading-snug group-hover:text-blue-600 transition-colors">
        {title}
      </h3>

      <div className="flex justify-between items-center text-sm">
        <span className="text-gray-500 bg-gray-50 px-2 py-1 rounded text-xs">
          {housingType || "유형 미지정"}
        </span>
        <span className="text-gray-400 font-medium">~ {endDate}</span>
      </div>
    </Card>
  );
}
