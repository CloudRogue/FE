import type { Meta, StoryObj } from "@storybook/react";
import Header from "@/src/shared/layout/header";

const meta: Meta<typeof Header> = {
  title: "ui-kit/Header",
  component: Header,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

type Story = StoryObj<typeof Header>;

export const Default: Story = {};
