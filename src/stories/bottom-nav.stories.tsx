import type { Meta, StoryObj } from "@storybook/react";
import BottomNav from "@/src/shared/layout/bottom-nav";

const meta: Meta<typeof BottomNav> = {
  title: "ui-kit/BottomNav",
  component: BottomNav,
  parameters: { layout: "fullscreen" },
};

export default meta;

type Story = StoryObj<typeof BottomNav>;

export const Default: Story = {
  args: {},
};
