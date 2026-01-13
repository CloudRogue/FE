"use client";

import Button from "@/src/shared/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

interface FaqItem {
  question: string;
  answer: string;
}

export default function FaqPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqData: FaqItem[] = [
    {
      question: "자주 묻는 질문 1",
      answer:
        "답변 입니다.답변 입니다.답변 입니다.답변 입니다.답변 입니다.답변 입니다.답변 입니다.답변 입니다.답변 입니다.답변 입니다.답변 입니다.답변 입니다.답변 입니다.답변 입니다.답변 입니다.",
    },
    {
      question: "자주 묻는 질문 2",
      answer:
        "답변 입니다.답변 입니다.답변 입니다.답변 입니다.답변 입니다.답변 입니다.답변 입니다.답변 입니다.답변 입니다.답변 입니다.답변 입니다.답변 입니다.답변 입니다.답변 입니다.답변 입니다.",
    },
    {
      question: "자주 묻는 질문 3",
      answer: "답변 내용이 여기에 들어갑니다.",
    },
    {
      question: "자주 묻는 질문 4",
      answer: "답변 내용이 여기에 들어갑니다.",
    },
  ];

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div>
      {/* 타이틀 */}
      <h1 className="mb-6 text-[20px] font-bold">공고 접수</h1>

      {/* FAQ 리스트 컨테이너 */}
      <div className="border-t border-gray-200">
        {faqData.map((item, index) => {
          const isOpen = openIndex === index;

          return (
            <div key={index} className="border-b border-gray-200">
              {/* 질문 버튼 */}
              <Button
                onClick={() => handleToggle(index)}
                className="flex w-full items-center justify-between py-5 text-left outline-none transition-colors active:bg-gray-50"
              >
                <span className="text-[15px] font-semibold text-[#333] px-1">
                  {item.question}
                </span>
                {isOpen ? (
                  <ChevronUp
                    size={20}
                    strokeWidth={2.5}
                    className="text-gray-900"
                  />
                ) : (
                  <ChevronDown
                    size={20}
                    strokeWidth={2.5}
                    className="text-gray-900"
                  />
                )}
              </Button>

              {/* 답변 영역: 열렸을 때만 표시 */}
              {isOpen && (
                <div className="bg-[#F8F9FB] px-4 py-6 border-t border-gray-100">
                  <p className="text-[13px] leading-6 font-medium text-[#1E6BFF]">
                    {item.answer}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
