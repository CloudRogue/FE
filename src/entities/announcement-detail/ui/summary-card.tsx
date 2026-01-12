import {
  AnnouncementDetail,
  getAnnouncementSummary,
  OverviewRow,
} from "@/src/entities/announcement-detail";

interface SummaryCardProps {
  announcementId: AnnouncementDetail["announcementId"];
}

export default async function SummaryCard({
  announcementId,
}: SummaryCardProps) {
  const { kvDigest } = await getAnnouncementSummary(String(announcementId));
  // const adminSummaryResult = await getAnnouncementSummary(
  //   String(announcementId),
  // );

  return (
    <section className="bg-white p-6 rounded-2xl">
      <h3 className="text-lg font-bold text-gray-900 mb-5">공고 개요</h3>

      <div className="space-y-1 font-bold">
        <OverviewRow label="항목" value="공고 내용" />
        {/* TODO: API에 없음 */}
        <OverviewRow label="대상" value={"알 수 없음"} />
        {/*
        <OverviewRow
          label="지역"
          value={eligibility?.region?.displayText ?? "전체"}
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
        <OverviewRow label="접수 방법" value={publisher} /> */}
        <OverviewRow label="접수 방법" value={"공고 참고"} />
      </div>

      {/* <Link href={data.originalUrl} className="w-full mt-6 inline-block">
        <Button className="flex-1 bg-[#F3F4F6] text-[#61666C] py-4 rounded-xl font-bold hover:bg-gray-800">
          공고 보러가기
        </Button>
      </Link> */}

      {kvDigest.length === 0 && (
        <p className="text-gray-400 text-center py-4">요약 정보가 없습니다.</p>
      )}
    </section>
  );
}
