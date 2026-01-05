import { mapAnnouncementToSummary } from "@/src/entities/announcement-detail/lib/announcement.mapper";
import { AnnouncementDetail } from "@/src/entities/announcement-detail/model/announcement.types";
import AnnouncementCard from "@/src/entities/announcement-detail/ui/announcement-card";
import {
  TabsContent,
  TabsList,
  TabsRoot,
  TabsTrigger,
} from "@/src/shared/ui/tabs";
import { AnnouncementSummary } from "@/src/widgets/announcement-summary/ui/announcement-summary";
import { EligibilitySection } from "@/src/widgets/eligibility-section/ui/eligibility-section";

interface AnnouncementDetailPageProps {
  announcement: AnnouncementDetail;
}

export function AnnouncementDetailPage({
  announcement,
}: AnnouncementDetailPageProps) {
  const summaryData = mapAnnouncementToSummary(announcement);

  return (
    <div className="bg-white">
      <AnnouncementCard
        title={announcement.title}
        period={summaryData.period}
        imageUrl=""
        status={announcement.status}
      />
      <TabsRoot defaultValue="support" className="w-full">
        <TabsList className="w-full bg-transparent border-none p-0">
          <TabsList className="w-full border-b border-gray-200 bg-transparent p-0">
            <TabsTrigger value="support" className="flex-1 pt-4 pb-2">
              지원 자격
            </TabsTrigger>
            <TabsTrigger value="summary" className="flex-1 pt-4 pb-2">
              공고 요약
            </TabsTrigger>
          </TabsList>
        </TabsList>
        <div className="bg-gray-100 min-h-[calc(100vh-200px)] p-5">
          <TabsContent value="support" className="mt-0 outline-none">
            <EligibilitySection />
          </TabsContent>
          <TabsContent value="summary" className="mt-0 outline-none">
            <AnnouncementSummary data={summaryData} />
          </TabsContent>
        </div>
      </TabsRoot>
    </div>
  );
}
