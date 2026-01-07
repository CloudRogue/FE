"use client";

import { useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft } from "lucide-react";

import { Progress } from "@/src/shared/ui/progress";
import Button from "@/src/shared/ui/button";

import Step0 from "@/src/features/onboarding/ui/steps/step-0";
import Step1 from "@/src/features/onboarding/ui/steps/step-1";
import Step2 from "@/src/features/onboarding/ui/steps/step-2";
import Step3 from "@/src/features/onboarding/ui/steps/step-3";
import Step4 from "@/src/features/onboarding/ui/steps/step-4";
import Step5 from "@/src/features/onboarding/ui/steps/step-5";
import OnboardingCompleteDrawer from "@/src/features/onboarding/ui/onboarding-complete-drawer";

import type {
  OnboardingDraft,
  OnboardingFormData,
} from "@/src/features/onboarding/model/onboarding.types";
import {
  onboardingSchema,
  onboardingDraftSchema,
} from "@/src/features/onboarding/model/onboarding.types";
import { toOnboardingFormData } from "@/src/features/onboarding/model/onboarding-transform";
import Link from "next/link";

const TOTAL_STEP_COUNT = 6;
const MIN_STEP = 0;
const MAX_STEP = TOTAL_STEP_COUNT - 1;

export const STEP_LABELS: Record<number, string> = {
  0: "시작하기",
  [MAX_STEP]: "완료",
};

function clampStep(value: number) {
  if (Number.isNaN(value)) return 0;
  if (value < MIN_STEP) return MIN_STEP;
  if (value > MAX_STEP) return MAX_STEP;
  return value;
}

function queryToDraft(sp: URLSearchParams): OnboardingDraft {
  const raw = Object.fromEntries(sp.entries());

  const parsed = onboardingDraftSchema.partial().safeParse(raw);
  return parsed.success ? parsed.data : {};
}

type StepValidator = (sp: URLSearchParams) => boolean;

const STEP_VALIDATORS: Record<number, StepValidator> = {
  0: () => true,

  1: (sp) => {
    const name = sp.get("name")?.trim() ?? "";
    const gender = sp.get("gender");
    return name.length > 0 && (gender === "male" || gender === "female");
  },

  2: (sp) => {
    const y = sp.get("birthYear") ?? "";
    const m = sp.get("birthMonth") ?? "";
    const d = sp.get("birthDay") ?? "";

    return /^\d{4}$/.test(y) && m.length >= 1 && d.length >= 1;
  },

  3: (sp) => !!sp.get("regionCity") && !!sp.get("regionDistrict"),

  4: (sp) => {
    const rawSize = sp.get("householdSize");
    const size = rawSize ? Number(rawSize) : NaN;
    const role = sp.get("householdRole");

    return (
      !Number.isNaN(size) &&
      size >= 1 &&
      (role === "householder" || role === "member")
    );
  },

  5: (sp) => {
    const raw = sp.get("incomeDecile");
    const n = raw ? Number(raw) : NaN;
    return !Number.isNaN(n) && n >= 1 && n <= 10;
  },
};

function canProceedToNextStep(step: number, sp: URLSearchParams) {
  return STEP_VALIDATORS[step]?.(sp) ?? true;
}

export default function OnboardingShell() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const currentStepIndex = useMemo(() => {
    return clampStep(Number(searchParams.get("step") ?? 0));
  }, [searchParams]);

  const isFirstStep = currentStepIndex === MIN_STEP;
  const isLastStep = currentStepIndex === MAX_STEP;

  const progressValue =
    TOTAL_STEP_COUNT <= 1
      ? 0
      : Math.round((currentStepIndex / (TOTAL_STEP_COUNT - 1)) * 100);

  const primaryButtonLabel = STEP_LABELS[currentStepIndex] ?? "다음";

  const urlParams = useMemo(
    () => new URLSearchParams(searchParams.toString()),
    [searchParams],
  );

  const canProceed = useMemo(() => {
    return canProceedToNextStep(currentStepIndex, urlParams);
  }, [currentStepIndex, urlParams]);

  const replaceStep = (nextStep: number) => {
    const next = new URLSearchParams(searchParams.toString());
    next.set("step", String(clampStep(nextStep)));
    router.replace(`${pathname}?${next.toString()}`);
  };

  const goToPreviousStep = () => {
    if (!isFirstStep) replaceStep(currentStepIndex - 1);
  };

  const goToNextStep = () => {
    if (!isLastStep) replaceStep(currentStepIndex + 1);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isLastStep) {
      try {
        const sp = new URLSearchParams(searchParams.toString());
        const draft = queryToDraft(sp);

        const body: OnboardingFormData = toOnboardingFormData(draft);
        onboardingSchema.parse(body);

        setIsDrawerOpen(true);
      } catch (error) {
        console.error("[onboarding] submit error:", error);
      }
      return;
    }

    goToNextStep();
  };

  const isPrimaryButtonDisabled = currentStepIndex !== 0 && !canProceed;

  const STEPS = [Step0, Step1, Step2, Step3, Step4, Step5] as const;
  const CurrentStep = STEPS[currentStepIndex];

  return (
    <main className="min-h-dvh bg-white">
      <form onSubmit={handleSubmit} className="min-h-dvh">
        <header className="px-6 pt-6">
          <Button
            type="button"
            onClick={goToPreviousStep}
            disabled={isFirstStep}
            aria-label="뒤로가기"
            className="h-10 w-10 -ml-3 rounded-none bg-transparent px-0 text-neutral-900 shadow-none hover:bg-transparent"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>

          <div className="mt-4">
            <Progress value={progressValue} />
            <p className="mt-2 text-sm text-neutral-600">
              {currentStepIndex + 1} / {TOTAL_STEP_COUNT}
            </p>
          </div>
        </header>

        <section className="px-6 pb-28 pt-10">
          <CurrentStep />
        </section>

        <footer className="fixed bottom-0 left-0 right-0 bg-white px-6 pb-6 pt-4 md:static md:px-0 md:pb-0">
          <div className="mx-auto w-full max-w-[420px] md:max-w-none">
            {currentStepIndex === 0 && (
              <Link href="/login">
                <p className="mb-3 text-center text-sm text-black underline">
                  이미 입력한 내역이나 계정이 있나요?
                </p>
              </Link>
            )}

            <Button
              type="submit"
              disabled={isPrimaryButtonDisabled}
              className="h-14 w-full rounded-xl bg-neutral-900 text-base font-semibold text-white"
            >
              {primaryButtonLabel}
            </Button>
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
