import ClientDropdown from "@/src/shared/ui/client-dropdown";
import { DropdownItem } from "@/src/shared/ui/dropdown-menu";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof ClientDropdown> = {
  title: "ui-kit/Dropdown",
  component: ClientDropdown,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    label: {
      description: "트리거 버튼",
      control: "text",
    },
    children: {
      description: "dropboxItem",
    },
  },
};

export default meta;
type Story = StoryObj<typeof ClientDropdown>;

// 기본 드롭다운
export const Default: Story = {
  args: {
    label: "계정 설정",
    children: (
      <DropdownItem onClick={() => alert("프로필 클릭")}>프로필</DropdownItem>
    ),
  },
};
