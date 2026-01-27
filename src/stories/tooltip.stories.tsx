import Tooltip from "@/src/shared/ui/tooltip";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Tooltip> = {
  title: "ui-kit/Tooltip",
  component: Tooltip,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="flex items-center justify-center p-20 bg-gray-50">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    content: { control: "text" },
    alwaysOpen: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  args: {
    content: "툴팁 내용이 여기에 표시됩니다.",
    children: (
      <button className="px-4 py-2 bg-primary-blue text-white rounded-md">
        마우스를 올려보세요
      </button>
    ),
  },
};

export const AlwaysOpen: Story = {
  args: {
    content: "이 툴팁은 항상 표시됩니다.",
    alwaysOpen: true,
    children: (
      <span className="text-gray-700 underline decoration-dotted">
        항상 노출되는 툴팁 예시
      </span>
    ),
  },
};

export const LongContent: Story = {
  args: {
    content:
      "툴팁에 아주 긴 설명 문구가 들어갈 때 레이아웃이 깨지지 않는지 확인합니다.",
    children: (
      <div className="w-40 p-2 border border-gray-200 text-center rounded">
        긴 내용 테스트
      </div>
    ),
  },
};

export const CustomStyled: Story = {
  args: {
    content: "그림자가 더 진한 커스텀 툴팁",
    className: "opacity-90 scale-110 transition-transform",
    children: (
      <button className="px-4 py-2 bg-gray-800 text-white rounded-md">
        스타일링 확인
      </button>
    ),
  },
};
