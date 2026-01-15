import { useAdminFormStore } from "@/src/features/admin-review-detail";
import { useAdminStepperStore } from "@/src/widgets/admin-review-detail";
import { Check } from "lucide-react";

export function ReviewDetailTwoSection() {
  const { setStep } = useAdminStepperStore();
  const { formData } = useAdminFormStore();
  const { requirements, schedule, summary } = formData;

  const handleSubmitFinal = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("서버로 데이터 전송:", formData);
    alert("공고가 성공적으로 등록되었습니다.");
  };

  return (
    <form
      onSubmit={handleSubmitFinal}
      className="animate-in fade-in slide-in-from-right-4 duration-500"
    >
      <section className="bg-white border border-slate-100 rounded-2xl shadow-sm p-8 space-y-6">
        <div>
          <h2 className="font-bold text-slate-800 mb-1 text-lg">
            추가 온보딩 질문 매핑
          </h2>
          <p className="text-sm text-slate-500">
            자격 조건 Key 기반으로 자동 연결된 추가 온보딩 질문들입니다. 와이어
            프레임 작업 이후 진행 예정
          </p>
        </div>

        <div className="space-y-3">
          {requirements.map((req, index) => (
            <div
              key={req.id}
              className="group flex flex-col gap-1 p-5 bg-[#F4F7FF] border border-transparent rounded-xl transition-all hover:border-blue-200"
            >
              <div className="flex items-center gap-3">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-600 text-white text-[12px] font-bold">
                  {index + 1}
                </span>
                {/* <span className="font-bold text-slate-700">{req.label}</span> */}
              </div>
              <div className="pl-9">
                <p className="text-[13px] text-slate-400 font-medium">
                  Key: {req.id}
                </p>
                <div className="flex items-center gap-1 mt-2 text-blue-600">
                  <span className="text-[11px] font-bold">🔗 Auto-Linked</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 2. 공고 지원 관리 미리보기 섹션 */}
      <section className="bg-white border border-slate-100 rounded-2xl shadow-sm p-8 space-y-8">
        <div>
          <h2 className="font-bold text-slate-800 mb-1 text-lg">
            공고 지원 관리 미리보기
          </h2>
          <p className="text-sm text-slate-500">
            지원 관리에 해당 공고를 담았을 때 보여질 모습입니다.
          </p>
        </div>

        <div className="space-y-10 relative">
          {/* 타임라인 수직선 */}
          <div className="absolute left-2.75 top-2 bottom-2 w-0.5 bg-slate-100 z-0" />

          {/* 2-1. 공고 접수 */}
          <TimelineItem
            title={`공고 접수: ${schedule.applyStart.replace(/-/g, ".")} ~ ${schedule.applyEnd.slice(-5).replace(/-/g, ".")}`}
          >
            <div className="space-y-4">
              <DocumentList
                label="필요 서류"
                items={schedule.requiredDocuments}
              />
            </div>
          </TimelineItem>

          {/* 2-2. 서류대상자 발표 */}
          <TimelineItem
            title={`서류대상자 발표: ${schedule.resultDate.replace(/-/g, ".")}`}
          >
            <div className="space-y-4">
              <DocumentList
                label="필요 서류"
                items={schedule.resultDocuments.map((d) => d.name)}
              />
              <DocumentList
                label="추가 서류"
                items={[
                  "청약저축 순위확인서",
                  "사회초년생/취업준비생 증빙 서류",
                ]}
              />
            </div>
          </TimelineItem>

          {/* 2-3. 당첨자 발표 */}
          <TimelineItem
            title={`당첨자 발표: ${schedule.finalDate.replace(/-/g, ".")}`}
          >
            <div className="bg-[#F8FAFF] p-5 rounded-xl border border-blue-50">
              <span className="text-[13px] font-bold text-slate-400 block mb-2">
                유의 사항:
              </span>
              <p className="text-[13px] text-slate-600 leading-relaxed break-keep">
                {summary.description}
              </p>
            </div>
          </TimelineItem>
        </div>
      </section>

      <div className="flex justify-between items-center pt-6">
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setStep(1);
          }}
          className="px-6 py-3 bg-gray-200 text-slate-500 font-bold hover:bg-slate-300 rounded-xl transition-colors"
        >
          이전 단계로
        </button>
        <button
          type="submit"
          className="px-10 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-100 transition-all"
        >
          최종 등록하기
        </button>
      </div>
    </form>
  );
}

/**
 * 타임라인 아이템 레이아웃
 */
function TimelineItem({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-4 relative z-10">
      <div className="shrink-0 w-6 h-6 rounded-full bg-slate-500 flex items-center justify-center mt-1">
        <Check size={14} className="text-white" strokeWidth={3} />
      </div>
      <div className="flex flex-col gap-4 w-full">
        <span className="font-bold text-slate-900 text-[16px]">{title}</span>
        {children}
      </div>
    </div>
  );
}

/**
 * 서류 리스트 박스
 */
function DocumentList({ label, items }: { label: string; items: string[] }) {
  if (items.length === 0) return null;
  return (
    <div className="bg-[#F8FAFF] p-5 rounded-xl border border-blue-50">
      <span className="text-[13px] font-bold text-slate-400 block mb-2">
        {label}:
      </span>
      <ul className="space-y-1">
        {items.map((item, i) => (
          <li key={i} className="text-[13px] text-slate-600 font-medium">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
