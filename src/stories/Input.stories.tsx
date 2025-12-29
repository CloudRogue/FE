import type { Meta, StoryObj } from "@storybook/react";
import Input from "@/src/shared/ui/input";

const meta: Meta<typeof Input> = {
  title: "ui-kit/Input",
  component: Input,
  argTypes: {
    placeholder: { control: "text" },
    disabled: { control: "boolean" },
    className: { control: "text" },
  },
};

export default meta;

type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    placeholder: "Type here...",
    className: "border px-2 py-1 rounded",
  },
};

export const Disabled: Story = {
  args: {
    placeholder: "Disabled",
    disabled: true,
    className: "border px-2 py-1 rounded",
  },
};
