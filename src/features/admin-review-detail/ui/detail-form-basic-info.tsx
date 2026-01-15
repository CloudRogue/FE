"use client";

import {
  ANNOUNCEMENT_TYPE_OPTIONS,
  APPLY_LINK_OPTIONS,
  DetailField,
  PROVIDER_OPTIONS,
  useAdminFormStore,
} from "@/src/features/admin-review-detail";
import Input from "@/src/shared/ui/input";
import Select from "@/src/shared/ui/select";

export function DetailFormBasicInfo() {
  const { formData, updateSection } = useAdminFormStore();
  const { basicInfo } = formData;

  const handleChange = (field: keyof typeof basicInfo, value: string) => {
    updateSection("basicInfo", { [field]: value });
  };

  return (
    <div className="bg-white border border-slate-100 rounded-2xl shadow-sm p-8 space-y-8 mb-5">
      <h2 className="text-[18px] font-bold text-slate-800">공고 기본 정보</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
        {/* 공고명 */}
        <DetailField label="공고명">
          <Input
            required
            placeholder="공고명을 입력하세요"
            className="w-full p-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-[15px]"
            value={basicInfo.title}
            onChange={(e) => handleChange("title", e.target.value)}
          />
        </DetailField>

        {/* 공고 이미지 */}
        <DetailField label="공고 이미지">
          <div className="flex gap-3">
            <LogoBadge label="SH" color="green" />
            <LogoBadge label="LH" color="blue" />
          </div>
        </DetailField>

        {/* 공급 주체 */}
        <Select
          label="공급 주체"
          options={PROVIDER_OPTIONS}
          value={basicInfo.provider}
          onChange={(e) => handleChange("provider", e.target.value)}
          className="border-slate-200 font-bold text-slate-700 rounded-xl"
        />

        {/* 주택 유형 */}
        <Select
          label="주택 유형"
          options={ANNOUNCEMENT_TYPE_OPTIONS}
          value={basicInfo.announcementType}
          onChange={(e) => handleChange("announcementType", e.target.value)}
          className="border-slate-200 font-bold text-slate-700 rounded-xl"
        />

        {/* 원문 링크 */}
        <DetailField label="원문 링크">
          <Input
            placeholder="https://example.com/..."
            className="w-full p-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-[15px]"
            value={basicInfo.originalLink}
            onChange={(e) => handleChange("originalLink", e.target.value)}
          />
        </DetailField>

        {/* 신청 링크 */}
        <Select
          label="신청 링크"
          options={APPLY_LINK_OPTIONS}
          value={basicInfo.applyLink}
          onChange={(e) => handleChange("applyLink", e.target.value)}
          className="border-slate-200 font-bold text-slate-700 rounded-xl"
        />
      </div>
    </div>
  );
}

interface LogoBadge {
  label: string;
  color: "green" | "blue";
}

function LogoBadge({ label, color }: LogoBadge) {
  const colorClass = color === "green" ? "text-green-600" : "text-blue-600";
  return (
    <div className="p-2 border border-slate-200 rounded-lg">
      <span className={`text-xs font-bold ${colorClass}`}>{label}</span>
    </div>
  );
}
