// 공고 일정 및 지원 관리 섹션

import {
  DetailField,
  ScheduleDocument,
  useAdminFormStore,
} from "@/src/features/admin-review-detail";

export function ScheduleForm() {
  const { formData, updateSection, addItem, removeItem } = useAdminFormStore();
  const { schedule } = formData;

  const handleUpdate = (updates: Partial<typeof schedule>) => {
    updateSection("schedule", updates);
  };

  return (
    <section className="bg-white border border-slate-100 rounded-2xl p-8 space-y-8">
      <h2 className="text-[18px] font-bold text-slate-800">
        공고 일정 및 지원 관리
      </h2>

      {/* 공고 접수 및 필수 서류 */}
      <ScheduleSection title="공고 접수 및 필수 서류">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <DetailField
            label="접수 시작일"
            type="date"
            value={schedule.applyStartDate}
            onChange={(e) => handleUpdate({ applyStartDate: e.target.value })}
          />

          <DetailField
            label="접수 마감일"
            type="date"
            value={schedule.applyEndDate}
            onChange={(e) => handleUpdate({ applyEndDate: e.target.value })}
          />
        </div>

        <ScheduleDocument
          title="공고 접수 시 필수 서류 리스트"
          documents={schedule.requiredDocuments}
          onAdd={(name: string) => addItem("schedule.requiredDocuments", name)}
          onRemove={(idx: number) =>
            removeItem("schedule.requiredDocuments", idx)
          }
        />
      </ScheduleSection>

      {/* 서류 발표 및 제출 서류 */}
      <ScheduleSection title="서류 발표 및 제출 서류">
        <DetailField
          label="서류 대상자 발표일"
          type="date"
          value={schedule.documentPublishedAt}
          onChange={(e) =>
            handleUpdate({ documentPublishedAt: e.target.value })
          }
        />

        <ScheduleDocument
          title="서류 대상 시 필수 서류 리스트"
          documents={schedule.resultDocuments}
          hasTargetSelect
          onAdd={(name: string) => addItem("schedule.resultDocuments", name)}
          onRemove={(idx: number) =>
            removeItem("schedule.resultDocuments", idx)
          }
        />
      </ScheduleSection>

      {/* 최종 발표 */}
      <ScheduleSection title="최종 발표 및 유의 사항">
        <DetailField
          label="최종 대상자 발표일"
          type="date"
          value={schedule.finalPublishedAt}
          onChange={(e) => handleUpdate({ finalPublishedAt: e.target.value })}
        />

        <p className="text-[11px] text-slate-400 mt-4">
          * 최종 대기 시 당첨 유의 사항은 공고 요약글과 동일하게 들어갑니다.
        </p>
      </ScheduleSection>
    </section>
  );
}

interface ScheduleSection {
  title: string;
  children: React.ReactNode;
}

function ScheduleSection({ title, children }: ScheduleSection) {
  return (
    <section className="bg-slate-50/50 p-6 border border-slate-100 rounded-xl space-y-6">
      <p className="text-sm font-bold text-slate-500">{title}</p>
      {children}
    </section>
  );
}
