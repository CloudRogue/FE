import Button from "@/src/shared/ui/button";
import { Bell, Heart } from "lucide-react";
import Link from "next/link";

type HeaderVariant =
  | "unauthenticated"
  | "authenticated"
  | "announcement"
  | "mypage";

type HeaderProps = {
  variant: HeaderVariant;
};

export default function Header({ variant }: HeaderProps) {
  return (
    <header className="w-full border-b shrink-0">
      <div className="mx-auto h-14 max-w-7xl px-4 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 font-semibold text-foreground"
          aria-label="집착 홈으로"
        >
          <span className="text-base">🏘️ 집착</span>
        </Link>

        {variant === "unauthenticated" && (
          <Link href="/login" aria-label="로그인 페이지로 이동">
            <Button className="h-9 px-4 text-sm font-medium">로그인</Button>
          </Link>
        )}

        {variant === "authenticated" && (
          <div className="flex items-center">
            <Bell size={24} />
            <Link href="/mypage" aria-label="마이페이지로 이동">
              <Button className="h-9 px-4 text-sm font-medium">
                마이페이지
              </Button>
            </Link>
          </div>
        )}

        {variant === "announcement" && (
          <Link href="mypage">
            <Heart size={24} />
          </Link>
        )}

        {variant === "mypage" && <Link href="mypage">마이페이지 헤더</Link>}
      </div>
    </header>
  );
}
