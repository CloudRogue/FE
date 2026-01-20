"use client";

import {
  ReviewDetailOneSection,
  ReviewDetailTwoSection,
  ReviewDetailWrapper,
  useAdminStepperStore,
} from "@/src/widgets/admin-review-detail";

interface AdminReviewDetailProps {
  announcementId: string;
}

export default function AdminReviewDetail({
  announcementId,
}: AdminReviewDetailProps) {
  const { step } = useAdminStepperStore();

  return (
    <div className="flex flex-col gap-8 p-10 mx-auto w-full">
      <ReviewDetailWrapper announcementId={announcementId}>
        {step === 1 ? <ReviewDetailOneSection /> : <ReviewDetailTwoSection />}
      </ReviewDetailWrapper>
    </div>
  );
}
