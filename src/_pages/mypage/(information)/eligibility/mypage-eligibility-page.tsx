"use client";

import Card from "@/src/shared/ui/card";

export default function MyPageEligibilityPage() {
  return (
    <div className="px-6 py-6 pb-12 space-y-6">
      {/* 개인 정보 */}
      <Card padding="large" shadow="sm" className="rounded-3xl border-0">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-slate-900">개인 정보</h2>
          <button type="button" className="text-sm font-medium text-blue-600">
            수정
          </button>
        </div>

        <ul className="space-y-4 text-sm">
          <li className="flex justify-between gap-4">
            <span className="text-slate-600">생년월일</span>
            <span className="text-slate-900">1999.10.21</span>
          </li>

          <li className="flex justify-between gap-4">
            <span className="text-slate-600">상태</span>
            <span className="text-slate-900">재직중</span>
          </li>

          <li className="flex justify-between gap-4">
            <span className="text-slate-600">주소</span>
            <span className="text-slate-900 text-right">
              경기도 00시 00구 00로 333-3
            </span>
          </li>
        </ul>
      </Card>

      {/* 자산 현황 */}
      <Card padding="large" shadow="sm" className="rounded-3xl border-0">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-semibold text-slate-900">자산 현황</h2>
          <button type="button" className="text-sm font-medium text-blue-600">
            수정
          </button>
        </div>

        <ul className="space-y-4 text-sm">
          <li className="flex justify-between gap-4">
            <span className="text-slate-600">월 평균 소득</span>
            <span className="text-slate-900">0원</span>
          </li>

          <li className="flex justify-between gap-4">
            <span className="text-slate-600">총 자산 규모</span>
            <span className="text-slate-900">0원</span>
          </li>
        </ul>
      </Card>
    </div>
  );
}
