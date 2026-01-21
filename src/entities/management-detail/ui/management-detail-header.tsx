import { ManagementStatusBadge } from "@/src/entities/management";
import { AnnouncementDetailManagement } from "@/src/entities/management-detail";
import { ROUTES } from "@/src/shared/constants/routes";
import Image from "next/image";
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
    <div className="p-5">
      <ManagementStatusBadge
        publisher={data.publisher}
        housingType={data.housingType}
      />
      <div className="flex justify-between mt-4">
        <div className="flex flex-col justify-between">
          <h1 className="text-xl font-bold text-slate-900 leading-snug line-clamp-2 break-keep">
            {data.title}
          </h1>
          <Link
            href={`/${ROUTES.ANNOUNCEMENT}/${announcementId}`}
            className="text-sm text-slate-400 underline"
          >
            자세히 보기
          </Link>
        </div>
        <div className="relative w-20 h-20 bg-gray-400 rounded-xl overflow-hidden">
          <Image
            src="/default-thumbnail.png"
            alt="썸네일"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
}
