"use client";

import {
  ANNOUNCEMENT_TYPE_MAP,
  APPLY_LINK_OPTIONS,
  DetailField,
  PROVIDER_OPTIONS,
  useAdminFormStore,
} from "@/src/features/admin-review-detail";
import Input from "@/src/shared/ui/input";
import Select from "@/src/shared/ui/select";
import { useEffect, useMemo } from "react";

export function DetailFormBasicInfo() {
  const { formData, updateSection } = useAdminFormStore();
  const { basicInfo } = formData;

  const handleChange = (field: keyof typeof basicInfo, value: string) => {
    updateSection("basicInfo", { [field]: value });
  };

  // 현재 선택된 공급 주체에 따른 주택 유형 옵션 필터링
  const currentAnnouncementOptions = useMemo(() => {
    return ANNOUNCEMENT_TYPE_MAP[basicInfo.provider] || [];
  }, [basicInfo.provider]);

  // 공급 주체가 변경될 때 주택 유형 초기화
  useEffect(() => {
    const options = ANNOUNCEMENT_TYPE_MAP[basicInfo.provider];
    if (options && options.length > 0) {
      // 현재 선택된 주택 유형이 새로운 옵션 리스트에 없는 경우에만 첫 번째 값으로 변경
      const isValid = options.some(
        (opt) => opt.value === basicInfo.announcementType,
      );
      if (!isValid) {
        handleChange("announcementType", options[0].value);
      }
    }
  }, [basicInfo.provider]);

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
          options={currentAnnouncementOptions}
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
