"use client";

import { AnnouncementHeader } from "@/src/widgets/announcement-header";
import { AnnouncementList } from "@/src/widgets/announcement-list";

export function AnnouncementPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* 고정 상단 헤더: 검색, 탭, 필터, 토글 포함 */}
      <AnnouncementHeader />

      {/* 스크롤 가능한 공고 목록 영역 */}
      <main className="flex-1 overflow-y-auto p-4">
        <AnnouncementList />
      </main>
    </div>
  );
}
