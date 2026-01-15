import type { Meta, StoryObj } from "@storybook/react";
import Popover from "@/src/shared/ui/popover";
import Button from "@/src/shared/ui/button";
import { useState } from "react";

const meta: Meta<typeof Popover> = {
  title: "shared/Popover",
  component: Popover,
  tags: ["autodocs"],
  argTypes: {
    align: {
      control: "select",
      options: ["left", "center", "right"],
      description: "트리거 기준 팝오버 정렬 위치",
    },
    center: {
      control: "boolean",
      description: "팝오버를 화면 중앙에 표시",
    },
    isOpen: {
      control: false,
      description: "Controlled 모드에서 팝오버 열림 상태",
    },
    onClose: {
      action: "close",
      description: "팝오버가 닫힐 때 호출",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Popover>;

export const Default: Story = {
  args: {
    trigger: <Button>팝오버 열기</Button>,
    children: (
      <div className="inline-flex whitespace-nowrap p-2">
        가장 기본적인 팝오버 내용입니다.
      </div>
    ),
    align: "left",
  },
};

export const DetailedMenu: Story = {
  args: {
    trigger: (
      <span className="cursor-pointer font-medium text-blue-600 underline hover:text-blue-800">
        도움말 확인하기
      </span>
    ),
    children: (
      <div className="flex w-[220px] flex-col gap-3">
        <div className="border-b pb-2">
          <p className="font-bold text-gray-900">정책 신청 가이드</p>
        </div>
        <p className="text-sm leading-relaxed text-gray-600">
          거주 지역과 연령을 입력하면{" "}
          <span className="font-semibold text-green-600">
            맞춤형 정부 지원금
          </span>{" "}
          목록을 확인할 수 있습니다.
        </p>
        <Button className="w-full py-2 text-xs">가이드 전체보기</Button>
      </div>
    ),
    align: "left",
  },
};

export const Centered: Story = {
  args: {
    trigger: <Button>중앙 팝오버</Button>,
    center: true,
    children: (
      <div className="w-64 text-center">
        <p className="mb-2 font-medium">화면 중앙 팝오버</p>
        <p className="text-sm text-gray-600">
          기존 Popover API를 유지하면서
          <br />
          중앙 배치 옵션만 추가했습니다.
        </p>
      </div>
    ),
  },
};

export const Controlled: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="flex flex-col items-center gap-4">
        <p className="text-sm text-gray-500">
          외부 상태로 제어됨: {isOpen ? "열림" : "닫힘"}
        </p>

        <Popover
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          trigger={
            <Button onClick={() => setIsOpen(true)}>외부에서 열기</Button>
          }
          center
        >
          <div className="p-4">
            <p className="mb-4 text-sm">Controlled Popover (기존 API 기반)</p>
            <Button
              className="w-full bg-red-600 py-2 text-white hover:bg-red-700"
              onClick={() => setIsOpen(false)}
            >
              닫기
            </Button>
          </div>
        </Popover>
      </div>
    );
  },
};
