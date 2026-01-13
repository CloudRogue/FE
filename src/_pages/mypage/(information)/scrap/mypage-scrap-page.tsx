"use client";

import { AnnouncementCard } from "@/src/entities/announcement-detail";
import { SortSelector } from "@/src/features/filter-announcements";

const MOCK_SCRAP_DATA = [
  {
    items: [
      {
        announcementId: 900001,
        provider: "LH",
        title: "Mock title 1",
        endDate: "2026-01-01",
        publisher: "LH 한국토지주택공사",
      },
      {
        announcementId: 900001,
        provider: "LH",
        title: "Mock title 1",
        endDate: "2026-01-01",
        publisher: "LH 한국토지주택공사",
      },
    ],
    page: 7,
    size: 8,
    totalElements: 7,
    totalPages: 7,
  },
];

export default function MyPageScrapPage() {
  const scrapData = MOCK_SCRAP_DATA[0];

  return (
    <div className="min-h-full bg-slate-50  p-4">
      <div className="text-right mb-2">
        <SortSelector />
      </div>
      <div className="flex flex-col gap-4">
        {scrapData?.items && scrapData.items.length > 0 ? (
          scrapData.items.map((item) => (
            <AnnouncementCard
              key={item.announcementId}
              announcementId={item.announcementId}
              title={item.title}
              publisher={item.publisher}
              status="OPEN"
              period={{
                start: "접수 중",
                end: item.endDate,
              }}
              dDay={null}
              isScrapped={true}
              housingType={item.provider}
              fullAdres={null}
              startDate={null as unknown as string}
              endDate={item.endDate}
              publishedAt={null as unknown as string}
              externalApplyUrl=""
              className="rounded-2xl"
            />
          ))
        ) : (
          <div className="py-20 text-center text-slate-400">
            관심 공고가 없습니다.
          </div>
        )}
      </div>
    </div>
  );
}
