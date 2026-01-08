import { MenuItem, MenuSection } from "@/src/shared/components/mypage-menu";
import { FileText, HelpCircle, MessageCircle } from "lucide-react";

export default function CustomerSupportSection() {
  return (
    <MenuSection title="고객 지원">
      <MenuItem
        link="/mypage/iquiry"
        icon={<MessageCircle size={20} />}
        label="1:1 문의"
      />
      <MenuItem
        link="/mypage/faq"
        icon={<HelpCircle size={20} />}
        label="자주 묻는 질문 (FAQ)"
      />
      <MenuItem
        link="/mypage/terms"
        icon={<FileText size={20} />}
        label="서비스 이용 약관"
      />
    </MenuSection>
  );
}
