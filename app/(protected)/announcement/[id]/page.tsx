import { AnnouncementDetailPage } from "@/src/_pages/announcement-detail/announcement-detail-page";
import { AnnouncementDetail } from "@/src/entities/announcement-detail/model/announcement.types";

type PageParams = Promise<{ id: string }>;

export default async function Page({ params }: { params: PageParams }) {
  const { id } = await params;
  // const data = await getAnnouncementDetail(id);

  const data = {
    announcementId: 900001,
    publisher: "LH 한국토지주택공사",
    title: "Mock title 1",
    housingType: "행복주택",
    startDate: "2026-01-01",
    endDate: "2026-01-01",
    publishedAt: "2026-01-01",
    status: "OPEN",
    originalUrl: "https://example.com/1",
    externalApplyUrl: "https://example.com/1",
    eligibility: {
      age: {
        min: 19,
        max: 34,
        displayText: "만 19~34세",
      },
      region: {
        ruleType: "INCLUDE",
        codes: ["11"],
        displayText: "서울특별시 거주",
      },
      income: {
        metric: "MEDIAN_INCOME_PERCENT",
        operator: "LTE",
        value: 150,
        value2: null,
        householdSizeMin: 1,
        householdSizeMax: 3,
        displayText: "중위소득 150% 이하",
      },
      subscriptionAccount: {
        MonthsMin: 12,
        Min: 24,
        displayText: "가입 12개월 이상, 납입 24회 이상",
      },
      notes: "일부 유형은 신혼부부 우선",
    },
    dDay: 7,
    rentGtn: 5000000,
    enty: 500000,
    prtpay: 1000000,
    surlus: 3500000,
    mtRntchrg: 250000,
    fullAdres: "서울특별시 강남구 ...",
    rnCodeNm: "테헤란로",
    refrnLegaldongNm: "역삼동",
    url: "https://example.com/1",
    isScrapped: false,
  } as AnnouncementDetail;

  return <AnnouncementDetailPage announcement={data} />;
}
