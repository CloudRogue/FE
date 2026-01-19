import AdminReviewDetail from "@/src/_pages/admin-review-detail/page";

type PageParams = Promise<{ id: string }>;

export default async function Page({ params }: { params: PageParams }) {
  const { id } = await params;
  return <AdminReviewDetail announcementId={id} />;
}
