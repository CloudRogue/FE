"use client";

import type { Meta, StoryObj } from "@storybook/react";
import { CardBase } from "./card";

const meta: Meta<typeof CardBase> = {
  title: "UI/Card",
  component: CardBase,
  tags: ["autodocs"],
  args: {
    padding: "medium",
    shadow: "sm",
    as: "div",
  },
  argTypes: {
    padding: {
      control: "select",
      options: ["none", "small", "medium", "large"],
      description: "카드 내부 여백을 설정한다.",
    },
    shadow: {
      control: "select",
      options: ["none", "sm", "md", "lg"],
      description: "그림자 깊이를 설정한다.",
    },
    isLoading: {
      control: "boolean",
      description: "로딩 상태 여부를 표시한다.",
    },
    as: {
      control: "select",
      options: ["div", "section", "article", "li"],
      description: "렌더링할 HTML 태그를 선택한다.",
    },
  },
};

export default meta;
type Story = StoryObj<typeof CardBase>;

export const Default: Story = {
  args: {
    children: (
      <div>
        <h3 className="font-bold text-lg">기본 카드</h3>
        <p className="text-gray-600">가장 기본적인 카드 형태이다.</p>
      </div>
    ),
  },
};

export const Loading: Story = {
  args: {
    isLoading: true,
    children: <div>로딩 완료 후 보여질 콘텐츠이다.</div>,
  },
};

export const CustomStyle: Story = {
  args: {
    padding: "large",
    shadow: "lg",
    className: "border-green-500 bg-green-50",
    children: (
      <div>
        <h3 className="font-bold text-green-700">zip-chak디자인</h3>
        <p className="text-green-600">highlight</p>
      </div>
    ),
  },
};

export const ListItem: Story = {
  decorators: [
    (Story) => (
      <ul className="list-none p-4 bg-gray-50 rounded-lg">
        <Story />
      </ul>
    ),
  ],
  args: {
    as: "li",
    children: "리스트 항목(li)으로 렌더링된 카드이다.",
  },
};
