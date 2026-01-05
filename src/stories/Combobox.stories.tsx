import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import ClientCombobox, { type ComboboxProps } from "@/src/shared/ui/combobox";

const meta: Meta<typeof ClientCombobox> = {
  title: "ui-kit/Combobox",
  component: ClientCombobox,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    onValueChange: { action: "onValueChange" },
    className: { control: false },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 360, padding: 24 }}>
        <Story />
        <p
          style={{ marginTop: 12, fontSize: 12, opacity: 0.8, lineHeight: 1.4 }}
        >
          키보드 테스트:
          <br />
          - Trigger 포커스 후 Enter/Space/ArrowDown로 열기
          <br />
          - 검색창에서 ArrowUp/ArrowDown 이동, Enter 선택, Escape 닫기
          <br />- 바깥 클릭으로 닫기
        </p>
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof ClientCombobox>;

const defaultOptions: ComboboxProps["options"] = [
  { value: "react", label: "React" },
  { value: "next", label: "Next.js" },
  { value: "node", label: "Node.js" },
  { value: "ts", label: "TypeScript" },
  { value: "zustand", label: "Zustand" },
  { value: "rq", label: "React Query" },
  { value: "tailwind", label: "Tailwind CSS" },
  { value: "disabled-1", label: "Disabled Option", disabled: true },
  { value: "storybook", label: "Storybook" },
  { value: "vitest", label: "Vitest" },
];

function ControlledTemplate(args: ComboboxProps) {
  const [value, setValue] = useState<string | undefined>(args.value);

  return (
    <div>
      <ClientCombobox
        {...args}
        value={value}
        onValueChange={(nextValue) => {
          setValue(nextValue);
          args.onValueChange?.(nextValue);
        }}
      />

      <div style={{ marginTop: 10, fontSize: 12, opacity: 0.85 }}>
        Selected value: <b>{value ?? "undefined"}</b>
      </div>
    </div>
  );
}

export const Default: Story = {
  args: {
    options: defaultOptions,
    placeholder: "Select...",
    searchPlaceholder: "Search...",
    disabled: false,
  },
  render: (args) => <ControlledTemplate {...args} />,
};

export const WithInitialValue: Story = {
  args: {
    options: defaultOptions,
    value: "next",
    placeholder: "Select...",
    searchPlaceholder: "Search...",
  },
  render: (args) => <ControlledTemplate {...args} />,
};

export const Disabled: Story = {
  args: {
    options: defaultOptions,
    placeholder: "Select...",
    searchPlaceholder: "Search...",
    disabled: true,
  },
  render: (args) => <ControlledTemplate {...args} />,
};

export const LongOptions: Story = {
  args: {
    options: Array.from({ length: 40 }).map((_, i) => ({
      value: `opt-${i + 1}`,
      label: `Option ${i + 1}`,
      disabled: i % 11 === 0,
    })),
    placeholder: "Select...",
    searchPlaceholder: "Type to filter...",
  },
  render: (args) => <ControlledTemplate {...args} />,
};
