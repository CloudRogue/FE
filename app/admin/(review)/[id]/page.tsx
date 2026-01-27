import AdminReviewDetail from "@/src/_pages/admin-review-detail/page";
import {
  getAdminAdditionalOnboardings,
  getAdminAnnouncement,
} from "@/src/entities/admin-review-detail";
import { RequirementType } from "@/src/features/admin-review-detail";
import { AdminStoreInitializer } from "@/src/widgets/admin-review-detail";

type PageParams = Promise<{ id: string }>;

export default async function Page({ params }: { params: PageParams }) {
  const { id } = await params;

  const [announcement, onboardings] = await Promise.all([
    getAdminAnnouncement(id),
    getAdminAdditionalOnboardings(),
  ]);

  const initialFormData = {
    basicInfo: {
      title: announcement.title || "",
      publisher: (announcement.publisher || "").includes("LH")
        ? "LH"
        : (announcement.publisher || "").includes("SH")
          ? "SH"
          : "GH",
      supplyType: announcement.supplyType || "",
      originalUrl: announcement.url || "",
      applyUrl: announcement.applyUrl || "",
    },
    summary: {
      rentGtn: Number(announcement.rentGtn) || 0,
      mtRntchrg: Number(announcement.mtRntchrg) || 0,
      kvDigest: announcement.kvDigest || [],
      regions: ["종로구"],
      target: "",
      method: "",
      description: "",
      contentText: "",
    },
    schedule: {
      applyStartDate: announcement.startDate || "",
      applyEndDate: announcement.endDate || "",
      documentPublishedAt: announcement.documentPublishedAt || "",
      finalPublishedAt: announcement.finalPublishedAt || "",
      requiredDocuments: [],
      resultDocuments: [],
    },
  };

  const rawData = Array.isArray(onboardings)
    ? onboardings
    : onboardings?.data || [];

  const pool = rawData.map((item: any) => ({
    additionalOnboardingId: String(item.additionalOnboardingId),
    title: item.title || "",
    question: item.question || "",
    description: item.description ?? "",
    isRequired: item.required,
    type: (item.type?.toUpperCase() as RequirementType) || "TEXT_INPUT",
    value: item.value || "",
    isNew: false,
    options: item.options || null,
  }));

  return (
    <>
      <AdminStoreInitializer data={initialFormData} pool={pool} />
      <AdminReviewDetail announcementId={id} />
    </>
  );
}
