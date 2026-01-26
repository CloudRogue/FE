"use client";

import { Accordion } from "@/src/shared/ui/arccordion";
import Qna from "@/src/shared/ui/icons/my/qna.svg";
import { useState } from "react";

interface FaqItem {
  question: string;
  answer: string;
}

export default function FaqPage() {
  const [isOpen, setIsOpen] = useState(false);
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

  return (
    <div className="p-4">
      {/* 타이틀 */}
      <h1 className="mb-4 text-h2">카테고리</h1>

      {/* FAQ 리스트 컨테이너 */}

      <div className="space-y-4">
        {faqData.map((item, index) => (
          <Accordion
            key={index}
            defaultOpen
            title={
              <p className="flex items-center gap-3">
                <Qna />
                {item.question}
              </p>
            }
            subTitle={isOpen ? "답변 닫기" : "답변 열기"}
            isOpen={isOpen}
            onToggle={() => setIsOpen(!isOpen)}
            useIcon={false}
          >
            {item.answer}
          </Accordion>
        ))}
      </div>
    </div>
  );
}
