import type { Meta, StoryObj } from "@storybook/react";

import { Button, type ButtonProps } from "./Button";
import "./button.css";

const meta: Meta<typeof Button> = {
  title: "ui-kit/Button",
  component: Button,
  parameters: { layout: "centered" },
  argTypes: {
    type: {
      control: { type: "radio" },
      options: ["button", "submit", "reset"],
    },
    disabled: { control: "boolean" },
    className: { control: "text" },
    children: { control: "text" },
    onClick: { action: "onClick" },
  },
  args: {
    children: "Button",
    type: "button",
    disabled: false,
    className: "",
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: "Disabled",
  },
};

export const WithClassName: Story = {
  args: {
    children: "Styled placeholder",
    className: "px-4 py-2 border rounded",
  } satisfies Partial<ButtonProps>,
};

export const SubmitInForm: Story = {
  args: {
    type: "submit",
    children: "Submit",
  },
  decorators: [
    (Story) => (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          alert("form submitted");
        }}
      >
        <Story />
      </form>
    ),
  ],
};

export const ClientClick: StoryObj<typeof Button> = {
  render: (args) => {
    const clientArgs = args as unknown as ButtonProps;
    return <Button {...clientArgs} onClick={() => {}} />;
  },
  args: {
    children: "ClientButton (click)",
    type: "button",
  },
};

// import type { Meta, StoryObj } from '@storybook/nextjs-vite';

// import { fn } from 'storybook/test';

// import { Button } from './Button';

// // More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
// const meta = {
//   title: 'Example/Button',
//   component: Button,
//   parameters: {
//     // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
//     layout: 'centered',
//   },
//   // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
//   tags: ['autodocs'],
//   // More on argTypes: https://storybook.js.org/docs/api/argtypes
//   argTypes: {
//     backgroundColor: { control: 'color' },
//   },
//   // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#story-args
//   args: { onClick: fn() },
// } satisfies Meta<typeof Button>;

// export default meta;
// type Story = StoryObj<typeof meta>;

// // More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
// export const Primary: Story = {
//   args: {
//     primary: true,
//     label: 'Button',
//   },
// };

// export const Secondary: Story = {
//   args: {
//     label: 'Button',
//   },
// };

// export const Large: Story = {
//   args: {
//     size: 'large',
//     label: 'Button',
//   },
// };

// export const Small: Story = {
//   args: {
//     size: 'small',
//     label: 'Button',
//   },
// };
