import type { Meta, StoryObj } from "@storybook/react";
import Popover from "@/src/shared/ui/popover";
import Button from "@/src/shared/ui/button";
import { useState } from "react";

const meta: Meta<typeof Popover> = {
  title: "shared/Popover",
  component: Popover,
  tags: ["autodocs"],
  argTypes: {
    isOpen: {
      control: "boolean",
      description: "팝업의 표시 여부",
    },
    onClose: {
      action: "closed",
      description: "배경이나 ESC 클릭 시 호출되는 함수",
    },
    className: {
      control: "text",
      description: "높이(height) 등 디자인 수정을 위한 추가 클래스",
    },
  },
  decorators: [
    (Story) => (
      <div className="h-[400px] w-full">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Popover>;

export const LogoutType: Story = {
  args: {
    isOpen: true,
    className: "h-[350px]",
    children: (
      <>
        <div className="flex flex-1 flex-col items-center justify-center gap-2 text-center">
          <h3 className="text-h3 text-gray-black">로그아웃 하시겠습니까?</h3>
          <p className="text-body2 text-gray-700">
            로그아웃 시 맞춤 공고 확인 및<br />
            커뮤니티 이용이 제한될 수 있습니다.
          </p>
        </div>
        <div className="flex w-full flex-col gap-3">
          <Button className="w-full bg-red-default text-gray-white">
            로그아웃 하기
          </Button>
        </div>
      </>
    ),
  },
};

/**
 * 2. 공유하기 팝업 디자인 (Height 206px)
 */
export const ShareType: Story = {
  args: {
    isOpen: true,
    className: "h-[206px]",
    children: (
      <>
        <div className="flex flex-1 flex-col items-center justify-center gap-2 text-center">
          <h3 className="text-h3 text-gray-black">공유하기</h3>
          <p className="text-body2 text-gray-700">
            이 공고를 친구에게 공유해보세요.
          </p>
        </div>
        <div className="flex w-full gap-3">
          <Button className="flex-1">링크 복사</Button>
        </div>
      </>
    ),
  },
};

export const Interactive: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <div className="flex justify-center">
        <Button onClick={() => setIsOpen(true)}>팝업 열기 테스트</Button>
        <Popover
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          className="h-[250px]"
        >
          <div className="flex flex-1 items-center">
            <p className="text-h4">인터랙티브 팝업입니다.</p>
          </div>
          <Button onClick={() => setIsOpen(false)} className="w-full">
            확인
          </Button>
        </Popover>
      </div>
    );
  },
};
