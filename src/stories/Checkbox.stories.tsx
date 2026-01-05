import type { Meta, StoryObj } from "@storybook/react";
import { Checkbox } from "@/src/stories/Checkbox";

const meta: Meta<typeof Checkbox> = {
  title: "ui-kit/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  argTypes: {
    label: {
      control: "text",
    },
    error: {
      control: "text",
    },
    disabled: {
      control: "boolean",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  args: {
    label: "이용약관 동의 (필수)",
  },
};

export const Checked: Story = {
  args: {
    label: "체크된 상태",
    defaultChecked: true,
  },
};

export const Error: Story = {
  args: {
    label: "마케팅 수신 동의",
    error: "필수 선택 항목이다.",
  },
};

export const Disabled: Story = {
  args: {
    label: "선택 불가 항목",
    disabled: true,
  },
};
