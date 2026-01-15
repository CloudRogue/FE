"use client";

import type { ReactNode } from "react";
import { ChevronLeft } from "lucide-react";

import { Progress } from "@/src/shared/ui/progress";
import Button from "@/src/shared/ui/button";

type OnboardingAddShellProps = {
  children: ReactNode;

  currentStepIndex: number;
  totalStepCount: number;

  title?: ReactNode;
  description?: ReactNode;

  headerRight?: ReactNode;

  onBack: () => void;
  backDisabled?: boolean;

  primaryButtonLabel: string;
  onPrimary: () => void;
  primaryDisabled?: boolean;
};

export default function OnboardingAddShell({
  children,
  currentStepIndex,
  totalStepCount,
  title,
  description,
  headerRight,
  onBack,
  backDisabled = false,
  primaryButtonLabel,
  onPrimary,
  primaryDisabled = false,
}: OnboardingAddShellProps) {
  const progressValue =
    totalStepCount <= 1
      ? 0
      : Math.round((currentStepIndex / (totalStepCount - 1)) * 100);

  return (
    <main className="min-h-dvh bg-white">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onPrimary();
        }}
        className="min-h-dvh"
      >
        <header className="px-6 pt-6">
          <Button
            type="button"
            onClick={onBack}
            disabled={backDisabled}
            aria-label="뒤로가기"
            className="h-10 w-10 -ml-3 rounded-none bg-transparent px-0 text-neutral-900 shadow-none hover:bg-transparent"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>

          <div className="mt-4">
            <Progress value={progressValue} />
            <p className="mt-2 text-sm text-neutral-600">
              {currentStepIndex + 1} / {totalStepCount}
            </p>
          </div>
        </header>

        <section className="px-6 pb-28 pt-10">
          {title || description || headerRight ? (
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                {title ? (
                  <h1 className="text-xl font-semibold text-black">{title}</h1>
                ) : null}
                {description ? (
                  <p className="mt-2 text-sm text-slate-400">{description}</p>
                ) : null}
              </div>

              {headerRight ? (
                <div className="shrink-0 pt-1">{headerRight}</div>
              ) : null}
            </div>
          ) : null}

          <div
            className={title || description || headerRight ? "mt-8" : undefined}
          >
            {children}
          </div>
        </section>

        <footer className="fixed bottom-0 left-0 right-0 bg-white px-6 pb-6 pt-4 md:static md:px-0 md:pb-0">
          <div className="mx-auto w-full max-w-[420px] md:max-w-none">
            <Button
              type="submit"
              disabled={primaryDisabled}
              className="h-14 w-full rounded-xl bg-neutral-900 text-base font-semibold text-white"
            >
              {primaryButtonLabel}
            </Button>
          </div>
        </footer>
      </form>
    </main>
  );
}
