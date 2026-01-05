import Button from "@/src/shared/ui/button";
import {
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownTrigger,
} from "@/src/shared/ui/dropdown";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Dropdown> = {
  title: "ui-kit/Dropdown",
  component: Dropdown,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Dropdown>;

export const Default: Story = {
  render: () => (
    <Dropdown>
      <DropdownTrigger>
        <Button variant="outline">메뉴 열기</Button>
      </DropdownTrigger>
      <DropdownContent className="w-48">
        <DropdownItem onClick={() => alert("프로필 클릭")}>프로필</DropdownItem>
        <DropdownItem onClick={() => alert("설정 클릭")}>설정</DropdownItem>
        <div className="my-1 h-px bg-slate-200" />
        <DropdownItem
          className="text-red-500"
          onClick={() => alert("로그아웃")}
        >
          로그아웃
        </DropdownItem>
      </DropdownContent>
    </Dropdown>
  ),
};

export const WithCustomTrigger: Story = {
  render: () => (
    <Dropdown>
      <DropdownTrigger>
        <button className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-200 hover:bg-slate-300 transition-colors">
          👤
        </button>
      </DropdownTrigger>
      <DropdownContent className="w-56">
        <div className="px-2 py-1.5 text-xs font-semibold text-slate-500">
          내 계정
        </div>
        <DropdownItem>마이페이지</DropdownItem>
        <DropdownItem>구독 관리</DropdownItem>
        <DropdownItem>결제 내역</DropdownItem>
      </DropdownContent>
    </Dropdown>
  ),
};

export const LongContent: Story = {
  render: () => (
    <Dropdown>
      <DropdownTrigger>
        <Button>도시 선택</Button>
      </DropdownTrigger>
      <DropdownContent className="w-48 max-h-60 overflow-y-auto">
        <DropdownItem>서울</DropdownItem>
        <DropdownItem>부산</DropdownItem>
        <DropdownItem>인천</DropdownItem>
        <DropdownItem>대구</DropdownItem>
        <DropdownItem>대전</DropdownItem>
        <DropdownItem>광주</DropdownItem>
        <DropdownItem>울산</DropdownItem>
        <DropdownItem>세종</DropdownItem>
        <DropdownItem>제주</DropdownItem>
      </DropdownContent>
    </Dropdown>
  ),
};
