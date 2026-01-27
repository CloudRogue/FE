import Card from "@/src/shared/ui/card"; // 실제 경로에 맞게 조정하세요
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Card> = {
  title: "UI-kit/Card",
  component: Card,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    isLoading: {
      control: "boolean",
      description: "로딩 상태를 표시합니다.",
    },
    as: {
      control: "select",
      options: ["div", "section", "article", "li"],
      description: "렌더링할 HTML 태그를 설정합니다.",
    },
    className: {
      control: "text",
      description: "추가적인 스타일 클래스를 적용합니다.",
    },
  },
  args: {
    as: "div",
    isLoading: false,
    className: "w-[350px]",
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

// 기본 카드
export const Default: Story = {
  args: {
    children: (
      <div className="flex flex-col gap-2">
        <h3 className="text-h3 text-gray-black">나의 지원 자격</h3>
        <p className="text-body2 text-gray-700">
          디자인 가이드의 Shadow와 Border가 적용된 기본 카드입니다.
        </p>
      </div>
    ),
  },
};

// 로딩 상태
export const Loading: Story = {
  args: {
    isLoading: true,
    children: (
      <div>
        <h3>로딩 중인 카드</h3>
        <p>이 콘텐츠는 로딩 중에는 보이지 않습니다.</p>
      </div>
    ),
  },
};

// 리스트 항목 (li 태그 활용)
export const ListItem: Story = {
  decorators: [
    (Story) => (
      <ul className="w-100 flex flex-col gap-4 p-6 bg-gray-bg">
        <Story />
        <Card as="li" className="p-4">
          다른 리스트 항목 1
        </Card>
        <Card as="li" className="p-4">
          다른 리스트 항목 2
        </Card>
      </ul>
    ),
  ],
  args: {
    as: "li",
    children: (
      <div className="flex justify-between items-center">
        <span className="text-h5">가족관계증명서</span>
        <span className="text-primary-blue text-caption1">필수</span>
      </div>
    ),
  },
};

// 다양한 디자인 조합 (Radius & Padding)
export const CustomVariations: Story = {
  render: () => (
    <div className="flex flex-col gap-6 w-100">
      <Card className="rounded-xs p-2">
        <p className="text-caption2">Radius XS (4px) 카드</p>
      </Card>
      <Card className="rounded-md p-4">
        <p className="text-body2">Radius MD (12px) 카드 - 표준</p>
      </Card>
      <Card className="rounded-lg p-6 border-primary-blue/20">
        <p className="text-h4 text-primary-blue">
          Radius LG (20px) + 보더 강조
        </p>
      </Card>
    </div>
  ),
};
