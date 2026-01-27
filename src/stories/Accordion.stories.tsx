import { Accordion } from "@/src/shared/ui/arccordion";
import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

const meta: Meta<typeof Accordion> = {
  title: "ui-kit/Accordion",
  component: Accordion,
  tags: ["autodocs"],
  argTypes: {
    title: { control: "text" },
    subTitle: { control: "text" },
    useIcon: { control: "boolean" },
    isOpen: { control: "boolean" },
    defaultOpen: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Accordion>;

// 가장 기본적인 형태의 아코디언입니다.
export const Default: Story = {
  args: {
    title: "아코디언 제목",
    children:
      "여기에 아코디언의 상세 내용이 들어갑니다. CSS Grid를 활용한 부드러운 애니메이션이 적용되어 있습니다.",
    defaultOpen: false,
  },
};

// 아이콘 대신 하단에 subTitle과 함께 토글 버튼이 위치하는 형태
export const WithBottomToggle: Story = {
  args: {
    title: "상세 정보 보기",
    subTitle: "상세내용 펼치기",
    useIcon: false,
    children: "하단 버튼을 통해 열고 닫을 수 있는 스타일입니다.",
  },
};

//  초기 상태가 열려 있는 아코디언
export const DefaultOpen: Story = {
  args: {
    title: "기본으로 열려 있는 아코디언",
    children: "defaultOpen 프로퍼티가 true로 설정되어 있습니다.",
    defaultOpen: true,
  },
};

// 외부 상태에 의해 제어되는 아코디언
export const Controlled: Story = {
  render: (args) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [isOpen, setIsOpen] = useState(false);
    return (
      <div className="space-y-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          외부 버튼으로 {isOpen ? "닫기" : "열기"}
        </button>
        <Accordion
          {...args}
          isOpen={isOpen}
          onToggle={() => setIsOpen(!isOpen)}
        />
      </div>
    );
  },
  args: {
    title: "외부 제어 아코디언",
    children: "이 아코디언은 외부 state(isOpen)에 의해 동기화됩니다.",
  },
};

// 커스텀 스타일이 적용된 아코디언
export const CustomStyle: Story = {
  args: {
    title: "스타일 커스텀",
    children: "className이나 btnClassName을 통해 디자인을 수정할 수 있습니다.",
    className: "border-blue-500 shadow-lg",
    btnClassName: "bg-blue-50 text-blue-700",
    childrenClassName: "italic text-gray-500",
  },
};
