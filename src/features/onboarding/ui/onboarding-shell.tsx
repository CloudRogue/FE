"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

import { saveOnboardingProfile } from "@/src/features/onboarding/api/onboarding.action";
import { Progress } from "@/src/shared/ui/progress";
import Button from "@/src/shared/ui/button";

import {
  Step0,
  Step1,
  Step2,
  Step3,
  Step4,
  Step5,
  OnboardingCompleteDrawer,
  toOnboardingFormData,
  onboardingSchema,
  canProceedToNextStep,
  isDirtyDraft,
  ONBOARDING_MAX_STEP,
  ONBOARDING_MIN_STEP,
  ONBOARDING_TOTAL_STEP_COUNT,
  useOnboardingStore,
} from "@/src/features/onboarding";

import type { OnboardingFormData } from "@/src/features/onboarding";

export const STEP_LABELS: Record<number, string> = {
  0: "시작하기",
  [ONBOARDING_MAX_STEP]: "완료",
};

const STEPS = [Step0, Step1, Step2, Step3, Step4, Step5] as const;

export default function OnboardingShell() {
  const currentStepIndex = useOnboardingStore((s) => s.currentStepIndex);
  const draft = useOnboardingStore((s) => s.draft);
  const nextStep = useOnboardingStore((s) => s.nextStep);
  const prevStep = useOnboardingStore((s) => s.prevStep);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const isFirstStep = currentStepIndex === ONBOARDING_MIN_STEP;
  const isLastStep = currentStepIndex === ONBOARDING_MAX_STEP;

  const progressValue =
    ONBOARDING_TOTAL_STEP_COUNT <= 1
      ? 0
      : Math.round(
          (currentStepIndex / (ONBOARDING_TOTAL_STEP_COUNT - 1)) * 100,
        );

  const primaryButtonLabel = STEP_LABELS[currentStepIndex] ?? "다음";

  const canProceed = useMemo(() => {
    return canProceedToNextStep(currentStepIndex, draft);
  }, [currentStepIndex, draft]);

  const isPrimaryButtonDisabled = currentStepIndex !== 0 && !canProceed;

  useEffect(() => {
    const handler = (e: BeforeUnloadEvent) => {
      if (!isDirtyDraft(draft)) return;
      e.preventDefault();
      e.returnValue = "";
    };

    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [draft]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isLastStep) {
      nextStep();
      return;
    }

    try {
      setSubmitError(null);
      setIsSubmitting(true);

      const body: OnboardingFormData = toOnboardingFormData(draft);
      onboardingSchema.parse(body);

      await saveOnboardingProfile(body);

      setIsDrawerOpen(true);
    } catch (error) {
      console.error("[onboarding] submit error:", error);
      setSubmitError("저장에 실패했습니다. 다시 시도해 주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const CurrentStep = STEPS[currentStepIndex];

  const handleGoLoginClick = (e: React.MouseEvent) => {
    if (!isDirtyDraft(draft)) return;
    const ok = window.confirm("입력 중인 내용이 사라집니다. 이동할까요?");
    if (!ok) e.preventDefault();
  };

  return (
    <main className="min-h-dvh bg-white">
      <form onSubmit={handleSubmit} className="min-h-dvh">
        <header className="px-6 pt-6">
          <Button
            type="button"
            onClick={prevStep}
            disabled={isFirstStep}
            aria-label="뒤로가기"
            className="h-10 w-10 -ml-3 rounded-none bg-transparent px-0 text-neutral-900 shadow-none hover:bg-transparent"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>

          <div className="mt-4">
            <Progress value={progressValue} />
            <p className="mt-2 text-sm text-neutral-600">
              {currentStepIndex + 1} / {ONBOARDING_TOTAL_STEP_COUNT}
            </p>
          </div>
        </header>

        <section className="px-6 pb-28 pt-10">
          <CurrentStep />
        </section>

        <footer className="fixed bottom-0 left-0 right-0 bg-white px-6 pb-6 pt-4 md:static md:px-0 md:pb-0">
          <div className="mx-auto w-full max-w-[420px] md:max-w-none">
            {currentStepIndex === 0 && (
              <Link href="/login" onClick={handleGoLoginClick}>
                <p className="mb-3 text-center text-sm text-black underline">
                  이미 입력한 내역이나 계정이 있나요?
                </p>
              </Link>
            )}

            <Button
              type="submit"
              disabled={isPrimaryButtonDisabled || isSubmitting}
              className="h-14 w-full rounded-xl bg-neutral-900 text-base font-semibold text-white"
            >
              {isSubmitting ? "저장 중..." : primaryButtonLabel}
            </Button>

            {submitError ? (
              <p className="mt-2 text-center text-sm text-red-500">
                {submitError}
              </p>
            ) : null}
          </div>
        </footer>
      </form>

      <OnboardingCompleteDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />
    </main>
  );
}
