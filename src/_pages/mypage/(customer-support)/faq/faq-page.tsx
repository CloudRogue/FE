"use client";

import { Accordion } from "@/src/shared/ui/arccordion";
import Qna from "@/src/shared/ui/icons/my/qna.svg";
import { useState } from "react";

interface FaqItem {
  question: string;
  answer: string;
}

export default function FaqPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="p-4">
      {/* 타이틀 */}
      <h1 className="mb-4 text-h2">카테고리</h1>

      <div className="space-y-4">
        {faqData.map((item, index) => {
          const isCurrentlyOpen = openIndex === index;

          return (
            <Accordion
              key={index}
              title={
                <p className="flex items-center gap-3 text-h4">
                  <Qna />
                  {item.question}
                </p>
              }
              subTitle={isCurrentlyOpen ? "답변 닫기" : "답변 열기"}
              isOpen={isCurrentlyOpen}
              onToggle={() => handleToggle(index)}
              useIcon={false}
              className="text-body2"
            >
              {item.answer}
            </Accordion>
          );
        })}
      </div>
    </div>
  );
}

const faqData: FaqItem[] = [
  {
    question: "'집착'에서 제공하는 자격 진단 결과가 100% 정확한가요?",
    answer:
      "아닙니다. '집착'은 공고문의 복잡한 조건을 AI가 요약하여 분석합니다. 사용자가 입력한 온보딩 데이터를 바탕으로 한 참고용 결과일 뿐이며, 법적 효력은 없습니다. 정확한 지원 자격은 반드시 상세 페이지의 '공고 원문 보기'를 통해 해당 기관(LH, SH)의 공식 공고문을 확인해 주세요.",
  },
  {
    question: "온보딩 설문 항목을 잘못 입력하면 어떻게 하나요?",
    answer:
      "회원님이 입력한 데이터를 기준으로 자격 진단을 진행하기 때문에 잘못된 정보를 입력한 경우는 마이페이지 지원 자격 수정에서 수정하면 반영됩니다.",
  },
  {
    question: "맞춤 공고 추천 기준은 무엇인가요?",
    answer:
      "회원님이 입력하신 필수 온보딩 설문 데이터(거주지, 소득, 자산, 가구원 수 등)와 공고의 지원 자격을 대조하여 지원 가능성이 높고 마감일이 임박한 정책을 우선순위로 보여드립니다.",
  },
  {
    question: "'결과 보류'라고 뜨는데 어떻게 해야 하나요?",
    answer:
      "특정 공고는 일반적인 정보 외에 추가 데이터(차량 가액, 청약 통장 납입 횟수 등)를 요구합니다. 이 경우 '추가 정보 입력' 버튼을 클릭하시고 추가 설문을 통해 데이터를 보충해 주시면 즉시 다시 진단해 드립니다.",
  },
  {
    question: "내 소득이나 자산 정보를 입력해도 안전한가요?",
    answer:
      "네, 안전합니다. 입력하신 모든 정보는 암호화되어 전송 및 관리되며 , 주거 정책 매칭 및 자격 검증 목적으로만 활용됩니다. 또한, 본 서비스는 데모 프로젝트로 운영 종료 시 모든 데이터를 지체 없이 파기합니다.",
  },
  {
    question: "서비스 이용이 끝나면 제 정보는 어떻게 되나요?",
    answer:
      "회원 탈퇴 시 또는 데모 서비스 종료 시, 회원님의 소중한 개인정보는 재생 불가능한 방법으로 즉시 파기됩니다. 별도의 DB로 이관하여 보관하지 않으므로 안심하고 이용하셔도 됩니다.",
  },
  {
    question: "카카오 알림톡은 언제 발송되나요?",
    answer:
      "'지원 관리'에 담은 공고의 지원 마감일, 서류 발표일, 최종 발표일을 기준으로 D-7일과 당일 오전 9시에 리마인드 알림을 보내드립니다.",
  },
  {
    question: "서비스 이용에 비용이 드나요?",
    answer:
      "아니요. '집착'은 청년들의 주거 안정을 돕기 위해 제공되는 100% 무료 서비스 입니다.",
  },
];
