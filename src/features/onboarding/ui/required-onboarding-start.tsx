"use client";

import Image from "next/image";

import QuestionLayout from "@/src/features/onboarding/ui/question/question-layout";

export default function RequiredOnboardingStart() {
  return (
    <QuestionLayout
      variant="start"
      question={{
        title: "청년을 위한 주택 공고 중개인, 집착",
        description:
          "나에게 딱 맞는 집을 찾을 때까지\n집착이 대신 집착해 드릴게요!",
        question: "",
      }}
    >
      <div className="flex flex-col items-center">
        <div className="mt-16">
          <Image
            src="/img/onboarding-start.png"
            alt="온보딩 시작 이미지"
            width={240}
            height={240}
            priority
          />
        </div>
      </div>
    </QuestionLayout>
  );
}
