import type { Meta, StoryObj } from "@storybook/react";
import Select from "@/src/shared/ui/select";

const meta: Meta<typeof Select> = {
  title: "ui-kit/Select",
  component: Select,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof Select>;

const OPTIONS = [
  { value: "a", label: "옵션 A" },
  { value: "b", label: "옵션 B" },
  { value: "c", label: "옵션 C", disabled: true },
];

export const Default: Story = {
  args: {
    name: "category",
    defaultValue: "",
    placeholder: "선택하세요",
    options: OPTIONS,
  },
};

export const WithLabel: Story = {
  args: {
    label: "카테고리",
    name: "category",
    defaultValue: "",
    placeholder: "선택하세요",
    options: OPTIONS,
  },
};

export const Disabled: Story = {
  args: {
    name: "category",
    defaultValue: "",
    placeholder: "선택하세요",
    options: OPTIONS,
    disabled: true,
  },
};
