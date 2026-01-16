import {
  AdminReviewSubmitButton,
  useAdminFormStore,
} from "@/src/features/admin-review-detail";
import { formatDateRange } from "@/src/shared/lib/date";
import Button from "@/src/shared/ui/button";
import {
  PreviewDocumentList,
  PreviewRow,
  PreviewSection,
  PreviewTimelineItem,
  useAdminStepperStore,
} from "@/src/widgets/admin-review-detail";

export function ReviewDetailTwoSection() {
  const { setStep } = useAdminStepperStore();
  const { formData } = useAdminFormStore();
  const { basicInfo, requirements, schedule, summary } = formData;

  const handleSubmitFinal = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("서버로 데이터 전송:", formData);
    alert("공고가 성공적으로 등록되었습니다.");
  };

  return (
    <form
      onSubmit={handleSubmitFinal}
      className="flex flex-col gap-5 animate-in fade-in slide-in-from-right-4 duration-500"
    >
      <div className="grid md:grid-cols-2 gap-5">
        {/* 공고 기본 정보 */}
        <PreviewSection title="공고 기본 정보">
          <ul className="divide-y divide-slate-50">
            <PreviewRow label="공고명" value={basicInfo.title} />
            <PreviewRow label="공급 주체" value={basicInfo.publisher} />
            <PreviewRow label="공급 유형" value={basicInfo.supplyType} />
            <PreviewRow
              label="원문 링크"
              value={basicInfo.originalUrl}
              vertical
            />
            <PreviewRow label="공고 링크" value={basicInfo.applyUrl} vertical />
          </ul>
        </PreviewSection>

        {/* 공고 개요 */}
        <PreviewSection title="공고 개요">
          <ul className="divide-y divide-slate-50">
            <PreviewRow label="대상" value={summary.target} />
            <PreviewRow label="접수 방법" value={summary.method} />
            <PreviewRow label="임대 보증금(최소)" value={summary.rentGtn} />
            <PreviewRow label="월 임대료 (최소)" value={summary.mtRntchrg} />
            <PreviewRow
              label="지역"
              value={summary.regions}
              vertical
              badge={true}
            />
            <PreviewRow
              label="공고 요약 및 유의사항"
              value={summary.description}
              vertical
            />
          </ul>
        </PreviewSection>
      </div>

      <PreviewSection
        title="추가 온보딩 질문 미리보기"
        description="자격 조건 진단을 위해 추가 온보딩을 진행할 때 보여질 질문들입니다."
      >
        <div className="space-y-3">
          {requirements.map((req, index) => (
            <div
              key={req.id}
              className="group flex flex-col gap-2 p-5 bg-[#F4F7FF] border border-transparent rounded-xl transition-all hover:border-blue-200"
            >
              <div className="flex items-center gap-3">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-600 text-white text-[12px] font-bold">
                  {index + 1}
                </span>
                <div>
                  <p className="font-bold text-slate-700">{req.question}</p>
                  <p className="text-[13px] text-slate-400 font-medium">
                    {req.description}
                  </p>
                </div>
              </div>
              <div className="pl-9">
                <div className="flex gap-3 flex-wrap">
                  <span className="p-2 bg-gray-200 text-gray-400 rounded-lg text-[13px]">
                    {req.type}
                  </span>
                  {req.type === "SELECT_SINGLE" &&
                    req.options?.map((item, index) => (
                      <span
                        key={item || index}
                        className="p-2 bg-white text-blue-600 border border-blue-600 rounded-lg text-[13px]"
                      >
                        {item}
                      </span>
                    ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </PreviewSection>

      {/* 공고 지원 관리 미리보기 섹션 */}
      <PreviewSection
        title="공고 지원 관리 미리보기"
        description="지원 관리에 해당 공고를 담았을 때 보여질 모습입니다."
      >
        <div className="space-y-10 relative mt-6">
          <div className="absolute left-2.75 top-2 bottom-2 w-0.5 bg-slate-100 z-0" />

          <PreviewTimelineItem
            title={`공고 접수: ${formatDateRange(schedule.applyStartDate, schedule.applyEndDate)}`}
          >
            <PreviewDocumentList
              label="필요 서류"
              items={schedule.requiredDocuments}
            />
          </PreviewTimelineItem>

          <PreviewTimelineItem
            title={`서류대상자 발표: ${schedule.documentPublishedAt.replace(/-/g, ".")}`}
          >
            <PreviewDocumentList
              label="제출 서류"
              items={schedule.resultDocuments}
            />
          </PreviewTimelineItem>

          <PreviewTimelineItem
            title={`당첨자 발표: ${schedule.finalPublishedAt.replace(/-/g, ".")}`}
          >
            <div className="bg-[#F8FAFF] p-5 rounded-xl border border-blue-50">
              <span className="text-[13px] font-bold text-slate-400 block mb-2">
                유의 사항:
              </span>
              <p className="text-[13px] text-slate-600 whitespace-pre-wrap break-keep leading-relaxed">
                {summary.description}
              </p>
            </div>
          </PreviewTimelineItem>
        </div>
      </PreviewSection>

      <div className="flex justify-between items-center pt-6">
        <Button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setStep(1);
          }}
          className="px-6 py-3 bg-gray-200 text-slate-500 font-bold hover:bg-slate-300 rounded-xl transition-colors"
        >
          이전 단계로
        </Button>
        <AdminReviewSubmitButton />
      </div>
    </form>
  );
}
