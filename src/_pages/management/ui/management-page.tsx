"use client";

import {
  MANAGEMENT_STATUS_TYPE,
  MANAGEMENT_TABS,
  managementQueries,
  ManagementStatus,
  ManagementStatusCard,
} from "@/src/entities/management";
import { ManagementList } from "@/src/entities/management/ui/management-list";
import {
  TabsContent,
  TabsList,
  TabsRoot,
  TabsTrigger,
} from "@/src/shared/ui/tabs";
import { useInfiniteQuery } from "@tanstack/react-query";

export default function ManagementPage() {
  const { data } = useInfiniteQuery(
    managementQueries.list(MANAGEMENT_STATUS_TYPE.APPLYING),
  );
  const summary = data?.pages[0]?.summary;

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 hidden">지원 관리</h1>
      <ManagementStatusCard summary={summary} />

      <TabsRoot defaultValue="APPLYING" className="w-full">
        <TabsList className="w-full border-b border-gray-200 bg-transparent p-0">
          {MANAGEMENT_TABS.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="flex-1 pt-4 pb-2"
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
        <div className="bg-gray-100 min-h-[calc(100vh-200px)] p-5">
          {MANAGEMENT_TABS.map((tab) => (
            <TabsContent
              key={tab.value}
              value={tab.value}
              className="mt-0 outline-none"
            >
              <ManagementList status={tab.value as ManagementStatus} />
            </TabsContent>
          ))}
        </div>
      </TabsRoot>
    </div>
  );
}
