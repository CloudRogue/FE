import {
  ManagementListCard,
  ManagementStatusCard,
} from "@/src/entities/management";
import {
  TabsContent,
  TabsList,
  TabsRoot,
  TabsTrigger,
} from "@/src/shared/ui/tabs";

export default function ManagementPage() {
  return (
    <div>
      <ManagementStatusCard />

      <TabsRoot defaultValue="applying" className="w-full">
        <TabsList className="w-full border-b border-gray-200 bg-transparent p-0">
          <TabsTrigger value="applying" className="flex-1 pt-4 pb-2">
            지원 중
          </TabsTrigger>
          <TabsTrigger value="pending" className="flex-1 pt-4 pb-2">
            서류 대기
          </TabsTrigger>
          <TabsTrigger value="final" className="flex-1 pt-4 pb-2">
            최종 대기
          </TabsTrigger>
          <TabsTrigger value="closed" className="flex-1 pt-4 pb-2">
            마감
          </TabsTrigger>
        </TabsList>
        <div className="bg-gray-100 min-h-[calc(100vh-200px)] p-5">
          {/* 지원 중(applying) */}
          <TabsContent value="applying" className="mt-0 outline-none">
            <ManagementListCard status="applying" />
          </TabsContent>
          {/* 서류 대기(pending) */}
          <TabsContent value="pending" className="mt-0 outline-none">
            <ManagementListCard status="pending" />
          </TabsContent>
          {/* 최종 대기(final) */}
          <TabsContent value="final" className="mt-0 outline-none">
            <ManagementListCard status="final" />
          </TabsContent>
          {/* 마감(closed) */}
          <TabsContent value="closed" className="mt-0 outline-none">
            <ManagementListCard status="closed" />
          </TabsContent>
        </div>
      </TabsRoot>
    </div>
  );
}
