import type { Meta, StoryObj } from "@storybook/react";

import { Badge } from "@/src/shared/ui/badge";

const meta: Meta<typeof Badge> = {
  title: "ui-kit/Badge",
  component: Badge,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "secondary", "destructive", "outline"],
      description: "배지의 디자인 스타일을 선택합니다.",
    },
    children: {
      control: "text",
      description: "배지 내부에 표시될 텍스트입니다.",
    },
    className: {
      control: "text",
      description: "추가적인 커스텀 클래스를 적용합니다.",
    },
  },
  args: {
    children: "Badge",
    variant: "default",
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

// 기본
export const Default: Story = {
  args: {
    variant: "default",
    children: "Default",
  },
};

// Secondary
export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "Secondary",
  },
};

// Destructive
export const Destructive: Story = {
  args: {
    variant: "destructive",
    children: "Destructive",
  },
};

// Outline
export const Outline: Story = {
  args: {
    variant: "outline",
    children: "Outline",
  },
};

// 커스텀 스타일
export const CustomStyle: Story = {
  args: {
    variant: "default",
    children: "Custom Color",
    className: "bg-amber-500 hover:bg-amber-600 text-white border-none",
  },
};
