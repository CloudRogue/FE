import {
  MANAGEMENT_STATUS,
  MANAGEMENT_STATUS_TYPE,
  ManagementStatus,
  STEPPER_STEPS,
} from "@/src/entities/management";
import cn from "@/src/shared/lib/cn";
import { Progress } from "@/src/shared/ui/progress";
import { Check } from "lucide-react";

interface StepperProps {
  status: ManagementStatus;
}

export function ManagementStepper({ status }: StepperProps) {
  const { progress: currentProgress } = MANAGEMENT_STATUS[status];
  const currentIdx =
    status === MANAGEMENT_STATUS_TYPE.CLOSED
      ? STEPPER_STEPS.length - 1
      : STEPPER_STEPS.findIndex((s) => s.id === status);

  return (
    <div className="relative w-full h-16 mb-4 pt-4">
      <Progress
        value={currentProgress}
        className="bg-slate-100 h-2"
        indicatorClassName="bg-blue-500"
      />

      <div
        className="absolute left-0 w-full flex justify-between px-0"
        style={{ top: "7px" }}
      >
        {STEPPER_STEPS.map((step, idx) => {
          const isCompleted = idx < currentIdx;
          const { position } = MANAGEMENT_STATUS[step.id];

          return (
            <div
              key={step.id}
              className="relative flex flex-col items-center"
              style={{ left: position }}
            >
              <div
                className={cn(
                  "flex h-6 w-6 items-center justify-center rounded-full z-10 mb-2",
                  isCompleted ? "bg-blue-500" : "bg-slate-100",
                )}
              >
                <Check
                  size={14}
                  className={cn(
                    "stroke-[4px] transition-colors",
                    isCompleted ? "text-white" : "text-slate-400",
                  )}
                />
              </div>
              <span
                className={cn(
                  "text-sm font-semibold",
                  isCompleted ? "text-blue-500" : "text-slate-400",
                )}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
