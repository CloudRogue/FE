import Link from "next/link";
import ZipchakLogo from "@/src/shared/ui/icons/main-zipchak.svg";
import { ROUTES } from "@/src/shared/constants/routes";

export const Footer = () => {
  return (
    <footer className="w-full border-t border-gray-100 bg-white px-5 py-10 pb-25">
      <div className="mx-auto flex max-w-md flex-col gap-3">
        <div className="flex items-center gap-2">
          <ZipchakLogo width={60} height={24} className="text-gray-700" />
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex gap-4 text-caption1 text-gray-400">
            <Link
              href={ROUTES.MYPAGE_TERMS}
              className="underline decoration-gray-200 underline-offset-4 hover:text-gray-700 transition-colors"
            >
              서비스 이용 약관
            </Link>
            <Link
              href={ROUTES.MYPAGE_PERSONAL}
              className="underline decoration-gray-200 underline-offset-4 hover:text-gray-700 transition-colors"
            >
              개인정보 처리 방침
            </Link>
          </div>

          <p className="text-body2 text-gray-400">zipchak@business.com</p>
        </div>
      </div>
    </footer>
  );
};
