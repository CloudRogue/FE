import type { Meta, StoryObj } from "@storybook/react";
import Label from "@/src/shared/ui/label";

const meta: Meta<typeof Label> = {
  title: "ui-kit/Label",
  component: Label,
  parameters: {
    docs: {
      description: {
        component:
          "hidden 옵션으로 시각적으로 숨길 수 있으며, htmlFor/id 연결로 focus 동작을 보장.",
      },
    },
  },
  argTypes: {
    hidden: { control: "boolean" },
    htmlFor: {
      control: "text",
      description: "연결할 input의 id를 지정합니다. (권장: 필수)",
    },
    children: { control: "text" },
    className: { control: "text" },
  },
};

export default meta;

type Story = StoryObj<typeof Label>;

export const Default: Story = {
  args: {
    htmlFor: "email",
    children: "Email",
  },
  render: (args) => (
    <div className="space-y-2">
      <Label {...args} className="cursor-pointer select-none" />
      <input
        id="email"
        className="border px-2 py-1 rounded"
        placeholder="email@example.com"
      />
      <p className="text-sm text-gray-500">
        라벨과 input은 htmlFor/id로 연결되며, 라벨 클릭 시 input에 focus가
        이동합니다.
      </p>
    </div>
  ),
};

export const HiddenLabel: Story = {
  args: {
    hidden: true,
    htmlFor: "search",
    children: "Search",
  },
  render: (args) => (
    <div className="space-y-2">
      <Label {...args} />
      <input
        id="search"
        className="border px-2 py-1 rounded"
        placeholder="Search..."
      />
      <p className="text-sm text-gray-500">
        라벨은 화면에서 숨겨지지만(접근성 유지), input과 htmlFor/id로
        연결됩니다.
      </p>
    </div>
  ),
};

export const FocusLink: Story = {
  args: {
    htmlFor: "focus-email",
    children: "Email",
  },
  render: (args) => (
    <div className="space-y-2">
      <Label {...args} className="cursor-pointer select-none" />
      <input
        id="focus-email"
        className="border px-2 py-1 rounded"
        placeholder="email@example.com"
      />
      <p className="text-sm text-gray-500">
        라벨을 클릭하면 input에 focus가 이동합니다.
      </p>
    </div>
  ),
};

export const WithCustomClassName: Story = {
  args: {
    htmlFor: "username",
    children: "Username",
    className: "text-sm font-medium",
  },
  render: (args) => (
    <div className="space-y-2">
      <Label {...args} />
      <input
        id="username"
        className="border px-2 py-1 rounded"
        placeholder="username"
      />
    </div>
  ),
};
