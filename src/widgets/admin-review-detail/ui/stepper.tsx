"use client";

import cn from "@/src/shared/lib/cn";
import { useAdminStepperStore } from "@/src/widgets/admin-review-detail";
import { Check } from "lucide-react";
import React from "react";

interface StepItem {
  number: number;
  label: string;
}

interface StepperProps {
  steps: StepItem[];
}

export function Stepper({ steps }: StepperProps) {
  const { step: currentStep } = useAdminStepperStore();

  return (
    <div className="flex items-center gap-4">
      {steps.map((step, index) => {
        const isActive = currentStep === step.number;
        const isCompleted = currentStep > step.number;
        const isLast = index === steps.length - 1;

        return (
          <React.Fragment key={step.number}>
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300",
                  isActive
                    ? "bg-blue-600 text-white ring-4 ring-blue-50"
                    : isCompleted
                      ? "bg-blue-600 text-white"
                      : "bg-slate-200 text-slate-500",
                )}
              >
                {isCompleted ? (
                  <Check size={16} strokeWidth={3} />
                ) : (
                  step.number
                )}
              </div>
              <span
                className={cn(
                  "font-bold text-[15px] whitespace-nowrap",
                  isActive ? "text-slate-900" : "text-slate-400",
                )}
              >
                {step.label}
              </span>
            </div>

            {!isLast && (
              <div
                className={cn(
                  "h-0.5 w-20 transition-colors duration-500",
                  currentStep > step.number ? "bg-blue-600" : "bg-slate-200",
                )}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
