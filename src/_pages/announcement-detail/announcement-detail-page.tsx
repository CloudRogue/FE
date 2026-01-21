import {
  AnnouncementDetail,
  mapAnnouncementToSummary,
} from "@/src/entities/announcement-detail";
import SummaryCard from "@/src/entities/announcement-detail/ui/summary-card";
import { AnnouncementOutbound } from "@/src/features/announcement-outbound/ui/announcement-outbound";
import { ErrorBoundary } from "@/src/shared/api/error-boundary";
import {
  TabsContent,
  TabsList,
  TabsRoot,
  TabsTrigger,
} from "@/src/shared/ui/tabs";
import { AnnouncementCard } from "@/src/widgets/announcement-card";
import { ScheduleSection } from "@/src/widgets/announcement-schedule";
import { SupportSection } from "@/src/widgets/announcement-support";
import { Suspense } from "react";

interface AnnouncementDetailPageProps {
  announcement: AnnouncementDetail;
}

export async function AnnouncementDetailPage({
  announcement,
}: AnnouncementDetailPageProps) {
  const period = mapAnnouncementToSummary(announcement);

  return (
    <div className="bg-white">
      <AnnouncementOutbound announcementId={announcement.announcementId} />

      <AnnouncementCard
        {...announcement}
        externalApplyUrl={announcement.url ?? ""}
        publishedAt={new Date().toISOString()}
        period={period}
      />
      <TabsRoot defaultValue="support" className="w-full">
        <TabsList>
          <TabsTrigger value="support" className="flex-1 pt-4 pb-2">
            지원 자격
          </TabsTrigger>
          <TabsTrigger value="schedule" className="flex-1 pt-4 pb-2">
            공고 일정
          </TabsTrigger>
          <TabsTrigger value="summary" className="flex-1 pt-4 pb-2">
            공고 개요
          </TabsTrigger>
          {/* <TabsTrigger value="comment" className="flex-1 pt-4 pb-2">
            공고 댓글
          </TabsTrigger> */}
        </TabsList>
        <div className="bg-gray-bg min-h-[calc(100vh-200px)] p-4">
          {/* 지원 자격(support) */}
          <TabsContent value="support" className="mt-0 outline-none">
            <ErrorBoundary
              fallback={
                <p className="p-4 rounded-md text-center text-red-500 text-sm">
                  진단 정보를 불러오는 중 오류가 발생했습니다. 잠시 후 다시
                  시도해주세요.
                </p>
              }
            >
              <Suspense
                fallback={
                  <p className="p-4 rounded-md text-center text-gray-400 text-sm">
                    지원 자격 진단 중..
                  </p>
                }
              >
                <SupportSection announcement={announcement} />
              </Suspense>
            </ErrorBoundary>
          </TabsContent>
          {/* 공고 일정(schedule) */}
          <TabsContent value="schedule" className="mt-0 outline-none md:block!">
            <ScheduleSection period={period} announcement={announcement} />
          </TabsContent>

          <TabsContent value="summary" className="mt-0 outline-none md:block!">
            <SummaryCard
              announcementId={announcement.announcementId}
              url={announcement.url}
            />
          </TabsContent>
          {/* 공고 댓글(comment) */}
          {/* <TabsContent value="comment" className="mt-0 outline-none">
            <CommentSection announcementId={announcement.announcementId} />
          </TabsContent> */}
        </div>
      </TabsRoot>
    </div>
  );
}
