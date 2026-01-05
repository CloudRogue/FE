import type { Meta, StoryObj } from "@storybook/react";
import Select from "@/src/shared/ui/select";
import ClientSelect from "@/src/shared/ui/client-select";

const meta: Meta<typeof Select> = {
  title: "ui-kit/Select",
  component: Select,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof Select>;

const OPTIONS = [
  { value: "a", label: "옵션 A" },
  { value: "b", label: "옵션 B" },
  { value: "c", label: "옵션 C", disabled: true },
];

export const Default: Story = {
  args: {
    name: "category",
    defaultValue: "",
    placeholder: "선택하세요",
    options: OPTIONS,
  },
};

export const WithLabel: Story = {
  args: {
    label: "카테고리",
    name: "category",
    defaultValue: "",
    placeholder: "선택하세요",
    options: OPTIONS,
  },
};

export const Disabled: Story = {
  args: {
    name: "category",
    defaultValue: "",
    placeholder: "선택하세요",
    options: OPTIONS,
    disabled: true,
  },
};

/* ---------------- Client Select ---------------- */

export const ClientSelectExample: StoryObj<typeof ClientSelect> = {
  render: () => (
    <ClientSelect
      defaultValue=""
      placeholder="선택하세요"
      options={OPTIONS}
      onValueChange={(value) => {
        console.log("선택된 값:", value);
      }}
    />
  ),
  name: "ClientSelect (onValueChange)",
};
