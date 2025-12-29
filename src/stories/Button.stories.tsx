import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "@/src/stories/Button";
import { fn } from "storybook/test";

const meta: Meta<typeof Button> = {
  title: "ui-kit/Button",
  component: Button,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    isLoading: { control: "boolean" },
    disabled: { control: "boolean" },
    type: {
      control: { type: "radio" },
      options: ["button", "submit", "reset"],
    },
    children: { control: "text" },
    className: { control: "text" },
  },
  args: {
    children: "Client Button",
    type: "button",
    disabled: false,
    isLoading: false,
    onClick: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

// 기본 버튼
export const Default: Story = {};

// 로딩 중인 버튼
export const Loading: Story = {
  args: {
    isLoading: true,
    children: "Loading...",
  },
};

// 비활성화 버튼
export const Disabled: Story = {
  args: {
    disabled: true,
    children: "Disabled",
  },
};

// 스타일 적용 버튼
export const Styled: Story = {
  args: {
    children: "스타일 적용",
    className: "bg-green-500 text-white rounded-md px-4 py-2",
  },
};

// 제출 버튼
export const SubmitInForm: Story = {
  args: {
    type: "submit",
    children: "제출(Submit)",
  },
  decorators: [
    (Story) => (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          alert("form submitted");
        }}
      >
        <Story />
      </form>
    ),
  ],
};

// onclick 버튼
export const ClientClick: StoryObj<typeof Button> = {
  render: (args) => <Button {...args} onClick={() => alert("ClientClick")} />,
  args: {
    children: "ClientButton (click)",
    type: "button",
  },
};
