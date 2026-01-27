import {
  TabsContent,
  TabsList,
  TabsRoot,
  TabsTrigger,
} from "@/src/shared/ui/tabs";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof TabsRoot> = {
  title: "ui-kit/Tabs",
  component: TabsRoot,
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: { pathname: "/" },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof TabsRoot>;

export const TwoTabs: Story = {
  args: {
    defaultValue: "tab1",
    children: (
      <>
        <TabsList>
          <TabsTrigger value="tab1" className="flex-1">
            탭 1
          </TabsTrigger>
          <TabsTrigger value="tab2" className="flex-1">
            탭 2
          </TabsTrigger>
        </TabsList>
        <TabsContent value="tab1" className="p-4">
          탭 1의 내용입니다.
        </TabsContent>
        <TabsContent value="tab2" className="p-4">
          탭 2의 내용입니다.
        </TabsContent>
      </>
    ),
  },
};

// 3분할 탭
export const ThreeTabs: Story = {
  args: {
    defaultValue: "tab1",
    children: (
      <>
        <TabsList>
          <TabsTrigger value="tab1" className="flex-1">
            탭 1
          </TabsTrigger>
          <TabsTrigger value="tab2" className="flex-1">
            탭 2
          </TabsTrigger>
          <TabsTrigger value="tab3" className="flex-1">
            탭 3
          </TabsTrigger>
        </TabsList>
        <TabsContent value="tab1" className="p-4">
          내용 1
        </TabsContent>
        <TabsContent value="tab2" className="p-4">
          내용 2
        </TabsContent>
        <TabsContent value="tab3" className="p-4">
          내용 3
        </TabsContent>
      </>
    ),
  },
};

// 4분할 탭
export const FourTabs: Story = {
  args: {
    defaultValue: "tab1",
    children: (
      <>
        <TabsList>
          <TabsTrigger value="tab1" className="flex-1">
            탭 1
          </TabsTrigger>
          <TabsTrigger value="tab2" className="flex-1">
            탭 2
          </TabsTrigger>
          <TabsTrigger value="tab3" className="flex-1">
            탭 3
          </TabsTrigger>
          <TabsTrigger value="tab4" className="flex-1">
            탭 4
          </TabsTrigger>
        </TabsList>
        <TabsContent value="tab1" className="p-4 text-center">
          첫 번째
        </TabsContent>
        <TabsContent value="tab2" className="p-4 text-center">
          두 번째
        </TabsContent>
        <TabsContent value="tab3" className="p-4 text-center">
          세 번째
        </TabsContent>
        <TabsContent value="tab4" className="p-4 text-center">
          네 번째
        </TabsContent>
      </>
    ),
  },
};
