import { MenuItem, MenuSection } from "@/src/shared/components/mypage-menu";
import MypageProfile from "@/src/widgets/mypage-profile/ui/mypage-profile";
import { Heart, User, Eye, FileText } from "lucide-react";

export default function MyPage() {
  return (
    <div className="px-6 pb-10">
      <MypageProfile />

      <div className="space-y-10">
        {/* 개인 정보 */}
        <MenuSection title="개인 정보">
          <MenuItem
            link="/mypage/eligibility"
            icon={<User size={20} />}
            label="지원 자격"
          />
          <MenuItem
            link="/mypage/scrap"
            icon={<Heart size={20} />}
            label="관심 공고"
          />
          <MenuItem
            link="/mypage/recent"
            icon={<Eye size={20} />}
            label="최근 열람 공고"
          />
        </MenuSection>

        {/* 고객 지원 */}
        <MenuSection title="고객 지원">
          <MenuItem
            link="/mypage/faq"
            icon={<FileText size={20} />}
            label="자주 묻는 질문 (FAQ)"
          />
          <MenuItem
            link="/mypage/terms"
            icon={<FileText size={20} />}
            label="서비스 이용약관"
          />
          <MenuItem
            link="/mypage/privacy"
            icon={<FileText size={20} />}
            label="개인정보 처리방침"
          />
        </MenuSection>

        {/* 탈퇴하기 */}
        <div className="flex justify-end">
          <button type="button" className="text-sm text-slate-300">
            탈퇴하기
          </button>
        </div>
      </div>
    </div>
  );
}
