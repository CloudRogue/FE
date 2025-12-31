import Link from "next/link";
import Button from "@/src/shared/ui/button";

type HeaderVariant = "unauthenticated" | "authenticated";

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

        {variant === "unauthenticated" ? (
          <Link href="/login">
            <Button className="h-9 px-4 text-sm font-medium">로그인</Button>
          </Link>
        ) : (
          <Link href="/mypage">
            <Button className="h-9 px-4 text-sm font-medium">마이페이지</Button>
          </Link>
        )}
      </div>
    </header>
  );
}
