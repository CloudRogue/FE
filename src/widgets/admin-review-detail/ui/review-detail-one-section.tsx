import {
  BasicInfoForm,
  RquirementsForm,
  ScheduleForm,
  SummaryForm,
} from "@/src/features/admin-review-detail";
import Button from "@/src/shared/ui/button";
import { useAdminStepperStore } from "@/src/widgets/admin-review-detail";
import { ChevronRight } from "lucide-react";

export function ReviewDetailOneSection() {
  const { setStep } = useAdminStepperStore();

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    // 유효성 추가 필요함 - api 명세 이후 작업
    setStep(2);
    window.scrollTo(0, 0);
  };

  return (
    <form
      onSubmit={handleNextStep}
      className="animate-in fade-in slide-in-from-bottom-2 duration-500 flex flex-col gap-5"
    >
      {/* 공고 기본 정보 */}
      <BasicInfoForm />

      {/* 공고 개요 */}
      <SummaryForm />

      {/* 필수 지원 자격 조건 */}
      <RquirementsForm />

      {/* 공고 일정 및 지원 관리 */}
      <ScheduleForm />

      <div className="flex justify-end pt-6">
        <Button
          type="submit"
          className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all"
        >
          다음 단계로 <ChevronRight size={18} />
        </Button>
      </div>
    </form>
  );
}
