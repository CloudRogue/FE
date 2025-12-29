import type { Meta, StoryObj } from "@storybook/react";
import ClientInput from "@/src/shared/ui/client-input";
import { useState } from "react";

const meta: Meta<typeof ClientInput> = {
  title: "ui-kit/ClientInput",
  component: ClientInput,
  parameters: {
    docs: {
      description: {
        component:
          "클라이언트 전용 Input입니다. onChange, value 등 이벤트를 사용할 수 있습니다.",
      },
    },
  },
  argTypes: {
    placeholder: { control: "text" },
    disabled: { control: "boolean" },
    className: { control: "text" },
  },
};

export default meta;

type Story = StoryObj<typeof ClientInput>;

export const Controlled: Story = {
  render: (args) => {
    const [value, setValue] = useState("");

    return (
      <div className="space-y-2">
        <ClientInput
          {...args}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="border px-2 py-1 rounded"
        />
        <div className="text-sm text-gray-400">
          value: <span className="font-mono">{value || "(empty)"}</span>
        </div>
      </div>
    );
  },
  args: {
    placeholder: "Type here...",
  },
};

export const Disabled: Story = {
  args: {
    placeholder: "Disabled",
    disabled: true,
    className: "border px-2 py-1 rounded",
  },
};
