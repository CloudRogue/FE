"use client";

import Button from "@/src/shared/ui/button";

export function ApplyActions({
  sourceUrl,
}: {
  sourceUrl: { originalUrl: string; url?: string };
}) {
  const handleViewOriginal = () => {
    window.open(sourceUrl.originalUrl, "_blank");
  };
  const handleViewUrl = () => {
    window.open(sourceUrl.url, "_blank");
  };

  return (
    <div className="flex gap-4 mt-2">
      <Button
        onClick={handleViewOriginal}
        className="flex-1 bg-gray-100 text-gray-600 py-4 rounded-xl font-bold"
      >
        공고문 원문 보기
      </Button>
      <Button
        onClick={handleViewUrl}
        className="flex-1 bg-gray-100 text-gray-600 py-4 rounded-xl font-bold"
      >
        공고 신청하러 가기
      </Button>
    </div>
  );
}
