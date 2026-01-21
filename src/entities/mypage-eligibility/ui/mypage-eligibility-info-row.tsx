import {
  type MyPageEligibilityAnswer,
  formatMyPageEligibilityValue,
} from "@/src/entities/mypage-eligibility";

type Props = {
  answer: MyPageEligibilityAnswer;
};

export default function MyPageEligibilityInfoRow({ answer }: Props) {
  return (
    <li className="flex h-8 items-center justify-between gap-4">
      <span className="shrink-0 text-slate-600">{answer.title}</span>
      <span className="text-right text-slate-900">
        {formatMyPageEligibilityValue(answer)}
      </span>
    </li>
  );
}
