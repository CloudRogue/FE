import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "storybook/test";

import { Badge } from "@/src/shared/ui/badge";

const meta: Meta<typeof Badge> = {
  title: "UI-kit/Badge",
  component: Badge,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: [
        "default",
        "recommend",
        "dDayUrgent",
        "dDay",
        "scheduled",
        "closed",
      ],
      description: "배지의 상태/의미에 따른 스타일을 선택합니다.",
    },
    children: {
      control: "text",
      description: "배지 내부에 표시될 텍스트입니다.",
    },
    className: {
      control: "text",
      description: "추가적인 커스텀 클래스를 적용합니다.",
    },
    onClick: {
      action: "clicked",
      description: "클릭 시 실행되는 이벤트 핸들러입니다.",
    },
  },
  args: {
    variant: "default",
    children: "Badge",
    onClick: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: {
    variant: "default",
    children: "기본 배지",
  },
};

export const Recommend: Story = {
  args: {
    variant: "recommend",
    children: "추천",
  },
};

export const DDayUrgent: Story = {
  args: {
    variant: "dDayUrgent",
    children: "D-1",
  },
};

export const DDay: Story = {
  args: {
    variant: "dDay",
    children: "D-7",
  },
};

export const Scheduled: Story = {
  args: {
    variant: "scheduled",
    children: "예정됨",
  },
};

export const Closed: Story = {
  args: {
    variant: "closed",
    children: "마감",
  },
};

export const Interactive: Story = {
  args: {
    variant: "default",
    children: "클릭 가능",
    onClick: fn(),
  },
};
