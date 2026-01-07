import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { fn } from "storybook/test";
import BottomSheet from "@/src/shared/ui/bottomsheet";

const meta: Meta<typeof BottomSheet> = {
  title: "shared/BottomSheet",
  component: BottomSheet,
  parameters: {
    layout: "fullscreen",
    viewport: {
      defaultViewport: "iphone14",
    },
  },
  args: {
    isOpen: true,
    options: [
      { label: "마감임박순", value: "deadline" },
      { label: "적합순", value: "match" },
      { label: "최신순", value: "latest" },
    ],
    onSelect: fn(),
    onClose: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof BottomSheet>;


export const Default: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(args.isOpen);
    const [selected, setSelected] = useState("deadline");

    return (
      <>
        <div style={{ padding: "20px" }}>
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            style={{ padding: "10px", border: "1px solid #ccc" }}
          >
            BottomSheet 열기
          </button>
          <p style={{ marginTop: "10px" }}>선택된 값: {selected}</p>
        </div>

        <BottomSheet
          {...args}
          isOpen={isOpen}
          selectedValue={selected}
          onSelect={(val) => {
            setSelected(val);
            args.onSelect(val);
          }}
          onClose={() => setIsOpen(false)}
        />
      </>
    );
  },
};


export const WithoutTitle: Story = {
  args: {
    title: undefined,
  },
};


export const LongOptions: Story = {
  args: {
    title: "지역 선택",
    options: Array.from({ length: 20 }, (_, i) => ({
      label: `지역 옵션 ${i + 1}`,
      value: `value-${i + 1}`,
    })),
  },
};


export const PreSelected: Story = {
  args: {
    title: "이미 선택됨",
    selectedValue: "match",
  },
};
