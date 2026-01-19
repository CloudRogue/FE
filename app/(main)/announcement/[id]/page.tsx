import { AnnouncementDetailPage } from "@/src/_pages/announcement-detail/announcement-detail-page";
import { getAnnouncementDetail } from "@/src/entities/announcement-detail";

type PageParams = Promise<{ id: string }>;

export default async function Page({ params }: { params: PageParams }) {
  const { id } = await params;
  const data = await getAnnouncementDetail(id);

  return <AnnouncementDetailPage announcement={data} />;
}
