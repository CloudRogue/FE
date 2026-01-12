import {
  AnnouncementDetail,
  OverviewRow,
} from "@/src/entities/announcement-detail";

interface SummaryCardProps {
  announcementId: AnnouncementDetail["announcementId"];
  publisher: AnnouncementDetail["publisher"];
}

export default async function SummaryCard({
  announcementId,
  publisher,
}: SummaryCardProps) {
  // NOTO: 공고 요약 API 서버 오류남
  // const { kvDigest } = await getAnnouncementSummary(String(announcementId));
  // const data = await getAnnouncementEligibility(String(announcementId));
  // const eligibility = data?.eligibility;

  const regionList = eligibility?.eligibility?.region?.codes || [];
  const hasMultipleRegions = regionList.length > 1;

  return (
    <section className="bg-white p-6 rounded-2xl">
      <h3 className="text-lg font-bold text-gray-900 mb-5">공고 개요</h3>

      <div className="space-y-1 font-bold">
        <OverviewRow label="항목" value="공고 내용" />
        {/* 백엔드 API 구현 이후 변경 필요 */}
        <OverviewRow
          label="대상"
          value={eligibility?.eligibility?.age?.displayText ?? "전체"}
        />
        <OverviewRow
          label="지역"
          value={eligibility?.eligibility?.region?.displayText ?? "전체"}
        >
          {hasMultipleRegions && (
            <div className="flex flex-col gap-5">
              <h4 className="text-[17px] font-bold text-slate-900">
                전체 지역 ({regionList.length}개)
              </h4>

              <div className="flex flex-wrap gap-2">
                {regionList.map((region: string, idx: number) => (
                  <div
                    key={idx}
                    className="px-3 py-1.5 bg-[#F0F5FF] text-[#437CFF] rounded-lg text-[13px] font-semibold"
                  >
                    {region}
                  </div>
                ))}
              </div>

              <button className="w-full py-4 bg-[#437CFF] text-white rounded-[14px] text-base font-bold active:scale-[0.98] transition-transform">
                확인
              </button>
            </div>
          )}
        </OverviewRow>
        <OverviewRow label="접수 방법" value={publisher} />
      </div>

      {/* <Link href={data.originalUrl} className="w-full mt-6 inline-block">
        <Button className="flex-1 bg-[#F3F4F6] text-[#61666C] py-4 rounded-xl font-bold hover:bg-gray-800">
          공고 보러가기
        </Button>
      </Link> */}

      {kvDigest.kvDigest.length === 0 && (
        <p className="text-gray-400 text-center py-4">요약 정보가 없습니다.</p>
      )}
    </section>
  );
}

const kvDigest = {
  kvDigest: [
    {
      key: "청약 기간",
      value: "2년간 꾸준히 납입하면 우선순위",
    },
    {
      key: "납입 인정 기준",
      value: "월 10만원 이상 납입 시 인정",
    },
    {
      key: "유의사항",
      value: "서류 미제출 시 자동 탈락",
    },
  ],
};

const eligibility = {
  announcementId: 900001,
  eligibility: {
    age: {
      min: 19,
      max: 34,
      displayText: "만 19~34세",
    },
    region: {
      ruleType: "INCLUDE",
      codes: ["11", "12"],
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
      가입기간MonthsMin: 12,
      납입횟수Min: 24,
      displayText: "가입 12개월 이상, 납입 24회 이상",
    },
    notes: "일부 유형은 신혼부부 우선",
  },
};
