import { AnnouncementDetailPage } from "@/src/_pages/announcement-detail/announcement-detail-page";
import { getAnnouncementDetail } from "@/src/entities/announcement-detail";
import { Metadata } from "next";

type PageParams = Promise<{ id: string }>;

export async function generateMetadata({
  params,
}: {
  params: PageParams;
}): Promise<Metadata> {
  const { id } = await params;
  const data = await getAnnouncementDetail(id);

  return {
    title: `${data.title} 공고 상세보기`,
  };
}

export default async function Page({ params }: { params: PageParams }) {
  const { id } = await params;
  const data = await getAnnouncementDetail(id);

  return <AnnouncementDetailPage announcement={data} />;
}
