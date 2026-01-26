import { Toggle } from "@/src/shared/ui/toggle";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Toggle> = {
  title: "ui-kit/Toggle",
  component: Toggle,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof Toggle>;

export const Default: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Toggle>Small</Toggle>
      <Toggle>Default</Toggle>
      <Toggle>Large</Toggle>
    </div>
  ),
};

export const Outline: Story = {
  args: {
    children: "⭐",
  },
};

export const Disabled: Story = {
  args: {
    children: "🔒",
  },
};
