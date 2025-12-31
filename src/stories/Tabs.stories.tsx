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
      navigation: {
        pathname: "/",
        query: { tab: "account" },
      },
    },
  },
  tags: ["autodocs"],
  args: {
    defaultValue: "account",
  },
  argTypes: {
    defaultValue: {
      description: "초기에 활성화될 탭의 값입니다.",
      control: "text",
    },
    searchParamKey: {
      description: "URL 쿼리 스트링에 사용될 키 값입니다.",
      control: "text",
    },
  },
};

export default meta;
type Story = StoryObj<typeof TabsRoot>;

// 기본 사용 예시
export const Default: Story = {
  args: {
    defaultValue: "account",
    searchParamKey: "tab",
    children: (
      // <> = TabsRoot
      <>
        <TabsList className="bg-slate-100 rounded-lg p-1 w-fit">
          <TabsTrigger value="account">계정</TabsTrigger>
          <TabsTrigger value="password">비밀번호</TabsTrigger>
          <TabsTrigger value="settings">설정</TabsTrigger>
        </TabsList>
        <div className="mt-4 p-4 border rounded-md">
          <TabsContent value="account">계정 정보 설정 화면입니다.</TabsContent>
          <TabsContent value="password">비밀번호 변경 화면입니다.</TabsContent>
          <TabsContent value="settings">기타 환경 설정 화면입니다.</TabsContent>
        </div>
      </>
    ),
  },
};

// 다중 탭 searchParamKey 사용
export const MultipleTabs: Story = {
  render: () => (
    <div className="space-y-10">
      <TabsRoot defaultValue="dog" searchParamKey="animal">
        <h3 className="mb-2 font-bold">동물 선택 (URL key: animal)</h3>
        <TabsList className="bg-orange-50 p-1 rounded-md">
          <TabsTrigger
            value="dog"
            className="data-[aria-selected=true]:bg-orange-500 data-[aria-selected=true]:text-white"
          >
            강아지
          </TabsTrigger>
          <TabsTrigger
            value="cat"
            className="data-[aria-selected=true]:bg-orange-500 data-[aria-selected=true]:text-white"
          >
            고양이
          </TabsTrigger>
        </TabsList>
        <TabsContent value="dog" className="p-2">
          🐶 멍멍!
        </TabsContent>
        <TabsContent value="cat" className="p-2">
          🐱 야옹~
        </TabsContent>
      </TabsRoot>

      <TabsRoot defaultValue="apple" searchParamKey="fruit">
        <h3 className="mb-2 font-bold">과일 선택 (URL key: fruit)</h3>
        <TabsList className="bg-green-50 p-1 rounded-md">
          <TabsTrigger value="apple">사과</TabsTrigger>
          <TabsTrigger value="banana">바나나</TabsTrigger>
        </TabsList>
        <TabsContent value="apple" className="p-2">
          🍎 사과입니다.
        </TabsContent>
        <TabsContent value="banana" className="p-2">
          🍌 바나나입니다.
        </TabsContent>
      </TabsRoot>
    </div>
  ),
};
