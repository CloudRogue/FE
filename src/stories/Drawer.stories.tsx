import { Drawer } from "@/src/shared/ui/drawer";
import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

const meta: Meta<typeof Drawer> = {
  title: "ui-kit/Drawer",
  component: Drawer,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    isOpen: {
      control: "boolean",
      description: "Drawer의 열림/닫힘 상태",
    },
    onClose: {
      action: "closed",
      description: "Drawer를 닫을 때 호출되는 함수",
    },
    title: {
      control: "text",
      description: "Drawer 상단 제목",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Drawer>;

// 기본 사용 (Default)
export const Default: Story = {
  render: function Render(args) {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="h-50 flex items-center justify-center">
        <button
          onClick={() => setIsOpen(true)}
          className="px-4 py-2 bg-slate-900 text-white rounded-md hover:bg-slate-800 transition-colors"
        >
          Drawer 열기
        </button>

        <Drawer
          {...args}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="기본 Drawer"
        >
          <div className="py-4 text-slate-400">
            배경을 클릭하거나 ESC 키를 눌러서 닫을 수 있습니다.
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="w-full py-2 bg-slate-100 text-slate-900 rounded-md mt-4 font-medium"
          >
            확인
          </button>
        </Drawer>
      </div>
    );
  },
};

// Scroll 테스트
export const LongContent: Story = {
  render: function Render(args) {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <button
          onClick={() => setIsOpen(true)}
          className="px-4 py-2 border border-slate-200 rounded-md hover:bg-slate-50"
        >
          긴 컨텐츠 열기
        </button>

        <Drawer
          {...args}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="스크롤 테스트"
        >
          <div className="space-y-4 py-4">
            {Array.from({ length: 15 }).map((_, i) => (
              <p key={i} className="p-4 bg-slate-50 rounded-lg text-sm">
                리스트 아이템 {i + 1} - 스크롤 동작을 확인하기 위한 더미
                텍스트입니다.
              </p>
            ))}
          </div>
        </Drawer>
      </>
    );
  },
};

export const AutoOpen: Story = {
  render: function Render(args) {
    const [isOpen, setIsOpen] = useState(true);

    return (
      <div className="h-50 flex flex-col items-center justify-center gap-4">
        <button
          onClick={() => setIsOpen(true)}
          className="px-4 py-2 border rounded-md"
        >
          다시 열기
        </button>

        <Drawer
          {...args}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="자동 오픈 공지"
        >
          <div className="py-4">
            <p className="text-sm leading-relaxed text-slate-600">알림 내용</p>
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setIsOpen(false)}
                className="text-sm font-medium text-blue-600"
              >
                오늘 하루 보지 않기
              </button>
            </div>
          </div>
        </Drawer>
      </div>
    );
  },
};
