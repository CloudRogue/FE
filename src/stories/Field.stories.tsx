import type { Meta, StoryObj } from "@storybook/react";
import Field from "@/src/shared/ui/field";

const meta: Meta<typeof Field> = {
  title: "ui-kit/Field",
  component: Field,
};
export default meta;

type Story = StoryObj<typeof Field>;

export const Default: Story = {
  args: {
    className: "p-4 border-2 rounded bg-gray-50",
    children: <div>Field Content</div>,
  },
};
