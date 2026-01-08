import { MenuItem, MenuSection } from "@/src/shared/components/mypage-menu";
import Button from "@/src/shared/ui/button";
import { CustomerSupportSection } from "@/src/widgets/mypage-customer-support";
import { Heart, LogOut, User } from "lucide-react";

export default function MyPage() {
  return (
    <>
      {/* Profile Section */}
      <section className="mb-8 flex items-center gap-3 px-1">
        <div className="h-12 w-12 rounded-full overflow-hidden">
          <div className="w-full h-full bg-slate-400" />
        </div>
        <div>
          <p className="text-lg font-bold">
            <span>김청년</span> 님
          </p>
          <Button>내 지원 자격 보기</Button>
        </div>
      </section>

      {/* 지원 현황 */}
      <section className="mb-8">
        지원 이력, 심사중, 달성 - entities 카드로 분리
      </section>

      {/* 최근 지원 공고 */}
      <section className="mb-8">최근 지원 공고(카드 - entities)</section>

      <div className="space-y-8">
        {/* 나의 정보 */}
        <MenuSection title="나의 정보">
          <MenuItem
            link="/mypage"
            icon={<User size={20} />}
            label="지원 자격"
          />
          <MenuItem
            link="/mypage"
            icon={<Heart size={20} />}
            label="관심 공고"
          />
        </MenuSection>

        {/* 고객 지원 */}
        <CustomerSupportSection />

        {/* 계정 설정 (로그아웃) */}
        <MenuSection title=" 계정 설정">
          <MenuItem
            link="/mypage"
            icon={<LogOut size={20} />}
            label="알림 설정"
          />
          <MenuItem
            link="/mypage"
            icon={<LogOut size={20} />}
            label="로그아웃"
          />
        </MenuSection>
      </div>
    </>
  );
}
