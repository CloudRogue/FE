"use client";

import Button from "@/src/shared/ui/button";
import Card from "@/src/shared/ui/card";

type InfoItem = {
  label: string;
  value: string;
};

const personalInfoList: InfoItem[] = [
  { label: "생년월일", value: "1999.10.21" },
  { label: "상태", value: "재직중" },
  { label: "주소", value: "경기도 00시 00구 00로 333-3" },
];

const assetInfoList: InfoItem[] = [
  { label: "월 평균 소득", value: "0원" },
  { label: "총 자산 규모", value: "0원" },
];

export default function MyPageEligibilityPage() {
  return (
    <div className="space-y-6 px-6 pb-12 pt-6">
      {/* 개인 정보 */}
      <Card padding="large" shadow="sm" className="rounded-3xl border-0">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900">개인 정보</h2>
          <Button type="button" className="text-sm font-medium text-blue-600">
            수정
          </Button>
        </div>

        <ul className="space-y-4 text-sm">
          {personalInfoList.map((item) => (
            <li
              key={item.label}
              className="flex items-start justify-between gap-4"
            >
              <span className="text-slate-600">{item.label}</span>
              <span className="text-right text-slate-900">{item.value}</span>
            </li>
          ))}
        </ul>
      </Card>

      {/* 자산 현황 */}
      <Card padding="large" shadow="sm" className="rounded-3xl border-0">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900">자산 현황</h2>
          <Button type="button" className="text-sm font-medium text-blue-600">
            수정
          </Button>
        </div>

        <ul className="space-y-4 text-sm">
          {assetInfoList.map((item) => (
            <li
              key={item.label}
              className="flex items-center justify-between gap-4"
            >
              <span className="text-slate-600">{item.label}</span>
              <span className="text-slate-900">{item.value}</span>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
