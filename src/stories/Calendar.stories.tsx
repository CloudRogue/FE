import {
  CalendarDays,
  CalendarGrid,
  CalendarHeader,
  CalendarRoot,
} from "@/src/shared/ui/calendar";
import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

const meta: Meta<typeof CalendarRoot> = {
  title: "ui-kit/Calendar",
  component: CalendarRoot,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  subcomponents: {
    CalendarHeader,
    CalendarGrid,
    CalendarDays,
  } as any,
};

export default meta;

type Story = StoryObj<typeof CalendarRoot>;

// 기본형 캘린더
export const Default: Story = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>(new Date());

    return (
      <CalendarRoot selectedDate={date} onDateSelect={setDate}>
        <CalendarHeader />
        <CalendarGrid>
          <CalendarDays />
        </CalendarGrid>
      </CalendarRoot>
    );
  },
};

// 커스텀 예시
export const CustomStyle: Story = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>(new Date());

    return (
      <CalendarRoot
        selectedDate={date}
        onDateSelect={setDate}
        className="border-primary shadow-lg bg-slate-50"
      >
        <CalendarHeader className="bg-white p-2 rounded-t-md border-b mb-2" />
        <CalendarGrid className="p-2">
          <CalendarDays />
        </CalendarGrid>
      </CalendarRoot>
    );
  },
};

// 레이아웃 변경 예씨
export const ReversedLayout: Story = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>(new Date());

    return (
      <CalendarRoot selectedDate={date} onDateSelect={setDate}>
        <div className="mb-2 text-center text-xs text-slate-400 font-medium">
          원하는 날짜를 선택하세요
        </div>
        <CalendarGrid>
          <CalendarDays />
        </CalendarGrid>
        <hr className="my-3" />
        <CalendarHeader className="mb-0" />
      </CalendarRoot>
    );
  },
};
