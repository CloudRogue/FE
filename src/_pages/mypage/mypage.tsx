import { MenuItem, MenuSection } from "@/src/shared/components/mypage-menu";
import { ROUTES } from "@/src/shared/constants/routes";
import Alarm from "@/src/shared/ui/icons/my/alarm.svg";
import Eligivility from "@/src/shared/ui/icons/my/eligivility.svg";
import Recent from "@/src/shared/ui/icons/my/recent.svg";
import { MypageWithdrawal } from "@/src/widgets/mypage-profile";
import MypageProfile from "@/src/widgets/mypage-profile/ui/mypage-profile";
import { FileText, Heart } from "lucide-react";

export default function MyPage() {
  return (
    <div className="space-y-4 p-5 bg-gray-bg">
      <MypageProfile />

      {/* 개인 정보 */}
      <MenuSection title="개인 정보">
        <MenuItem
          link={ROUTES.MYPAGE_ELIGIBILITY}
          icon={<Eligivility />}
          label="지원 자격"
        />
        <MenuItem
          link={ROUTES.MYPAGE_SCRAP}
          icon={<Heart size={20} />}
          label="관심 공고"
        />
        <MenuItem
          link={ROUTES.MYPAGE_RECENT}
          icon={<Recent />}
          label="최근 열람 공고"
        />
        <MenuItem
          link={ROUTES.MYPAGE_ALARM}
          icon={<Alarm />}
          label="알림 설정"
        />
      </MenuSection>

      {/* 고객 지원 */}
      <MenuSection title="고객 지원">
        <MenuItem
          link={ROUTES.MYPAGE_FAQ}
          icon={<FileText size={20} />}
          label="자주 묻는 질문 (FAQ)"
        />
        <MenuItem
          link={ROUTES.MYPAGE_TERMS}
          icon={<FileText size={20} />}
          label="서비스 이용약관"
        />
        <MenuItem
          link={ROUTES.MYPAGE_PERSONAL}
          icon={<FileText size={20} />}
          label="개인정보 처리 방침"
        />
      </MenuSection>

      {/* 탈퇴하기 */}
      <div className="flex justify-end">
        <MypageWithdrawal />
      </div>
    </div>
  );
}
