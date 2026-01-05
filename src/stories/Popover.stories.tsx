import type { Meta, StoryObj } from "@storybook/react";
import Popover from "@/src/shared/ui/popover";
import Button from "@/src/shared/ui/button";

const meta: Meta<typeof Popover> = {
  title: "ui-kit/Popover",
  component: Popover,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Popover>;

export const Default: Story = {
  args: {
    trigger: <Button>팝오버 열기</Button>,
    children: "팝오버 내용",
    align: "center",
  },
};

export const WithMenu: Story = {
  args: {
    trigger: (
      <span className="text-blue-500 underline cursor-pointer">
        도움말 확인
      </span>
    ),
    children: (
      <div className="flex flex-col gap-2 text-sm">
        <p className="font-bold">도움말 제목</p>
        <p>상세 설명이 여기에 위치</p>
      </div>
    ),
    align: "left",
  },
};
