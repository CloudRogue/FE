"use client";

import {
  DetailField,
  useAdminFormStore,
} from "@/src/features/admin-review-detail";
import Button from "@/src/shared/ui/button";
import Input from "@/src/shared/ui/input";
import { Plus, X } from "lucide-react";

interface SummaryData {
  target: string;
  method: string;
  regions: string[];
  description: string;
}

export function DetailFormSummary() {
  const { formData, updateSection, addItem, removeItem } = useAdminFormStore();
  const summary = formData.summary as SummaryData;

  const handleChange = (
    field: keyof Omit<SummaryData, "regions">,
    value: string,
  ) => {
    updateSection("summary", { [field]: value });
  };

  const handleAddRegion = () => {
    const newRegion = prompt("추가할 지역명을 입력하세요 (예: 송파구)");
    if (newRegion && !summary.regions.includes(newRegion)) {
      addItem("regions", newRegion);
    }
  };

  return (
    <div className="bg-white border border-slate-100 rounded-2xl shadow-sm p-8 space-y-8 mb-5">
      <h2 className="text-[18px] font-bold text-slate-800">공고 개요</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
        {/* 대상 */}
        <DetailField label="대상">
          <Input
            placeholder="만 19~39세 무주택 청년"
            className="w-full p-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-[15px]"
            value={summary.target}
            onChange={(e) => handleChange("target", e.target.value)}
          />
        </DetailField>

        {/* 접수 방법 */}
        <DetailField label="접수 방법">
          <Input
            placeholder="LH 청약플러스 온라인 접수"
            className="w-full p-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-[15px]"
            value={summary.method}
            onChange={(e) => handleChange("method", e.target.value)}
          />
        </DetailField>

        {/* 지역 태그 리스트 */}
        <div className="md:col-span-2">
          <DetailField label="지역">
            <div className="flex flex-wrap gap-2 p-4 border border-slate-100 rounded-xl bg-slate-50/50">
              {summary.regions.map((region, index) => (
                <RegionTag
                  key={`${region}-${index}`}
                  label={region}
                  onRemove={() => removeItem("regions", index)}
                />
              ))}

              <Button
                onClick={handleAddRegion}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-slate-500 font-bold text-sm hover:bg-slate-50 transition-all"
              >
                <Plus size={14} /> 지역 추가
              </Button>
            </div>
          </DetailField>
        </div>

        {/* 공고 요약 및 유의사항 */}
        <div className="md:col-span-2">
          <DetailField label="공고 요약 및 유의사항 (지원 관리 시 유의 사항으로 들어감)">
            <div className="relative">
              <textarea
                placeholder="공고의 핵심 내용을 요약해 주세요."
                className="w-full h-40 p-4 border border-slate-200 rounded-xl text-[14px] leading-relaxed focus:ring-2 focus:ring-blue-500 outline-none resize-none transition-all"
                value={summary.description}
                onChange={(e) => handleChange("description", e.target.value)}
                maxLength={500}
              />
              <div className="absolute bottom-4 right-4 text-xs text-slate-400">
                <b
                  className={
                    summary.description.length >= 500
                      ? "text-red-500"
                      : "text-slate-600"
                  }
                >
                  {summary.description.length}
                </b>
                /500자
              </div>
            </div>
          </DetailField>
        </div>
      </div>
    </div>
  );
}

// 지역 태그 칩
interface RegionTagProps {
  label: string;
  onRemove: () => void;
}
function RegionTag({ label, onRemove }: RegionTagProps) {
  return (
    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-blue-200 rounded-lg text-blue-600 font-bold text-sm">
      {label}
      <Button
        onClick={onRemove}
        className="text-blue-400 hover:text-red-500 transition-colors p-0 h-5"
        aria-label={`${label} 삭제`}
      >
        <X size={14} />
      </Button>
    </div>
  );
}
