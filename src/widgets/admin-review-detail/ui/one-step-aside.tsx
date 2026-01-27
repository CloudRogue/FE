"use client";

import { useAdminFormStore } from "@/src/features/admin-review-detail";

export function OneStepAside() {
  const { formData } = useAdminFormStore();
  const kvDigest = formData?.summary?.kvDigest || [];

  return (
    <aside className="sticky top-10 self-start shrink-0 w-75 hidden xl:block">
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
        <h3 className="text-lg font-bold mb-6 text-gray-800">AI 요약</h3>

        <div className="space-y-6">
          {kvDigest.length > 0 ? (
            kvDigest.map((item, index) => (
              <div key={index} className="flex flex-col">
                <p className="text-xs text-gray-400 font-medium mb-1">
                  {item.key}
                </p>
                <p className="text-sm font-semibold text-gray-700 break-keep">
                  {item.value}
                </p>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-400">요약 데이터가 없습니다.</p>
          )}
        </div>
      </div>
    </aside>
  );
}
