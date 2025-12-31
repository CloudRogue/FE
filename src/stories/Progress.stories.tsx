import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { useProgress } from "../shared/hooks/use-progress";
import { Progress } from "../shared/ui/progress";

const meta: Meta<typeof Progress> = {
  title: "ui-kit/Progress",
  component: Progress,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Progress>;

export const AutoProgress: Story = {
  render: () => {
    const [isLoading, setIsLoading] = useState(false);

    const progress = useProgress(isLoading);

    const handleStart = () => {
      setIsLoading(true);
      setTimeout(() => setIsLoading(false), 3000);
    };

    return (
      <div className="p-6 w-100 space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-slate-500">
            상태: {isLoading ? "데이터 불러오는 중..." : "완료"}
          </span>
          <span className=" text-slate-500">{Math.floor(progress)}%</span>
        </div>

        <Progress value={progress} />

        <button
          onClick={handleStart}
          disabled={isLoading}
          className="w-full py-2 bg-black text-white rounded-md disabled:bg-slate-300"
        >
          {isLoading ? "로딩 중..." : "API 호출 시작 (3초)"}
        </button>

        <p className="text-xs text-slate-400">
          * 90%까지는 자동으로 차오르고, 응답이 오면 100%로 점프합니다.
        </p>
      </div>
    );
  },
};
