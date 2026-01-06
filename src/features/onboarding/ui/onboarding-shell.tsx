"use client";

import { useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft } from "lucide-react";

import { Progress } from "@/src/shared/ui/progress";
import Button from "@/src/shared/ui/button";
import { Drawer } from "@/src/shared/ui/drawer";

import Step0 from "@/src/features/onboarding/ui/steps/step-0";
import Step1 from "@/src/features/onboarding/ui/steps/step-1";
import Step2 from "@/src/features/onboarding/ui/steps/step-2";
import Step3 from "@/src/features/onboarding/ui/steps/step-3";
import Step4 from "@/src/features/onboarding/ui/steps/step-4";
import Step5 from "@/src/features/onboarding/ui/steps/step-5";

import type {
  OnboardingDraft,
  OnboardingFormData,
} from "@/src/features/onboarding/model/onboarding.types";
import { onboardingSchema } from "@/src/features/onboarding/model/onboarding.types";
import { toOnboardingFormData } from "@/src/features/onboarding/model/onboarding-transform";

const TOTAL_STEP_COUNT = 6;
const MIN_STEP = 0;
const MAX_STEP = TOTAL_STEP_COUNT - 1;

function clampStep(value: number) {
  if (Number.isNaN(value)) return 0;
  if (value < MIN_STEP) return MIN_STEP;
  if (value > MAX_STEP) return MAX_STEP;
  return value;
}

function toNumberOrUndefined(raw: string | null): number | undefined {
  if (raw == null) return undefined;
  const n = Number(raw);
  if (!Number.isFinite(n)) return undefined;
  return n;
}

function queryToDraft(sp: URLSearchParams): OnboardingDraft {
  const genderRaw = sp.get("gender");
  const gender =
    genderRaw === "male" || genderRaw === "female" ? genderRaw : undefined;

  const householdRoleRaw = sp.get("householdRole");
  const householdRole =
    householdRoleRaw === "householder" || householdRoleRaw === "member"
      ? householdRoleRaw
      : undefined;

  return {
    name: sp.get("name")?.trim() || undefined,
    gender,

    birthYear: sp.get("birthYear") || undefined,
    birthMonth: sp.get("birthMonth") || undefined,
    birthDay: sp.get("birthDay") || undefined,

    regionCity: sp.get("regionCity") || undefined,
    regionDistrict: sp.get("regionDistrict") || undefined,

    householdSize: toNumberOrUndefined(sp.get("householdSize")),
    householdRole,

    monthlyIncome: toNumberOrUndefined(sp.get("monthlyIncome")),
    incomeDecile: toNumberOrUndefined(sp.get("incomeDecile")),
  };
}

function canProceedToNextStep(step: number, sp: URLSearchParams) {
  if (step === 0) return true;

  if (step === 1) {
    const name = sp.get("name")?.trim() ?? "";
    const gender = sp.get("gender");
    const hasGender = gender === "male" || gender === "female";
    return name.length > 0 && hasGender;
  }

  if (step === 2) {
    const y = sp.get("birthYear") ?? "";
    const m = sp.get("birthMonth") ?? "";
    const d = sp.get("birthDay") ?? "";
    return y.length === 4 && m.length >= 1 && d.length >= 1;
  }

  if (step === 3) {
    return Boolean(sp.get("regionCity")) && Boolean(sp.get("regionDistrict"));
  }

  if (step === 4) {
    return Boolean(sp.get("householdSize")) && Boolean(sp.get("householdRole"));
  }

  if (step === 5) {
    const raw = sp.get("incomeDecile");
    const n = raw ? Number(raw) : NaN;
    return Number.isFinite(n) && n >= 1 && n <= 10;
  }

  return true;
}

export default function OnboardingShell() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const currentStepIndex = useMemo(() => {
    const raw = searchParams.get("step");
    const next = raw ? Number(raw) : 0;
    return clampStep(next);
  }, [searchParams]);

  const isFirstStep = currentStepIndex === MIN_STEP;
  const isLastStep = currentStepIndex === MAX_STEP;

  const progressValue = useMemo(() => {
    if (TOTAL_STEP_COUNT <= 1) return 0;
    return (currentStepIndex / (TOTAL_STEP_COUNT - 1)) * 100;
  }, [currentStepIndex]);

  const primaryButtonLabel = useMemo(() => {
    if (currentStepIndex === 0) return "시작하기";
    if (isLastStep) return "완료";
    return "다음";
  }, [currentStepIndex, isLastStep]);

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
    if (isFirstStep) return;
    replaceStep(currentStepIndex - 1);
  };

  const goToNextStep = () => {
    if (isLastStep) return;
    replaceStep(currentStepIndex + 1);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isLastStep) {
      try {
        const sp = new URLSearchParams(searchParams.toString());
        const draft = queryToDraft(sp);

        const body: OnboardingFormData = toOnboardingFormData(draft);
        onboardingSchema.parse(body);

        console.log("[onboarding] requestBody:", body);

        setIsDrawerOpen(true);
      } catch (error) {
        console.error("[onboarding] submit error:", error);
      }
      return;
    }

    goToNextStep();
  };

  const isPrimaryButtonDisabled = useMemo(() => {
    if (currentStepIndex === 0) return false;
    return !canProceed;
  }, [currentStepIndex, canProceed]);

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
          {currentStepIndex === 0 && <Step0 />}
          {currentStepIndex === 1 && <Step1 />}
          {currentStepIndex === 2 && <Step2 />}
          {currentStepIndex === 3 && <Step3 />}
          {currentStepIndex === 4 && <Step4 />}
          {currentStepIndex === 5 && <Step5 />}
        </section>

        <footer className="fixed bottom-0 left-0 right-0 bg-white px-6 pb-6 pt-4 md:static md:px-0 md:pb-0">
          <div className="mx-auto w-full max-w-[420px] md:max-w-none">
            {currentStepIndex === 0 ? (
              <p className="mb-3 text-center text-sm text-black underline">
                이미 입력한 내역이나 계정이 있나요?
              </p>
            ) : null}

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

      <Drawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        className="rounded-t-[32px] p-6"
      >
        <div className="space-y-4">
          <div className="text-xl font-semibold text-neutral-900">
            회원가입 하고 맞춤 공고를 추천 받아보세요!
          </div>

          <div className="flex justify-center">
            <div className="rounded-xl bg-neutral-100 px-4 py-2 text-sm text-neutral-700">
              1초 만에 간편 회원가입
            </div>
          </div>

          <Button
            type="button"
            className="h-14 w-full rounded-xl bg-neutral-900 text-base font-semibold text-white"
          >
            카카오로 시작하기
          </Button>
        </div>
      </Drawer>
    </main>
  );
}
