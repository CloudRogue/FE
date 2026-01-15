// 공고 기본 정보 섹션 컴포넌트

import {
  ANNOUNCEMENT_TYPE_MAP,
  DetailField,
  useAdminFormStore,
} from "@/src/features/admin-review-detail";
import Select from "@/src/shared/ui/select";
import { useCallback, useMemo } from "react";

export function BasicInfoForm() {
  const { formData, updateSection } = useAdminFormStore();
  const { basicInfo } = formData;

  const handleChange = useCallback(
    (field: keyof typeof basicInfo, value: string) => {
      updateSection("basicInfo", {
        ...basicInfo,
        [field]: value,
      });
    },
    [basicInfo, updateSection],
  );

  // 현재 선택된 공급 주체에 따른 주택 유형 옵션 필터링
  const currentAnnouncementOptions = useMemo(() => {
    return ANNOUNCEMENT_TYPE_MAP[basicInfo.provider] || [];
  }, [basicInfo.provider]);

  return (
    <section className="bg-white border border-slate-100 rounded-2xl p-8 space-y-8">
      <h2 className="text-[18px] font-bold text-slate-800">공고 기본 정보</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
        {/* 공고명 */}
        <DetailField
          label="공고명"
          required
          placeholder="공고명을 입력하세요"
          value={basicInfo.title}
          onChange={(e) => handleChange("title", e.target.value)}
          containerClassName="md:col-span-2"
        />
        {/* 공급 주체 */}
        <DetailField label="공급 주체">{basicInfo.provider}</DetailField>
        {/* 주택 유형 */}
        <Select
          label="주택 유형"
          options={currentAnnouncementOptions}
          value={basicInfo.announcementType}
          onChange={(e) => handleChange("announcementType", e.target.value)}
          className="p-2 border-slate-200 font-bold text-slate-700 rounded-xl"
        />

        {/* 원문 링크 */}
        <DetailField
          label="원문 링크"
          required
          placeholder="https://example.com/..."
          value={basicInfo.originalLink}
          onChange={(e) => handleChange("originalLink", e.target.value)}
        />

        {/* 신청 링크 */}
        <DetailField
          label="신청 링크"
          required
          placeholder="https://example.com/..."
          value={basicInfo.applyLink}
          onChange={(e) => handleChange("applyLink", e.target.value)}
        />
      </div>
    </section>
  );
}
