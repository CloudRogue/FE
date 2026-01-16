// 공고 개요 섹션

import {
  DetailField,
  SummaryItem,
  useAdminFormStore,
} from "@/src/features/admin-review-detail";
import { RegionTag } from "@/src/features/admin-review-detail/ui/region-tag";
import Button from "@/src/shared/ui/button";
import { TextArea } from "@/src/shared/ui/textarea";
import { Plus } from "lucide-react";

export function SummaryForm() {
  const { formData, updateSection, addItem, removeItem } = useAdminFormStore();
  const { summary } = formData;

  const handleChange = (
    field: keyof Omit<SummaryItem, "regions">,
    value: string,
  ) => {
    updateSection("summary", { [field]: value });
  };

  const handleAddRegion = () => {
    const newRegion = prompt("추가할 지역명을 입력하세요 (예: 송파구)");
    if (newRegion && !summary.regions.includes(newRegion)) {
      addItem("summary.regions", newRegion);
    }
  };

  return (
    <section className="bg-white border border-slate-100 rounded-2xl p-8 space-y-8">
      <h2 className="text-[18px] font-bold text-slate-800">공고 개요</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
        {/* 대상 */}
        <DetailField
          label="대상"
          placeholder="만 19~39세 무주택 청년"
          value={summary.target}
          onChange={(e) => handleChange("target", e.target.value)}
        />

        {/* 접수 방법 */}
        <DetailField
          label="접수 방법"
          placeholder="LH 청약플러스 온라인 접수"
          value={summary.method}
          onChange={(e) => handleChange("method", e.target.value)}
        />

        {/* 임대 보증금 (최소) */}
        <DetailField
          label="임대 보증금 (최소)"
          placeholder="1000 만원"
          value={summary.rentGtn}
          onChange={(e) => handleChange("rentGtn", e.target.value)}
        />

        {/* 월 임대로 (최소)) */}
        <DetailField
          label="월 임대로 (최소)"
          placeholder="1000 만원"
          value={summary.mtRntchrg}
          onChange={(e) => handleChange("mtRntchrg", e.target.value)}
        />

        {/* 지역 태그 리스트 */}
        <div className="md:col-span-2">
          <DetailField label="지역">
            <div className="flex flex-wrap gap-2 p-4 border border-slate-100 rounded-xl bg-slate-50/50">
              {summary.regions.map((region, index) => (
                <RegionTag
                  key={`${region}-${index}`}
                  label={region}
                  onRemove={() => removeItem("summary.regions", index)}
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
          <TextArea
            label="공고 요약 및 유의사항 (지원 관리 시 유의 사항으로 들어감)"
            placeholder="공고의 핵심 내용을 요약해 주세요."
            value={summary.description}
            onChange={(e) => handleChange("description", e.target.value)}
            maxLength={500}
            required
          />
        </div>
      </div>
    </section>
  );
}
