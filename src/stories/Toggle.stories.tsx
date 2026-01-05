import { Toggle } from "@/src/shared/ui/toggle";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Toggle> = {
  title: "ui-kit/Toggle",
  component: Toggle,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "outline"],
    },
    size: {
      control: "select",
      options: ["default", "sm", "lg"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Toggle>;

export const Default: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Toggle toggleName="작은 크기" size="sm">
        Small
      </Toggle>
      <Toggle toggleName="기본 크기" size="default">
        Default
      </Toggle>
      <Toggle toggleName="큰 크기" size="lg">
        Large
      </Toggle>
    </div>
  ),
};

export const Outline: Story = {
  args: {
    toggleName: "즐겨찾기",
    variant: "outline",
    children: "⭐",
  },
};

export const Disabled: Story = {
  args: {
    toggleName: "잠금",
    disabled: true,
    children: "🔒",
  },
};
