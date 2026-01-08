import {
  AnnouncementCard,
  AnnouncementDetail,
  mapAnnouncementToSummary,
} from "@/src/entities/announcement-detail";
import SummaryCard from "@/src/entities/announcement-detail/ui/summary-card";
import {
  TabsContent,
  TabsList,
  TabsRoot,
  TabsTrigger,
} from "@/src/shared/ui/tabs";
import { CommentSection } from "@/src/widgets/announcement-comment";
import { OverviewSection } from "@/src/widgets/announcement-overview";
import { SupportSection } from "@/src/widgets/announcement-support";
import { useMemo } from "react";

interface AnnouncementDetailPageProps {
  announcement: AnnouncementDetail;
}

export function AnnouncementDetailPage({
  announcement,
}: AnnouncementDetailPageProps) {
  const summaryData = useMemo(
    () => mapAnnouncementToSummary(announcement),
    [announcement],
  );

  return (
    <div className="bg-white">
      <AnnouncementCard {...announcement} period={summaryData.period} />
      <TabsRoot defaultValue="support" className="w-full">
        <TabsList className="w-full border-b border-gray-200 bg-transparent p-0">
          <TabsTrigger value="support" className="flex-1 pt-4 pb-2">
            지원 자격
          </TabsTrigger>
          <TabsTrigger value="overview" className="flex-1 pt-4 pb-2">
            공고 개요
          </TabsTrigger>
          <TabsTrigger value="summary" className="flex-1 pt-4 pb-2">
            공고 요약
          </TabsTrigger>
          <TabsTrigger value="comment" className="flex-1 pt-4 pb-2">
            공고 댓글
          </TabsTrigger>
        </TabsList>
        <div className="bg-gray-100 min-h-[calc(100vh-200px)] p-5">
          {/* 지원 자격(support) */}
          <TabsContent value="support" className="mt-0 outline-none">
            <SupportSection announcement={announcement} />
          </TabsContent>
          {/* 공고 개요(overview) */}
          <TabsContent value="overview" className="mt-0 outline-none">
            <OverviewSection data={summaryData} />
          </TabsContent>
          {/* 공고 요약(summary) */}
          <TabsContent value="summary" className="mt-0 outline-none">
            <SummaryCard announcementId={announcement.announcementId} />
          </TabsContent>
          {/* 공고 댓글(comment) */}
          <TabsContent value="comment" className="mt-0 outline-none">
            <CommentSection announcementId={announcement.announcementId} />
          </TabsContent>
        </div>
      </TabsRoot>
    </div>
  );
}
