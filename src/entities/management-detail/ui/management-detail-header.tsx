import { ManagementStatusBadge } from "@/src/entities/management";
import { AnnouncementDetailManagement } from "@/src/entities/management-detail";
import { ROUTES } from "@/src/shared/constants/routes";
import Card from "@/src/shared/ui/card";
import Link from "next/link";

interface ManagementDetailHeaderProps {
  data: AnnouncementDetailManagement;
  announcementId: string;
}

export function ManagementDetailHeader({
  data,
  announcementId,
}: ManagementDetailHeaderProps) {
  return (
    <Card className="flex flex-col gap-4 mb-4">
      <ManagementStatusBadge
        publisher={data.publisher}
        housingType={data.housingType}
      />
      <h1 className="text-xl font-bold text-slate-900 leading-snug line-clamp-2 break-keep">
        {data.title}
      </h1>
      <Link
        href={`/${ROUTES.ANNOUNCEMENT}/${announcementId}`}
        className="w-full p-4 rounded-sm bg-gray-50 text-gray-700 text-body2 text-center font-semibold"
      >
        공고 상세보기
      </Link>
    </Card>
  );
}
