import { mapAnnouncementToSummary } from "@/src/entities/announcement-detail/lib/announcement.mapper";
import { AnnouncementDetail } from "@/src/entities/announcement-detail/model/announcement.types";
import AnnouncementCard from "@/src/entities/announcement-detail/ui/announcement-card";
import {
  TabsContent,
  TabsList,
  TabsRoot,
  TabsTrigger,
} from "@/src/shared/ui/tabs";
import { CommentSection } from "@/src/widgets/announcement-comment/ui/comment-section";
import { OverviewSection } from "@/src/widgets/announcement-overview/ui/overview-section";
import { SupportSection } from "@/src/widgets/announcement-support/ui/support-section";
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
            <section className="bg-white p-6 rounded-2xl">
              <h3 className="text-lg font-bold text-gray-900">공고 요약</h3>
            </section>
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
