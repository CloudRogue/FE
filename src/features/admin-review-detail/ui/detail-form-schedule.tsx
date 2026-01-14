"use client";

import {
  DetailField,
  ResultDocument,
  useAdminFormStore,
} from "@/src/features/admin-review-detail";
import Button from "@/src/shared/ui/button";
import Input from "@/src/shared/ui/input";
import Select from "@/src/shared/ui/select";
import { FileText, Plus, X } from "lucide-react";
import { useState } from "react";

export function DetailFormSchedule() {
  const { formData, updateSection, addItem, removeItem } = useAdminFormStore();
  const { schedule } = formData;

  const handleUpdate = (updates: Partial<typeof schedule>) => {
    updateSection("schedule", updates);
  };

  return (
    <div className="bg-white border border-slate-100 rounded-2xl shadow-sm p-8 space-y-10 mb-5">
      <h2 className="text-[18px] font-bold text-slate-800">
        공고 일정 및 지원 관리
      </h2>

      {/* 공고 접수 및 필수 서류 */}
      <ScheduleSection title="공고 접수 및 필수 서류">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <DetailField label="접수 시작일">
            <Input
              type="date"
              value={schedule.applyStart}
              onChange={(e) => handleUpdate({ applyStart: e.target.value })}
              className="w-full p-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-[15px]"
            />
          </DetailField>
          <DetailField label="접수 마감일">
            <Input
              type="date"
              value={schedule.applyEnd}
              onChange={(e) => handleUpdate({ applyEnd: e.target.value })}
              className="w-full p-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-[15px]"
            />
          </DetailField>
        </div>

        <DocumentManager
          title="공고 접수 시 필수 서류 리스트"
          documents={schedule.requiredDocuments}
          onAdd={(name: string) => addItem("requiredDocuments", name)}
          onRemove={(idx: number) => removeItem("requiredDocuments", idx)}
        />
      </ScheduleSection>

      {/* 2. 서류 발표 및 제출 서류 */}
      <ScheduleSection title="서류 발표 및 제출 서류">
        <DateField
          label="서류 대상자 발표일"
          value={schedule.resultDate}
          onChange={(val: string) => handleUpdate({ resultDate: val })}
        />

        <DocumentManager
          title="서류 대상 시 필수 서류 리스트"
          documents={schedule.resultDocuments}
          hasTargetSelect
          onAdd={(name: string, target: string) =>
            addItem("resultDocuments", { name, target })
          }
          onRemove={(idx: number) => removeItem("resultDocuments", idx)}
        />
      </ScheduleSection>

      {/* 3. 최종 발표 */}
      <ScheduleSection title="최종 발표 및 유의 사항">
        <DateField
          label="최종 당첨자 발표일"
          value={schedule.finalDate}
          onChange={(val: string) => handleUpdate({ finalDate: val })}
        />
        <p className="text-[11px] text-slate-400 mt-4">
          *최종 대기 시 당첨 유의 사항은 공고 요약글과 동일하게 들어갑니다.
        </p>
      </ScheduleSection>
    </div>
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

// 날짜 입력 + 추후 입력 체크박스
interface DateFieldProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
}

function DateField({ label, value, onChange }: DateFieldProps) {
  return (
    <div className="flex items-end gap-4">
      <div className="flex-1 max-w-60">
        <DetailField label={label}>
          <Input
            type="date"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full p-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-[15px]"
          />
        </DetailField>
      </div>
      <label className="flex items-center gap-2 text-xs text-slate-400 cursor-pointer pb-3">
        <input type="checkbox" className="rounded border-slate-300 w-4 h-4" />
        추후 입력
      </label>
    </div>
  );
}

// 서류 리스트 관리 (추가/삭제/칩 표시)
interface DocumentManagerProps {
  title: string;
  documents: (string | ResultDocument)[];
  onAdd: (name: string, target: string) => void;
  onRemove: (idx: number) => void;
  hasTargetSelect?: boolean;
}

function DocumentManager({
  title,
  documents,
  onAdd,
  onRemove,
  hasTargetSelect = false,
}: DocumentManagerProps) {
  const [inputValue, setInputValue] = useState("");
  const [target, setTarget] = useState("공통");

  const handleAdd = () => {
    if (!inputValue.trim()) return;
    onAdd(inputValue, target);
    setInputValue("");
  };

  return (
    <div className="space-y-3 pt-2">
      <div className="flex items-center gap-2 text-blue-600 mb-1">
        <FileText size={16} />
        <span className="text-xs font-bold">{title}</span>
      </div>

      <div className="flex gap-2">
        <Input
          placeholder="서류명을 입력하세요"
          className="w-md p-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-[15px]"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAdd()}
        />
        {hasTargetSelect && (
          <Select
            className="border-slate-200 font-bold text-slate-700 rounded-xl"
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            options={[
              { value: "공통", label: "공통" },
              { value: "대상자만", label: "대상자만" },
            ]}
          />
        )}
        <Button
          onClick={handleAdd}
          className="bg-blue-600 text-white px-4 rounded-xl shrink-0"
        >
          <Plus size={16} className="mr-1" /> 추가
        </Button>
      </div>

      <div className="flex flex-wrap gap-2 mt-3">
        {documents.map((doc: any, idx: number) => (
          <div
            key={idx}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-blue-100 text-blue-700 rounded-lg text-xs font-bold shadow-sm transition-all hover:border-blue-300"
          >
            {typeof doc === "string" ? doc : `${doc.name} (${doc.target})`}
            <button
              onClick={() => onRemove(idx)}
              className="text-blue-300 hover:text-red-500"
            >
              <X size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
