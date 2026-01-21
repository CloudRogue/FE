import type { MyPageEligibilityAnswer } from "@/src/entities/mypage-eligibility";
import { MyPageEligibilityInfoRow } from "@/src/entities/mypage-eligibility";

import { MyPageEligibilityEditableRow } from "@/src/widgets/mypage-eligibility";

type AnswerValue = string | number | boolean | string[];

type Props = {
  items: MyPageEligibilityAnswer[];
  isEditing: boolean;
  draft: Record<number, AnswerValue | undefined>;
  onChange: (id: number, next: AnswerValue) => void;
};

export default function MyPageEligibilityAnswerList({
  items,
  isEditing,
  draft,
  onChange,
}: Props) {
  return (
    <ul className="space-y-4 text-sm">
      {items.map((answer) => {
        if (!isEditing) {
          return <MyPageEligibilityInfoRow key={answer.id} answer={answer} />;
        }

        return (
          <MyPageEligibilityEditableRow
            key={answer.id}
            answer={answer}
            value={draft[answer.id]}
            onChange={(next) => onChange(answer.id, next)}
          />
        );
      })}
    </ul>
  );
}
