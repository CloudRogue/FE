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
import { ScheduleSection } from "@/src/widgets/announcement-schedule";
import { SupportSection } from "@/src/widgets/announcement-support";
import { useMemo } from "react";

interface AnnouncementDetailPageProps {
  announcement: AnnouncementDetail;
}

export function AnnouncementDetailPage({
  announcement,
}: AnnouncementDetailPageProps) {
  const period = useMemo(
    () => mapAnnouncementToSummary(announcement),
    [announcement],
  );

  return (
    <div className="bg-white">
      <AnnouncementCard {...announcement} period={period} />
      <TabsRoot defaultValue="support" className="w-full">
        <TabsList className="w-full border-b border-gray-200 bg-transparent p-0">
          <TabsTrigger value="support" className="flex-1 pt-4 pb-2">
            지원 자격
          </TabsTrigger>
          <TabsTrigger value="schedule" className="flex-1 pt-4 pb-2">
            공고 일정
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
          {/* 공고 일정(schedule) */}
          <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-1 gap-5 w-full">
            <TabsContent
              value="schedule"
              className="mt-0 outline-none md:!block"
            >
              <ScheduleSection period={period} announcement={announcement} />
            </TabsContent>

            <TabsContent
              value="summary"
              className="mt-0 outline-none md:!block"
            >
              <SummaryCard announcementId={announcement.announcementId} />
            </TabsContent>
          </div>
          {/* 공고 댓글(comment) */}
          <TabsContent value="comment" className="mt-0 outline-none">
            <CommentSection announcementId={announcement.announcementId} />
          </TabsContent>
        </div>
      </TabsRoot>
    </div>
  );
}
