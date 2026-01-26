import Button from "@/src/shared/ui/button";
import type { Meta, StoryObj } from "@storybook/react";
import { ChevronRight, Share2 } from "lucide-react";

const meta: Meta<typeof Button> = {
  title: "ui-kit/Button",
  component: Button,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: [
        "primary",
        "secondary",
        "tertiary_blue",
        "tertiary_black",
        "tertiary_gray",
      ],
      description: "버튼의 스타일 시스템",
    },
    size: {
      control: { type: "radio" },
      options: ["lg", "md", "sm"],
      description: "버튼의 크기 (h: 52, 44, 36)",
    },
    isLoading: { control: "boolean" },
    disabled: { control: "boolean" },
    children: { control: "text" },
  },
  args: {
    children: "Button",
    variant: "primary",
    size: "md",
    disabled: false,
    isLoading: false,
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

// 기본 시스템 버튼들
export const Primary: Story = {
  args: {
    variant: "primary",
    size: "lg",
    children: "Primary Large",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    size: "md",
    children: "Secondary Medium",
  },
};

// Tertiary (링크형) 버튼들
export const TertiaryBlue: Story = {
  args: {
    variant: "tertiary_blue",
    children: "관심 공고 보기",
  },
};

export const TertiaryGray: Story = {
  args: {
    variant: "tertiary_gray",
    children: "도움말 보기",
  },
};

// 아이콘 포함 케이스 (이미지 가이드 반영)
export const WithLeftIcon: Story = {
  args: {
    variant: "primary",
    size: "lg",
    children: "Primary_Large",
    leftIcon: <Share2 size={20} />,
  },
};

export const WithRightIcon: Story = {
  args: {
    variant: "secondary",
    size: "md",
    children: "상세 정보 열기",
    rightIcon: <ChevronRight size={18} />,
  },
};

// 상태별 버튼
export const Loading: Story = {
  args: {
    isLoading: true,
    children: "로딩 중...",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    variant: "primary",
    children: "비활성화 상태",
  },
};

// 음집 (Playground)
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <Button variant="primary" size="lg">
          Primary L
        </Button>
        <Button variant="primary" size="md">
          Primary M
        </Button>
        <Button variant="primary" size="sm">
          Primary S
        </Button>
      </div>
      <div className="flex items-center gap-4">
        <Button variant="secondary" size="lg">
          Secondary L
        </Button>
        <Button variant="secondary" size="md">
          Secondary M
        </Button>
        <Button variant="secondary" size="sm">
          Secondary S
        </Button>
      </div>
      <div className="flex items-center gap-4">
        <Button variant="tertiary_blue">Tertiary Blue</Button>
        <Button variant="tertiary_black">Tertiary Black</Button>
        <Button variant="tertiary_gray">Tertiary Gray</Button>
      </div>
    </div>
  ),
};
