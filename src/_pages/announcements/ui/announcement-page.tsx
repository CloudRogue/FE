"use client";

import { useEffect } from "react";
import { useFilterStore } from "@/src/features/filter-announcements";
import { AnnouncementHeader } from "@/src/widgets/announcement-header";
import { AnnouncementList } from "@/src/widgets/announcement-list";

export function AnnouncementPage() {
  const resetFilters = useFilterStore((state) => state.resetFilters);

  useEffect(() => {
    resetFilters();
  }, [resetFilters]);

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <AnnouncementHeader />

      <main className="flex-1 overflow-y-auto p-4">
        <AnnouncementList />
      </main>
    </div>
  );
}
