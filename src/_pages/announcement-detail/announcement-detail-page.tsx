import AnnouncementCard from "@/src/entities/announcement-detail/ui/announcement-card";
import {
  TabsContent,
  TabsList,
  TabsRoot,
  TabsTrigger,
} from "@/src/shared/ui/tabs";
import { AnnouncementSummary } from "@/src/widgets/announcement-summary/ui/announcement-summary";
import { EligibilitySection } from "@/src/widgets/eligibility-section/ui/eligibility-section";

export function AnnouncementDetailPage() {
  const data = {
    target: "만 19~34세 무주택 청년",
    price: "월세 23~47만원",
    period: { start: "2025.12.31", end: "2026.01.01" },
    method: "LH 청약플러스 온라인 접수",
    sourceUrl: "sourceUrl",
  };
  return (
    <div className="bg-white">
      <AnnouncementCard
        title="2025년 전세형 매입임대주택 입주자 모집 공고"
        period={data.period}
        imageUrl=""
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
            <AnnouncementSummary data={data} />
          </TabsContent>
        </div>
      </TabsRoot>
    </div>
  );
}
