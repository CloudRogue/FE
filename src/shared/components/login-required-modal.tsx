import { ROUTES } from "@/src/shared/constants/routes";
import Button from "@/src/shared/ui/button";
import { Check } from "lucide-react";
import { useRouter } from "next/navigation";

interface LoginRequiredModalProps {
  onClose: () => void;
  message?: React.ReactNode;
}

export function LoginRequiredModal({
  onClose,
  message,
}: LoginRequiredModalProps) {
  const router = useRouter();

  const handleLoginRedirect = () => {
    onClose();
    router.push(ROUTES.LOGIN);
  };

  return (
    <div className="w-full flex flex-col items-center text-center gap-6">
      <div className="p-4 bg-primary-50 rounded-full flex items-center justify-center">
        <Check width={32} height={32} className="text-primary-blue" />
      </div>
      <div>
        <h3 className="text-h1 mb-3">로그인이 필요합니다.</h3>
        <p className="text-body2 text-gray-500 leading-relaxed">
          {message || (
            <>
              해당 기능은 로그인이 필요합니다.
              <br />
              로그인 페이지로 이동하시겠습니까?
            </>
          )}
        </p>
      </div>
      <div className="w-full flex flex-col gap-3">
        <Button onClick={handleLoginRedirect} className="w-full">
          로그인 하기
        </Button>
        <Button onClick={onClose} variant="secondary" className="w-full py-0">
          돌아가기
        </Button>
      </div>
    </div>
  );
}
