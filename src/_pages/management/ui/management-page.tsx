import {
  MANAGEMENT_STATUS,
  MANAGEMENT_TABS,
  ManagementStatus,
} from "@/src/entities/management";
import { ManagementList } from "@/src/entities/management/ui/management-list";
import cn from "@/src/shared/lib/cn";
import {
  TabsContent,
  TabsList,
  TabsRoot,
  TabsTrigger,
} from "@/src/shared/ui/tabs";

export default function ManagementPage() {
  return (
    <div>
      <h1 className="sr-only">지원 관리</h1>
      <TabsRoot defaultValue="APPLYING">
        <TabsList className="bg-white">
          {MANAGEMENT_TABS.map((tab) => {
            const config = MANAGEMENT_STATUS[tab.value as ManagementStatus];

            return (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className={cn("flex-1", config.activeClass)}
              >
                {tab.label}
              </TabsTrigger>
            );
          })}
        </TabsList>
        <div className="bg-gray-bg min-h-[calc(100vh-200px)] p-5">
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
