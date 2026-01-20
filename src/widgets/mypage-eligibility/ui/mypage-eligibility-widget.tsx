import type { MyPageEligibilityResponse } from "@/src/entities/mypage-eligibility";

import {
  MyPageEligibilitySectionCard,
  MyPageEligibilityAnswerList,
} from "@/src/widgets/mypage-eligibility";

type AnswerValue = string | number | boolean | string[];

type Props = {
  data: MyPageEligibilityResponse;

  editStatus: {
    required: boolean;
    additional: boolean;
  };

  requiredDraft: Record<number, AnswerValue | undefined>;
  additionalDraft: Record<number, AnswerValue | undefined>;

  onChangeRequired: (id: number, next: AnswerValue) => void;
  onChangeAdditional: (id: number, next: AnswerValue) => void;

  onToggleRequired: () => void;
  onToggleAdditional: () => void;
};

export default function MyPageEligibilityWidget({
  data,
  editStatus,

  requiredDraft,
  additionalDraft,

  onChangeRequired,
  onChangeAdditional,

  onToggleRequired,
  onToggleAdditional,
}: Props) {
  return (
    <div className="space-y-6 px-6 pb-12 pt-6">
      <MyPageEligibilitySectionCard
        title="나의 핵심 정보"
        isEditing={editStatus.required}
        onToggleEdit={onToggleRequired}
      >
        <MyPageEligibilityAnswerList
          items={data.requiredOnboardingAnswers}
          isEditing={editStatus.required}
          draft={requiredDraft}
          onChange={onChangeRequired}
        />
      </MyPageEligibilitySectionCard>

      <MyPageEligibilitySectionCard
        title="추가 정보"
        isEditing={editStatus.additional}
        onToggleEdit={onToggleAdditional}
      >
        <MyPageEligibilityAnswerList
          items={data.additionalOnboardingAnswers}
          isEditing={editStatus.additional}
          draft={additionalDraft}
          onChange={onChangeAdditional}
        />
      </MyPageEligibilitySectionCard>
    </div>
  );
}
