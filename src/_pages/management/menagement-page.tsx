import {
  MANAGEMENT_TABS,
  ManagementListCard,
  ManagementStatus,
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
              <ManagementListCard status={tab.value as ManagementStatus} />
            </TabsContent>
          ))}
        </div>
      </TabsRoot>
    </div>
  );
}
