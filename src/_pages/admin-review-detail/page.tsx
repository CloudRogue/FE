"use client";

import {
  ReviewDetailOneSection,
  ReviewDetailTwoSection,
  ReviewDetailWrapper,
  useAdminStepperStore,
} from "@/src/widgets/admin-review-detail";

export default function AdminReviewDetail() {
  const { step } = useAdminStepperStore();

  return (
    <div className="flex flex-col gap-8 p-10 max-w-6xl mx-auto">
      <ReviewDetailWrapper>
        {step === 1 ? <ReviewDetailOneSection /> : <ReviewDetailTwoSection />}
      </ReviewDetailWrapper>
    </div>
  );
}
